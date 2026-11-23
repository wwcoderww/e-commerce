import { Router } from "express";
import {
  getAllHistory,
  getAllPurchases,
  getHistoryById,
  getHistoryUserId,
  postHistory,
} from "../controllers/historyController.js";
import { validate } from "../middleware/validateProduct.js";
import { createHistoryBodySchema } from "../schema/purchaseScheme.js";

const router = Router();

// router.get("/:id");
router.get("/", getAllHistory);
router.get("/:id", getHistoryById);
router.get("/user/:id", getHistoryUserId);
router.get("/purchases", getAllPurchases);
router.post("/", validate(createHistoryBodySchema), postHistory);

export { router as historyRouter };
