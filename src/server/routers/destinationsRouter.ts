import cors from "cors";
import express from "express";
import { getDestinations } from "../controllers/destinations/destinationsControllers.js";

const corsOptions = {
  origin: [process.env.ALLOW_ORIGIN_PROD!, process.env.ALLOW_ORIGIN_LOCAL!],
};

const destinationsRouter = express.Router();

destinationsRouter.get("/", cors(corsOptions), getDestinations);

export default destinationsRouter;
