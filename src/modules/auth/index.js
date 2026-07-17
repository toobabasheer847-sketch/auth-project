export { default as authRoutes } from "./routes/auth.routes.js";
export {
  register,
  login,
  verifyOtpController,
} from "./controllers/auth.controller.js";
export {
  registerUser,
  loginUser,
  verifyOtp,
} from "./services/auth.service.js";
