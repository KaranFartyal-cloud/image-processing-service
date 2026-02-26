import { db } from "../config/db.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import ApiError, { OauthError } from "../errors/customError.ts";
import asyncHandler from "../utils/asyncHandler.ts";
import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import * as arctic from "arctic";
import { google } from "../utils/google.ts";
import type { IOauthUser, IUser } from "../types/schema.ts";

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

  if (!email) {
    throw new ApiError("email is required", 403);
  }

  const [rows] = await db.execute<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email],
  );

  const [OauthRows] = await db.execute<RowDataPacket[]>(
    `SELECT * FROM users WHERE email = ?`,
    [email],
  );

  if (OauthRows.length > 0) {
    throw new ApiError("Please login with your social");
  }

  if (!password) {
    throw new ApiError("password is required", 403);
  }

  if (rows.length === 0) {
    throw new ApiError("invalid email or password", 401);
  }

  const user = rows[0] as IUser;

  const isMatch = await bcrypt.compare(password, user.password!);

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

export const getGoogleLoginPage = asyncHandler(
  async (req: Request, res: Response) => {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];

    const url = google.createAuthorizationURL(state, codeVerifier, scopes);

    const cookieConfig = {
      secure: false, // set to false in localhost
      path: "/",
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
      sameSite: "lax" as "lax",
    };

    res.cookie("google_oauth_state", state, cookieConfig);
    res.cookie("google_oauth_verifier", codeVerifier, cookieConfig);

    console.log("URL ->", url);

    res.redirect(url.toString());
  },
);

export const getGogleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const { code, state } = req.query;

    const {
      google_oauth_state: storedState,
      google_oauth_verifier: storedVerifier,
    } = req.cookies;

    if (!code || !storedState || state !== storedState) {
      throw new OauthError("state is missing or wrong state", 400);
    }

    console.log("code: ", code);
    console.log("state: ", state);
    console.log("stored state: ", storedState);
    console.log("stored Verifier: ", storedVerifier);

    let tokens;
    try {
      tokens = await google.validateAuthorizationCode(
        code as string,
        storedVerifier,
      );
    } catch (e) {
      if (e instanceof arctic.OAuth2RequestError) {
        // Invalid authorization code, credentials, or redirect URI
        const code = e.code;
      }
      if (e instanceof arctic.ArcticFetchError) {
        // Failed to call `fetch()`
        const cause = e.message;
        console.log("cause \n", cause);
        // ...
      }
      throw new OauthError("OAuth token validation failed", 401);
    }

    const claims = arctic.decodeIdToken(tokens.idToken()) as {
      sub: string;
      email?: string;
      name?: string;
    };

    const { sub: googleUserId, name, email } = claims;

    if (!googleUserId) {
      throw new OauthError("Invalid Google token", 400);
    }

    // OAuth already linked
    const [oauthRows] = await db.execute<
      RowDataPacket[] & { userId: number }[]
    >(
      `SELECT userId FROM OauthUsers WHERE provider = ? AND providerUserId = ?`,
      ["google", googleUserId],
    );

    if (oauthRows.length > 0) {
      const user = oauthRows[0] as IOauthUser;
      const userId = user.userId;
      setAuthCookie(res, userId);
      return res.redirect(`httP://localhost:5173`);
    }

    // User exists by email → link OAuth
    if (email) {
      const [users] = await db.execute<RowDataPacket[] & { id: number }[]>(
        `SELECT id FROM users WHERE email = ?`,
        [email],
      );

      if (users.length > 0) {
         const user = oauthRows[0] as IOauthUser;
        const userId = user.id;

        await db.execute(
          `INSERT INTO OauthUsers (provider, providerUserId, userId)
           VALUES (?, ?, ?)`,
          ["google", googleUserId, userId],
        );

        setAuthCookie(res, userId);
        return res.redirect(`httP://localhost:5173`);
      }
    }

    //  New user
    const [result] = await db.execute<ResultSetHeader>(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      [name ?? "Google User", email ?? null, null],
    );

    const userId = result.insertId;

    await db.execute(
      `INSERT INTO OauthUsers (provider, providerUserId, userId)
       VALUES (?, ?, ?)`,
      ["google", googleUserId, userId],
    );

    setAuthCookie(res, userId);
    return res.redirect("http://localhost:5173");
  },
);

const setAuthCookie = (res: Response, userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
  });
};
