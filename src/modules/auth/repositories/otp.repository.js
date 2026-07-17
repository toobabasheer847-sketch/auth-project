import { UserOtp } from "../../../models/index.js";


// Create OTP
export const createOtp = async (otpData) => {
  return await UserOtp.create(otpData);
};


// Find OTP by userId and otp
export const findOtp = async (userId, otp) => {

  return await UserOtp.findOne({
    where: {
      userId,
      otp,
    },
  });

};


// Find latest unused OTP
export const findLatestUnusedOtp = async (userId) => {

  return await UserOtp.findOne({

    where: {
      userId,
      used: false,
    },

    order: [["id", "DESC"]],

  });

};


// Mark OTP as used
export const markOtpAsUsed = async (id) => {

  return await UserOtp.update(

    {
      used: true,
    },

    {
      where: {
        id,
      },
    }

  );

};