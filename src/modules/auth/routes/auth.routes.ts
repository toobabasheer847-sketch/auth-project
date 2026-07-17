import express from "express";


import {
  register,
  login,
  verifyOtpController,
} from "../controllers/auth.controller.js";



import {
  registerValidator,
  loginValidator,
  verifyOtpValidator,
} from "../validators/auth.validator.js";



import {
  validate,
} from "../../../middlewares/validate.middleware.js";



const router = express.Router();




// Register API
router.post(
  "/register",
  registerValidator,
  validate,
  register
);




// Login API
router.post(
  "/login",
  loginValidator,
  validate,
  login
);




// Verify OTP API
router.post(
  "/verify-otp",
  verifyOtpValidator,
  validate,
  verifyOtpController
);



export default router;