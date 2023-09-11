import express from "express";
import {
  deleteDestination,
  getDestinations,
} from "../controllers/destinations/destinationsControllers.js";
import { paths } from "../paths/paths.js";

const destinationsRouter = express.Router();

destinationsRouter.get(paths.root, getDestinations);
destinationsRouter.delete(paths.idToDelete, deleteDestination);

export default destinationsRouter;
