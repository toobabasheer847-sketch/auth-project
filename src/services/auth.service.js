import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";

import {
  createOtp,
} from "../repositories/otp.repository.js";


// Register Service
export const registerUser = async ({
  email,
  phone,
  password,
}) => {

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }


  const hashedPassword = await bcrypt.hash(
    password,
    10
  );


  const user = await createUser({
    email,
    phone,
    password: hashedPassword,
  });


  const otp = Math.floor(
    100000 + Math.random() * 900000
  ).toString();


  await createOtp({
    userEmail: email,
    otp,
  });


  return {
    message: "Registration successful. OTP sent.",
    email: user.email,
  };

};



// Login Service
export const loginUser = async ({
  email,
  password,
}) => {


  // 1. Find user by email
  const user = await findUserByEmail(email);


  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }



  // 2. Compare password

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password
    );


  if (!isPasswordValid) {
    throw new Error(
      "Invalid email or password"
    );
  }



  // 3. Check email verification

  if (!user.verifiedAt) {
    throw new Error(
      "Please verify your email first"
    );
  }



  // 4. Generate JWT Token

  const token = jwt.sign(
    {
      email: user.email,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "1d",
    }
  );



  return {
    message: "Login successful",
    token,
    user: {
      email: user.email,
      phone: user.phone,
    },
  };

};