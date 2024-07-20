import { Router, Request, Response } from "express";

import { 
    authenticateUserUseCase, 
    createUserUseCase, 
    deleteUserUseCase, 
    getUserUseCase, 
    listUsersUseCase, 
    updateAddresUseCase,
    updateEmailUseCase,
    updatePasswordUseCase,
    updatePersonalDataUseCase
} from "../controllers/users-controller";

import IUser from "../entities/IUser";

const userRouter = Router();

userRouter.post("/auth", async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;
        const token = await authenticateUserUseCase.execute(email, password);
        return response.status(200).send({
            token
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.get("/", async (request: Request, response: Response) => {
    try {
        const data = await listUsersUseCase.execute();
        return response.status(200).send(data);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.get("/:id", async (request: Request, response: Response) => {
    try {
        const data = await getUserUseCase.execute(Number(request.params.id));
        return response.status(200).send(data);
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.post("/", async (request: Request, response: Response) => {
    try {
        const { header, addres, personal_data, purchases }: IUser = request.body;
        await createUserUseCase.execute({
            header,
            addres,
            personal_data,
            purchases
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
        await deleteUserUseCase.execute(request.params.search);
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
        await updateAddresUseCase.execute(token, newAddress);
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
        await updatePersonalDataUseCase.execute(token, newPersonalData);
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
        await updateEmailUseCase.execute(token, newEmail);
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
        await updatePasswordUseCase.execute(token, newPassword);
        return response.status(200).send({
            msg: "Sucess!",
        })
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

export default userRouter;
