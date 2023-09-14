import mongoose from "mongoose";
import { type ReceivedDestination, type DestinationStructure } from "../types";

export const mongooseIdMock = new mongoose.Types.ObjectId().toString();
export const mongooseIdMockD1 = new mongoose.Types.ObjectId().toString();
export const mongooseIdMockD2 = new mongoose.Types.ObjectId().toString();

export const destinationsMock: DestinationStructure[] = [
  {
    _id: mongooseIdMockD1,
    name: "Lake Louise",
    description:
      "Lake Louise (named Ho-run-num-nay (Lake of the Little Fishes) by the Stoney Nakota First Nations people) is a glacial lake within Banff National Park in Alberta, Canada. Situated 11 km east of the border with British Columbia, Lake Louise is located 5 km west of the hamlet of Lake Louise and the Trans-Canada Highway. Lake Louise is named after the Princess Louise Caroline Alberta (1848–1939), the fourth daughter of Queen Victoria and the wife of the Marquess of Lorne, who was the Governor General of Canada from 1878 to 1883",
    location: "Alberta",
    country: "Canada",
    horizontalImageUrl: "himage.png",
    verticalImageUrl: "vimage.png",
    isVisited: false,
    user: mongooseIdMock,
    __v: 0,
  },
  {
    _id: mongooseIdMockD2,
    name: "Angkor Wat",
    description:
      "Angkor Wat, also sometimes written Angkor Vat, is the largest and also the best preserved Hindu temple that makes up the Angkor settlement. It is considered the largest religious structure ever built, and one of the most important archaeological treasures in the world.",
    location: "Siem Reap",
    country: "Cambodia",
    horizontalImageUrl: "himage.png",
    verticalImageUrl: "vimage.png",
    isVisited: false,
    user: new mongoose.Types.ObjectId().toString(),
    __v: 0,
  },
];

export const receivedDestinationMock: ReceivedDestination = {
  name: "Angkor Wat",
  description:
    "Angkor Wat, also sometimes written Angkor Vat, is the largest and also the best preserved Hindu temple that makes up the Angkor settlement. It is considered the largest religious structure ever built, and one of the most important archaeological treasures in the world.",
  location: "Siem Reap",
  country: "Cambodia",
  horizontalImageUrl: "himage.png",
  verticalImageUrl: "vimage.png",
  isVisited: false,
};

export const newDestinationMock: DestinationStructure = {
  _id: mongooseIdMockD1,
  name: "Angkor Wat",
  description:
    "Angkor Wat, also sometimes written Angkor Vat, is the largest and also the best preserved Hindu temple that makes up the Angkor settlement. It is considered the largest religious structure ever built, and one of the most important archaeological treasures in the world.",
  location: "Siem Reap",
  country: "Cambodia",
  horizontalImageUrl: "himage.png",
  verticalImageUrl: "vimage.png",
  isVisited: false,
  user: mongooseIdMock,
  __v: 0,
};
