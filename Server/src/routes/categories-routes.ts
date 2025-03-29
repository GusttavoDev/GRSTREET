import { Router, Request, Response } from "express";
import { addCategoryController, editCategoryController, listCategoryController, removeCategoryController } from "../controllers/categories-controller";
import ICategory from "../entities/ICategory";

const categoryRouter = Router();

categoryRouter.get("/", async (request: Request, response: Response) => {
    try {
        const category = await listCategoryController.execute();
        return response.json(category);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

categoryRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { name, image, destaqued }: Omit<ICategory, "id"> = request.body;
        await addCategoryController.execute({ name, image,  destaqued });
        return response.status(201).send({ message: "Category created successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

categoryRouter.put("/", async (request: Request, response: Response) => {
    try {
        const { id, name, image, destaqued }: ICategory = request.body;
        await editCategoryController.execute({ id, name, image, destaqued });
        return response.status(200).send({ message: "Category updated successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

categoryRouter.delete("/", async (request: Request, response: Response) => {
    try {
        const { id } = request.body;
        await removeCategoryController.execute(id);
        return response.status(200).send({ message: "Category deleted successfully" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default categoryRouter;
