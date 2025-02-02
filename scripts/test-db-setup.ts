import 'dotenv/config'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres';
import { drizzle } from "drizzle-orm/postgres-js";

const env = process.env.NODE_ENV === 'test' ? 'test' : 'main'

let dbUrl = env === 'test' ? process.env.TEST_DB_URL : process.env.DATABASE_URL

if (!dbUrl) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(dbUrl!, {
  prepare: false,
});

const db = drizzle(client);


export async function setup() {
  console.log('🔥 Setting up test database...');
  try {
    // Run migrations before each test run
    await migrate(db, {
      migrationsFolder: './drizzle',
    });
    console.log('✨ Test database migrations applied successfully');
  } catch (error) {
    console.error('Failed to run migrations:', error);
    throw error;
  }
}

export async function teardown() {
  console.log('🔥 Clearing test database...');
  try {
    // Truncate all tables in the database
    await client`
      DO $$ DECLARE
        r RECORD;
      BEGIN
        FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
          EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
        END LOOP;
      END $$;
    `;
    console.log('✨ Test database cleared successfully');
  } catch (error) {
    console.error('Failed to clear test database:', error);
    throw error;
  } finally {
    await client.end();
  }
}