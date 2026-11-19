import z from "zod";

const emptyStringToUndefined = (val: unknown) => (val === "" ? undefined : val);

const purchaseItemSchema = z.object({
  name: z.string().trim().min(1),
  price: z.coerce.number().min(1),
  image: z.preprocess(emptyStringToUndefined, z.string().optional()),
  category: z.preprocess(emptyStringToUndefined, z.string().optional()),
  productId: z.preprocess(emptyStringToUndefined, z.coerce.string().optional()),
});

export const createHistoryBodySchema = z.object({
  userId: z.string().nullable().optional(),
  purchases: z.array(purchaseItemSchema).min(1),
});
