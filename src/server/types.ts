import { type Request } from "express";
import { type ReceivedDestination } from "../types";

export interface AuthRequest extends Request {
  userId?: string;
}

export interface AuthRequestWithBody
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    ReceivedDestination
  > {
  userId?: string;
}
