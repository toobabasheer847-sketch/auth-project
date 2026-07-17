import jwt, { JwtPayload } from "jsonwebtoken";


// Generate JWT Token

export const generateToken = (
  payload: object
): string => {


  const secret =
    process.env.JWT_SECRET;


  if (!secret) {

    throw new Error(
      "JWT_SECRET is not defined"
    );

  }


  return jwt.sign(

    payload,

    secret,

    {
      expiresIn: "1d",
    }

  );

};




// Verify JWT Token

export const verifyToken = (
  token: string
): string | JwtPayload => {


  const secret =
    process.env.JWT_SECRET;


  if (!secret) {

    throw new Error(
      "JWT_SECRET is not defined"
    );

  }


  return jwt.verify(

    token,

    secret

  );

};