import { and, eq, sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { cartItemsTable } from "../db/schema/carts.js";

export const Cart = {
  async read(id: string) {
    return await db
      .select()
      .from(cartItemsTable)
      .where(eq(cartItemsTable.userId, id));
  },
  // POST
  async create(userId: string, productId: string) {
    return await db
      .insert(cartItemsTable)
      .values({ userId, productId })
      .returning();
  },
  // PUT
  async update(userId: string, productId: string, quantity: number = 1) {
    return await db
      .update(cartItemsTable)
      .set({ quantity: sql`${cartItemsTable.quantity} + ${quantity}` })
      .where(
        and(
          eq(cartItemsTable.userId, userId),
          eq(cartItemsTable.productId, productId),
        ),
      )
      .returning();
  },

  async delete(userId: string, productId: string) {
    return await db
      .delete(cartItemsTable)
      .where(
        and(
          eq(cartItemsTable.userId, userId),
          eq(cartItemsTable.productId, productId),
        ),
      );
  },
};
