import express from "express";
import {
  deleteUser,
  getUser,
  testUserApi,
  updateUser,
} from "../controllers/user.controller.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import upload from "../utils/upload.js";
import { getUserListings } from "../controllers/listing.controller.js";

const router = express.Router();

router.get("/test", testUserApi);
router.post("/update/:id", upload.single("imageFile"), VerifyToken, updateUser);
router.delete("/delete/:id", VerifyToken, deleteUser);
router.get("/listings/:id", VerifyToken, getUserListings);
router.get("/:id", VerifyToken, getUser);

export default router;
