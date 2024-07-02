import { Context, Next } from "hono";
import jwt from "jsonwebtoken";

const JWT_SECRET = "Nabeel@03";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("authorization");
  if (!authHeader) {
    return c.json({ error: "Authorization header missing" }, 401);
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return c.json({ error: "Token missing" }, 401);
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    c.set("user", decoded);
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
};
