import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || session.user.role !== "admin")
      return res.status(403).json({
        success: false,
        error: "Not admin",
        debug: {
          hasCookieHeader: Boolean(req.headers.cookie),
          cookieNames: req.headers.cookie
            ? req.headers.cookie.split(";").map((c) => c.split("=")[0].trim())
            : [],
          sessionFound: Boolean(session),
          userRole: session?.user?.role || null,
        },
      });
    next();
  } catch (error) {
    console.error("Admin auth error", error);
    return res
      .status(500)
      .json({ success: false, error: "Backend auth error" });
  }
}
