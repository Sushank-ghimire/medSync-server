import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { v2 as cloudinary } from "cloudinary";
import { Doctor } from "../models/Doctor.models.js";
import jwt from "jsonwebtoken";

const addDoctors = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      speciality,
      degree,
      experience,
      about,
      fees,
      password,
    } = req.body;

    const dbDoctor = await Doctor.findOne({ email: email });

    if (dbDoctor) {
      return res.status(200).json({
        success: false,
        message: "Doctor already added with same email.",
      });
    }

    const imageFile = req.file;

    // Check if all required fields are present
    if (
      [name, email, speciality, degree, experience, about, password].some(
        (field) => !field || field === ""
      )
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    let imageUpload;

    if (!imageFile) {
      image = "";
    } else {
      imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
    }

    let parsedAddress;
    try {
      parsedAddress =
        typeof address === "string" ? JSON.parse(address) : address;
    } catch (err) {
      return res.status(400).json({
        message: "Invalid address format. Make sure it's a valid JSON string.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const imageUrl = imageUpload.secure_url || "";

    const doctorData = await Doctor.create({
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress, // Use the parsed address
    });

    if (doctorData) {
      return res.status(201).json({
        message: "Doctor added to database.",
        doctor: doctorData,
        success: true,
      });
    }

    return res.status(500).json({
      message: "Failed to add doctor to the database.",
      success: false,
    });
  } catch (error) {
    console.error("Error on admin addDoctor : ", error.message);
    return res
      .status(500)
      .json({ message: "Error while adding doctor", success: false });
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminCredentials = {
      email: `${process.env.ADMIN_EMAIL}`,
      password: `${process.env.ADMIN_KEY}`,
      jwtSecret: `${process.env.ADMIN_TOKEN_SECRET}`,
    };

    if (
      adminCredentials.email === email &&
      adminCredentials.password === password
    ) {
      const token = await jwt.sign(
        { email: adminCredentials.email, password: adminCredentials.password },
        adminCredentials.jwtSecret
      );
      return res.status(200).json({
        success: true,
        message: "Admin successfully logged in",
        token: token,
      });
    }
    return res
      .status(401)
      .json({ message: "Invalid user credentails.", success: false });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `Error occured : ${error.message}` });
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export { addDoctors, adminLogin, adminLogout };
