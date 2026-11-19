import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { historyTable } from "./history.js";
import { user } from "./auth.js";

export const purchaseTable = pgTable("purchases", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId").references(() => user.id),
  historyId: uuid()
    .notNull()
    .references(() => historyTable.id),
  name: varchar({ length: 255 }).notNull(),
  price: integer().notNull(),
  image: varchar({ length: 255 }),
  category: varchar({ length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const purchaseTableRelations = relations(purchaseTable, ({ one }) => ({
  history: one(historyTable, {
    fields: [purchaseTable.historyId],
    references: [historyTable.id],
  }),
  user: one(user, {
    fields: [purchaseTable.userId],
    references: [user.id],
  }),
}));

export type Purchase = InferSelectModel<typeof purchaseTable>;
export type NewPurchase = Omit<Purchase, "historyId" | "createdAt">;
