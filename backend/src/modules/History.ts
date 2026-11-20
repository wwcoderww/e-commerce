import { eq } from "drizzle-orm";
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

  async readHistoryId(id: string) {
    return await db.transaction(async (tx) => {
      const purchaseData = await tx
        .select()
        .from(purchaseTable)
        .where(eq(purchaseTable.historyId, id));
      const historyData = await tx
        .select()
        .from(historyTable)
        .where(eq(historyTable.id, id));
      return { purchaseData, historyData };
    });
  },

  async readAllHistory() {
    return await db.select().from(historyTable);
  },

  async readAllPurchases() {
    return await db.select().from(purchaseTable);
  },
};
