import express from "express";
import { testUserApi, updateUser } from "../controllers/user.controller.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.get("/test", testUserApi);
router.post("/update/:id", upload.single("imageFile"), VerifyToken, updateUser);

export default router;
