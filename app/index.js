import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import { connectDatabase } from "./utils/DatabaseConnect.js";
import { connectCloudinary } from "./utils/CloudinaryConfig.js";
import adminRouter from "./routes/Admin.route.js";
import userRouter from "./routes/User.route.js";
import doctorRouter from "./routes/Doctor.route.js";
import cookieParser from "cookie-parser";

const PORT = 3000;

const app = express();
configDotenv();

app.use(cors());

app.use(cookieParser());

app.use(express.json());

connectDatabase();
connectCloudinary();

app.get("/", (req, res) => res.send("Hello world"));

// Admin Routes
app.use("/api/v1/admin", adminRouter);

// Users Routes
app.use("/api/v1/users", userRouter);

// Doctor Routes
app.use("/api/v1/doctor", doctorRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is listning at PORT : ${process.env.PORT || PORT}`);
});
