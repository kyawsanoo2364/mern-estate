import express from "express";
import { testUserApi } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", testUserApi);

export default router;
