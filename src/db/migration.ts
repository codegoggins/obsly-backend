import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pool } from "@/db/pool.js";
import { logger } from "@/config/logger.js";

const DIR = path.join(process.cwd(), "migrations");

async function migrate() {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name       text PRIMARY KEY,
        applied_at timestamptz NOT NULL DEFAULT now()
      )
    `);

    const { rows } = await client.query<{ name: string }>(
      "SELECT name FROM schema_migrations",
    );
    const applied = new Set(rows.map((r) => r.name));

    const files = (await readdir(DIR)).filter((f) => f.endsWith(".sql")).sort();
    const pending = files.filter((f) => !applied.has(f));

    if (pending.length === 0) {
      logger.info("no pending migrations");
      return;
    }

    for (const file of pending) {
      const sql = await readFile(path.join(DIR, file), "utf8");
      logger.info(`applying ${file}`);

      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [
          file,
        ]);
        await client.query("COMMIT");
      } catch (err) {
        await client.query("ROLLBACK");
        throw new Error(
          `migration failed: ${file}\n\n${(err as Error).message}`,
        );
      }
    }

    logger.info(`applied ${pending.length} migration(s)`);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  logger.error(err.message);
  process.exit(1);
});
