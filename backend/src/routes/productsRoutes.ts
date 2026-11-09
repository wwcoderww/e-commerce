import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  postProduct,
  putProduct,
  upload,
} from "../controllers/productsController.js";
import { validate } from "../middleware/validateProduct.js";
import { createProductScheme } from "../schema/productScheme.js";

const router = Router();

router.get("/", getAllProducts);
router.post(
  "/",
  upload.single("image"),
  validate(createProductScheme),
  postProduct,
);
router.delete("/:id", deleteProduct);
router.put(
  "/:id",
  upload.single("image"),
  validate(createProductScheme),
  putProduct,
);

export { router as productsRouter };
