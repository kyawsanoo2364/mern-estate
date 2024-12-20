import express from "express";
import {
  GoogleAuth,
  SignIn,
  SignOut,
  Signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);
router.post("/google", GoogleAuth);
router.get("/signout", SignOut);

export default router;
