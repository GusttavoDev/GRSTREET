import { Router, Request, Response } from "express";
import { MercadoPagoConfig, Preference, Payment,  } from "mercadopago";
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

    // const preference = new Preference(client);
    const pay = new Payment(client);

    const payerData = payer?.email
      ? { name: payer.name || "Cliente", email: payer.email }
      : undefined;

      const paymentPayload = await pay.create({
        body: {
          additional_info: {
            items: items.map((item: any) => ({
              id: item.id,
              title: item.title,
              description: item.description,
              picture_url: item.picture_url,
              quantity: Number(item.quantity),
              unit_price: Number(item.unit_price),
            }))
          },
          payer: {
            first_name: payerData.name,
            email: payerData.email
          },
          payment_method_id: 'master',
          transaction_amount: Number(purchaseData.value),
          callback_url: "https://grstreet.com/sucesso",
          notification_url: "https://api.grstreet.com/api/payment/webhook",
        },
      })
    return response.status(200).json({ init_point: paymentPayload.api_response});
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
    // console.log("📦 Detalhes da ordem:", JSON.stringify(orderData, null, 2));

    // Verifique o status da ordem
    if (orderData.order_status === "payment_required") {
      // Se o pagamento ainda não foi realizado, marca como "PENDENTE"
      const { external_reference } = orderData;
      let purchaseDetails;
      try {
        purchaseDetails = JSON.parse(external_reference);
      } catch (err) {
        console.error("❌ Erro ao parsear `external_reference`:", err);
        return;
      }

      // Atualize a compra com o status de pagamento "PENDENTE"
      await addPurchaseController.execute({
        ...purchaseDetails.purchaseData,
        payment_status: "PENDENTE", // Marca como pendente
        payment_id: "Não disponível", // Pode ser um placeholder
      });

      console.log("✅ Compra marcada como PENDENTE.");
      return;
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

        await addPurchaseController.execute({
          ...purchaseDetails.purchaseData,
          payment_id: paymentId,
          payment_status: "approved",
        });
        await updateCartController.execute(purchaseDetails.token, purchaseDetails.items);

        console.log("✅ Compra e carrinho atualizados.");
      }
    }
  } catch (error) {
    console.error("❌ Erro ao processar webhook:", error);
  }
});


export default paymentsRouter;
