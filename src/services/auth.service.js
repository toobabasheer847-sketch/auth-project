import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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



// Register Service
export const registerUser = async ({
  email,
  phone,
  password,
}) => {


  const existingUser = await findUserByEmail(email);


  if (existingUser) {
    throw new Error(
      "Email already registered"
    );
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

    message:
    "Registration successful. OTP sent.",

    email: user.email,

  };

};





// Login Service
export const loginUser = async ({
  email,
  password,
}) => {



  const user =
    await findUserByEmail(email);



  if (!user) {

    throw new Error(
      "Invalid email or password"
    );

  }




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





  if (!user.verifiedAt) {

    throw new Error(
      "Please verify your email first"
    );

  }





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
export const verifyOtp = async ({
  email,
  otp,
}) => {


  // 1. Find latest unused OTP

  const storedOtp =
    await findLatestUnusedOtp(email);



  if (!storedOtp) {

    throw new Error(
      "OTP not found or already used"
    );

  }




  // 2. Compare OTP

  if (storedOtp.otp !== otp) {

    throw new Error(
      "Invalid OTP"
    );

  }





  // 3. Mark OTP as used

  await markOtpAsUsed(
    storedOtp.id
  );





  // 4. Verify User

  await verifyUser(email);





  return {

    message:
    "OTP verified successfully",

  };


};