import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@src/env.mjs";

const queryClient = postgres(env.DB_URL);
export const db: PostgresJsDatabase = drizzle(queryClient);
