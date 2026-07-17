import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.js";
import { successResponse } from "../../utils/response.js";

interface AppError extends Error {
  original?: {
    message?: string;
  };
}

class AuthController {

  // Register
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {

    try {

      const result = await authService.registerUser(req.body);

      return successResponse(
        res,
        201,
        result.message,
        result
      );

    } catch (error) {

      const err = error as AppError;

      console.error(" REGISTER ERROR");
      console.error(err);
      console.error("");

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        databaseError: err.original?.message || null,
      });

    }

  }

  // Login
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {

    try {

      const result = await authService.loginUser(req.body);

      return successResponse(
        res,
        200,
        result.message,
        result
      );

    } catch (error) {

      const err = error as AppError;

      console.error(" LOGIN ERROR ");
      console.error(err);
      console.error("");

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        databaseError: err.original?.message || null,
      });

    }

  }



  // Verify OTP
  async verifyOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {

    try {

      const result = await authService.verifyOtp(req.body);

      return successResponse(
        res,
        200,
        result.message,
        result
      );

    } catch (error) {

      const err = error as AppError;

      console.error(" VERIFY OTP ERROR ");
      console.error(err);
      console.error("");

      return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error",
        databaseError: err.original?.message || null,
      });

    }

  }



  // Get All Users
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {

    try {

      const users = await authService.getUsers();

      return successResponse(
        res,
        200,
        "Users fetched successfully",
        users
      );

    } catch (error) {

      next(error);

      return res;

    }

  }



  // Get User
  async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {

    try {

      const email = String(req.params.email);

      const user = await authService.getUser(email);

      return successResponse(
        res,
        200,
        "User fetched successfully",
        user
      );

    } catch (error) {

      next(error);

      return res;

    }

  }



  // Update User
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {

    try {

      const email = String(req.params.email);

      const result = await authService.updateUserData(
        email,
        req.body
      );

      return successResponse(
        res,
        200,
        result.message,
        result
      );

    } catch (error) {

      next(error);

      return res;

    }

  }



  // Delete User
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {

    try {

      const email = String(req.params.email);

      const result = await authService.removeUser(email);

      return successResponse(
        res,
        200,
        result.message,
        result
      );

    } catch (error) {

      next(error);

      return res;

    }

  }

}

export const authController = new AuthController();