import { Users } from "../models/User.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const handleLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = await req.body;

    if ([email, password].some((field) => !field || field === "")) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }
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

export { handleLogin, handleRegister, handleUserUpdate };
