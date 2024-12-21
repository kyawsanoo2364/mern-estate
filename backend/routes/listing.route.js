import express from "express";
import {
  createListing,
  deleteListing,
  getListings,
  getListingWithId,
  updateListing,
} from "../controllers/listing.controller.js";
import { VerifyToken } from "../middleware/verifyToken.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/create", VerifyToken, upload.array("images", 6), createListing);
router.delete("/delete/:id", VerifyToken, deleteListing);
router.patch("/update/:id", VerifyToken, upload.array("images"), updateListing);
router.get("/get/:id", getListingWithId);
router.get("/get", getListings);

export default router;
