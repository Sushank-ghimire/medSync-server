import { Users } from "../models/User.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

const handleLogin = asyncHandler(async (req, res) => {
  try {
    const userEmail = req.body.email;

    const token = await jwt.sign(userEmail, process.env.USER_TOKEN_KEY, {
      expiresIn: "2d",
    });

    res.cookie("userAuth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      maxAge: 60 * 60 * 24 * 2 * 1000,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
});

const handleRegister = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = await req.body;

    const userCheck = await Users.findOne({ email: email });

    if (userCheck) {
      return res
        .status(400)
        .json({ message: "Email is already used.", success: false });
    }

    if ([name, email, password].some((field) => !field || field === "")) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    const user = await Users.create({ email, password, name });

    if (user) {
      return res.status(201).json({
        message: "Account creaded successfully.",
        success: true,
        user: user,
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
});

const handleUserUpdate = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error.", success: false });
  }
});

const bookAppointment = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to book appointment" });
  }
});

export { handleLogin, handleRegister, handleUserUpdate, bookAppointment };
