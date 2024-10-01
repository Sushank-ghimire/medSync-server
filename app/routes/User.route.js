import { Router } from "express";
import {
  handleLogin,
  handleRegister,
  handleUserUpdate,
} from "../controllers/User.controllers.js";

const userRouter = Router();

userRouter
  .post("/register", handleRegister)
  .post("/login", handleLogin)
  .post("/update", handleUserUpdate);

export default userRouter;
