import { db } from "../config/db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import ApiError from "../errors/customError.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ApiError("All fields required", 400);
    }

    const [existingUser] = await db.execute<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    console.log(existingUser);

    if (existingUser.length > 0) {
      throw new ApiError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  },
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError("email and password is required", 403);
  }

  const [rows] = await db.execute<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );

  if (rows.length === 0) {
    throw new ApiError("invalid email or password", 401);
  }

  const user = rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError("invalid credentials", 403);
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === "production" ? true : false;

  return res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    })
    .json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
});
