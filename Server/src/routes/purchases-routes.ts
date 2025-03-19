import { Router, Request, Response } from "express";
import {
    addPurchaseController,
    editPurchaseController,
    listAllPurchasesController,
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
        const purchases = await listAllPurchasesController.execute();
        return response.json(purchases);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});


purchaseRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        const id = request.params.id
        const purchases = await listPurchaseController.execute(String(id));
        return response.json(purchases);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Create a new purchase
purchaseRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { user_id, UserName, cel_number, cep, city, country, cpf, email, neighborhood, number, state, street, products, payment_method, date, status, frete, value, vendedor, visualizada, payment_id, payment_status, codigo_postagem }: Omit<IPurchase, "id"> = request.body;
        await addPurchaseController.execute({ user_id, UserName, cel_number, cep, city, country, cpf, email, neighborhood, number, state, street, products, payment_method, date, status, frete, value, vendedor, visualizada, payment_id, payment_status, codigo_postagem });
        return response.status(201).send({ message: "Purchase created successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Edit an existing purchase
purchaseRouter.put("/", async (request: Request, response: Response) => {
    try {
        const { id, user_id, UserName, cel_number, cep, city, country, cpf, email, neighborhood, number, state, street, products, payment_method, date, status, frete, value, vendedor, visualizada, payment_id, payment_status, codigo_postagem }: IPurchase = request.body;
        await editPurchaseController.execute({ id, user_id, UserName, cel_number, cep, city, country, cpf, email, neighborhood, number, state, street, products, payment_method, date, status, frete, value, vendedor, visualizada, payment_id, payment_status, codigo_postagem });
        return response.status(200).send({ message: "Purchase updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Update purchase status
purchaseRouter.patch("/status", async (request: Request, response: Response) => {
    try {
        const { id, status, codigo_postagem, visualizada }: { id: number; status: "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO", codigo_postagem: string, visualizada: boolean } = request.body;
        await updateStatusMethodPurchaseController.execute(String(id), status, codigo_postagem, visualizada);
        return response.status(200).send({ message: "Purchase status updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Update payment method
purchaseRouter.patch("/payment-method", async (request: Request, response: Response) => {
    try {
        const { id, payment_method, payment_id, payment_status }: { id: number; payment_method: string, payment_id: string, payment_status: string } = request.body;
        await updatePaymentMethodPurchaseController.execute(String(id), payment_method, payment_id, payment_status);
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
