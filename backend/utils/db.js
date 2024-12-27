import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "goal-app",
    });
    console.log("mongo DB connected");
  } catch (error) {
    console.log("db connection error", error);
  }
};
