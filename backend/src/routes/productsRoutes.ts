import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  postProduct,
  putProduct,
  upload,
} from "../controllers/productsController.js";
import { validate } from "../middleware/validate.js";
import { updateProductScheme } from "../schema/productsScheme.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", upload.single("image"), postProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", validate(updateProductScheme), putProduct);

export { router as productsRouter };
