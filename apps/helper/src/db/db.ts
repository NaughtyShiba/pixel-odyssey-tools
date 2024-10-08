import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";

const connectionString = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

export const migrationClient = postgres(connectionString, { max: 1 });
export const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema });
