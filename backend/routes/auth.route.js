import express from "express";
import {
  signupController,
  signinController,
  logoutController,
  verifyEmailController,
  forgotPasswordController,
} from "../controller/auth.controller.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", signinController);
router.post("/logout", logoutController);

router.post("/verify-email", verifyEmailController);
router.post("/forgot-password", forgotPasswordController);
export default router;
