import { UserOtp } from "../../../models/index.js";
import type {
  UserOtpCreationAttributes,
  UserOtpModel,
} from "../../../models/userOtp.model.js";


// Create OTP
export const createOtp = async (
  otpData: UserOtpCreationAttributes
): Promise<UserOtpModel> => {

  return await UserOtp.create(otpData);

};



// Find OTP by userId and otp
export const findOtp = async (
  userId: string,
  otp: string
): Promise<UserOtpModel | null> => {

  return await UserOtp.findOne({

    where: {
      userId,
      otp,
    },

  });

};



// Find latest unused OTP
export const findLatestUnusedOtp = async (
  userId: string
): Promise<UserOtpModel | null> => {

  return await UserOtp.findOne({

    where: {
      userId,
      used: false,
    },

    order: [
      ["createdAt", "DESC"]
    ],

  });

};



// Mark OTP as used
export const markOtpAsUsed = async (
  id: string
) => {

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