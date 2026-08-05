import winston from "winston";

const isProduction = process.env.NODE_ENV === "production";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  format: isProduction
    ? winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      )
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.printf(
          ({ timestamp, level, message, stack }) =>
            `${timestamp} ${level} ${stack ?? message}`,
        ),
      ),
  transports: [new winston.transports.Console()],
});
