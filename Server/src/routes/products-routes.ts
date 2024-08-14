import { Router, Request, Response } from "express";
import { createProductController, editProductController, getProductByIdController, listProductsController, removeProductsController } from "../controllers/products-controller";
import IProduct from "../entities/IProduct";

const productsRouter = Router();

// Lista produtos
productsRouter.get("/", async (request: Request, response: Response) => {
    try {
        const products = await listProductsController.execute();
        return response.json(products);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Busca um produto por ID
productsRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        const id = request.params.id;
        const product = await getProductByIdController.execute(id);
        if (!product) {
            return response.status(404).send({ message: "Product not found" });
        }
        return response.json(product);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

// Adiciona um novo produto com upload de imagem
productsRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { name, description, category, sub_category, colors, images, reviews, relatedProducts }: Omit<IProduct, "id"> = request.body;
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

// Edita um produto com upload de imagem
productsRouter.put("/", async (request: Request, response: Response) => {
    try {
        const { id, name, description, category, sub_category, colors, images, reviews, relatedProducts }: IProduct = request.body;
        if (!id) {
            return response.status(400).send({ message: "Product ID is required" });
        }

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

// Remove um produto
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
