import { Request, Response } from "express";
import { HistoryService } from "../modules/History.js";
import { NewPurchase } from "../db/schema/purchases.js";

type postHistoryBodyType = { userId?: string; purchases: NewPurchase[] };

export const postHistory = async (req: Request, res: Response) => {
  try {
    const { userId = null, purchases } = req.body as postHistoryBodyType;
    const totalPrice = purchases.reduce((acc, item) => acc + item.price, 0);
    const historyId = await HistoryService.create(
      userId,
      totalPrice,
      purchases,
    );
    return res.status(200).json({ sucess: true, data: historyId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const data = await HistoryService.readHistory();
    return res.status(200).json({ sucess: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const data = await HistoryService.readPurchases();
    return res.status(200).json({ sucess: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

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
