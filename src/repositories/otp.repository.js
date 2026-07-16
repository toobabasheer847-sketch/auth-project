import { UserOtp } from "../models/index.js";


// Create OTP
export const createOtp = async (otpData) => {
  return await UserOtp.create(otpData);
};


// Find OTP by email and otp
export const findOtp = async (userEmail, otp) => {
  return await UserOtp.findOne({
    where: {
      userEmail,
      otp,
    },
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


// Find latest unused OTP
export const findLatestUnusedOtp = async (userEmail) => {
  return await UserOtp.findOne({
    where: {
      userEmail,
      used: false,
    },
    order: [
      ["createdAt", "DESC"],
    ],
  });
};