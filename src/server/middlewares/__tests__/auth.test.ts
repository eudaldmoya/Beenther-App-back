import { type NextFunction, type Request, type Response } from "express";
import admin from "firebase-admin";
import authMiddleware from "../auth";
import CustomError from "../../CustomError/CustomError";
import User from "../../../database/models/User";
import mongoose from "mongoose";
import { type UserStructure } from "../../../types";

jest.mock("firebase-admin");

beforeEach(() => {
  jest.clearAllMocks();
});

const token = {
  _id: "token",
};

describe("Given an auth middleware", () => {
  const res: Partial<Response> = {};
  const next: NextFunction = jest.fn();
  describe("When it receives a request with a valid token, a response and a next function", () => {
    test("Then it should call the function next", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("token"),
      };

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      const id = new mongoose.Types.ObjectId().toString();

      const user: UserStructure = {
        _id: id,
        authId: token._id,
        name: "Pablo",
      };

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(user),
      });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a request with no token, a response and a next function", () => {
    test("Then it should call the function next with error 'Unauthorized'", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(undefined),
      };
      const customError = new CustomError(
        "Unauthorized",
        401,
        "No token provided",
      );

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockResolvedValue(token),
      });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });

  describe("When it receives a request with an invalid token, a response and a next function", () => {
    test("Then it should call the function next with error 'Invalid token'", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("token"),
      };

      const error = new Error("Invalid token");

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockRejectedValue(token),
      });

      await authMiddleware(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(error as CustomError);
    });
  });
});