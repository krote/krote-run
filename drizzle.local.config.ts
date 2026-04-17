import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "C:/Users/krote/.wrangler/states/krote-run/v3/d1/miniflare-D1DatabaseObject/84f40e262d00cd26ab28e11a0c126031ef920a474814913b612e315f91cb0580.sqlite",
  },
} satisfies Config;
