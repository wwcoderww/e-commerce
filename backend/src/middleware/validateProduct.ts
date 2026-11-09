import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export const validate =
  (scheme: z.ZodType) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const payload = { ...req.body, image: req.file };

      const parseData = await scheme.parseAsync(payload);

      req.body = parseData;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }

      return res.status(500).json({ error: "Internal validation failure" });
    }
  };
