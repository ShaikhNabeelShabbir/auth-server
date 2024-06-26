import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser } from "./user";
import dbPromise from "./db";
const JWT_SECRET = "Nabeel@03";

// defining the functionality behind signin singup and reset password
export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  const hashedPassword = await argon2.hash(password);
  await createUser(email, hashedPassword);
};

export const signIn = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await getUserByEmail(email);
  if (!user || !(await argon2.verify(user.password, password))) {
    throw new Error("Invalid email or password");
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  return token;
};


export const resetPassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = await argon2.hash(newPassword);
  const db = await dbPromise;
  await db.run(
    "UPDATE users SET password = ? WHERE email = ?",
    hashedPassword,
    email
  );
};
