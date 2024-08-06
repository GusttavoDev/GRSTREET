import { Router, Request, Response } from "express";
import { createProductController, editProductController, getProductByIdController, listProductsController, removeProductsController } from "../controllers/products-controller";
import IProduct from "../entities/IProduct";

const productsRouter = Router();

productsRouter.get("/", async (request: Request, response: Response) => {
    try {
        const products = await listProductsController.execute();
        return response.json(products);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

productsRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const product = await getProductByIdController.execute(id);
        return response.json(product);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

productsRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { name, description, category, sub_category, colors, reviews, images, relatedProducts }: Omit<IProduct, "id"> = request.body;
        await createProductController.execute({
            name,
            description,
            category,
            sub_category,
            colors,
            reviews,
            images,
            relatedProducts,
        });
        return response.status(201).send({ message: "Product created successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

productsRouter.put("/", async (request: Request, response: Response) => {
    try {
        const { id, name, description, category, sub_category, colors, reviews, images, relatedProducts }: IProduct = request.body;
        await editProductController.execute({
            id,
            name,
            description,
            category,
            sub_category,
            colors,
            reviews,
            images,
            relatedProducts
        });
        return response.status(200).send({ message: "Product updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

productsRouter.delete("/:id", async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        await removeProductsController.execute(id);
        return response.status(200).send({ message: "Product deleted successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default productsRouter;
