import { Goal } from "../models/goal.model.js";

//create goal controller
export const createGoal = async (req, res) => {
  try {
    const { goal } = req.body;

    if (!goal) {
      return res.status(400).json({ message: "fill the field" });
    }
    const newGoal = new Goal({
      userId: req.user._id,
      goal,
    });
    await newGoal.save();
    if (newGoal) {
      return res
        .status(201)
        .json({ goal: newGoal, message: "new goal created " });
    } else {
      return res.status(401).json({ message: "goal cannot be created" });
    }
  } catch (error) {
    console.log("create goal error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

//get goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });
    return res.status(200).json(goals);
  } catch (error) {
    console.log("get goals error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

//delete goal
export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedGoal = await Goal.findByIdAndDelete(id);
    res.status(200).json({ goal: deletedGoal, message: "goal deleted" });
  } catch (error) {
    console.log("delete goal error", error);
    res.status(500).json({ message: "internal server error" });
  }
};
