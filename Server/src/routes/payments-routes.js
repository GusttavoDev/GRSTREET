"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mercadopago_1 = require("mercadopago");
const purchase_controller_1 = require("../controllers/purchase-controller");
const users_controller_1 = require("../controllers/users-controller");
const paymentsRouter = (0, express_1.Router)();
const client = new mercadopago_1.MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN || "",
});
// Rota para iniciar o checkout do Mercado Pago
paymentsRouter.post("/", async (request, response) => {
    try {
        const { token, items, payer, updatedItems, purchaseData } = request.body;
        if (!items || items.length === 0) {
            return response.status(400).json({ error: "Itens inválidos ou ausentes." });
        }
        console.log("Itens recebidos:", items, payer, token, updatedItems, purchaseData);
        const preference = new mercadopago_1.Preference(client);
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
                payer: {
                    name: payer.name,
                    email: payer.email,
                },
                back_urls: {
                    success: "https://grstreet.com/Pedidos",
                    failure: "https://grstreet.com/falha",
                    pending: "https://grstreet.com/pendente",
                },
                auto_return: "approved",
                notification_url: "https://api.grstreet.com/api/payment/webhook",
                external_reference: JSON.stringify({ token, items: updatedItems, purchaseData }), // Armazena os dados da compra
            },
        });
        return response.status(200).json({ init_point: preferenceResponse.sandbox_init_point || preferenceResponse.init_point });
    }
    catch (error) {
        console.error("Erro ao criar pagamento:", error);
        return response.status(500).json({ error: error.message });
    }
});
// Webhook para processar notificações do Mercado Pago
paymentsRouter.post("/webhook", async (request, response) => {
    try {
        console.log("Recebendo notificação do Mercado Pago:", request.body);
        const { type, data } = request.body;
        if (type === "payment") {
            const paymentId = data.id || request.query["id"];
            if (!paymentId) {
                console.error("ID do pagamento não encontrado.");
                return response.status(400).json({ error: "ID do pagamento não encontrado." });
            }
            // Buscar detalhes do pagamento na API do Mercado Pago
            const paymentInfo = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                },
            }).then(res => res.json());
            console.log("Detalhes do pagamento:", paymentInfo);
            if (paymentInfo.status === "approved") {
                console.log("Pagamento aprovado:", paymentInfo);
                const { external_reference } = paymentInfo;
                if (!external_reference) {
                    console.error("Referência externa não encontrada.");
                    return response.status(400).json({ error: "Referência externa não encontrada." });
                }
                const { token, items, purchaseData } = JSON.parse(external_reference);
                // Criar a venda no banco de dados
                await purchase_controller_1.addPurchaseController.execute(Object.assign(Object.assign({}, purchaseData), { payment_id: paymentId, payment_status: paymentInfo.status }));
                // Atualizar o carrinho do usuário
                await users_controller_1.updateCartController.execute(token, items);
                console.log("Compra registrada e carrinho atualizado.");
            }
            else {
                console.log("Pagamento ainda não aprovado.");
            }
        }
        return response.sendStatus(200);
    }
    catch (error) {
        console.error("Erro no webhook:", error);
        return response.status(500).json({ error: "Erro ao processar webhook" });
    }
});
exports.default = paymentsRouter;
