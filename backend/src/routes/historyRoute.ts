import { Router } from "express";
import { validate } from "../middleware/validateProduct.js";
import { createHistoryBodySchema } from "../schema/purchaseScheme.js";
import {
  getHistory,
  getPurchases,
  postHistory,
} from "../controllers/historyController.js";

const router = Router();

// router.get("/:id");
router.get("/", getHistory);
router.get("/purchases", getPurchases);
router.post("/", validate(createHistoryBodySchema), postHistory);

export { router as historyRouter };
