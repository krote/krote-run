import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './db/schema';

/**
 * Cloudflare Workers ではモジュールレベルで D1 バインディングにアクセスできないため、
 * リクエストごとに auth インスタンスを生成する。
 */
export function createAuth(d1: D1Database) {
  const db = drizzle(d1, { schema });

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
    secret: process.env.BETTER_AUTH_SECRET ?? 'dev-secret-change-in-production',
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        // プロフィール情報のみ（カレンダーAPIは使わずURLスキームで代替）
        scope: ['openid', 'email', 'profile'],
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
