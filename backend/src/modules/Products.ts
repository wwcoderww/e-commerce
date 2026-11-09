import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { NewProduct, Product, productsTable } from "../db/schema/products.js";
export const ProductsService = {
  async read() {
    return await db.select().from(productsTable);
  },

  async getSingle(productId: string) {
    return await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId));
  },

  async create(data: NewProduct) {
    return await db.insert(productsTable).values(data).returning();
  },

  async delete(id: string) {
    return await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();
  },

  async update(data: Product) {
    return await db
      .update(productsTable)
      .set(data)
      .where(eq(productsTable.id, data.id));
  },
};
