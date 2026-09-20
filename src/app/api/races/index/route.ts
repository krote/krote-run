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

  const [raceRows, categoryRows] = await db.batch([
    db.select({
      id: schema.races.id,
      name_ja: schema.races.name_ja,
      full_name_ja: schema.races.full_name_ja,
      date: schema.races.date,
    }).from(schema.races).orderBy(asc(schema.races.date)),
    // ORDER BY のソートで走査した行も D1 の rows_read に計上されるため、並べ替えはJS側で行う
    db.select({
      id: schema.race_categories.id,
      race_id: schema.race_categories.race_id,
      name_ja: schema.race_categories.name_ja,
      name_en: schema.race_categories.name_en,
      distance_km: schema.race_categories.distance_km,
      distance_type: schema.race_categories.distance_type,
      sort_order: schema.race_categories.sort_order,
    }).from(schema.race_categories),
  ]);

  const catsByRace = new Map<string, typeof categoryRows>();
  for (const cat of categoryRows) {
    if (!catsByRace.has(cat.race_id)) catsByRace.set(cat.race_id, []);
    catsByRace.get(cat.race_id)!.push(cat);
  }
  for (const cats of catsByRace.values()) cats.sort((a, b) => a.sort_order - b.sort_order);

  const races = raceRows.map((r) => ({
    ...r,
    categories: catsByRace.get(r.id) ?? [],
  }));

  return Response.json(races);
}
