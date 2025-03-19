"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchase_controller_1 = require("../controllers/purchase-controller");
const purchaseRouter = (0, express_1.Router)();
// List all purchases
purchaseRouter.get("/", async (request, response) => {
    try {
        const purchases = await purchase_controller_1.listAllPurchasesController.execute();
        return response.json(purchases);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
purchaseRouter.get("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const purchases = await purchase_controller_1.listPurchaseController.execute(String(id));
        return response.json(purchases);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Create a new purchase
purchaseRouter.post("/", async (request, response) => {
    try {
        const { user_id, UserName, cel_number, cep, city, country, cpf, email, neighborhood, number, state, street, products, payment_method, date, status, frete, value, vendedor, visualizada, payment_id, payment_status, codigo_postagem } = request.body;
        await purchase_controller_1.addPurchaseController.execute({ user_id, UserName, cel_number, cep, city, country, cpf, email, neighborhood, number, state, street, products, payment_method, date, status, frete, value, vendedor, visualizada, payment_id, payment_status, codigo_postagem });
        return response.status(201).send({ message: "Purchase created successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Edit an existing purchase
purchaseRouter.put("/", async (request, response) => {
    try {
        const { id, user_id, UserName, cel_number, cep, city, country, cpf, email, neighborhood, number, state, street, products, payment_method, date, status, frete, value, vendedor, visualizada, payment_id, payment_status, codigo_postagem } = request.body;
        await purchase_controller_1.editPurchaseController.execute({ id, user_id, UserName, cel_number, cep, city, country, cpf, email, neighborhood, number, state, street, products, payment_method, date, status, frete, value, vendedor, visualizada, payment_id, payment_status, codigo_postagem });
        return response.status(200).send({ message: "Purchase updated successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Update purchase status
purchaseRouter.patch("/status", async (request, response) => {
    try {
        const { id, status, codigo_postagem, visualizada } = request.body;
        await purchase_controller_1.updateStatusMethodPurchaseController.execute(String(id), status, codigo_postagem, visualizada);
        return response.status(200).send({ message: "Purchase status updated successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Update payment method
purchaseRouter.patch("/payment-method", async (request, response) => {
    try {
        const { id, payment_method, payment_id, payment_status } = request.body;
        await purchase_controller_1.updatePaymentMethodPurchaseController.execute(String(id), payment_method, payment_id, payment_status);
        return response.status(200).send({ message: "Payment method updated successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Remove a purchase
purchaseRouter.delete("/", async (request, response) => {
    try {
        const { id } = request.body;
        await purchase_controller_1.removePurchaseController.execute(String(id));
        return response.status(200).send({ message: "Purchase deleted successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
exports.default = purchaseRouter;
