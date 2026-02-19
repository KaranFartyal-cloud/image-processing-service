import type{ Request, Response } from "express";
import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    return res.status(429).json({
      message: "Too many login attempts. try again after 1 min.",
    });
  },
});
