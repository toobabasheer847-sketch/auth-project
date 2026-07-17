import {
  createUser,
  findUserByEmail,
  verifyUser,
} from "../repositories/user.repository.js";

import {
  createOtp,
  findLatestUnusedOtp,
  markOtpAsUsed,
} from "../repositories/otp.repository.js";

import {
  hashPassword,
  comparePassword,
} from "../../../utils/bcrypt.js";

import { generateOtp } from "../../../utils/otp.js";

import { generateToken } from "../../../utils/jwt.js";


// Register Input Type
interface RegisterInput {
  email: string;
  phone: string;
  password: string;
}


// Login Input Type
interface LoginInput {
  email: string;
  password: string;
}


// Verify OTP Input Type
interface VerifyOtpInput {
  email: string;
  otp: string;
}



// Register Service
export const registerUser = async (
  {
    email,
    phone,
    password,
  }: RegisterInput
) => {


  const existingUser =
    await findUserByEmail(email);


  if (existingUser) {

    throw new Error(
      "Email already registered"
    );

  }


  const hashedPassword =
    await hashPassword(password);



  const user =
    await createUser({

      email,
      phone,
      password: hashedPassword,

    });



  const otp =
    generateOtp();



  await createOtp({

    userId: user.id,

    otp,

  });



  return {

    message:
      "Registration successful. OTP sent.",

    email: user.email,

  };

};





// Login Service
export const loginUser = async (
  {
    email,
    password,
  }: LoginInput
) => {


  const user =
    await findUserByEmail(email);



  if (!user) {

    throw new Error(
      "Invalid email or password"
    );

  }



  const isPasswordValid =
    await comparePassword(
      password,
      user.password
    );



  if (!isPasswordValid) {

    throw new Error(
      "Invalid email or password"
    );

  }



  if (!user.verifiedAt) {

    throw new Error(
      "Please verify your email first"
    );

  }



  const token =
    generateToken({

      email: user.email,

    });



  return {

    message:
      "Login successful",


    token,


    user: {

      email: user.email,

      phone: user.phone,

    },

  };

};






// Verify OTP Service
export const verifyOtp = async (
  {
    email,
    otp,
  }: VerifyOtpInput
) => {


  const storedOtp =
    await findLatestUnusedOtp(email);



  if (!storedOtp) {

    throw new Error(
      "OTP not found or already used"
    );

  }



  if (storedOtp.otp !== otp) {

    throw new Error(
      "Invalid OTP"
    );

  }



  await markOtpAsUsed(
    storedOtp.id
  );



  await verifyUser(email);



  return {

    message:
      "OTP verified successfully",

  };

};