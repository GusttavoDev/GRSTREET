import { Router, Request, Response } from "express";
import { addColorController, editColorController, listColorController, removeColorController } from "../controllers/colors-controller";
import IColor from "../entities/IColor";

const colorRouter = Router();
// Lista as cores de um produto
colorRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const colors = await listColorController.execute(productId);
        return res.json(colors);
    } catch (error: unknown) {
        return res.status(500).send({ error: String(error) });
    }
});

// Adiciona uma nova cor com upload de imagem
colorRouter.post("/", async (req: Request, res: Response) => {
    try {
        const { name, price, images, product_id, actived, imposto, ncm, custo, sizes }: Omit<IColor, "id"> = req.body;
        await addColorController.execute({
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
    } catch (error: unknown) {
        return res.status(500).send({ error: String(error) });
    }
});

// Edita uma cor com upload de imagem
colorRouter.put("/", async (req: Request, res: Response) => {
    try {
        const { id, name, price, images, product_id, sizes, actived, imposto, ncm, custo }: IColor = req.body;

        await editColorController.execute({
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
    } catch (error: unknown) {
        return res.status(500).send({ error: String(error) });
    }
});

// Remove uma cor
colorRouter.delete("/", async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body;
        await removeColorController.execute(id, name);
        return res.status(200).send({ message: "Color removed successfully" });
    } catch (error: unknown) {
        return res.status(500).send({ error: String(error) });
    }
});

export default colorRouter;
