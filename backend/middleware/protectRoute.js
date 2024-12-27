import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "user unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "invalid token" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.json(404).json({ message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("protectRoute error", error);
    res.status(500).json({ message: "internal server error" });
  }
};
