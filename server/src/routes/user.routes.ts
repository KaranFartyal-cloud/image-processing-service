import express from "express";
import { login, registerUser } from "../controllers/user.controller.ts";
import { authLimiter } from "../middlewares/rateLimiters/authRateLimiter.ts";
import { redis } from "../utils/redisClient.ts";


const router = express.Router();

router.route("/login").post(authLimiter, login);
router.route("/register").post(registerUser);
router.route("/get-posts").get(async (req, res) => {
  try {
    const cachedTodos = await redis.get("todos");

    if (cachedTodos) {
      return res.json({
        status: "cache",
        data: JSON.parse(cachedTodos),
        
      });
    }

    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await result.json();

    await redis.setEx("todos", 60, JSON.stringify(data));

    return res.json({
      status: "not cached",
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



export default router;
