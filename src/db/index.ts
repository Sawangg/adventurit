import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
// import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { env } from "@src/env.mjs";

// const migrationClient = postgres(env.DB_URL, { max: 1 });
// void migrate(drizzle(migrationClient), { migrationsFolder: "./migrations" });

const queryClient = postgres(env.DB_URL);
export const db: PostgresJsDatabase = drizzle(queryClient);
