import "dotenv/config";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./db";
function main() {
	// This will run migrations on the database, skipping the ones already applied
	try {
		migrate(db, { migrationsFolder: "./drizzle" });
	} catch (ex) {
		console.error(ex);
	}
}

main();
