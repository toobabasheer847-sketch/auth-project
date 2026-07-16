import { User } from "../models/index.js";


// Create User
export const createUser = async (userData) => {

  return await User.create(userData);

};




// Find User By Email
export const findUserByEmail = async (email) => {

  return await User.findOne({

    where: {
      email,
    },

  });

};




// Verify User After OTP Verification
export const verifyUser = async (email) => {

  return await User.update(

    {
      verifiedAt: new Date(),
    },

    {
      where: {
        email,
      },
    }

  );

};




// Get All Users
export const getAllUsers = async () => {

  return await User.findAll({

    attributes: [
      "id",
      "email",
      "phone",
      "verifiedAt",
      "createdAt",
    ],

  });

};




// Get Single User By Email
export const getUserByEmail = async (email) => {

  return await User.findOne({

    where: {
      email,
    },

    attributes: [
      "id",
      "email",
      "phone",
      "verifiedAt",
      "createdAt",
    ],

  });

};




// Update User
export const updateUser = async (
  email,
  updateData
) => {

  return await User.update(

    updateData,

    {
      where: {
        email,
      },
    }

  );

};




// Delete User
export const deleteUser = async (email) => {

  return await User.destroy({

    where: {
      email,
    },

  });

};