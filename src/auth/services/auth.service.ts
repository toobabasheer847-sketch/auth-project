import userRepository from "../repositories/user.repository.js";
import otpRepository from "../repositories/otp.repository.js";

import {
  hashPassword,
  comparePassword,
} from "../../utils/bcrypt.js";

import { generateOtp } from "../../utils/otp.js";
import { generateToken } from "../../utils/jwt.js";

interface RegisterInput {
  email: string;
  phone: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface VerifyOtpInput {
  email: string;
  otp: string;
}

interface UpdateUserData {
  phone?: string;
  password?: string;
  [key: string]: any;
}

class AuthService {

  // Register User
  async registerUser({
    email,
    phone,
    password,
  }: RegisterInput) {

    const existingUser =
      await userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword =
      await hashPassword(password);

    const user =
      await userRepository.createUser({
        email,
        phone,
        password: hashedPassword,
      });

    const otp = generateOtp();

    await otpRepository.createOtp({
      userId: user.id,
      otp,
    });

    return {
      message: "Registration successful. OTP sent.",
      email: user.email,
    };

  }



  // Login User
  async loginUser({
    email,
    password,
  }: LoginInput) {

    const user =
      await userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid =
      await comparePassword(
        password,
        user.password
      );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    if (!user.verifiedAt) {
      throw new Error(
        "Please verify your email first"
      );
    }

    const token = generateToken({
      email: user.email,
    });

    return {
      message: "Login successful",
      token,
      user: {
        email: user.email,
        phone: user.phone,
      },
    };

  }



  // Verify OTP
  async verifyOtp({
    email,
    otp,
  }: VerifyOtpInput) {

    const storedOtp =
      await otpRepository.findLatestUnusedOtp(email);

    if (!storedOtp) {
      throw new Error(
        "OTP not found or already used"
      );
    }

    if (storedOtp.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    await otpRepository.markOtpAsUsed(
      storedOtp.id
    );

    await userRepository.verifyUser(email);

    return {
      message: "OTP verified successfully",
    };

  }



  // Get All Users
  async getUsers() {

    return await userRepository.getAllUsers();

  }



  // Get Single User
  async getUser(
    email: string
  ) {

    const user =
      await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    return user;

  }



  // Update User
  async updateUserData(
    email: string,
    data: UpdateUserData
  ) {

    const user =
      await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (data.password) {

      data.password =
        await hashPassword(data.password);

    }

    await userRepository.updateUser(
      email,
      data
    );

    return {
      message: "User updated successfully",
    };

  }

  // Delete User
  async removeUser(
    email: string
  ) {

    const user =
      await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    await userRepository.deleteUser(email);

    return {
      message: "User deleted successfully",
    };

  }

}

export default new AuthService();