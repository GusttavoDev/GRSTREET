import { Router } from "express";
import userRouter from "./users-routes";
import productsRouter from "./products-routes";
import colorRouter from "./color-routes";
import categoryRouter from "./categories-routes";
import subCategoryRouter from "./subcategories-routes";
import purchaseRouter from "./purchases-routes";
import reviewRouter from "./review-routes";
import adminRouter from "./admins-routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/products", productsRouter);
routes.use("/colors", colorRouter);
routes.use("/categories", categoryRouter);
routes.use("/subCategories", subCategoryRouter);
routes.use("/purchases", purchaseRouter);
routes.use("/review", reviewRouter);
routes.use("/admins", adminRouter);

export { routes };