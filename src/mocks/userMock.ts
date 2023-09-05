import { type UserStructure } from "../types";
import { mongooseIdMock } from "./destinationsMock";
import mongoose from "mongoose";

export const authIdMock = new mongoose.Types.ObjectId().toString();

export const userMock: UserStructure = {
  _id: mongooseIdMock,
  name: "Juan",
  authId: authIdMock,
};
