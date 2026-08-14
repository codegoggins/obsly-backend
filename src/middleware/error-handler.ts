import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError, NotFoundError } from "@/utils/errors.js";
import { logger } from "@/config/logger.js";

export const notFoundHandler: RequestHandler = (req) => {
  throw new NotFoundError(`Cannot ${req.method} ${req.path}`);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.status).json({
      error: { code: err.code, message: err.message, fields: err.fields },
    });
    return;
  }

  logger.error("unhandled error", err);

  res.status(500).json({
    error: { code: "INTERNAL", message: "Something went wrong" },
  });
};
