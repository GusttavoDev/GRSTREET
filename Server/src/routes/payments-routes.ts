import { Router, Request, Response } from "express";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { addPurchaseController } from "../controllers/purchase-controller";
import { updateCartController } from "../controllers/users-controller";
import axios from "axios";

const paymentsRouter = Router();

if (!process.env.MP_ACCESS_TOKEN) {
  throw new Error("⚠️ MP_ACCESS_TOKEN não definido no ambiente.");
}

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
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

    const payerData = payer?.email
      ? { name: payer.name || "Cliente", email: payer.email }
      : undefined;

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
        payer: payerData,
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
    const merchantOrderId = req.body?.merchant_order_id || resource?.split("/").pop();

    if (!merchantOrderId) {
      console.error("⚠️ Merchant Order ID não encontrado.");
      return res.status(400).json({ error: "Merchant Order ID inválido" });
    }

    res.sendStatus(200);

    const orderUrl = `https://api.mercadopago.com/merchant_orders/${merchantOrderId}`;
    let orderResponse = await axios.get(orderUrl, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    });

    let orderData = orderResponse.data;
    console.log("📦 Detalhes da ordem:", JSON.stringify(orderData, null, 2));

    let attempts = 5;
    while (attempts > 0 && orderData.status !== "closed" && (!orderData.payments || orderData.payments.length === 0)) {
      console.log("⏳ Aguardando pagamento...");
      await new Promise(resolve => setTimeout(resolve, 3000));
      orderResponse = await axios.get(orderUrl, { headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` } });
      orderData = orderResponse.data;
      attempts--;
    }

    if (orderData.payments?.length > 0) {
      const approvedPayment = orderData.payments.find((p: any) => p.status === "approved");
      if (approvedPayment) {
        console.log("✅ Pagamento aprovado encontrado:", approvedPayment);

        const paymentId = approvedPayment.id;
        const paymentUrl = `https://api.mercadopago.com/v1/payments/${paymentId}`;
        const paymentResponse = await axios.get(paymentUrl, { headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` } });

        const { external_reference } = paymentResponse.data;
        let purchaseDetails;
        try {
          purchaseDetails = JSON.parse(external_reference);
        } catch (err) {
          console.error("❌ Erro ao parsear `external_reference`:", err);
          return;
        }

        await addPurchaseController.execute({ ...purchaseDetails.purchaseData, payment_id: paymentId, payment_status: "approved" });
        await updateCartController.execute(purchaseDetails.token, purchaseDetails.items);

        console.log("✅ Compra e carrinho atualizados.");
      }
    }
  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
  }
});

export default paymentsRouter;
