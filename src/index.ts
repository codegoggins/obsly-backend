import { app } from "@/app.js";
import { logger } from "@/config/logger.js";
import { connectDB } from "@/db/pool.js";

const port = Number(process.env.PORT) || 4000;

await connectDB();

app.listen(port, () => {
  logger.info(`obsly-backend listening on http://localhost:${port}`);
});
