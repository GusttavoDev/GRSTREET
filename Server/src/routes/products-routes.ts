import { Router, Request, Response } from "express";

import { deleteUserController, listUsersController } from "../controllers/users-controller";
import { createProductController, editProductController, getProductByIdController } from "../controllers/products-controller";
import IProduct from "../entities/IProduct";

const productsRouter = Router();

productsRouter.get("/", async (request, response) => {
    try {
        return await listUsersController.execute();
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

productsRouter.get("id:", async (request, response) => {
    try {
        const id = request.query;
        return await getProductByIdController.execute(Number(id));
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

productsRouter.post("/", async (request, response) => {
    try {
        const { name, description, category, sub_category, colors, reviews }: Omit<IProduct, "id"> = request.body;
        return await createProductController.execute({
            name,
            description,
            category,
            sub_category,
            colors,
            reviews
        })
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

productsRouter.put("/", async (request, response) => {
    try {
        const { id, name, description, category, sub_category, colors, reviews }: IProduct = request.body;
        return await editProductController.execute({
            id,
            name,
            description,
            category,
            sub_category,
            colors,
            reviews
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

productsRouter.delete("/:token", async (request: Request, response: Response) => {
    try {
        const token = request.query;
        return await deleteUserController.execute(String(token));
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

export default productsRouter;