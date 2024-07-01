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
import { authMiddleware } from "./authMiddleware"; // Adjust the path as needed

const authRoutes = new Hono();

//defining the auth routes with the respective auth functions
authRoutes.post("/signup", handleSignUp);
authRoutes.post("/signin", handleSignIn);
authRoutes.post("/reset-password", handleResetPassword);

authRoutes.post("/show-token", authMiddleware, handleGetTokens);
authRoutes.delete("delete-token", authMiddleware, handleDeleteToken);
authRoutes.patch("update-token", authMiddleware, handleUpdateToken);

export { authRoutes };
