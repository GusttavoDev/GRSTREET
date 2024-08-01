import { Router } from "express";
import userRouter from "./users-routes";
import productsRouter from "./products-routes";
import colorRouter from "./color-routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/products", productsRouter);
routes.use("/colors", colorRouter);

export { routes };