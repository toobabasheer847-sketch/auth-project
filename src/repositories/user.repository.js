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