import express from "express";
import {
  signupController,
  signinController,
  logoutController,
  verifyEmailController,
  forgotPasswordController,
  resetPasswordController,
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get("/check-auth", verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Checking auth",
  });
});

router.post("/signup", signupController);
router.post("/login", signinController);
router.post("/logout", logoutController);

router.post("/verify-email", verifyEmailController);

router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);
export default router;
