/**
 * GET /api/races/index — 大会の id/name/date 一覧（軽量）
 * マイページの大会名解決用
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import { asc } from 'drizzle-orm';
import * as schema from '@/lib/db/schema';

export async function GET() {
  const { env } = getCloudflareContext();
  const db = drizzle(env.DB, { schema });

  const races = await db
    .select({
      id: schema.races.id,
      name_ja: schema.races.name_ja,
      full_name_ja: schema.races.full_name_ja,
      date: schema.races.date,
    })
    .from(schema.races)
    .orderBy(asc(schema.races.date));

  return Response.json(races);
}
