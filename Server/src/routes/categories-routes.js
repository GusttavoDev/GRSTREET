"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories-controller");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/", async (request, response) => {
    try {
        const category = await categories_controller_1.listCategoryController.execute();
        return response.json(category);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
categoryRouter.post("/", async (request, response) => {
    try {
        const { name } = request.body;
        await categories_controller_1.addCategoryController.execute({ name });
        return response.status(201).send({ message: "Category created successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
categoryRouter.put("/", async (request, response) => {
    try {
        const { id, name } = request.body;
        await categories_controller_1.editCategoryController.execute({ id, name });
        return response.status(200).send({ message: "Category updated successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
categoryRouter.delete("/", async (request, response) => {
    try {
        const { id } = request.body;
        await categories_controller_1.removeCategoryController.execute(id);
        return response.status(200).send({ message: "Category deleted successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
exports.default = categoryRouter;
