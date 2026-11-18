import { defineConfig } from "vitest/config";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    exclude: ["dist/**", "node_modules/**"],
  },
});
