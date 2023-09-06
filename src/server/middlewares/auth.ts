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
    console.log(req);

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("Unauthorized", 401, "No token provided");

      next(error);
      return;
    }

    const { uid } = await admin.auth(firebaseApp).verifyIdToken(token);

    const user = await User.findOne<UserStructure>({
      authId: uid,
    }).exec();

    req.userId = user?._id;

    next();
  } catch (error) {
    const customError = new CustomError(
      "Invalid token",
      403,
      (error as Error).message,
    );

    next(customError);
  }
};

export default authMiddleware;
