import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError";
import endpointNotFound from "./endpointNotFound";

describe("Given an endpointNotFound middleware", () => {
  describe("When it receives a next function", () => {
    test("Then the next function should be called with 'Endpoint not found'", () => {
      const req: Partial<Request> = {};
      const res: Partial<Response> = {};
      const next: NextFunction = jest.fn();
      const expectedCustomError = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found",
      );

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
