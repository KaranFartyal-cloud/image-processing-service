import express from "express";

import { authLimiter } from "../middlewares/rateLimiters/authRateLimiter.ts";
import {
  getGogleLoginCallback,
  getGoogleLoginPage,
  login,
  registerUser,
} from "../controllers/auth.controller.ts";

const router = express.Router();

router.route("/login").post(authLimiter, login);
router.route("/register").post(registerUser);
router.route("/google").get(getGoogleLoginPage);
router.route("/auth/google/callback").get(getGogleLoginCallback);
export default router;
