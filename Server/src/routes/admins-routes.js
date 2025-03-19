"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admins_controller_1 = require("../controllers/admins-controller");
const adminRouter = (0, express_1.Router)();
adminRouter.post("/auth", async (request, response) => {
    try {
        const { email, password } = request.body;
        const token = await admins_controller_1.authenticateAdminController.execute(email, password);
        return response.status(200).send({ token });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
adminRouter.post("/", async (request, response) => {
    try {
        const { email, name, password, storeLogo, storeName } = request.body;
        await admins_controller_1.createAdminController.execute({ email, name, password, storeLogo, storeName });
        return response.status(201).send({ msg: "Administrador criado com sucesso!" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
adminRouter.get("/:id", async (request, response) => {
    try {
        const admin = await admins_controller_1.getAdminController.execute(request.params.id);
        return response.status(200).send(admin);
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
adminRouter.delete("/:token", async (request, response) => {
    try {
        await admins_controller_1.deleteAdminController.execute(request.params.token);
        return response.status(200).send({ msg: "Administrador deletado com sucesso" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
adminRouter.put("/email", async (request, response) => {
    try {
        const { token, newEmail } = request.body;
        await admins_controller_1.updateAdminEmailController.execute(token, newEmail);
        return response.status(200).send({ msg: "Email atualizado com sucesso!" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
adminRouter.put("/password", async (request, response) => {
    try {
        const { token, newPassword } = request.body;
        await admins_controller_1.updateAdminPasswordController.execute(token, newPassword);
        return response.status(200).send({ msg: "Senha atualizada com sucesso!" });
    }
    catch (error) {
        return response.status(500).send({ error: String(error) });
    }
});
exports.default = adminRouter;
