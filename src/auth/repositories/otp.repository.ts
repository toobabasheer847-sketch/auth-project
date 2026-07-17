import { UserOtp } from "../models/index.js";
import type {
  UserOtpCreationAttributes,
  UserOtpModel,
} from "../models/userOtp.model.js";

class OtpRepository {

  // Create OTP
  async createOtp(
    otpData: UserOtpCreationAttributes
  ): Promise<UserOtpModel> {

    return await UserOtp.create(otpData);

  }

  // Find OTP by User ID and OTP
  async findOtp(
    userId: string,
    otp: string
  ): Promise<UserOtpModel | null> {

    return await UserOtp.findOne({

      where: {
        userId,
        otp,
      },

    });

  }



  // Find Latest Unused OTP
  async findLatestUnusedOtp(
    userId: string
  ): Promise<UserOtpModel | null> {

    return await UserOtp.findOne({

      where: {
        userId,
        used: false,
      },

      order: [
        ["createdAt", "DESC"],
      ],

    });

  }



  // Mark OTP as Used
  async markOtpAsUsed(
    id: string
  ): Promise<[number]> {

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

  }

}

export default new OtpRepository();