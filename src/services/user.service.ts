import {
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} from "../modules/auth/repositories/user.repository.js";

import bcrypt from "bcrypt";


// Update User Data Type
interface UpdateUserData {
  phone?: string;
  password?: string;
  [key: string]: any;
}



// Get All Users Service
export const getUsers = async () => {

  const users = await getAllUsers();

  return users;

};




// Get Single User Service
export const getUser = async (
  email: string
) => {

  const user =
    await getUserByEmail(email);


  if (!user) {

    throw new Error(
      "User not found"
    );

  }


  return user;

};




// Update User Service
export const updateUserData = async (
  email: string,
  data: UpdateUserData
) => {


  const user =
    await getUserByEmail(email);



  if (!user) {

    throw new Error(
      "User not found"
    );

  }



  // Hash password if password is updated

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
  email: string
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