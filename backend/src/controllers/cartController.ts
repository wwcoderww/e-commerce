import { Request, Response } from "express";
import { Cart } from "../modules/Cart.js";

export async function getCartById(req: Request, res: Response): Promise<any> {
  try {
    const reqId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;
    const results = await Cart.read(reqId);
    // Items found
    return res.status(200).json({ success: "success", data: results });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: "fail", error: error?.message });
  }
}

export async function putCart(req: Request, res: Response): Promise<any> {
  const { userId, productId, quantity } = req.body;
  try {
    const data = await Cart.update(userId, productId, quantity);
    if (data.length === 0) return postCart(req, res);
    if (data[0].quantity <= 0) return deleteCart(req, res);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: "fail", error: error?.message });
  }
}

export async function postCart(req: Request, res: Response): Promise<any> {
  const { userId, productId, quantity = 1 } = req.body;
  try {
    const result = await Cart.create(userId, productId, quantity);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    if (error.cause.code === "23505") return putCart(req, res);

    console.log(error);
    return res.status(500).json({ success: "fail", error: error?.message });
  }
}

export async function deleteCart(req: Request, res: Response): Promise<any> {
  const { userId, productId } = req.body;
  try {
    if (req.body.productId) await Cart.delete(userId, productId);
    else await Cart.clear(userId);
    return res.status(200).json({ success: "success" });
  } catch (error: any) {
    return res.status(500).json({ success: "fail", error: error?.message });
  }
}

export async function syncCart(req: Request, res: Response): Promise<any> {
  try {
    if (!Array.isArray(req.body.cart) || !req.body.userId)
      return res
        .status(400)
        .json({ success: "fail", error: "userId and cart array are required" });
    await Cart.clear(req.body.userId);
    const updatedCart = req.body.cart;
    await Promise.all(
      updatedCart.map((item) =>
        Cart.create(req.body.userId, item.itemId, item.quantity),
      ),
    );
    return res.status(200).json({ success: "success" });
  } catch (error: any) {
    return res.status(500).json({ success: "fail", error: error?.message });
  }
}
