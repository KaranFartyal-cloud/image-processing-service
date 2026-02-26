import jwt from "jsonwebtoken";

import { AuthError } from "../errors/customError.ts";
import type { NextFunction, Request, Response } from "express";
import type { JwtPayloadWithUserId } from "../types/jwt_types.ts";
import asyncHandler from "../utils/asyncHandler.ts";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;
    if (!token) {
      throw new AuthError();
    }

    const decode = (await jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    )) as JwtPayloadWithUserId;

    if (!decode) {
      throw new AuthError();
    }

    req.id = decode.userId;
    next();
  },
);
