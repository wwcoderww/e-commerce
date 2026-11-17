import { Router } from "express";
import {
  deleteCart,
  getCartById,
  postCart,
  putCart,
  syncCart,
} from "../controllers/cartController.js";

const router = Router();

router.get("/:id", getCartById);
router.post("/", postCart);
router.post("/sync", syncCart);
router.put("/", putCart);
router.delete("/", deleteCart);

export { router as cartRouter };
