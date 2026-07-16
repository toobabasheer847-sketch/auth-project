import jwt from "jsonwebtoken";


// Generate JWT Token

export const generateToken = (payload) => {

  return jwt.sign(

    payload,

    process.env.JWT_SECRET,

    {
      expiresIn: "1d",
    }

  );

};




// Verify JWT Token

export const verifyToken = (token) => {

  return jwt.verify(

    token,

    process.env.JWT_SECRET

  );

};