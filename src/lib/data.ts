import { eq, gte, asc, sql } from "drizzle-orm";
import { getDatabase } from "./db/client";
import * as schema from "./db/schema";
import type { Race, Prefecture, GiftCategory, GiftCategoryId, RaceSeries } from "./types";
import { assembleRace, toSeriesId } from "./data-mappers";

// ==================
// Race data
// ==================

export async function getRaces(): Promise<Race[]> {
  const db = getDatabase();

  const [raceRows, categoryRows, giftRows, entryPeriodRows, completionGiftRows, receptionSessionRows, travelTimeRows] = await db.batch([
    db.select().from(schema.races).orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories).orderBy(asc(schema.race_categories.sort_order)),
    db.select().from(schema.participation_gifts).orderBy(asc(schema.participation_gifts.sort_order)),
    db.select().from(schema.race_entry_periods).orderBy(asc(schema.race_entry_periods.sort_order)),
    db.select().from(schema.completion_gifts).orderBy(asc(schema.completion_gifts.sort_order)),
    db.select().from(schema.reception_sessions).orderBy(asc(schema.reception_sessions.sort_order)),
    db.select().from(schema.race_travel_times),
  ]);

  return raceRows.map((row) =>
    assembleRace(row, {
      categories:            categoryRows.filter((c) => c.race_id === row.id),
      giftRows:              giftRows.filter((g) => g.race_id === row.id),
      entryPeriodRows:       entryPeriodRows.filter((p) => p.race_id === row.id),
      completionGiftRows:    completionGiftRows.filter((g) => g.race_id === row.id),
      receptionSessionRows:  receptionSessionRows.filter((s) => s.race_id === row.id),
      travelTimeRows:        travelTimeRows.filter((t) => t.race_id === row.id),
    }),
  );
}

export async function getRaceById(id: string): Promise<Race | null> {
  const db = getDatabase();

  const [raceRows, categoryRows, aidRows, checkRows, accessRows, spotRows, weatherRows, giftRows, resultRows, entryPeriodRows, entryLinkRows, galleryRows, voiceRows, timeBucketRows, courseHighlightRows, completionGiftRows, receptionSessionRows, travelTimeRows] =
    await db.batch([
      db.select().from(schema.races).where(eq(schema.races.id, id)),
      db.select().from(schema.race_categories).where(eq(schema.race_categories.race_id, id)).orderBy(asc(schema.race_categories.sort_order)),
      db.select().from(schema.aid_stations).where(eq(schema.aid_stations.race_id, id)),
      db.select().from(schema.checkpoints).where(eq(schema.checkpoints.race_id, id)),
      db.select().from(schema.access_points).where(eq(schema.access_points.race_id, id)).orderBy(asc(schema.access_points.sort_order)),
      db.select().from(schema.nearby_spots).where(eq(schema.nearby_spots.race_id, id)),
      db.select().from(schema.weather_history).where(eq(schema.weather_history.race_id, id)),
      db.select().from(schema.participation_gifts).where(eq(schema.participation_gifts.race_id, id)).orderBy(asc(schema.participation_gifts.sort_order)),
      db.select().from(schema.race_results).where(eq(schema.race_results.race_id, id)),
      db.select().from(schema.race_entry_periods).where(eq(schema.race_entry_periods.race_id, id)).orderBy(asc(schema.race_entry_periods.sort_order)),
      db.select().from(schema.race_entry_links).where(eq(schema.race_entry_links.race_id, id)).orderBy(asc(schema.race_entry_links.sort_order)),
      db.select().from(schema.race_gallery).where(eq(schema.race_gallery.race_id, id)).orderBy(asc(schema.race_gallery.sort_order)),
      db.select().from(schema.race_voices).where(eq(schema.race_voices.race_id, id)).orderBy(asc(schema.race_voices.sort_order)),
      db.select().from(schema.race_time_buckets).where(eq(schema.race_time_buckets.race_id, id)).orderBy(asc(schema.race_time_buckets.sort_order)),
      db.select().from(schema.race_course_highlights).where(eq(schema.race_course_highlights.race_id, id)).orderBy(asc(schema.race_course_highlights.sort_order)),
      db.select().from(schema.completion_gifts).where(eq(schema.completion_gifts.race_id, id)).orderBy(asc(schema.completion_gifts.sort_order)),
      db.select().from(schema.reception_sessions).where(eq(schema.reception_sessions.race_id, id)).orderBy(asc(schema.reception_sessions.sort_order)),
      db.select().from(schema.race_travel_times).where(eq(schema.race_travel_times.race_id, id)),
    ]);

  const row = raceRows[0];
  if (!row) return null;

  return assembleRace(row, {
    categories:           categoryRows,
    aidStations:          aidRows,
    checkpointRows:       checkRows,
    accessPointRows:      accessRows,
    nearbySpotRows:       spotRows,
    weatherRows:          weatherRows,
    giftRows:             giftRows,
    resultRows:           resultRows,
    entryPeriodRows:      entryPeriodRows,
    entryLinkRows:        entryLinkRows,
    galleryRows:          galleryRows,
    voiceRows:            voiceRows,
    timeBucketRows:       timeBucketRows,
    courseHighlightRows:  courseHighlightRows,
    completionGiftRows:   completionGiftRows,
    receptionSessionRows: receptionSessionRows,
    travelTimeRows:       travelTimeRows,
  });
}

