import express from "express";
import {
  signupController,
  signinController,
  logoutController,
} from "../controller/auth.controller.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", signinController);
router.post("/logout", logoutController);

export default router;
