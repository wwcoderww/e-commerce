import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export const validate =
  (scheme: z.ZodType) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const payload = Array.isArray(req.body)
        ? req.body
        : { ...req.body, image: req.file };

      const parseData = await scheme.parseAsync(payload);

      req.body = parseData;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }

      return res.status(500).json({
        sucess: false,
        error: "Middleware: Validate | Internal validation failure",
      });
    }
  };
