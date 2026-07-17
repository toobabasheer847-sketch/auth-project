import {
  Request,
  Response,
  NextFunction
} from "express";

import { verifyToken } from "../utils/jwt.js";


// Extend Express Request Type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  try {

    // Get Authorization Header
    const authHeader =
      req.headers.authorization;


    if (!authHeader) {

      res.status(401).json({

        success: false,

        message: "Authorization header is required",

      });

      return;
    }



    // Bearer <token>

    const token =
      authHeader.split(" ")[1];


    if (!token) {

      res.status(401).json({

        success: false,

        message: "Token is required",

      });

      return;
    }



    // Verify Token

    const decoded =
      verifyToken(token);



    // Store user data

    req.user = decoded;



    next();


  } catch (error) {


    res.status(401).json({

      success: false,

      message: "Invalid or expired token",

    });


    return;

  }

};