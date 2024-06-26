import { Hono } from "hono";
//importing fuctions
import {
  handleSignUp,
  handleSignIn,
  handleResetPassword,
} from "./authController";

const authRoutes = new Hono();

//defining the auth routes with the respective auth functions
authRoutes.post("/signup", handleSignUp);
authRoutes.post("/signin", handleSignIn);
authRoutes.post("/reset-password", handleResetPassword);

export { authRoutes };
