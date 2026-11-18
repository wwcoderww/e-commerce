import { auth } from "../src/lib/auth.js";
import { pool } from "../src/db/index.js";

const email = process.env.PLAYWRIGHT_BOOTSTRAP_ADMIN_EMAIL;
const password = process.env.PLAYWRIGHT_BOOTSTRAP_ADMIN_PASSWORD;

if (process.env.NODE_ENV !== "test") {
  throw new Error(
    "Playwright bootstrap admin can only be created in test mode",
  );
}

if (!email || !password) {
  throw new Error(
    "PLAYWRIGHT_BOOTSTRAP_ADMIN_EMAIL and PLAYWRIGHT_BOOTSTRAP_ADMIN_PASSWORD are required",
  );
}

try {
  const created = await auth.api.createUser({
    body: {
      name: "Playwright Bootstrap Admin",
      email,
      password,
      role: "admin",
    },
  });

  console.log(`Created Playwright bootstrap admin ${created.user.id}`);
} finally {
  await pool.end();
}
