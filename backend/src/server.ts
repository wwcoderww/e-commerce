import { migrate } from "drizzle-orm/node-postgres/migrator";
import app from "./app.js";
import { db } from "./db/index.js";

const PORT = process.env.NODE_PORT || 8080;
const HOST = "0.0.0.0";

async function startServer() {
  try {
    console.log("Checking and applying database migrations...");

    await migrate(db, { migrationsFolder: "./drizzle" });

    console.log("Migrations complete!");

    app.listen(Number(PORT), HOST, () => {
      console.log("Express API server running on port 3000");
    });
  } catch (error) {
    console.error("Migration failed, server shutting down:", error);
    process.exit(1);
  }
}

startServer();
