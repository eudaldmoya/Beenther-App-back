import { type NextFunction, type Response, type Request } from "express";
import CustomError from "../CustomError/CustomError.js";
import admin from "firebase-admin";
import firebaseApp from "../../firebase.js";
import User from "../../database/models/User.js";
import { type UserStructure } from "../../types.js";

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
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

    req.body = {
      _id: user?._id,
    };

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
