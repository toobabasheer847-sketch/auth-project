import { verifyToken } from "../utils/jwt.js";

export const authenticate = (
  req,
  res,
  next
) => {

  try {

    // Get Authorization Header
    const authHeader =
      req.headers.authorization;

    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message: "Authorization header is required",

      });

    }

    // Header Format:
    // Bearer <token>

    const token =
      authHeader.split(" ")[1];

    if (!token) {

      return res.status(401).json({

        success: false,

        message: "Token is required",

      });

    }

    // Verify Token
    const decoded =
      verifyToken(token);

    // Store user data in request
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({

      success: false,

      message: "Invalid or expired token",

    });

  }

};