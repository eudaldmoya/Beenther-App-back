import cors from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController/pingController.js";
import endpointNotFound, { generalErrorHandler } from "./middlewares/errors.js";
import destinationsRouter from "./routers/destinationsRouter.js";
import authMiddleware from "./middlewares/auth.js";

const corsConfig = {
  origin: [process.env.ALLOW_ORIGIN_PROD!, process.env.ALLOW_ORIGIN_LOCAL!],
};

const app = express();
app.disable("x-powered-by");

app.use(cors(corsConfig));

app.use(morgan("dev"));
app.use(express.json());

app.get("/", pingController);

app.use("/destinations", authMiddleware, destinationsRouter);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
