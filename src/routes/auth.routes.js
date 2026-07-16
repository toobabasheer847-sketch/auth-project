import express from "express";


import {
  register,
  login,
  verifyOtpController,
} from "../controllers/auth.controller.js";



const router = express.Router();



// Register API
router.post(
  "/register",
  register
);



// Login API
router.post(
  "/login",
  login
);



// Verify OTP API
router.post(
  "/verify-otp",
  verifyOtpController
);



export default router;