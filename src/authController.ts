import { Context } from "hono";
import jwt from "jsonwebtoken";
import { signUp, signIn, resetPassword } from "./authService";
import dotenv from "dotenv";
import { deleteToken, getTokensByEmail, updateToken } from "./token";
dotenv.config();
const JWT_SECRET = String(process.env.JWT_SECRET);

interface SignUpBody {
  email: string;
  password: string;
}

interface SignInBody {
  email: string;
  password: string;
}

interface ResetPasswordBody {
  email: string;
  newPassword: string;
}

interface TokenBody {
  id: number;
  email: string;
  balance: number;
}

// defining the functionality behind signin singup and reset password
export const handleSignUp = async (c: Context): Promise<Response> => {
  const body = await c.req.json<SignUpBody>();
  const { email, password } = body;
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  await signUp(email, password, token);
  return c.json({ message: "User created successfully", token });
};

export const handleSignIn = async (c: Context): Promise<Response> => {
  const body = await c.req.json<SignInBody>();
  const { email, password } = body;
  try {
    const token = await signIn(email, password);
    return c.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: "Invalid email or password" }, 401);
    } else {
      return c.json({ error: "An unexpected error occurred" }, 500);
    }
  }
};

export const handleResetPassword = async (c: Context): Promise<Response> => {
  const body = await c.req.json<ResetPasswordBody>();
  const { email, newPassword } = body;
  try {
    await resetPassword(email, newPassword);
    return c.json({ message: "Password reset successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 400);
    } else {
      return c.json({ error: "An unexpected error occurred" }, 500);
    }
  }
};

export const handleGetTokens = async (c: Context): Promise<Response> => {
  const body = await c.req.json<TokenBody>();
  const { email } = body;
  const tokens = await getTokensByEmail(email);
  return c.json(tokens);
};

export const handleDeleteToken = async (c: Context): Promise<Response> => {
  const body = await c.req.json<TokenBody>();
  const { id } = body;
  await deleteToken(id);
  return c.json({ message: "Token deleted successfully" });
};

export const handleUpdateToken = async (c: Context): Promise<Response> => {
  const body = await c.req.json<TokenBody>();
  const { id, balance } = body;
  await updateToken(id, balance);
  return c.json({ message: "Token updated successfully" });
};
