import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message,
  });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