export async function getRacesByPrefecture(prefecture: string): Promise<Race[]> {
  const races = await getRaces();
  return races.filter((r) => r.prefecture === prefecture);
}

export async function getUpcomingRaces(limit = 6): Promise<Race[]> {
  const db = getDatabase();
  const today = new Date().toISOString().split("T")[0];

  const [raceRows, categoryRows, giftRows, entryPeriodRows, completionGiftRows] = await db.batch([
    db.select().from(schema.races).where(gte(schema.races.date, today)).orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories).orderBy(asc(schema.race_categories.sort_order)),
    db.select().from(schema.participation_gifts),
    db.select().from(schema.race_entry_periods).orderBy(asc(schema.race_entry_periods.sort_order)),
    db.select().from(schema.completion_gifts),
  ]);

  const limited = raceRows.slice(0, limit);

  return limited.map((row) =>
    assembleRace(row, {
      categories:         categoryRows.filter((c) => c.race_id === row.id),
      giftRows:           giftRows.filter((g) => g.race_id === row.id),
      entryPeriodRows:    entryPeriodRows.filter((p) => p.race_id === row.id),
      completionGiftRows: completionGiftRows.filter((g) => g.race_id === row.id),
    }),
  );
}

export async function getOpenEntryRaces(limit = 8): Promise<Race[]> {
  const db = getDatabase();
  const today = new Date().toISOString().split("T")[0];

  const [raceRows, categoryRows, giftRows, entryPeriodRows, completionGiftRows] = await db.batch([
    db.select().from(schema.races).where(
      sql`EXISTS (
        SELECT 1 FROM race_entry_periods rep
        WHERE rep.race_id = ${schema.races.id}
          AND rep.start_date <= ${today}
          AND rep.end_date >= ${today}
      )`
    ).orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories).orderBy(asc(schema.race_categories.sort_order)),
    db.select().from(schema.participation_gifts),
    db.select().from(schema.race_entry_periods).orderBy(asc(schema.race_entry_periods.sort_order)),
    db.select().from(schema.completion_gifts),
  ]);

  return raceRows.slice(0, limit).map((row) =>
    assembleRace(row, {
      categories:         categoryRows.filter((c) => c.race_id === row.id),
      giftRows:           giftRows.filter((g) => g.race_id === row.id),
      entryPeriodRows:    entryPeriodRows.filter((p) => p.race_id === row.id),
      completionGiftRows: completionGiftRows.filter((g) => g.race_id === row.id),
    }),
  );
}

export async function getSoonOpeningEntryRaces(limit = 6): Promise<Race[]> {
  const db = getDatabase();
  const today = new Date().toISOString().split("T")[0];
  const in30days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [raceRows, categoryRows, giftRows, entryPeriodRows, completionGiftRows] = await db.batch([
    db.select().from(schema.races).where(
      sql`EXISTS (
        SELECT 1 FROM race_entry_periods rep
        WHERE rep.race_id = ${schema.races.id}
          AND rep.start_date >= ${today}
          AND rep.start_date <= ${in30days}
      )`
    ).orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories).orderBy(asc(schema.race_categories.sort_order)),
    db.select().from(schema.participation_gifts),
    db.select().from(schema.race_entry_periods).orderBy(asc(schema.race_entry_periods.sort_order)),
    db.select().from(schema.completion_gifts),
  ]);

  return raceRows.slice(0, limit).map((row) =>
    assembleRace(row, {
      categories:         categoryRows.filter((c) => c.race_id === row.id),
      giftRows:           giftRows.filter((g) => g.race_id === row.id),
      entryPeriodRows:    entryPeriodRows.filter((p) => p.race_id === row.id),
      completionGiftRows: completionGiftRows.filter((g) => g.race_id === row.id),
    }),
  );
}

// ==================
// Prefecture data
// ==================

export async function getPrefectures(): Promise<Prefecture[]> {
  const db = getDatabase();
  const rows = await db.select().from(schema.prefectures).all();
  return rows.map((r) => ({
    code: r.code,
    name: r.name,
    nameEn: r.name_en,
    region: r.region,
    regionEn: r.region_en,
    lat: r.lat,
    lng: r.lng,
  }));
}

