import { createClient } from "redis";
import { RedisError } from "../errors/customError.ts";


export const redis = createClient({
  url:
    process.env.NODE_ENV === "development"
      ? "redis://127.0.0.1:6379"
      : process.env.BACKEND_URL,
});

redis.on("connect", () => {
  console.log(" Redis connected");
});

redis.on("error", (err) => {
  const redisError = new RedisError(
    "Redis connection error",
    503,
    "REDIS_CONNECTION_ERROR",
  );

  console.error({
    message: redisError.message,
    code: redisError.code,
    originalError: err.message,
  });
});

await redis.connect();
