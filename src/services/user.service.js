import {
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../repositories/user.repository.js";

import bcrypt from "bcrypt";



// Get All Users Service
export const getUsers = async () => {

  const users = await getAllUsers();

  return users;

};




// Get Single User Service
export const getUser = async (email) => {

  const user = await getUserByEmail(email);


  if (!user) {

    throw new Error(
      "User not found"
    );

  }


  return user;

};




// Update User Service
export const updateUserData = async (
  email,
  data
) => {


  const user =
    await getUserByEmail(email);



  if (!user) {

    throw new Error(
      "User not found"
    );

  }



  // Hash password if user updates password

  if (data.password) {

    data.password =
      await bcrypt.hash(
        data.password,
        10
      );

  }



  await updateUser(
    email,
    data
  );



  return {
    message:
      "User updated successfully",
  };

};




// Delete User Service
export const removeUser = async (
  email
) => {


  const user =
    await getUserByEmail(email);



  if (!user) {

    throw new Error(
      "User not found"
    );

  }



  await deleteUser(
    email
  );



  return {

    message:
      "User deleted successfully",

  };

};