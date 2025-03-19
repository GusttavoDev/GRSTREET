import { Router, Request, Response } from "express";
import {
    listConfigController, 
    updateConfigController,
    createConfigUseCase, 
} from "../controllers/config-controller";

const configRouter = Router();

configRouter.get("/", async (request: Request, response: Response) => {
    try {
        const config = await listConfigController.execute();
        if (!config) {
            return response.status(404).send({ error: "Configuração não encontrada" });
        }
        return response.status(200).send(config);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

configRouter.post("/", async (request: Request, response: Response) => {
    try {
        await createConfigUseCase.execute();
        return response.status(201).send({msg: 'criado!'});
    } catch (error: unknown) {
        return response.status(500).send({error: String(error)});
    }
})

// Atualizar configuração existente
configRouter.put("/:id", async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const data = request.body;

        await updateConfigController.execute(id, data);

        return response.status(200).send({ msg: "Configuração atualizada com sucesso!" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default configRouter;
