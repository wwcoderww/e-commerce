import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "../db/index.js";
import { admin, bearer } from "better-auth/plugins";
import * as authSchema from "../db/schema/auth.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: { enabled: true },
  baseURL: process.env.BACKEND_URL || "http://localhost:8080",
  basePath: process.env.DATABASE_URL?.includes("amazon")
    ? "/api/auth"
    : "/auth",
  trustedOrigins: [
    "http://localhost:3000",
    process.env.FRONTEND_URL || "",
  ].filter(Boolean),
  advanced: {
    trustedProxyHeaders: true,
    useSecureCookies: false,
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.NODE_ENV === "production" ? ".ezwezz.com" : undefined,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },

  plugins: [admin(), bearer()],
});
