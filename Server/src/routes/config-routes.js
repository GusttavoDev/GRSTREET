"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_controller_1 = require("../controllers/config-controller");
const configRouter = (0, express_1.Router)();
configRouter.get("/", async (request, response) => {
    try {
        const config = await config_controller_1.listConfigController.execute();
        if (!config) {
            return response.status(404).send({ error: "Configuração não encontrada" });
        }
        return response.status(200).send(config);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
configRouter.post("/", async (request, response) => {
    try {
        await config_controller_1.createConfigUseCase.execute();
        return response.status(201).send({ msg: 'criado!' });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
// Atualizar configuração existente
configRouter.put("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const data = request.body;
        await config_controller_1.updateConfigController.execute(id, data);
        return response.status(200).send({ msg: "Configuração atualizada com sucesso!" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
exports.default = configRouter;
