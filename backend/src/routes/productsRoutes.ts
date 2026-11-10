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
import requireAdmin from "../middleware/requireAdmin.js";

const router = Router();

router.get("/", getAllProducts);
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  validate(createProductScheme),
  postProduct,
);
router.delete("/:id", requireAdmin, deleteProduct);
router.put(
  "/:id",
  requireAdmin,
  upload.single("image"),
  validate(createProductScheme),
  putProduct,
);

export { router as productsRouter };
