import express from "express";
import { getDestinations } from "../controllers/destinations/destinationsControllers.js";
import { root } from "../utils/paths.js";

const destinationsRouter = express.Router();

destinationsRouter.get(root, getDestinations);

export default destinationsRouter;
