import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";
import { generalErrorHandler } from "../errors";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a generalErrorHandler controller", () => {
  const expectedStatus = 404;
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives an error, and a response", () => {
    const customError = new CustomError(
      "Endpoint not found",
      404,
      "Endpoint not found",
    );

    test("Then it should respond with status 404", () => {
      generalErrorHandler(customError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then the json method of the respond should be called with 'Endpoint not found'", () => {
      generalErrorHandler(customError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: customError.message });
    });
  });

  describe("When it receives an error with no message and no status and a response", () => {
    const error = new Error();

    test("Then it should respond with status 500", () => {
      const expectedStatus = 500;

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then the json method of the response should be called with 'Did not work as planned'", () => {
      const expectedErrorMessage = "Did not work as planned";

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
