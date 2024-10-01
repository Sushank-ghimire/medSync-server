import { asyncHandler } from "../utils/AsyncHandler.js";
import { Doctor } from "../models/Doctor.models.js";
import bcrypt from "bcryptjs";

const doctorLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctorInDb = await Doctor.findOne({ email: email });
    if (doctorInDb) {
      const isCorrectPass = await bcrypt.compare(password, doctorInDb.password);
      if (isCorrectPass) {
        return res
          .status(200)
          .json({ success: true, message: "Doctor login successfull." });
      }
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }
    return res
      .status(400)
      .json({ success: false, message: "Doctor not founded." });
  } catch (error) {
    console.log("Error in doctor login : ", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Server error on doctor login",
      });
  }
});

export { doctorLogin };
