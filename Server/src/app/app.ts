import express from "express";
import cors from "cors";

import { routes } from "../routes/routes";

const app = express();

app.use(express.json());
app.use("/api", routes);
app.use(cors);

export { app };