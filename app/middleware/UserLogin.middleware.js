import { asyncHandler } from "../utils/AsyncHandler.js";
import { Users } from "../models/User.model.js";
import bcrypt from "bcryptjs";

const userLoginSet = asyncHandler(async (req, res, next) => {
  const { email, password } = await req.body;

  if ([email, password].some((field) => !field || field === "")) {
    return res
      .status(400)
      .json({ message: "All fields are required.", success: false });
  }

  const userAccount = await Users.findOne({ email: email });

  if (!userAccount) {
    return res
      .status(400)
      .json({ success: false, message: "User email not founded." });
  }

  const isCorrectPass = await bcrypt.compare(userAccount.password, password);

  if (isCorrectPass) {
    next();
    return res
      .status(200)
      .json({ success: true, message: "User login successfull" });
  }
  return res
    .status(400)
    .json({ success: false, message: "Something went wrong." });
});

export default userLoginSet;
