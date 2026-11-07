import z from "zod";

const emptyStringToUndefined = (val: unknown) => (val === "" ? undefined : val);

export const createProductScheme = z.object({
  name: z.coerce.string().min(1, "Name is required"),
  price: z.coerce.number().min(1, "Price is required"),
  description: z.preprocess(emptyStringToUndefined, z.string().optional()),
  image: z.object({
    size: z.coerce
      .number()
      .max(5242880, "Image file must be smaller than 10MB"),
    mimetype: z.enum(["image/jpeg", "image/png", "image/webp"], {
      message: "Only JPEG, PNG, or WebP images are allowed",
    }),
  }),
  category: z.preprocess(emptyStringToUndefined, z.string().optional()),
  rating: z.preprocess(emptyStringToUndefined, z.coerce.number().optional()),
  ratingCount: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().optional(),
  ),
  createdAt: z.preprocess(emptyStringToUndefined, z.coerce.date().optional()),
});

export const updateProductScheme = z.object({
  name: z.coerce.string().min(1, "Name is required"),
  price: z.coerce.number().min(1, "Price is required"),
  description: z.preprocess(emptyStringToUndefined, z.string().optional()),
  image: z.object({
    size: z.coerce
      .number()
      .max(5242880, "Image file must be smaller than 10MB"),
    mimetype: z.enum(["image/jpeg", "image/png", "image/webp"], {
      message: "Only JPEG, PNG, or WebP images are allowed",
    }),
  }),
  category: z.preprocess(emptyStringToUndefined, z.string().optional()),
  rating: z.preprocess(emptyStringToUndefined, z.coerce.number().optional()),
  ratingCount: z.preprocess(
    emptyStringToUndefined,
    z.coerce.number().optional(),
  ),
  createdAt: z.coerce.date(),
});
