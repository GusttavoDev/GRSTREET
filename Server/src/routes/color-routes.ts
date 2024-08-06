import { Router, Request, Response } from "express";
import { addColorController, editColorController, listColorController, removeColorController } from "../controllers/colors-controller";
import IColor from "../entities/IColor";

const colorRouter = Router();

colorRouter.get("/:id", async (requets: Request, response: Response) => {
    try {
        const id = requets.query;
        return await listColorController.execute(String(id));
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

colorRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { name, images, price, product_id, stock }: Omit<IColor, "id"> = request.body;

        return await addColorController.execute({
            name,
            images,
            price,
            product_id,
            stock
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

colorRouter.put("/", async (request: Request, response: Response) => {
    try {
        const { id, name, images, price, product_id, stock }: IColor = request.body;
        return await editColorController.execute({
            id,
            product_id,
            name,
            images,
            price,
            stock,
        })
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

colorRouter.delete("/", async (request: Request, response: Response) => {
    try {
        const { id, name } = request.body;
        return await removeColorController.execute(String(id), name);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
})

export default colorRouter;