import { Request, Response, NextFunction } from "express";

import {
  getUsers,
  getUser,
  updateUserData,
  removeUser,
} from "../services/user.service.js";

import { successResponse } from "../utils/response.js";


// Get All Users Controller
export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const users = await getUsers();

    successResponse(
      res,
      200,
      "Users fetched successfully",
      users
    );

  } catch (error) {

    next(error);

  }

};



// Get Single User Controller
export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const email = String(req.params.email);

    const user = await getUser(email);

    successResponse(
      res,
      200,
      "User fetched successfully",
      user
    );

  } catch (error) {

    next(error);

  }

};



// Update User Controller
export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const email = String(req.params.email);

    const result = await updateUserData(
      email,
      req.body
    );

    successResponse(
      res,
      200,
      result.message,
      result
    );

  } catch (error) {

    next(error);

  }

};



// Delete User Controller
export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {

    const email = String(req.params.email);

    const result = await removeUser(email);

    successResponse(
      res,
      200,
      result.message,
      result
    );

  } catch (error) {

    next(error);

  }

};