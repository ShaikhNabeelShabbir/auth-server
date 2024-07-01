import { Hono } from "hono";
//importing fuctions
import {
  handleSignUp,
  handleSignIn,
  handleResetPassword,
  handleGetTokens,
  handleDeleteToken,
  handleUpdateToken,
} from "./authController";

const authRoutes = new Hono();

//defining the auth routes with the respective auth functions
authRoutes.post("/signup", handleSignUp);
authRoutes.post("/signin", handleSignIn);
authRoutes.post("/reset-password", handleResetPassword);
authRoutes.post("/show-token", handleGetTokens);
authRoutes.delete("delete-token", handleDeleteToken);
authRoutes.patch("update-token", handleUpdateToken);

export { authRoutes };
