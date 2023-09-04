import cors from "cors";
import express from "express";
import morgan from "morgan";
import generalErrorHandler from "./controllers/generalErrorHandler/generalErrorHandler.js";
import pingController from "./controllers/pingController/pingController.js";
import endpointNotFound from "./middlewares/endpointNotFound/endpointNotFound.js";

const corsConfig = {
  origin: [process.env.ALLOW_ORIGIN_PROD!, process.env.ALLOW_ORIGIN_LOCAL!],
  methods: "GET,POST",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
app.disable("x-powered-by");

app.use(cors(corsConfig));

app.use(morgan("dev"));
app.use(express.json());

app.get("/", pingController);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
