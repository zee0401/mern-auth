import express from "express";
import {
  signupController,
  signinController,
  logoutController,
  verifyEmailController,
} from "../controller/auth.controller.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/verify-email", verifyEmailController);
router.post("/login", signinController);
router.post("/logout", logoutController);

export default router;
