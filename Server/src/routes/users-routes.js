"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users-controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/auth", async (request, response) => {
    try {
        const { email, password } = request.body;
        const token = await users_controller_1.authenticateUserController.execute(email, password);
        return response.status(200).send({
            token
        });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
userRouter.get("/", async (request, response) => {
    try {
        const data = await users_controller_1.listUsersController.execute();
        return response.status(200).send(data);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
userRouter.get("/:id", async (request, response) => {
    try {
        const data = await users_controller_1.getUserController.execute(String(request.params.id));
        return response.status(200).send(data);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
userRouter.post("/", async (request, response) => {
    try {
        const { header, addres, personal_data, purchases, cart } = request.body;
        await users_controller_1.createUserController.execute({
            header,
            addres,
            personal_data,
            purchases,
            cart
        });
        return response.status(201).send({
            msg: "Usuário Criado com Sucesso!",
        });
    }
    catch (error) {
        console.error("Erro ao criar usuário:", error); // Adicione um log para depuração
        return response.status(500).send({ error: error instanceof Error ? error.message : String(error) });
    }
});
userRouter.delete("/:search", async (request, response) => {
    try {
        await users_controller_1.deleteUserController.execute(request.params.search);
        return response.status(200).send({
            msg: "Usuário Deletado com Sucesso",
        });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
userRouter.put("/address", async (request, response) => {
    try {
        const { id, newAddress } = request.body;
        await users_controller_1.updateAddresController.execute(id, newAddress);
        return response.status(200).send({
            msg: "Success!",
        });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
userRouter.put("/personal", async (request, response) => {
    try {
        const { id, newPersonalData } = request.body;
        await users_controller_1.updatePersonalDataController.execute(id, newPersonalData);
        return response.status(200).send({
            msg: "Success!",
        });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
userRouter.put("/email", async (request, response) => {
    try {
        const { id, newEmail } = request.body;
        await users_controller_1.updateEmailController.execute(id, newEmail);
        return response.status(200).send({
            msg: "Success!",
        });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
userRouter.put("/password", async (request, response) => {
    try {
        const { id, newPassword } = request.body;
        await users_controller_1.updatePasswordController.execute(id, newPassword);
        return response.status(200).send({
            msg: "Success!",
        });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
userRouter.put("/cart", async (request, response) => {
    try {
        const { token, items } = request.body;
        console.log(items);
        await users_controller_1.updateCartController.execute(token, items);
        return response.status(200).send({
            msg: "Carrinho Atualizado com Sucesso!",
        });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
exports.default = userRouter;
