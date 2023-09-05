import { type NextFunction, type Response } from "express";
import Destination from "../../../../database/models/Destination";
import { destinationsMock } from "../../../../mocks/destinationsMock";
import CustomError from "../../../CustomError/CustomError";
import { type AuthRequest } from "../../../types";
import { getDestinations } from "../destinationsControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getDestinations controller", () => {
  const req: Partial<AuthRequest> = {
    body: {
      _id: "",
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  Destination.find = jest.fn().mockReturnValue({
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(destinationsMock),
  });

  describe("When it receives a response with a list of destinations and a next function", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatusCode = 200;

      await getDestinations(req as AuthRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the json method of the response should be called with the list of destinations", async () => {
      await getDestinations(req as AuthRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ destinations: destinationsMock });
    });
  });

  describe("When it receives a response with a status mehtod that rejects and a next function", () => {
    test("Then the next function should be called with error 'Could not retrieve the destinations'", async () => {
      const expectedErrorMessage = "Could not retrieve the destinations";
      const customError = new CustomError(
        expectedErrorMessage,
        404,
        expectedErrorMessage,
      );
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await getDestinations(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
