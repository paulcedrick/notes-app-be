import { drizzle } from "drizzle-orm/postgres-js";
import { mainSchema } from "@/shared/schema.ts";
import postgres from 'postgres'

const connectionString = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URL : process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(connectionString!, {
  prepare: false,
});

const db = drizzle(client, { schema: mainSchema, logger: true });

export default db;
