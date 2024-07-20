import { Router } from "express";

import { createUserUseCase } from "../controllers/users-controller";

const userRouter = Router();

userRouter.get("/", (request, response) => {
    return response.status(200).send("users");
})

userRouter.get("/criar", async (request, response) => {
    try {
        await createUserUseCase.execute();
        return response.status(200).send("foi");
    } catch {
        return response.status(400).send("error");
    }
})

export default userRouter