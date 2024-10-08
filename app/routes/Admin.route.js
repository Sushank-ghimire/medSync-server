import express from "express";
import {
  addDoctors,
  adminLogin,
  adminLogout,
  allDoctors,
  changeDoctorAvialablity,
} from "../controllers/Admin.controller.js";
import { upload } from "../middleware/multer.js";
import adminAuthMiddleware from "../middleware/AdminAuth.middleware.js";

const adminRouter = express.Router();

adminRouter
  .post("/addDoctors", adminAuthMiddleware, upload.single("image"), addDoctors)
  .post("/login", adminLogin)
  .post("/getDoctors", adminAuthMiddleware, allDoctors)
  .delete("/logout", adminLogout)
  .post("/change-avilable", changeDoctorAvialablity);

export default adminRouter;
