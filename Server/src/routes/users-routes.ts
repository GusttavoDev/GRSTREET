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
    updatePersonalDataController,
    updateCartController
} from "../controllers/users-controller";

import IUser, { CartItem } from "../entities/IUser";

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
        const data = await getUserController.execute(String(request.params.id));
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
        console.error("Erro ao criar usuário:", error);  // Adicione um log para depuração
        return response.status(500).send({ error: error instanceof Error ? error.message : String(error) });
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
        const { id, newAddress }: { id: string, newAddress: Partial<IUser['addres']> } = request.body;
        await updateAddresController.execute(id, newAddress);
        return response.status(200).send({
            msg: "Success!",
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.put("/personal", async (request: Request, response: Response) => {
    try {
        const { id, newPersonalData }: { id: string, newPersonalData: Partial<IUser['personal_data']> } = request.body;
        await updatePersonalDataController.execute(id, newPersonalData);
        return response.status(200).send({
            msg: "Success!",
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.put("/email", async (request: Request, response: Response) => {
    try {
        const { id, newEmail }: { id: string, newEmail: string } = request.body;
        await updateEmailController.execute(id, newEmail);
        return response.status(200).send({
            msg: "Success!",
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});

userRouter.put("/password", async (request: Request, response: Response) => {
    try {
        const { id, newPassword }: { id: string, newPassword: string } = request.body;
        await updatePasswordController.execute(id, newPassword);
        return response.status(200).send({
            msg: "Success!",
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});


userRouter.put("/cart", async (request: Request, response: Response) => {
    try {
        const { token, items }: { token: string, items: CartItem[] } = request.body;
        console.log(items)
        await updateCartController.execute(token, items);
        return response.status(200).send({
            msg: "Carrinho Atualizado com Sucesso!",
        });
    } catch (error: unknown) {
        return response.status(500).send({ error: String(error) });
    }
});


export default userRouter;
