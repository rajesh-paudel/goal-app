import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import { connectDB } from "./utils/db.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

//middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoutes);

app.listen(PORT, () => {
  console.log(`app listining at port ${PORT}`);
  connectDB();
});
