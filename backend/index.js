import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import listingRouter from "./routes/listing.route.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "development" ? "http://localhost:5173" : true,
  })
);
app.use(cookieParser());

//routers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message,
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(3000, () => console.log("Server is running on port 3000"));
