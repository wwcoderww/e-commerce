import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { historyTable } from "../db/schema/history.js";
import { NewPurchase, purchaseTable } from "../db/schema/purchases.js";
import { createHistoryBodyType } from "../schema/purchaseScheme.js";

export const HistoryService = {
  async create({ userId, purchases, customerInfo }: createHistoryBodyType) {
    // Calculate Total Price
    const total = purchases.reduce((acc, item) => acc + item.price, 0);
    // Return
    return await db.transaction(async (tx) => {
      // Inser into History Table
      const [{ id: historyId }] = await tx
        .insert(historyTable)
        .values({
          userId,
          total,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customerEmail: customerInfo.email,
          shippingAddress: `${customerInfo.address} ${customerInfo.address2}, ${customerInfo.city} ${customerInfo.state}, ${customerInfo.zip} ${customerInfo.country}`,
        })
        .returning();
      // Insert into Purchases Table
      const rows = purchases.map((item) => ({ ...item, historyId }));
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
