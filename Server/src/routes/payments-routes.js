"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mercadopago_1 = require("mercadopago");
const purchase_controller_1 = require("../controllers/purchase-controller");
const users_controller_1 = require("../controllers/users-controller");
const axios_1 = __importDefault(require("axios"));
const paymentsRouter = (0, express_1.Router)();
if (!process.env.MP_ACCESS_TOKEN) {
    throw new Error("⚠️ MP_ACCESS_TOKEN não definido no ambiente.");
}
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
});
// Rota para iniciar o checkout do Mercado Pago
paymentsRouter.post("/", async (request, response) => {
    try {
        const { token, items, payer, updatedItems, purchaseData } = request.body;
        console.log(client.accessToken);
        if (!items || items.length === 0) {
            return response.status(400).json({ error: "Itens inválidos ou ausentes." });
        }
        const preference = new mercadopago_1.Preference(client);
        const payerData = (payer === null || payer === void 0 ? void 0 : payer.email)
            ? { name: payer.name || "Cliente", email: payer.email }
            : undefined;
        const preferenceResponse = await preference.create({
            body: {
                items: items.map((item) => ({
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
        // console.log('POST', response.json())
        return response.status(200).json({ init_point: preferenceResponse.init_point });
    }
    catch (error) {
        console.error("❌ Erro ao criar pagamento:", error);
        return response.status(500).json({ error: error.message });
    }
});
// Webhook para processar notificações do Mercado Pago
paymentsRouter.post("/webhook", async (req, res) => {
    var _a, _b;
    try {
        console.log("🔔 Notificação recebida:", JSON.stringify(req.body, null, 2));
        const { topic, resource } = req.body;
        const merchantOrderId = ((_a = req.body) === null || _a === void 0 ? void 0 : _a.merchant_order_id) || (resource === null || resource === void 0 ? void 0 : resource.split("/").pop());
        if (!merchantOrderId) {
            console.error("⚠️ Merchant Order ID não encontrado.");
            return res.status(400).json({ error: "Merchant Order ID inválido" });
        }
        res.sendStatus(200);
        const orderUrl = `https://api.mercadopago.com/merchant_orders/${merchantOrderId}`;
        let orderResponse = await axios_1.default.get(orderUrl, {
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
            }
            catch (err) {
                console.error("❌ Erro ao parsear `external_reference`:", err);
                return;
            }
            // Atualize a compra com o status de pagamento "PENDENTE"
            await purchase_controller_1.addPurchaseController.execute(Object.assign(Object.assign({}, purchaseDetails.purchaseData), { payment_status: "PENDENTE", payment_id: "Não disponível" }));
            console.log("✅ Compra marcada como PENDENTE.");
            return;
        }
        if (((_b = orderData.payments) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            const approvedPayment = orderData.payments.find((p) => p.status === "approved");
            if (approvedPayment) {
                console.log("✅ Pagamento aprovado encontrado:", approvedPayment);
                const paymentId = approvedPayment.id;
                const paymentUrl = `https://api.mercadopago.com/v1/payments/${paymentId}`;
                const paymentResponse = await axios_1.default.get(paymentUrl, { headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` } });
                const { external_reference } = paymentResponse.data;
                let purchaseDetails;
                try {
                    purchaseDetails = JSON.parse(external_reference);
                }
                catch (err) {
                    console.error("❌ Erro ao parsear `external_reference`:", err);
                    return;
                }
                await purchase_controller_1.addPurchaseController.execute(Object.assign(Object.assign({}, purchaseDetails.purchaseData), { payment_id: paymentId, payment_status: "approved" }));
                await users_controller_1.updateCartController.execute(purchaseDetails.token, purchaseDetails.items);
                console.log("✅ Compra e carrinho atualizados.");
            }
        }
    }
    catch (error) {
        console.error("❌ Erro ao processar webhook:", error);
    }
});
exports.default = paymentsRouter;
