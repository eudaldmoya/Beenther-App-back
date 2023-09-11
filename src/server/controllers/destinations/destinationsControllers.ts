import { type NextFunction, type Response } from "express";
import Destination from "../../../database/models/Destination.js";
import { type DestinationStructure } from "../../../types.js";
import CustomError from "../../CustomError/CustomError.js";
import { type AuthRequest } from "../../types.js";

export const getDestinations = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id = req.userId;

    const destinations = await Destination.find<DestinationStructure[]>({
      user: _id,
    })
      .limit(10)
      .exec();

    res.status(200).json({ destinations });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Could not retrieve the destinations",
    );

    next(customError);
  }
};

export const deleteDestination = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { destinationId } = req.params;

    const { acknowledged } = await Destination.deleteOne({
      _id: destinationId,
    }).exec();

    if (!acknowledged) {
      next(
        new CustomError("Destination not found", 404, "Destination not found"),
      );
      return;
    }

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Could not delete the destination",
    );

    next(customError);
  }
};
