import { Router, Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { addPurchaseController } from "../controllers/purchase-controller";
import { updateCartController } from "../controllers/users-controller";

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
        external_reference: JSON.stringify({ token, items: updatedItems, purchaseData }), // Armazena os dados da compra
      },
    });

    return response.status(200).json({ init_point: preferenceResponse.sandbox_init_point || preferenceResponse.init_point });
  } catch (error: any) {
    console.error("❌ Erro ao criar pagamento:", error);
    return response.status(500).json({ error: error.message });
  }
});

// Webhook para processar notificações do Mercado Pago
paymentsRouter.post("/webhook", async (request: Request, response: Response) => {
  try {
    console.log("🔔 Notificação recebida:", JSON.stringify(request.body, null, 2));

    const { topic, id } = request.body; // `id` é o identificador da notificação

    if (!topic || !id) {
      console.error("⚠️ Notificação inválida, falta `topic` ou `id`.");
      return response.status(400).json({ error: "Notificação inválida" });
    }

    let paymentId;

    if (topic === "payment") {
      paymentId = id;
    } else if (topic === "merchant_order") {
      // Buscar detalhes da ordem no Mercado Pago
      const orderInfo = await fetch(`https://api.mercadopago.com/merchant_orders/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }).then(res => res.json());

      console.log("📄 Detalhes da ordem:", orderInfo);

      if (!orderInfo.payments || orderInfo.payments.length === 0) {
        console.warn("⚠️ Nenhum pagamento associado a esta ordem.");
        return response.sendStatus(200);
      }

      // Pegar o primeiro pagamento associado à ordem
      paymentId = orderInfo.payments[0].id;
    }

    if (!paymentId) {
      console.error("⚠️ ID do pagamento não encontrado.");
      return response.status(400).json({ error: "ID do pagamento não encontrado." });
    }

    console.log("🔍 Buscando detalhes do pagamento ID:", paymentId);

    // Buscar detalhes do pagamento
    const paymentInfo = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    }).then(res => res.json());

    console.log("💳 Detalhes do pagamento:", paymentInfo);

    if (paymentInfo.status !== "approved") {
      console.log(`⚠️ Pagamento ainda não aprovado. Status atual: ${paymentInfo.status}`);
      return response.sendStatus(200);
    }

    console.log("✅ Pagamento aprovado:", paymentInfo);

    const { external_reference } = paymentInfo;

    if (!external_reference) {
      console.error("⚠️ Referência externa não encontrada.");
      return response.status(400).json({ error: "Referência externa não encontrada." });
    }

    const { token, items, purchaseData } = JSON.parse(external_reference);

    console.log("🛒 Registrando compra no banco e atualizando carrinho...");

    // Criar a venda no banco de dados
    await addPurchaseController.execute({
      ...purchaseData,
      payment_id: paymentId,
      payment_status: paymentInfo.status,
    });

    // Atualizar o carrinho do usuário
    await updateCartController.execute(token, items);

    console.log("✅ Compra registrada e carrinho atualizado.");

    return response.sendStatus(200);
  } catch (error) {
    console.error("❌ Erro no webhook:", error);
    return response.status(500).json({ error: "Erro ao processar webhook" });
  }
});

export default paymentsRouter;
