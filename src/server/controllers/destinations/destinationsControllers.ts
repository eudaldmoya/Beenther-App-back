import { type NextFunction, type Request, type Response } from "express";
import Destination from "../../../database/models/Destination";
import CustomError from "../../CustomError/CustomError";
import { type UserStructure, type DestinationStructure } from "../../../types";

export const getDestinations = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Partial<UserStructure>
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { _id } = req.body;

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
