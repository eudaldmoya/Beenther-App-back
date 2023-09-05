import express from "express";
import { getDestinations } from "../controllers/destinations/destinationsControllers.js";

const destinationsRouter = express.Router();

destinationsRouter.get("/", getDestinations);

export default destinationsRouter;
