import mongoose from "mongoose";
const goalSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    goal: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Goal = mongoose.model("Goal", goalSchema);
