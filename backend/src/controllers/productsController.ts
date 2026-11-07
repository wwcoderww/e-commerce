import { Request, Response } from "express";
import { ProductsService } from "../modules/Products.js";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createProductScheme } from "../schema/productsScheme.js";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
  },
});

type RequestWithFile = Request & { file?: Express.Multer.File };

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const allProducts = await ProductsService.read();
    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const postProduct = async (req: RequestWithFile, res: Response) => {
  try {
    // Validate (zod)
    const validation = createProductScheme.safeParse({
      ...req.body,
      image: req.file,
    });
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.issues.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
    // ---------------------------------
    // S3
    let imageKey = null;
    if (req.file) {
      const fileBuffer = req.file.buffer;
      const fileExtension = req.file.originalname.split(".").pop() || "jpg";
      imageKey = `${validation.data.name}.${fileExtension}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey,
          Body: fileBuffer,
          ContentType: req.file.mimetype,
        }),
      );
    }
    // ---------------------------------
    // Push to postgre db
    const { image, ...productTextFields } = validation.data;
    const data = await ProductsService.create({
      ...productTextFields,
      image: imageKey,
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleteID = Number(req.params.id);
    const result = await ProductsService.delete(deleteID);
    console.log(result);
    return res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const putProduct = async (req: Request, res: Response) => {
  try {
    const updatedItem = req.body;
    const updatedID = Number(req.params.id);
    console.log(req.body);
    const result = await ProductsService.update(updatedItem, updatedID);
    console.log(result);
    // If no matching ID POST
    if (result.length === 0) return postProduct(req, res);
    // Check if ran sucessfully
    // if (result.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ status: "fail", message: "No matching ID" });
    // }
    // On sucess
    return res.status(200).json({ status: "success", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
