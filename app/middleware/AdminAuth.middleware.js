import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";

const adminAuthMiddleware = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid user token" });
    }

    const adminCredentials = {
      email: `${process.env.ADMIN_EMAIL}`,
      password: `${process.env.ADMIN_KEY}`,
      jwtSecret: `${process.env.ADMIN_TOKEN_SECRET}`,
    };

    const tokenDecode = await jwt.verify(token, adminCredentials.jwtSecret);

    const { email, password } = tokenDecode;

    if (
      email !== adminCredentials.email &&
      password !== adminCredentials.password
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized acess." });
    }

    next();
    
  } catch (error) {
    console.log("Error in AdminAuth middleware");
    return res.status(500).json({ message: error.message, success: false });
  }
});

export default adminAuthMiddleware;
