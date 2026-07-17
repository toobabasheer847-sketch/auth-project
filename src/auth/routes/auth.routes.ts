import express, {
  Request,
  Response,
  NextFunction,
} from "express";

import { authController } from "../controllers/auth.controller.js";

import {
  registerValidator,
  loginValidator,
  verifyOtpValidator,
} from "../validators/auth.validator.js";

import { validate } from "../../middlewares/validate.middleware.js";

const router = express.Router();


// Register
router.post(
  "/register",
  registerValidator,
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    authController.register(req, res, next)
);


// Login
router.post(
  "/login",
  loginValidator,
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    authController.login(req, res, next)
);


// Verify OTP
router.post(
  "/verify-otp",
  verifyOtpValidator,
  validate,
  (req: Request, res: Response, next: NextFunction) =>
    authController.verifyOtp(req, res, next)
);


// Get All Users
router.get(
  "/",
  (req: Request, res: Response, next: NextFunction) =>
    authController.getUsers(req, res, next),
);


// Get Single User
router.get(
  "/:email",
  (req: Request, res: Response, next: NextFunction) =>
    authController.getUser(req, res, next)
);


// Update User
router.put(
  "/:email",
  (req: Request, res: Response, next: NextFunction) =>
    authController.updateUser(req, res, next)
);


// Delete User
router.delete(
  "/:email",
  (req: Request, res: Response, next: NextFunction) =>
    authController.deleteUser(req, res, next)
);


export default router;