import { Router } from "express";
import {
  bookAppointment,
  handleLogin,
  handleRegister,
  handleUserUpdate,
} from "../controllers/User.controllers.js";
import userLoginSet from "../middleware/UserLogin.middleware.js";

const userRouter = Router();

userRouter
  .post("/register", handleRegister)
  .post("/login", userLoginSet, handleLogin)
  .post("/update", handleUserUpdate)
  .post("/book", bookAppointment);

export default userRouter;
