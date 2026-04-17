import type { Config } from "drizzle-kit";
import fs from "fs";
import path from "path";
import os from "os";

const d1Dir = path.join(
  os.homedir(),
  ".wrangler/states/krote-run/v3/d1/miniflare-D1DatabaseObject"
);

const sqliteFile = fs.readdirSync(d1Dir).find((f) => f.endsWith(".sqlite"));
if (!sqliteFile) throw new Error(`SQLite file not found in ${d1Dir}`);

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: path.join(d1Dir, sqliteFile),
  },
} satisfies Config;
