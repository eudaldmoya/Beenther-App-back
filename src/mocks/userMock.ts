import { type UserStructure } from "../types";
import { mongooseIdMock } from "./destinationsMock";

export const authIdMock = "authId";

export const userMock: UserStructure = {
  _id: mongooseIdMock,
  name: "Juan",
  authId: authIdMock,
};
