import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../CustomError/CustomError.js";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("destinations:server:errors");

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const customError = new CustomError(
    "Endpoint not found",
    404,
    "Endpoint not found",
  );

  next(customError);
};

export const generalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  debug(chalk.red(error.message));

  const errorMessage = error.publicMessage ?? "Did not work as planned";
  const errorStatus = error.status ?? 500;

  res.status(errorStatus).json({ error: errorMessage });
};

export default generalErrorHandler;
