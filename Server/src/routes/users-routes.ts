import { Router, Request, Response } from "express";

import { 
    authenticateUserController, 
    createUserController, 
    deleteUserController, 
    getUserController, 
    listUsersController, 
    updateAddresController,
    updateEmailController,
    updatePasswordController,
    updatePersonalDataController
} from "../controllers/users-controller";

import IUser from "../entities/IUser";

const userRouter = Router();

userRouter.post("/auth", async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const token = await authenticateUserController.execute(email, password);
        return response.status(200).send({
            token
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.get("/", async (request: Request, response: Response) => {
    try {
        const data = await listUsersController.execute();
        return response.status(200).send(data);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        const data = await getUserController.execute(Number(request.params.id));
        return response.status(200).send(data);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { header, addres, personal_data, purchases, cart }: IUser = request.body;
        await createUserController.execute({
            header,
            addres,
            personal_data,
            purchases,
            cart
        });
        return response.status(201).send({
            msg: "Usuário Criado com Sucesso!",
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.delete("/:search", async (request: Request, response: Response) => {
    try {
        await deleteUserController.execute(request.params.search);
        return response.status(200).send({
            msg: "Usuário Deletado com Sucesso",
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.put("/address", async (request: Request, response: Response) => {
    try {
        const { token, newAddress }: { token: string, newAddress: Partial<IUser['addres']> } = request.body;
        await updateAddresController.execute(token, newAddress);
        return response.status(200).send({
            msg: "Sucess!",
        })
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.put("/personal", async (request: Request, response: Response) => {
    try {
        const { token, newPersonalData }: { token: string, newPersonalData: Partial<IUser['personal_data']> } = request.body;
        await updatePersonalDataController.execute(token, newPersonalData);
        return response.status(200).send({
            msg: "Sucess!",
        })
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.put("/email", async (request: Request, response: Response) => {
    try {
        const { token, newEmail }: { token: string, newEmail: string } = request.body;
        await updateEmailController.execute(token, newEmail);
        return response.status(200).send({
            msg: "Sucess!"
        })
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.put("/passoword", async (request: Request, response: Response) => {
    try {
        const { token, newPassword }: { token: string, newPassword: string } = request.body;
        await updatePasswordController.execute(token, newPassword);
        return response.status(200).send({
            msg: "Sucess!",
        })
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default userRouter;
