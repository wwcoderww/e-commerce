import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Request, Response } from "express";
import multer from "multer";
import { ProductsService } from "../modules/Products.js";
import { randomUUID } from "crypto";
// File buffer
const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
// S3
const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
  },
});
const s3AddImage = async (productId: string, file: Express.Multer.File) => {
  const fileExtension = file.originalname.split(".").pop() || "jpg";
  const imageKey = `${productId}.${fileExtension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );
  return `https://store-314086897432-us-east-2-an.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;
};
// GET
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await ProductsService.read();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// POST
export const postProduct = async (req: Request, res: Response) => {
  const multerReq = req as Request & { file?: Express.Multer.File };

  const productId = randomUUID();
  let imageUrl;
  try {
    // S3
    if (multerReq.file) imageUrl = await s3AddImage(productId, multerReq.file);
    // ---------------------------------
    // Push to postgre db
    const data = await ProductsService.create({
      ...multerReq.body,
      id: productId,
      image: `${multerReq.file ? imageUrl : ""}`,
    });
    // Success
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.log(error);
    // If error = Unique name
    if (error?.cause?.code === "23505" || error?.code === "23505") {
      return res.status(400).json({
        success: false,
        errors: [
          { field: "name", message: "This product name is already in use." },
        ],
      });
    }
    // Unknown errors
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
// DELETE
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id as string;
    // S3 Bucket
    const [{ image }] = await ProductsService.getSingle(productId);
    if (image) {
      const bucketKey = process.env.AWS_BUCKET_NAME;
      const productImageKey = image.split("/")[3];
      if (!bucketKey || !productImageKey) throw new Error("S3");
      await s3Client.send(
        new DeleteObjectCommand({ Bucket: bucketKey, Key: productImageKey }),
      );
    }
    // -----------------------------------------------------
    // Database delete
    await ProductsService.delete(productId);
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    if (error instanceof Error)
      if (error.message === "S3")
        return res.status(400).json({ success: false, error: "S3 Error" });
    res.status(500).json({ error: "Internal server error" });
  }
};
// PUT
export const putProduct = async (req: Request, res: Response) => {
  const multerReq = req as Request & { file?: Express.Multer.File };

  try {
    let imageUrl = "";
    //S3
    if (multerReq.file)
      imageUrl = await s3AddImage(multerReq.body.id, multerReq.file);
    // -----------------------------------------------------
    const updatedItem = {
      ...multerReq.body,
      image: `${multerReq.file ? imageUrl : ""}`,
    };
    await ProductsService.update(updatedItem);
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
