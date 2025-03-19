"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products-controller");
const productsRouter = (0, express_1.Router)();
// Lista produtos
productsRouter.get("/", async (request, response) => {
    try {
        const products = await products_controller_1.listProductsController.execute();
        return response.json(products);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Busca um produto por ID
productsRouter.get("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const product = await products_controller_1.getProductByIdController.execute(id);
        if (!product) {
            return response.status(404).send({ message: "Product not found" });
        }
        return response.json(product);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Adiciona um novo produto com upload de imagem
productsRouter.post("/", async (request, response) => {
    try {
        const { name, description, category, sub_category, colors, images, reviews, relatedProducts, afiliado, destaqued, weight, height, length, width, declared_value, package_format, sku } = request.body;
        await products_controller_1.createProductController.execute({
            name,
            description,
            category,
            sub_category,
            colors,
            reviews,
            images,
            relatedProducts,
            afiliado,
            destaqued,
            weight,
            height,
            width,
            length,
            declared_value: declared_value,
            package_format: package_format,
            sku: sku
        });
        return response.status(201).send({ message: "Product created successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Edita um produto com upload de imagem
productsRouter.put("/", async (request, response) => {
    try {
        const { id, name, description, category, sub_category, colors, images, reviews, relatedProducts, afiliado, destaqued, weight, height, length, width, declared_value, package_format, sku } = request.body;
        if (!id) {
            return response.status(400).send({ message: "Product ID is required" });
        }
        await products_controller_1.editProductController.execute({
            id,
            name,
            description,
            category,
            sub_category,
            colors,
            reviews,
            images,
            relatedProducts,
            afiliado,
            destaqued,
            weight,
            height,
            width,
            length,
            declared_value,
            package_format,
            sku,
        });
        return response.status(200).send({ message: "Product updated successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Remove um produto
productsRouter.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        await products_controller_1.removeProductsController.execute(id);
        return response.status(200).send({ message: "Product deleted successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
exports.default = productsRouter;
