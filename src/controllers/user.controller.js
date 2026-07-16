import {
  getUsers,
  getUser,
  updateUserData,
  removeUser,
} from "../services/user.service.js";

import {
  successResponse,
} from "../utils/response.js";



// Get All Users Controller
export const getAllUsersController = async (
  req,
  res,
  next
) => {

  try {

    const users = await getUsers();

    return successResponse(
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
  req,
  res,
  next
) => {

  try {

    const { email } = req.params;


    const user =
      await getUser(email);


    return successResponse(
      res,
      200,
      "User fetched successfully",
      user
    );


  } catch(error) {

    next(error);

  }

};




// Update User Controller
export const updateUserController = async (
  req,
  res,
  next
) => {

  try {

    const { email } =
      req.params;


    const result =
      await updateUserData(
        email,
        req.body
      );


    return successResponse(
      res,
      200,
      result.message,
      result
    );


  } catch(error) {

    next(error);

  }

};




// Delete User Controller
export const deleteUserController = async (
  req,
  res,
  next
) => {

  try {

    const { email } =
      req.params;


    const result =
      await removeUser(email);


    return successResponse(
      res,
      200,
      result.message,
      result
    );


  } catch(error) {

    next(error);

  }

};