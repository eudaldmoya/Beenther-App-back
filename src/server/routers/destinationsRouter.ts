import express from "express";
import { getDestinations } from "../controllers/destinations/destinationsControllers.js";
import { paths } from "../paths/paths.js";

const destinationsRouter = express.Router();

destinationsRouter.get(paths.root, getDestinations);

export default destinationsRouter;
