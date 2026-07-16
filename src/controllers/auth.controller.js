import {
  registerUser,
  loginUser,
  verifyOtp,
} from "../services/auth.service.js";

import {
  successResponse,
} from "../utils/response.js";



// Register Controller
export const register = async (
  req,
  res,
  next
) => {

  try {

    const result = await registerUser(req.body);

    return successResponse(
      res,
      201,
      result.message,
      result
    );

  } catch (error) {

    console.error("========== REGISTER ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Original Error:", error.original);
    console.error("====================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      databaseError: error.original?.message || null,
    });

  }

};




// Login Controller
export const login = async (
  req,
  res,
  next
) => {

  try {

    const result = await loginUser(req.body);

    return successResponse(
      res,
      200,
      result.message,
      result
    );

  } catch (error) {

    console.error("========== LOGIN ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Original Error:", error.original);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      databaseError: error.original?.message || null,
    });

  }

};




// Verify OTP Controller
export const verifyOtpController = async (
  req,
  res,
  next
) => {

  try {

    const result = await verifyOtp(req.body);

    return successResponse(
      res,
      200,
      result.message,
      result
    );

  } catch (error) {

    console.error("========== VERIFY OTP ERROR ==========");
    console.error(error);
    console.error("Message:", error.message);
    console.error("Original Error:", error.original);
    console.error("======================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      databaseError: error.original?.message || null,
    });

  }

};