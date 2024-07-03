import dbPromise from "./db";

interface Token {
  id?: number;
  token_address: string;
  email: string;
  balance: number;
}

export const getTokensByEmail = async (email: string): Promise<Token[]> => {
  const db = await dbPromise;
  return db.all("SELECT * FROM tokens WHERE email = ?", email);
};

export const createToken = async (
  email: string,
  token_address: string,
  balance: number
): Promise<void> => {
  const db = await dbPromise;
  await db.run(
    "INSERT INTO tokens (token_address,email, balance) VALUES (?,?, ?)",
    email,
    token_address,
    balance
  );
};

export const deleteToken = async (id: number): Promise<void> => {
  const db = await dbPromise;
  await db.run("DELETE FROM tokens WHERE id = ?", id);
};

export const updateToken = async (
  token_address: string,
  balance: number
): Promise<void> => {
  const db = await dbPromise;
  await db.run(
    "update tokens SET balance = ? WHERE token_address = ?",
    balance,
    token_address
  );
};
