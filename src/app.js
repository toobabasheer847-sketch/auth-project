import express from "express";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
// routes
app.use(
  "/api/auth",
  authRoutes
);

export default app;