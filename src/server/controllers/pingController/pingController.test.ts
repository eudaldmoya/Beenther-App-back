import { type Request, type Response } from "express";
import pingController from "./pingController";

describe("Given a pingController controller", () => {
  describe("When it receives a request and a response", () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should respond with status 200", () => {
      const expectedStatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the json method of the response should be called with 'pong :)'", () => {
      const expectedMessage = "pong :)";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
