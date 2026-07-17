import { Request, Response, NextFunction } from "express";

import {
  registerUser,
  loginUser,
  verifyOtp,
} from "../services/auth.service.js";

import {
  successResponse,
} from "../../../utils/response.js";


// Custom Error Type
interface AppError extends Error {
  original?: {
    message?: string;
  };
}


// Register Controller
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {

  try {

    const result = await registerUser(req.body);


    return successResponse(
      res,
      201,
      result.message,
      result
    );


  } catch (error) {


    const err = error as AppError;


    console.error("========== REGISTER ERROR ==========");
    console.error(err);
    console.error("Message:", err.message);
    console.error("Original Error:", err.original);
    console.error("====================================");


    return res.status(500).json({

      success: false,

      message: err.message || "Internal Server Error",

      databaseError:
        err.original?.message || null,

    });

  }

};




// Login Controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {

  try {


    const result = await loginUser(req.body);


    return successResponse(
      res,
      200,
      result.message,
      result
    );


  } catch (error) {


    const err = error as AppError;


    console.error("========== LOGIN ERROR ==========");
    console.error(err);
    console.error("Message:", err.message);
    console.error("Original Error:", err.original);
    console.error("=================================");


    return res.status(500).json({

      success: false,

      message:
        err.message || "Internal Server Error",

      databaseError:
        err.original?.message || null,

    });

  }

};





// Verify OTP Controller
export const verifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {

  try {


    const result = await verifyOtp(req.body);


    return successResponse(
      res,
      200,
      result.message,
      result
    );


  } catch (error) {


    const err = error as AppError;


    console.error("========== VERIFY OTP ERROR ==========");
    console.error(err);
    console.error("Message:", err.message);
    console.error("Original Error:", err.original);
    console.error("======================================");


    return res.status(500).json({

      success: false,

      message:
        err.message || "Internal Server Error",

      databaseError:
        err.original?.message || null,

    });

  }

};