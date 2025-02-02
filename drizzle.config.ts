import "dotenv/config";
import type { Config } from "drizzle-kit";

let dbUrl: string | undefined;

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.TEST_DB_URL;
} else {
  dbUrl = process.env.DATABASE_URL;
}

if (!dbUrl) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  out: "./drizzle",
  dialect: "postgresql",
  schema: ["./src/**/*.schema.ts"],
  dbCredentials: {
    url: dbUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config;