import type { RequestHandler } from "express";
import type { ZodType } from "zod";
import { BadRequestError } from "@/utils/errors.js";

export function validate(schema: ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fields: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const key = issue.path.join(".");
        if (key && !fields[key]) fields[key] = issue.message;
      }

      throw new BadRequestError("Validation failed", fields);
    }

    req.body = result.data;
    next();
  };
}
