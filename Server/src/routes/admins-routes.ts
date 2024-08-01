import { Router, Request, Response } from "express";

import { 
    authenticateAdminController, 
    createAdminController, 
    deleteAdminController, 
    getAdminController, 
    updateAdminEmailController, 
    updateAdminPasswordController 
} from "../controllers/admins-controller"

const adminRouter = Router();

adminRouter.post("/auth", async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const token = await authenticateAdminController.execute(email, password);
        return response.status(200).send({ token });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

adminRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { email, name, password } = request.body;
        await createAdminController.execute({ email, name, password });
        return response.status(201).send({ msg: "Administrador criado com sucesso!" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

adminRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        const admin = await getAdminController.execute(Number(request.params.id));
        return response.status(200).send(admin);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

adminRouter.delete("/:token", async (request: Request, response: Response) => {
    try {
        await deleteAdminController.execute(request.params.token);
        return response.status(200).send({ msg: "Administrador deletado com sucesso" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

adminRouter.put("/email", async (request: Request, response: Response) => {
    try {
        const { token, newEmail }: { token: string, newEmail: string } = request.body;
        await updateAdminEmailController.execute(token, newEmail);
        return response.status(200).send({ msg: "Email atualizado com sucesso!" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

adminRouter.put("/password", async (request: Request, response: Response) => {
    try {
        const { token, newPassword }: { token: string, newPassword: string } = request.body;
        await updateAdminPasswordController.execute(token, newPassword);
        return response.status(200).send({ msg: "Senha atualizada com sucesso!" });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default adminRouter;
