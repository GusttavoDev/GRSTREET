"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colors_controller_1 = require("../controllers/colors-controller");
const colorRouter = (0, express_1.Router)();
// Lista as cores de um produto
colorRouter.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const colors = await colors_controller_1.listColorController.execute(productId);
        return res.json(colors);
    }
    catch (error) {
        return res.status(500).send({ error: String(error) });
    }
});
// Adiciona uma nova cor com upload de imagem
colorRouter.post("/", async (req, res) => {
    try {
        const { name, price, images, product_id, actived, imposto, ncm, custo, sizes } = req.body;
        await colors_controller_1.addColorController.execute({
            name,
            images,
            price,
            product_id,
            actived,
            imposto,
            ncm,
            custo,
            sizes
        });
        return res.status(201).send({ message: "Color added successfully" });
    }
    catch (error) {
        return res.status(500).send({ error: String(error) });
    }
});
// Edita uma cor com upload de imagem
colorRouter.put("/", async (req, res) => {
    try {
        const { id, name, price, images, product_id, sizes, actived, imposto, ncm, custo } = req.body;
        await colors_controller_1.editColorController.execute({
            id,
            product_id,
            name,
            images,
            price,
            sizes,
            actived,
            imposto,
            ncm,
            custo
        });
        return res.status(200).send({ message: "Color updated successfully" });
    }
    catch (error) {
        return res.status(500).send({ error: String(error) });
    }
});
// Remove uma cor
colorRouter.delete("/", async (req, res) => {
    try {
        const { id, name } = req.body;
        await colors_controller_1.removeColorController.execute(id, name);
        return res.status(200).send({ message: "Color removed successfully" });
    }
    catch (error) {
        return res.status(500).send({ error: String(error) });
    }
});
exports.default = colorRouter;
