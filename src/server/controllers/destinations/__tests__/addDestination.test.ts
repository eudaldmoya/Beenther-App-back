import { type Request, type Response, type NextFunction } from "express";
import { type AuthRequestWithBody } from "../../../types";
import {
  mongooseIdMock,
  mongooseIdMockD1,
  newDestinationMock,
  receivedDestinationMock,
} from "../../../../mocks/destinationsMock";
import { addDestination } from "../destinationsControllers";
import Destination from "../../../../database/models/Destination";

describe("Given an addDestination controller", () => {
  const req: Partial<AuthRequestWithBody> = {
    body: receivedDestinationMock,
    userId: mongooseIdMock,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();
  describe("When it receives a request with a user id and a destination 'Angkor Wat'", () => {
    Destination.create = jest.fn().mockResolvedValue({
      ...receivedDestinationMock,
      user: mongooseIdMock,
      _id: mongooseIdMockD1,
      __v: 0,
    });

    test("Then it should respond with status 201", async () => {
      const expectedStatusCode = 201;

      await addDestination(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the json method of the response should be called with destination 'Angkor Wat'", async () => {
      await addDestination(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({
        destination: newDestinationMock,
      });
    });
  });

  describe("when it receives a request without a destinationId, a response and a next function", () => {
    test("Then the next function should be called with 'Could not delete the destination'", async () => {
      const error = new Error();

      Destination.create = jest.fn().mockRejectedValue({});

      await addDestination(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
