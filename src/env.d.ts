/// <reference types="@cloudflare/workers-types" />

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    R2: R2Bucket;
    AMAZON_CLIENT_ID: string;
    AMAZON_CLIENT_SECRET: string;
    AMAZON_PARTNER_TAG: string;
  }
}

export {};
