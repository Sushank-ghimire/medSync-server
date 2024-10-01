import express from "express";
import { doctorLogin } from "../controllers/Doctor.controller.js";

const doctorRouter = express.Router();

doctorRouter.post("/login", doctorLogin);

export default doctorRouter;
