import { Request, Response } from "express";
import { NewPurchase } from "../db/schema/purchases.js";
import { HistoryService } from "../modules/History.js";
import { createHistoryBodyType } from "../schema/purchaseScheme.js";

// POST History + Purchases
export const postHistory = async (req: Request, res: Response) => {
  try {
    // Req.body
    const { userId, purchases, customerInfo } =
      req.body as createHistoryBodyType;
    // Calculate totalPrice
    // -> Module
    const historyId = await HistoryService.create({
      userId,
      purchases,
      customerInfo,
    });
    // On Success
    return res.status(200).json({ sucess: true, data: historyId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
// GET History + Purchases with History
export const getHistoryById = async (req: Request, res: Response) => {
  try {
    const reqId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const data = await HistoryService.readHistoryId(reqId);
    return res.status(200).json({ sucess: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
// Return all History
export const getAllHistory = async (req: Request, res: Response) => {
  try {
    const data = await HistoryService.readAllHistory();
    return res.status(200).json({ sucess: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
// Return all Purchases
export const getAllPurchases = async (req: Request, res: Response) => {
  try {
    const data = await HistoryService.readAllPurchases();
    return res.status(200).json({ sucess: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
