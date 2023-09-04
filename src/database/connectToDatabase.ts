import mongoose from "mongoose";

const connectToDatabase = async (mongoDbUrl: string) => {
  mongoose.set("debug", true);

  await mongoose.connect(mongoDbUrl);
};

export default connectToDatabase;
