import { type Request } from "express";

export interface AuthRequest extends Request {
  authId: string;
}
