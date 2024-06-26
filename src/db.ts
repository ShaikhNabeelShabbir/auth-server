import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Open the database connection
const dbPromise = open({
  filename: "./database.db",
  driver: sqlite3.Database,
});

export default dbPromise;

// Create the users table if it doesn't exist yet
(async () => {
  const db: Database<sqlite3.Database, sqlite3.Statement> = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);
})();
