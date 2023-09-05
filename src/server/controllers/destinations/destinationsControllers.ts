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
      "Could not retrieve the destinations",
      404,
      (error as Error).message,
    );

    next(customError);
  }
};
