import { type NextFunction, type Response } from "express";
import Destination from "../../../../database/models/Destination";
import {
  mongooseIdMockD1,
  newDestinationMock,
} from "../../../../mocks/destinationsMock";
import CustomError from "../../../CustomError/CustomError";
import { type AuthRequest } from "../../../types";
import { getDestinationById } from "../destinationsControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getDestinationById controller", () => {
  const req: Partial<AuthRequest> = {
    params: {
      destinationId: mongooseIdMockD1,
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  Destination.findById = jest.fn().mockReturnValue({
    limit: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue(newDestinationMock),
  });

  describe("when it receives a request with a destinationId: mongooseIdMockD1, a response and a next function", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatusCode = 200;

      await getDestinationById(req as AuthRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the json method of the response should be called with the destination with id mongooseIdMockD1", async () => {
      await getDestinationById(req as AuthRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        destination: newDestinationMock,
      });
    });
  });

  describe("When it receives a response with a status method that rejects and a next function", () => {
    test("Then the next function should be called with error 'Could not retrieve the destination'", async () => {
      const expectedErrorMessage =
        "Cannot read properties of undefined (reading 'json')";
      const customError = new CustomError(
        expectedErrorMessage,
        404,
        expectedErrorMessage,
      );
      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await getDestinationById(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
