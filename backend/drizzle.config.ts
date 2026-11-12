import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const isS3Db = Boolean(process.env.DATABASE_URL?.includes("amazon"));

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    ssl: isS3Db ? { rejectUnauthorized: false } : false,
  },
});
