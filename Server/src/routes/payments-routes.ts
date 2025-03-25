import { Router, Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { addPurchaseController } from "../controllers/purchase-controller";
import { updateCartController } from "../controllers/users-controller";
import axios from "axios";

const paymentsRouter = Router();

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "",
});

// Rota para iniciar o checkout do Mercado Pago
paymentsRouter.post("/", async (request: Request, response: Response) => {
  try {
    const { token, items, payer, updatedItems, purchaseData } = request.body;

    if (!items || items.length === 0) {
      return response.status(400).json({ error: "Itens inválidos ou ausentes." });
    }

    console.log("📦 Itens recebidos:", items, payer, token, updatedItems, purchaseData);

    const preference = new Preference(client);

    const preferenceResponse = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          picture_url: item.picture_url,
          quantity: Number(item.quantity),
          unit_price: Number(item.unit_price),
          currency_id: "BRL",
        })),
        payer: {
          name: payer.name,
          email: payer.email,
        },
        back_urls: {
          success: "https://grstreet.com/sucesso",
          failure: "https://grstreet.com/falha",
          pending: "https://grstreet.com/pendente",
        },
        auto_return: "approved",
        notification_url: "https://api.grstreet.com/api/payment/webhook",
        external_reference: JSON.stringify({ token, items: updatedItems, purchaseData }),
      },
    });

    return response.status(200).json({ init_point: preferenceResponse.sandbox_init_point || preferenceResponse.init_point });
  } catch (error: any) {
    console.error("❌ Erro ao criar pagamento:", error);
    return response.status(500).json({ error: error.message });
  }
});

// Webhook para processar notificações do Mercado Pago
paymentsRouter.post("/webhook", async (req: Request, res: Response) => {
  try {
    console.log("🔔 Notificação recebida:", JSON.stringify(req.body, null, 2));

    const { topic, resource } = req.body;

    if (!topic || !resource) {
      console.error("⚠️ Notificação inválida: falta `topic` ou `resource`.");
      return res.status(400).json({ error: "Notificação inválida" });
    }

    // Extrai o ID da `merchant_order`
    const merchantOrderId = resource.split("/").pop();
    console.log(`🔍 Merchant Order ID extraído: ${merchantOrderId}`);

    if (!merchantOrderId) {
      console.error("⚠️ Merchant Order ID não encontrado.");
      return res.status(400).json({ error: "Merchant Order ID inválido" });
    }

    // 🔹 Responde imediatamente para evitar notificações repetidas
    res.sendStatus(200);

    // 🔎 Busca detalhes da `merchant_order`
    const orderUrl = `https://api.mercadopago.com/merchant_orders/${merchantOrderId}`;
    let orderResponse = await axios.get(orderUrl, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    });

    let orderData = orderResponse.data;
    console.log("📦 Detalhes da ordem:", JSON.stringify(orderData, null, 2));

    // 🔄 Verifica até que o pagamento esteja aprovado
    while (orderData.status !== "closed" && orderData.payments && orderData.payments.length === 0) {
      console.log("⏳ Aguardando pagamento...");
      await new Promise(resolve => setTimeout(resolve, 3000)); // Espera 3 segundos antes de tentar novamente
      orderResponse = await axios.get(orderUrl, {
        headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
      });
      orderData = orderResponse.data;
    }

    if (orderData.payments && orderData.payments.length > 0) {
      const approvedPayment = orderData.payments.find((p: any) => p.status === "approved");
      if (approvedPayment) {
        console.log("✅ Pagamento aprovado encontrado:", approvedPayment);

        const paymentId = approvedPayment.id;
        const paymentUrl = `https://api.mercadopago.com/v1/payments/${paymentId}`;
        const paymentResponse = await axios.get(paymentUrl, {
          headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
        });

        const paymentInfo = paymentResponse.data;
        console.log("💳 Detalhes do pagamento:", JSON.stringify(paymentInfo, null, 2));

        const { external_reference } = paymentInfo;

        if (!external_reference) {
          console.error("⚠️ Referência externa não encontrada.");
          return;
        }

        const { token, items, purchaseData } = JSON.parse(external_reference);
        console.log("🛒 Dados da compra extraídos:", purchaseData);

        // ⚡ Atualiza a compra no banco
        await addPurchaseController.execute({
          ...purchaseData,
          payment_id: paymentId,
          payment_status: paymentInfo.status,
        });

        // ⚡ Atualiza o carrinho do usuário
        await updateCartController.execute(token, items);

        console.log("✅ Compra registrada com sucesso.");
      } else {
        console.log("⚠️ Nenhum pagamento aprovado encontrado.");
      }
    } else {
      console.log("⚠️ Nenhum pagamento encontrado.");
    }
  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
  }
});

export default paymentsRouter;
