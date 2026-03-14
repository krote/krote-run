import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export type DB = ReturnType<typeof getDatabase>;

export function getDatabase() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}
