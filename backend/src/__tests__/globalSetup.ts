import "dotenv/config";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth.js";
import { db } from "../db/index.js";
import { user } from "../db/schema/auth.js";
import { historyTable } from "../db/schema/history.js";
import { productsTable } from "../db/schema/products.js";
import { purchaseTable } from "../db/schema/purchases.js";

export type TestFixtures = {
  adminEmail: string;
  adminPassword: string;
  adminId: string;
  userId: string;
  productId: string;
  productName: string;
};

export default async function globalSetup({
  provide,
}: {
  provide: (key: string, value: unknown) => void;
}) {
  const testEmail = `test-admin-${randomUUID()}@example.com`;
  const testPassword = "Test-admin-password-123";
  const testName = `test-${randomUUID()}`.slice(0, 15);

  const created = await auth.api.createUser({
    body: {
      name: "Vitest Admin",
      email: testEmail,
      password: testPassword,
      role: "admin",
    },
  });

  const [createdProduct] = await db
    .insert(productsTable)
    .values({
      id: randomUUID(),
      name: testName,
      price: 100,
    })
    .returning();

  provide("testFixtures", {
    adminEmail: testEmail,
    adminPassword: testPassword,
    adminId: created.user.id,
    userId: created.user.id,
    productId: createdProduct.id,
    productName: testName,
  });

  return async () => {
    await db
      .delete(purchaseTable)
      .where(eq(purchaseTable.productId, createdProduct.id));

    await db
      .delete(historyTable)
      .where(eq(historyTable.userId, created.user.id));

    if (createdProduct.id) {
      await db
        .delete(productsTable)
        .where(eq(productsTable.id, createdProduct.id));
    }

    if (created.user.id) {
      await db.delete(user).where(eq(user.id, created.user.id));
    }
  };
}
