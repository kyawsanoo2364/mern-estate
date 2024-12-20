import express from "express";
import {
  createListing,
  deleteListing,
} from "../controllers/listing.controller.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/create", VerifyToken, upload.array("images", 6), createListing);
router.delete("/delete/:id", VerifyToken, deleteListing);

export default router;
