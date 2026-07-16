import express from "express";

import {
  register,
  login,
} from "../controllers/auth.controller.js";


const router = express.Router();


// Register API
router.post(
  "/register",
  register
);


// Login API
router.post(
  "/login",
  login
);


export default router;