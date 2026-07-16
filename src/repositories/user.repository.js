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