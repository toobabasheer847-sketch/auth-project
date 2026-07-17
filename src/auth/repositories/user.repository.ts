import { User } from "../models/index.js";
import type {
  UserCreationAttributes,
  UserModel,
} from "../models/user.model.js";

class UserRepository {

  // Create User
  async createUser(
    userData: UserCreationAttributes
  ): Promise<UserModel> {

    return await User.create(userData);

  }



  // Find User By Email
  async findUserByEmail(
    email: string
  ): Promise<UserModel | null> {

    return await User.findOne({

      where: {
        email,
      },

    });

  }



  // Verify User After OTP Verification
  async verifyUser(
    email: string
  ): Promise<[number]> {

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

  }



  // Get All Users
  async getAllUsers(): Promise<UserModel[]> {

    return await User.findAll({

      attributes: [
        "id",
        "email",
        "phone",
        "verifiedAt",
      ],

    });

  }



  // Get Single User By Email
  async getUserByEmail(
    email: string
  ): Promise<UserModel | null> {

    return await User.findOne({

      where: {
        email,
      },

      attributes: [
        "id",
        "email",
        "phone",
        "verifiedAt",
      ],

    });

  }



  // Update User
  async updateUser(
    email: string,
    updateData: Record<string, any>
  ): Promise<[number]> {

    return await User.update(

      updateData,

      {
        where: {
          email,
        },
      }

    );

  }



  // Delete User
  async deleteUser(
    email: string
  ): Promise<number> {

    return await User.destroy({

      where: {
        email,
      },

    });

  }

}

export default new UserRepository();