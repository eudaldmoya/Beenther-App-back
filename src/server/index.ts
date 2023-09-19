import cors from "cors";
import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController/pingController.js";
import authMiddleware from "./middlewares/auth.js";
import endpointNotFound, { generalErrorHandler } from "./middlewares/errors.js";
import { paths } from "./paths/paths.js";
import destinationsRouter from "./routers/destinationsRouter.js";

const corsConfig = {
  origin: [process.env.ALLOW_ORIGIN_PROD!, process.env.ALLOW_ORIGIN_LOCAL!],
};

const app = express();
app.disable("x-powered-by");

app.use(cors(corsConfig));

app.use(morgan("dev"));
app.use(express.json(), express.text());

app.get(paths.root, pingController);

app.use(authMiddleware);

app.use(paths.destinations, destinationsRouter);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
