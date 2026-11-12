import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema/index.js";

const useAwsRds = process.env.DATABASE_URL?.includes("amazon");

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useAwsRds ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });
