import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "@/router.js";
import { errorHandler, notFoundHandler } from "@/middleware/error-handler.js";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);
