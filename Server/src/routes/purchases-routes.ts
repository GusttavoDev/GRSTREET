import { Router, Request, Response } from "express";
import {
    addPurchaseController,
    editPurchaseController,
    listPurchaseController,
    removePurchaseController,
    updatePaymentMethodPurchaseController,
    updateStatusMethodPurchaseController
} from "../controllers/purchase-controller";
import IPurchase from "../entities/IPurchase";

const purchaseRouter = Router();

// List all purchases
purchaseRouter.get("/", async (request: Request, response: Response) => {
    try {
        const purchases = await listPurchaseController.execute();
        return response.json(purchases);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Create a new purchase
purchaseRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { user_id, products, payment_method, date, status }: Omit<IPurchase, "id"> = request.body;
        await addPurchaseController.execute({ user_id, products, payment_method, date, status });
        return response.status(201).send({ message: "Purchase created successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Edit an existing purchase
purchaseRouter.put("/", async (request: Request, response: Response) => {
    try {
        const { id, user_id, products, payment_method, date, status }: IPurchase = request.body;
        await editPurchaseController.execute({ id, user_id, products, payment_method, date, status });
        return response.status(200).send({ message: "Purchase updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Update purchase status
purchaseRouter.patch("/status", async (request: Request, response: Response) => {
    try {
        const { id, status }: { id: number; status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO" } = request.body;
        await updateStatusMethodPurchaseController.execute(String(id), status);
        return response.status(200).send({ message: "Purchase status updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Update payment method
purchaseRouter.patch("/payment-method", async (request: Request, response: Response) => {
    try {
        const { id, payment_method }: { id: number; payment_method: string } = request.body;
        await updatePaymentMethodPurchaseController.execute(String(id), payment_method);
        return response.status(200).send({ message: "Payment method updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Remove a purchase
purchaseRouter.delete("/", async (request: Request, response: Response) => {
    try {
        const { id } = request.body;
        await removePurchaseController.execute(String(id));
        return response.status(200).send({ message: "Purchase deleted successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default purchaseRouter;
