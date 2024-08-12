import bcrypt from "bcryptjs";
import { User } from "../model/user.model.js";
import { generateTokenandSetCookie } from "../utils/generateTokenamdSetCookie.js";
import { sendVerificationEmail } from "../mailtrap/email.js";

export const signupController = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!email || !name || !password) {
      return res.status(400).json({
        message: "Please provide all the required fields",
      });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      name,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    generateTokenandSetCookie(res, user._id);

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const verifyEmailController = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiry: {
        $gt: Date.now(),
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });

    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const signinController = async (req, res) => {};

export const logoutController = async (req, res) => {};
