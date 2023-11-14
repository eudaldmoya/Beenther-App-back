import { type NextFunction, type Response } from "express";
import admin from "firebase-admin";
import User from "../../database/models/User.js";
import firebaseApp from "../../firebase.js";
import { type UserStructure } from "../../types.js";
import CustomError from "../CustomError/CustomError.js";
import { type AuthRequest } from "../types.js";

const authMiddleware = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("No token provided", 401, "Unauthorized");

      next(error);
      return;
    }

    const { uid, email } = await admin.auth(firebaseApp).verifyIdToken(token);

    const user = await User.findOne<UserStructure>({
      authId: uid,
    }).exec();

    if (!user) {
      const newUser = await User.create({
        name: email,
        authId: uid,
      });
      req.userId = newUser._id;

      next();
      return;
    }

    req.userId = user?._id;

    next();
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      403,
      "Invalid token",
    );

    next(customError);
  }
};

export default authMiddleware;
