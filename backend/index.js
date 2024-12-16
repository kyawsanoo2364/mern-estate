import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log(err));

app.listen(3000, () => console.log("Server is running on port 3000"));
