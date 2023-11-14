import { type Request } from "express";
import { type ReceivedDestination } from "../types";

export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
  uid?: string;
}

export interface AuthRequestWithBody
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    ReceivedDestination
  > {
  userId?: string;
}

export interface AuthRequestWithBooleanBody
  extends Request<Record<string, unknown>, Record<string, unknown>, string> {
  userId?: string;
}
