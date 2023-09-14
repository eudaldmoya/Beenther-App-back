import express from "express";
import {
  addDestination,
  deleteDestination,
  getDestinationById,
  getDestinations,
} from "../controllers/destinations/destinationsControllers.js";
import { paths } from "../paths/paths.js";

const destinationsRouter = express.Router();

destinationsRouter.get(paths.root, getDestinations);
destinationsRouter.get(paths.idToRetrieve, getDestinationById);
destinationsRouter.delete(paths.idToDelete, deleteDestination);
destinationsRouter.post(paths.root, addDestination);

export default destinationsRouter;
