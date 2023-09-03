import express from "express";
import pingController from "./controllers/pingController/pingController.js";

const app = express();
app.disable("x-powered-by");

app.get("/", pingController);

export default app;
