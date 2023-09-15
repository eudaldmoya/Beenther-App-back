import { type NextFunction, type Response } from "express";

import Destination from "../../../database/models/Destination.js";
import { type DestinationStructure } from "../../../types.js";
import CustomError from "../../CustomError/CustomError.js";
import { type AuthRequest, type AuthRequestWithBody } from "../../types.js";

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

    await Destination.findByIdAndDelete(destinationId).exec();

    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Could not delete the destination",
    );

    next(customError);
  }
};

export const addDestination = async (
  req: AuthRequestWithBody,
  res: Response,
  next: NextFunction,
) => {
  try {
    const destination = req.body;
    const _id = req.userId;

    const newDestination = await Destination.create({
      ...destination,
      user: _id,
    });

    res.status(201).json({ destination: newDestination });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Could not create the destination",
    );

    next(customError);
  }
};

export const getDestinationById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { destinationId } = req.params;

    const destination = await Destination.findById<DestinationStructure[]>({
      _id: destinationId,
    }).exec();

    res.status(200).json({ destination });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Could not retrieve the destination",
    );

    next(customError);
  }
};

export const modifyDestination = async (
  req: AuthRequestWithBody,
  res: Response,
  next: NextFunction,
) => {
  try {
    const destination = req.body;
    const { destinationId } = req.params;

    const modifiedDestination = await Destination.findByIdAndUpdate(
      destinationId,
      {
        isVisited: !destination.isVisited,
      },
    );

    res.status(204).json({ destination: modifiedDestination });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Could not update the destination",
    );

    next(customError);
  }
};
