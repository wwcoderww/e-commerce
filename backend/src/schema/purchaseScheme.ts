import z from "zod";

const emptyStringToUndefined = (val: unknown) => (val === "" ? undefined : val);

export const createPurchaseScheme = z.object({
  name: z.coerce.string().min(1),
  price: z.coerce.number().min(1),
  image: z.preprocess(emptyStringToUndefined, z.string().optional()),
  category: z.preprocess(emptyStringToUndefined, z.string().optional()),
  productId: z.preprocess(emptyStringToUndefined, z.coerce.string().optional()),
});
