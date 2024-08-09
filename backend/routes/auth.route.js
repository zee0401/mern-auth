import express from "express";

const router = express.Router();

router.post("/signup", singnupController);
router.post("/login", signinController);
router.post("/logout", logoutController);

export default router;
