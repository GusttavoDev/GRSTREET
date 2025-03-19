"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subCategories_controller_1 = require("../controllers/subCategories-controller");
const subCategoryRouter = (0, express_1.Router)();
subCategoryRouter.get("/:categoryId", async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const subCategories = await subCategories_controller_1.listSubCategoryController.execute(categoryId);
        return response.json(subCategories);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
subCategoryRouter.post("/", async (request, response) => {
    try {
        const { name, category_id } = request.body;
        await subCategories_controller_1.addSubCategoryController.execute({ name, category_id });
        return response.status(201).send({ message: "Subcategory created successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
subCategoryRouter.put("/", async (request, response) => {
    try {
        const { id, name, category_id } = request.body;
        await subCategories_controller_1.editSubCategoryController.execute({ id, name, category_id });
        return response.status(200).send({ message: "Subcategory updated successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
subCategoryRouter.delete("/", async (request, response) => {
    try {
        const { id } = request.body;
        await subCategories_controller_1.removeSubCategoryController.execute(String(id));
        return response.status(200).send({ message: "Subcategory deleted successfully" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
exports.default = subCategoryRouter;
