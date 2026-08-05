import { Pool } from "pg";
import { logger } from "@/config/logger.js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000,
});

pool.on("error", (err) => {
  logger.error("unexpected database pool error", err);
});

export async function connectDB(): Promise<void> {
  const { rows } = await pool.query<{ now: Date }>("select now()");
  logger.info(`database connected at ${rows[0]?.now.toISOString()}`);
}

export async function disconnectDB(): Promise<void> {
  await pool.end();
  logger.info("database pool closed");
}
