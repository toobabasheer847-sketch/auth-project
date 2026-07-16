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

    const result =
      await registerUser(req.body);

    return successResponse(
      res,
      201,
      result.message,
      result
    );

  } catch (error) {

    next(error);

  }

};




// Login Controller
export const login = async (
  req,
  res,
  next
) => {

  try {

    const result =
      await loginUser(req.body);

    return successResponse(
      res,
      200,
      result.message,
      result
    );

  } catch (error) {

    next(error);

  }

};




// Verify OTP Controller
export const verifyOtpController = async (
  req,
  res,
  next
) => {

  try {

    const result =
      await verifyOtp(req.body);

    return successResponse(
      res,
      200,
      result.message,
      result
    );

  } catch (error) {

    next(error);

  }

};