export async function getPrefectureByCode(code: string): Promise<Prefecture | null> {
  const db = getDatabase();
  const rows = await db.select().from(schema.prefectures).where(eq(schema.prefectures.code, code));
  const r = rows[0];
  if (!r) return null;
  return {
    code: r.code,
    name: r.name,
    nameEn: r.name_en,
    region: r.region,
    regionEn: r.region_en,
    lat: r.lat,
    lng: r.lng,
  };
}

// ==================
// Gift category data
// ==================

export async function getGiftCategories(): Promise<GiftCategory[]> {
  const db = getDatabase();
  const rows = await db.select().from(schema.gift_categories).all();
  return rows.map((r) => ({
    id: r.id as GiftCategoryId,
    name_ja: r.name_ja,
    name_en: r.name_en,
    icon: r.icon,
  }));
}

// ==================
// Race series
// ==================

export { toSeriesId };

export async function getSeriesById(seriesId: string): Promise<RaceSeries | null> {
  const db = getDatabase();
  const rows = await db.select().from(schema.race_series).where(eq(schema.race_series.id, seriesId));
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id,
    name_ja: r.name_ja,
    name_en: r.name_en,
    first_held_year: r.first_held_year ?? null,
    website_url: r.website_url ?? null,
  };
}

/** 同シリーズの全大会を日付降順で取得（自分自身を除く） */
export async function getSeriesRaces(seriesId: string, excludeRaceId: string): Promise<Race[]> {
  const db = getDatabase();

  const [raceRows, categoryRows, giftRows, resultRows, completionGiftRows] = await db.batch([
    db.select().from(schema.races)
      .where(eq(schema.races.series_id, seriesId))
      .orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories).orderBy(asc(schema.race_categories.sort_order)),
    db.select().from(schema.participation_gifts),
    db.select().from(schema.race_results),
    db.select().from(schema.completion_gifts),
  ]);

  return raceRows
    .filter((row) => row.id !== excludeRaceId)
    .map((row) =>
      assembleRace(row, {
        categories:         categoryRows.filter((c) => c.race_id === row.id),
        giftRows:           giftRows.filter((g) => g.race_id === row.id),
        resultRows:         resultRows.filter((r) => r.race_id === row.id),
        completionGiftRows: completionGiftRows.filter((g) => g.race_id === row.id),
      }),
    );
}

export async function getAllSeries(): Promise<RaceSeries[]> {
  const db = getDatabase();
  const rows = await db.select().from(schema.race_series).orderBy(asc(schema.race_series.name_ja));
  return rows.map((r) => ({
    id: r.id,
    name_ja: r.name_ja,
    name_en: r.name_en,
    first_held_year: r.first_held_year ?? null,
    website_url: r.website_url ?? null,
  }));
}

export async function getAllPrefectures(): Promise<Prefecture[]> {
  const db = getDatabase();
  const rows = await db.select().from(schema.prefectures).orderBy(asc(schema.prefectures.code));
  return rows.map((r) => ({
    code: r.code,
    name: r.name,
    nameEn: r.name_en,
    region: r.region,
    regionEn: r.region_en,
    lat: r.lat,
    lng: r.lng,
  }));
}

/** 管理画面用: 全レースの基本情報を返す（詳細なし） */
export async function getAdminRaces(): Promise<{ id: string; name_ja: string; date: string; prefecture: string }[]> {
  const db = getDatabase();
  const rows = await db
    .select({ id: schema.races.id, name_ja: schema.races.name_ja, date: schema.races.date, prefecture: schema.races.prefecture })
    .from(schema.races)
    .orderBy(asc(schema.races.date));
  return rows;
}

/** 全登録大会数 */
export async function getTotalRaceCount(): Promise<number> {
  const db = getDatabase();
  const rows = await db.select({ count: sql<number>`count(*)` }).from(schema.races);
  return rows[0]?.count ?? 0;
}

/** 現在エントリー受付中の大会数 */
export async function getOpenEntryCount(): Promise<number> {
  const db = getDatabase();
  const today = new Date().toISOString().split("T")[0];
  const rows = await db.select({ count: sql<number>`count(*)` }).from(schema.races).where(
    sql`EXISTS (
      SELECT 1 FROM race_entry_periods rep
      WHERE rep.race_id = ${schema.races.id}
        AND rep.start_date <= ${today}
        AND rep.end_date >= ${today}
    )`
  );
  return rows[0]?.count ?? 0;
}

export async function getGiftCategoryById(id: string): Promise<GiftCategory | null> {
  const db = getDatabase();
  const rows = await db.select().from(schema.gift_categories).where(eq(schema.gift_categories.id, id));
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id as GiftCategoryId,
    name_ja: r.name_ja,
    name_en: r.name_en,
    icon: r.icon,
  };
}
