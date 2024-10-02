import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { Doctor } from "../models/Doctor.models.js";
import jwt from "jsonwebtoken";

const addDoctors = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      address1,
      speciality,
      degree,
      experience,
      about,
      fees,
      password,
      address2,
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
      [
        name,
        email,
        speciality,
        degree,
        experience,
        about,
        password,
        address1,
        address2,
      ].some((field) => !field || field === "")
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
    const finalAddress1 = address1 || address2;
    const finalAddress2 = address2 || address1;

    const parsedAddress = { line1: finalAddress1, line2: finalAddress2 };

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

    const hashedPassword = await bcrypt.hash(adminCredentials.password, 5);
    if (
      adminCredentials.email === email &&
      adminCredentials.password === password
    ) {
      const token = await jwt.sign(
        { email: adminCredentials.email, password: hashedPassword },
        adminCredentials.jwtSecret,
        { expiresIn: "2d" }
      );

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 24 * 60 * 60 * 1000 * 2,
      });

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

const allDoctors = asyncHandler(async (req, res) => {
  try {
    const doctorList = await Doctor.find().select("-password");
    if (doctorList) {
      return res.status(200).json({
        success: true,
        message: "Doctors founded",
        doctors: doctorList,
      });
    }
    return res.status(200).json({
      success: true,
      message: "There are no added doctors in the database.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

const adminLogout = asyncHandler(async (req, res) => {
  try {
    await res.clearCookie("authToken");

    return res.status(200).json({
      success: true,
      message: "Admin successfully logged out",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to logout user" });
  }
});

const changeDoctorAvialablity = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    const findDoctor = await Doctor.findOne({ email: email });

    if (findDoctor) {
      findDoctor.available = !findDoctor.available;
      await findDoctor.save();
      return res
        .status(200)
        .json({ success: true, message: "Doctor avialablity changed" });
    }
    return res.status(400).json({
      success: false,
      message: "Something went wrong while changing doctor avilability.",
      doctor: findDoctor,
    });
  } catch (error) {
    console.log("Doctor avilabality change error : ", error.message);
    return res.status(400).json({
      success: false,
      message: "Failed to change doctor avilability.",
    });
  }
});

export {
  addDoctors,
  adminLogin,
  allDoctors,
  adminLogout,
  changeDoctorAvialablity,
};
