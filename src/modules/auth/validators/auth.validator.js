import { body } from "express-validator";



// Register Validation Rules
export const registerValidator = [

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),


  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required"),


  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 characters"
    ),

];





// Login Validation Rules
export const loginValidator = [

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email"),


  body("password")
    .trim()
    .notEmpty()
    .withMessage(
      "Password is required"
    ),

];





// Verify OTP Validation Rules
export const verifyOtpValidator = [

  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Please enter a valid email"
    ),


  body("otp")
    .trim()
    .notEmpty()
    .withMessage(
      "OTP is required"
    )
    .isLength({
      min: 6,
      max: 6,
    })
    .withMessage(
      "OTP must be 6 digits"
    ),

];