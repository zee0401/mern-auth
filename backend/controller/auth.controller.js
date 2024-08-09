import bcrypt from "bcryptjs";
import { User } from "../model/user.model.js";

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

    const verificationToken = await generateToken();

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      ...newUser,
      password: undefined,
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
