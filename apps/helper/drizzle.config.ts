import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schemas.ts",
	out: "./drizzle",
	dialect: "sqlite", // 'postgresql' | 'mysql' | 'sqlite'
});
