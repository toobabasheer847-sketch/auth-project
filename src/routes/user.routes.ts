import express from "express";

import {
  getAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";


const router = express.Router();


// Get All Users
router.get(
  "/",
  getAllUsersController
);


// Get Single User By Email
router.get(
  "/:email",
  getUserController
);


// Update User
router.put(
  "/:email",
  updateUserController
);


// Delete User
router.delete(
  "/:email",
  deleteUserController
);


export default router;