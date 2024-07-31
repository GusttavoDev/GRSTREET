import { Router, Request, Response } from "express";
import { addSubCategoryController, editSubCategoryController, listSubCategoryController, removeSubCategoryController } from "../controllers/subCategories-controller";
import ISubCategory from "../entities/ISubCategory";

const subCategoryRouter = Router();

subCategoryRouter.get("/:categoryId", async (request: Request, response: Response) => {
    try {
        const categoryId = Number(request.params.categoryId);
        const subCategories = await listSubCategoryController.execute(categoryId);
        return response.json(subCategories);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

subCategoryRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { name, category_id }: Omit<ISubCategory, "id"> = request.body;
        await addSubCategoryController.execute({ name, category_id });
        return response.status(201).send({ message: "Subcategory created successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

subCategoryRouter.put("/", async (request: Request, response: Response) => {
    try {
        const { id, name, category_id }: ISubCategory = request.body;
        await editSubCategoryController.execute({ id, name, category_id });
        return response.status(200).send({ message: "Subcategory updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

subCategoryRouter.delete("/", async (request: Request, response: Response) => {
    try {
        const { id } = request.body;
        await removeSubCategoryController.execute(Number(id));
        return response.status(200).send({ message: "Subcategory deleted successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default subCategoryRouter;
