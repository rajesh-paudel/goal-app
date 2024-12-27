import mongoose from "mongoose";
const goalSchema = mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const Goal = mongoose.model("Goal", goalSchema);
