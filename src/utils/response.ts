import { Response } from "express";


// Success Response

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: unknown = null
): Response => {

  return res.status(statusCode).json({

    success: true,

    message,

    data,

  });

};




// Error Response

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors: unknown = null
): Response => {

  return res.status(statusCode).json({

    success: false,

    message,

    errors,

  });

};