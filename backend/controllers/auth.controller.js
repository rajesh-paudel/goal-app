import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

//signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    generateToken(res, newUser._id);
    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    console.log("signup controller error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

//Login controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    generateToken(res, user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("login controller error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

//logout controller
export const logout = (req, res) => {
  try {
    res
      .cookie("jwt", "", {
        maxAge: 0,
      })
      .status(200)
      .json({ message: "logout successfull" });
  } catch (error) {
    console.log("logout controller error", error);
    res.status(500).json({ message: "internal server error" });
  }
};

//auth check
export const check = (req, res) => {};
