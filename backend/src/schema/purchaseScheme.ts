import z from "zod";

const purchaseItemSchema = z.object({
  name: z.string().trim().min(1),
  price: z.coerce.number().min(1),
  quantity: z.coerce.number().min(1),
  productId: z.coerce.string(),
  image: z.string().optional(),
  category: z.string().nullable().optional(),
});

const customerInfoSchema = z.object({
  email: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  address2: z.string(),
  city: z.string().min(1),
  state: z.string(),
  zip: z.string().min(5),
  country: z.string().min(1),
});

export const createHistoryBodySchema = z.object({
  userId: z.string().nullable(),
  purchases: z.array(purchaseItemSchema).min(1),
  customerInfo: customerInfoSchema.required(),
});

export type createHistoryBodyType = z.infer<typeof createHistoryBodySchema>;
