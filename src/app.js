import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";


const app = express();



// Global Middlewares

app.use(cors());

app.use(express.json());




// Routes

app.use(
  "/api/auth",
  authRoutes
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