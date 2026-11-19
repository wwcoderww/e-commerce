import { db } from "../db/index.js";
import { historyTable } from "../db/schema/history.js";
import { NewPurchase, purchaseTable } from "../db/schema/purchases.js";

export const HistoryService = {
  async create<T extends NewPurchase>(
    userId: string | null,
    totalPrice: number,
    products: T[],
  ) {
    return await db.transaction(async (tx) => {
      // History Table
      const [{ id: historyId }] = await tx
        .insert(historyTable)
        .values({ userId, total: totalPrice })
        .returning();
      // Purchases Table
      const rows = products.map((item) => ({ ...item, historyId }));
      await tx.insert(purchaseTable).values(rows);
      // Return History Table's Id
      return historyId;
    });
  },

  async readHistory() {
    return await db.select().from(historyTable);
  },

  async readPurchases() {
    return await db.select().from(purchaseTable);
  },
};
