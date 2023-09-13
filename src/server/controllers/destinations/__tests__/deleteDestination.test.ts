import { type NextFunction, type Request, type Response } from "express";
import Destination from "../../../../database/models/Destination";
import { mongooseIdMockD1 } from "../../../../mocks/destinationsMock";
import { deleteDestination } from "../destinationsControllers";

describe("Given a getDestinations controller", () => {
  const req: Partial<Request> = {
    params: {
      destinationId: mongooseIdMockD1,
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("when it receives a request with a destinationId: mongooseIdMockD1, a response and a next function", () => {
    test("Then it should respond with status 200", async () => {
      const expectedStatusCode = 200;

      Destination.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await deleteDestination(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("when it receives a request with a destinationId: mongooseIdMockD1, a response and a next function", () => {
    test("Then the response json method should be called with 'Destination deleted successfully'", async () => {
      const expectedMessage = "Destination deleted successfully";

      Destination.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn(),
      });

      await deleteDestination(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("when it receives a request without a destinationId, a response and a next function", () => {
    test("Then the next function should be called with 'Could not delete the destination'", async () => {
      const error = new Error();

      Destination.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue({}),
      });

      await deleteDestination(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
