import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationClient } from "./db";
import * as schema from "./schemas";
import { drizzle } from "drizzle-orm/postgres-js";

const db = drizzle(migrationClient, { schema });

async function main() {
	await migrate(db, { migrationsFolder: "./drizzle" });
	migrationClient.end();
}

try {
	main();
} catch (ex) {
	console.error(ex);
	if (ex instanceof Object && "code" in ex && ex.code === "CONNECTION_ENDED")
		console.log("done");
}
