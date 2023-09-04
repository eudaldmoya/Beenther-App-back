import { type Schema } from "mongoose";
export interface DestinationStructure {
  _id: string;
  name: string;
  description: string;
  location: string;
  country: string;
  hImageUrl: string;
  vImageUrl: string;
  isVisited: boolean;
  user: Schema.Types.ObjectId;
}

export interface UserStructure {
  _id: string;
  name: string;
  authId: string;
}
