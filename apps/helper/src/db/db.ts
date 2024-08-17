import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

export const connection = new Database(process.env.DB_FILE);
export const db = drizzle(connection);
