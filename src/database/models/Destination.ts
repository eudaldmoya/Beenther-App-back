import { Schema, model } from "mongoose";

const destinationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  hImageUrl: {
    type: String,
    required: true,
  },
  vImageUrl: {
    type: String,
    required: true,
  },
  isVisited: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Destination = model("Destination", destinationSchema, "destinations");

export default Destination;
