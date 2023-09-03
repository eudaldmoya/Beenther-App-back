import chalk from "chalk";
import debug from "debug";
import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../CustomError/CustomError.js";

const generalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  debug(chalk.red(error.message));

  const errorMessage = error.message || "Did not work as planned";
  const errorStatus = error.status || 500;

  res.status(errorStatus).json({ error: errorMessage });
};

export default generalErrorHandler;
