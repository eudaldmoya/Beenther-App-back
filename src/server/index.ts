import express from "express";
import morgan from "morgan";
import pingController from "./controllers/pingController/pingController.js";

const app = express();
app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());

app.get("/", pingController);

export default app;
