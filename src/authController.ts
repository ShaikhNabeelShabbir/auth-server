import { Context } from "hono";
import { signUp, signIn, resetPassword } from "./authService";

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

// defining the functionality behind signin singup and reset password
export const handleSignUp = async (c: Context): Promise<Response> => {
  const body = await c.req.json<SignUpBody>();
  const { email, password } = body;
  await signUp(email, password);
  return c.json({ message: "User created successfully" });
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
