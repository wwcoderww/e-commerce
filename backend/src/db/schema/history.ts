import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth.js";

export const historyTable = pgTable("history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId").references(() => user.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  total: integer().notNull(),
});

export const historyTableRelations = relations(historyTable, ({ one }) => ({
  user: one(user, {
    fields: [historyTable.userId],
    references: [user.id],
  }),
}));

export type HistoryTable = InferSelectModel<typeof historyTable>;
export type NewHistoryTable = InferInsertModel<typeof historyTable>;
