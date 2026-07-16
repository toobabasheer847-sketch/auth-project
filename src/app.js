import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";


const app = express();



// Global Middlewares

app.use(cors());

app.use(express.json());




// Routes

// Authentication APIs
app.use(
  "/api/auth",
  authRoutes
);


// User CRUD APIs
app.use(
  "/api/users",
  userRoutes
);




// 404 Route Handler

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      message: "Route not found",

    });

  }
);



export default app;