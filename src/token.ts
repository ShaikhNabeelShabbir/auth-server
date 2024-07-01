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
  token_address: string
): Promise<void> => {
  const db = await dbPromise;
  await db.run(
    "INSERT INTO tokens (token_address, email) VALUES (?, ?)",
    token_address,
    email
  );
};

export const deleteToken = async (id: number): Promise<void> => {
  const db = await dbPromise;
  await db.run("DELETE FROM tokens WHERE id = ?", id);
};
