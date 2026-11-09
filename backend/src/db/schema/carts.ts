import { integer, pgTable, text, primaryKey, uuid } from "drizzle-orm/pg-core";
import {
  relations,
  type InferSelectModel,
  type InferInsertModel,
} from "drizzle-orm";
import { user } from "./auth.js";
import { productsTable } from "./products.js";

export const cartItemsTable = pgTable(
  "cart",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    productId: uuid("product_id")
      .notNull()
      .references(() => productsTable.id, { onDelete: "cascade" }),

    quantity: integer("quantity").notNull().default(1),
  },
  (table) => [primaryKey({ columns: [table.userId, table.productId] })],
);

export const cartItemsRelations = relations(cartItemsTable, ({ one }) => ({
  user: one(user, {
    fields: [cartItemsTable.userId],
    references: [user.id],
  }),
  product: one(productsTable, {
    fields: [cartItemsTable.productId],
    references: [productsTable.id],
  }),
}));

export type CartItem = InferSelectModel<typeof cartItemsTable>;
export type NewCartItem = InferInsertModel<typeof cartItemsTable>;
