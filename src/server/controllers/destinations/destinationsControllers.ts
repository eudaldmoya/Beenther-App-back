import { type NextFunction, type Request, type Response } from "express";
import Destination from "../../../database/models/Destination";
import CustomError from "../../CustomError/CustomError";

export const getDestinations = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const destinations = await Destination.find().exec();

    res.status(200).json({ destinations });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Could not retrieve destinations",
      404,
      (error as Error).message,
    );

    next(customError);
  }
};
