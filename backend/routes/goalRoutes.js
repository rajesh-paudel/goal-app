import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goal.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/createGoal", protectRoute, createGoal);
router.get("/getGoals", protectRoute, getGoals);
router.put("/updateGoal/:id", protectRoute, updateGoal);
router.delete("/deleteGoal/:id", protectRoute, deleteGoal);

export default router;
