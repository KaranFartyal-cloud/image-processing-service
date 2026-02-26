import express from "express";
import dotenv from "dotenv";
import { checkConnection } from "./config/db.ts";
import userRoutes from "./routes/user.routes.ts";
import errorHandler from "./middlewares/error.handler.ts";
import authRoutes from "./routes/auth.routes.ts";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 5000;

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("hello nigga");
});

await checkConnection();

app.use("/api/user/", userRoutes);
app.use("/", authRoutes);

app.use(errorHandler);

app.listen(port, async () => {
  console.log(`listening at port ${port}`);
});
