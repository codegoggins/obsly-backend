import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const name = process.argv[2];

if (!name) {
  console.error("usage: pnpm db:new <name>");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.]/g, "").slice(0, 17);
const fileName = `${stamp}_${name}.sql`;
const filePath = path.join(process.cwd(), "migrations", fileName);

await mkdir(path.dirname(filePath), { recursive: true });
await writeFile(filePath, "", { flag: "wx" });

console.log(`created migrations/${fileName}`);
