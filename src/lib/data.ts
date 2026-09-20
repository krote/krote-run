import { cache } from "react";
import { unstable_cache } from "next/cache";
import { eq, and, ne, gte, asc, sql, inArray } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDatabase, type DB } from "./db/client";
import * as schema from "./db/schema";
import type { Race, Prefecture, GiftCategory, GiftCategoryId, RaceSeries } from "./types";
import { assembleRace, toSeriesId } from "./data-mappers";
import { getTodayJST, addDaysJST } from "./utils/date";
import { buildGearStats, deriveResultBucket, DEFAULT_MIN_USERS_PER_BUCKET, type GearStatsRow, type GearStatsBucketResult } from "./gear-stats";

/**
 * 「みんなの装備」の匿名集計しきい値（走力帯あたりの最低公開ユーザー数）。
 * GEAR_STATS_MIN_USERS 環境変数で運用側から上書き可能（未設定・不正値時はデフォルトの3人）。
 * getCloudflareContext().env はCloudflareバインディング用、process.env はローカルdevのフォールバック。
 */
function getGearStatsMinUsers(): number {
  const { env } = getCloudflareContext();
  const raw = (env as unknown as Record<string, string>).GEAR_STATS_MIN_USERS ?? process.env.GEAR_STATS_MIN_USERS;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : DEFAULT_MIN_USERS_PER_BUCKET;
}

/**
 * データキャッシュ（unstable_cache）の保持時間。
 *
 * レースデータの更新経路は「クロール → JSONコミット → デプロイ」であり、デプロイすると
 * OPEN_NEXT_BUILD_ID が変わってキャッシュキーごと入れ替わるため全エントリが即座に無効化される。
 * このTTLが実際に効くのは、デプロイを伴わずに db:seed-races:remote だけ実行した場合の反映遅延のみ。
 *
 * 各取得関数は cache(unstable_cache(...)) の二段構成:
 *   - React cache      … 同一リクエスト内の重複呼び出しを束ねる
 *   - unstable_cache   … リクエストをまたいで結果を保持し、D1へのアクセス自体を消す
 */
const CACHE_TTL_SECONDS = 60 * 60;

// ==================
// rows_read 削減のための共通処理
// ==================
//
// D1 の rows_read は「走査した行数」であり、ORDER BY のソート処理で読んだ行も加算される
// （sort_order にインデックスが無いため、全件 + ソートで実テーブル行数の2倍が計上される）。
// そのため一覧系クエリでは
//   1. 子テーブルは表示対象のレースIDだけに絞る（inArray）
//   2. ORDER BY はSQLで発行せず、JS側で整列する
// の2点を徹底する。

/** race_id ごとに行をグループ化する */
function groupByRaceId<T extends { race_id: string }>(rows: T[]): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const row of rows) {
    const bucket = map.get(row.race_id);
    if (bucket) bucket.push(row);
    else map.set(row.race_id, [row]);
  }
  return map;
}

/** race_id ごとにグループ化し、各グループを sort_order 昇順に整列する（安定ソートのため同順位は取得順を保つ） */
function groupByRaceIdSorted<T extends { race_id: string; sort_order: number }>(rows: T[]): Map<string, T[]> {
  const map = groupByRaceId(rows);
  for (const bucket of map.values()) bucket.sort((a, b) => a.sort_order - b.sort_order);
  return map;
}

type ListRelatedRows = {
  categories:     Map<string, (typeof schema.race_categories.$inferSelect)[]>;
  gifts:          Map<string, (typeof schema.participation_gifts.$inferSelect)[]>;
  entryPeriods:   Map<string, (typeof schema.race_entry_periods.$inferSelect)[]>;
  completionGifts:Map<string, (typeof schema.completion_gifts.$inferSelect)[]>;
};

const EMPTY_LIST_RELATED: ListRelatedRows = {
  categories: new Map(), gifts: new Map(), entryPeriods: new Map(), completionGifts: new Map(),
};

/** 一覧表示に必要な子テーブルを、対象レースのIDだけに絞って取得する */
async function loadListRelatedRows(db: DB, raceIds: string[]): Promise<ListRelatedRows> {
  if (raceIds.length === 0) return EMPTY_LIST_RELATED;

  const [categoryRows, giftRows, entryPeriodRows, completionGiftRows] = await db.batch([
    db.select().from(schema.race_categories).where(inArray(schema.race_categories.race_id, raceIds)),
    db.select().from(schema.participation_gifts).where(inArray(schema.participation_gifts.race_id, raceIds)),
    db.select().from(schema.race_entry_periods).where(inArray(schema.race_entry_periods.race_id, raceIds)),
    db.select().from(schema.completion_gifts).where(inArray(schema.completion_gifts.race_id, raceIds)),
  ]);

  return {
    categories:      groupByRaceIdSorted(categoryRows),
    gifts:           groupByRaceIdSorted(giftRows),
    entryPeriods:    groupByRaceIdSorted(entryPeriodRows),
    completionGifts: groupByRaceIdSorted(completionGiftRows),
  };
}

function assembleListRaces(raceRows: (typeof schema.races.$inferSelect)[], related: ListRelatedRows): Race[] {
  return raceRows.map((row) =>
    assembleRace(row, {
      categories:         related.categories.get(row.id) ?? [],
      giftRows:           related.gifts.get(row.id) ?? [],
      entryPeriodRows:    related.entryPeriods.get(row.id) ?? [],
      completionGiftRows: related.completionGifts.get(row.id) ?? [],
    }),
  );
}

// ==================
// Race data
// ==================

export const getRaces = cache(unstable_cache(async (): Promise<Race[]> => {
  const db = getDatabase();

  const [raceRows, categoryRows, giftRows, entryPeriodRows, completionGiftRows, receptionSessionRows, travelTimeRows] = await db.batch([
    db.select().from(schema.races).orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories),
    db.select().from(schema.participation_gifts),
    db.select().from(schema.race_entry_periods),
    db.select().from(schema.completion_gifts),
    db.select().from(schema.reception_sessions),
    db.select().from(schema.race_travel_times),
  ]);

  const categories     = groupByRaceIdSorted(categoryRows);
  const gifts          = groupByRaceIdSorted(giftRows);
  const entryPeriods   = groupByRaceIdSorted(entryPeriodRows);
  const completionGift = groupByRaceIdSorted(completionGiftRows);
  const receptions     = groupByRaceIdSorted(receptionSessionRows);
  const travelTimes    = groupByRaceId(travelTimeRows);

  return raceRows.map((row) =>
    assembleRace(row, {
      categories:            categories.get(row.id) ?? [],
      giftRows:              gifts.get(row.id) ?? [],
      entryPeriodRows:       entryPeriods.get(row.id) ?? [],
      completionGiftRows:    completionGift.get(row.id) ?? [],
      receptionSessionRows:  receptions.get(row.id) ?? [],
      travelTimeRows:        travelTimes.get(row.id) ?? [],
    }),
  );
}, ['races'], { revalidate: CACHE_TTL_SECONDS }));

/** サイトマップ用: レース一覧に必要な最小限の列だけを返す（子テーブルは引かない） */
export const getRaceIndexEntries = cache(unstable_cache(async (): Promise<{ id: string; name_ja: string; name_en: string; date: string }[]> => {
  const db = getDatabase();
  return db
    .select({ id: schema.races.id, name_ja: schema.races.name_ja, name_en: schema.races.name_en, date: schema.races.date })
    .from(schema.races)
    .orderBy(asc(schema.races.date));
}, ['race-index-entries'], { revalidate: CACHE_TTL_SECONDS }));

export const getRaceById = cache(unstable_cache(async (id: string): Promise<Race | null> => {
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
}, ['race-by-id'], { revalidate: CACHE_TTL_SECONDS }));

/**
 * レースの「みんなの装備」走力帯別集計を取得する。
 * gear_is_public=true のユーザーのみ対象。getRaceById() には含めない（一覧クエリを重くしないため）。
 */
export async function getRaceGearStats(raceId: string): Promise<GearStatsBucketResult[]> {
  const db = getDatabase();

  const publicUserRaces = await db
    .select()
    .from(schema.user_races)
    .where(and(eq(schema.user_races.race_id, raceId), eq(schema.user_races.gear_is_public, true)));

  if (publicUserRaces.length === 0) return [];

  const userRaceIds = publicUserRaces.map((ur) => ur.id);

  const [raceGearRows, gearRows, resultRows, categoryRows] = await db.batch([
    db.select().from(schema.user_race_gear).where(inArray(schema.user_race_gear.user_race_id, userRaceIds)),
    db.select().from(schema.user_gear),
    db.select().from(schema.user_race_results).where(inArray(schema.user_race_results.user_race_id, userRaceIds)),
    db.select().from(schema.race_categories).where(eq(schema.race_categories.race_id, raceId)),
  ]);

  const gearById = new Map(gearRows.map((g) => [g.id, g]));
  const resultByUserRaceId = new Map(resultRows.map((r) => [r.user_race_id, r]));
  const bucketByUserRaceId = new Map(
    userRaceIds.map((id) => [id, deriveResultBucket(resultByUserRaceId.get(id) ?? null, categoryRows)]),
  );

  const rows: GearStatsRow[] = raceGearRows
    .map((rg): GearStatsRow | null => {
      const gear = gearById.get(rg.gear_id);
      if (!gear) return null;
      return {
        userRaceId: rg.user_race_id,
        bucket: bucketByUserRaceId.get(rg.user_race_id) ?? null,
        gearId: gear.id,
        category: gear.category as GearStatsRow["category"],
        brand: gear.brand,
        name: gear.name,
        asin: gear.asin,
        used: rg.used,
      };
    })
    .filter((r): r is GearStatsRow => r !== null);

  return buildGearStats(rows, getGearStatsMinUsers());
}

export async function getRacesByPrefecture(prefecture: string): Promise<Race[]> {
  const races = await getRaces();
  return races.filter((r) => r.prefecture === prefecture);
}

// 以下3関数は「今日（JST）」を条件に含むため、getTodayJST() の結果をキャッシュ対象関数の
// 引数として渡す。unstable_cache は引数をキャッシュキーに含めるため、日付が変われば
// 自動的に別エントリになり、日付境界をまたいで古い判定結果が残ることがない。

const fetchUpcomingRaces = unstable_cache(async (today: string, limit: number): Promise<Race[]> => {
  const db = getDatabase();

  const raceRows = await db
    .select().from(schema.races)
    .where(gte(schema.races.date, today))
    .orderBy(asc(schema.races.date))
    .limit(limit);

  return assembleListRaces(raceRows, await loadListRelatedRows(db, raceRows.map((r) => r.id)));
}, ['upcoming-races'], { revalidate: CACHE_TTL_SECONDS });

export const getUpcomingRaces = cache((limit = 6): Promise<Race[]> => fetchUpcomingRaces(getTodayJST(), limit));

const fetchOpenEntryRaces = unstable_cache(async (today: string, limit: number): Promise<Race[]> => {
  const db = getDatabase();

  // date の索引で走査開始位置を絞るため、開催済みのレースは先に除外する（開催後にエントリー受付中はありえない）
  const raceRows = await db
    .select().from(schema.races)
    .where(
      and(
        gte(schema.races.date, today),
        sql`EXISTS (
          SELECT 1 FROM race_entry_periods rep
          WHERE rep.race_id = ${schema.races.id}
            AND rep.start_date <= ${today}
            AND rep.end_date >= ${today}
        )`,
      )
    )
    .orderBy(asc(schema.races.date))
    .limit(limit);

  return assembleListRaces(raceRows, await loadListRelatedRows(db, raceRows.map((r) => r.id)));
}, ['open-entry-races'], { revalidate: CACHE_TTL_SECONDS });

export const getOpenEntryRaces = cache((limit = 8): Promise<Race[]> => fetchOpenEntryRaces(getTodayJST(), limit));

const fetchSoonOpeningEntryRaces = unstable_cache(async (today: string, limit: number): Promise<Race[]> => {
  const db = getDatabase();
  const in30days = addDaysJST(today, 30);

  // 同上。エントリー開始がこれからのレースは必ず未来開催
  const raceRows = await db
    .select().from(schema.races)
    .where(
      and(
        gte(schema.races.date, today),
        sql`EXISTS (
          SELECT 1 FROM race_entry_periods rep
          WHERE rep.race_id = ${schema.races.id}
            AND rep.start_date >= ${today}
            AND rep.start_date <= ${in30days}
        )`,
      )
    )
    .orderBy(asc(schema.races.date))
    .limit(limit);

  return assembleListRaces(raceRows, await loadListRelatedRows(db, raceRows.map((r) => r.id)));
}, ['soon-opening-entry-races'], { revalidate: CACHE_TTL_SECONDS });

export const getSoonOpeningEntryRaces = cache((limit = 6): Promise<Race[]> => fetchSoonOpeningEntryRaces(getTodayJST(), limit));

// ==================
// Prefecture data
// ==================

export const getPrefectures = cache(unstable_cache(async (): Promise<Prefecture[]> => {
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
}, ['prefectures'], { revalidate: CACHE_TTL_SECONDS }));

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

export const getGiftCategories = cache(unstable_cache(async (): Promise<GiftCategory[]> => {
  const db = getDatabase();
  const rows = await db.select().from(schema.gift_categories).all();
  return rows.map((r) => ({
    id: r.id as GiftCategoryId,
    name_ja: r.name_ja,
    name_en: r.name_en,
    icon: r.icon,
  }));
}, ['gift-categories'], { revalidate: CACHE_TTL_SECONDS }));

// ==================
// Race series
// ==================

export { toSeriesId };

export const getSeriesById = cache(unstable_cache(async (seriesId: string): Promise<RaceSeries | null> => {
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
}, ['series-by-id'], { revalidate: CACHE_TTL_SECONDS }));

/** 同シリーズの全大会を日付順で取得（自分自身を除く） */
export const getSeriesRaces = cache(unstable_cache(async (seriesId: string, excludeRaceId: string): Promise<Race[]> => {
  const db = getDatabase();

  // 除外対象はSQL側で落とし、その子行を読まないようにする
  const raceRows = await db
    .select().from(schema.races)
    .where(and(eq(schema.races.series_id, seriesId), ne(schema.races.id, excludeRaceId)))
    .orderBy(asc(schema.races.date));

  const raceIds = raceRows.map((r) => r.id);
  if (raceIds.length === 0) return [];

  const [categoryRows, giftRows, resultRows, completionGiftRows] = await db.batch([
    db.select().from(schema.race_categories).where(inArray(schema.race_categories.race_id, raceIds)),
    db.select().from(schema.participation_gifts).where(inArray(schema.participation_gifts.race_id, raceIds)),
    db.select().from(schema.race_results).where(inArray(schema.race_results.race_id, raceIds)),
    db.select().from(schema.completion_gifts).where(inArray(schema.completion_gifts.race_id, raceIds)),
  ]);

  const categories     = groupByRaceIdSorted(categoryRows);
  const gifts          = groupByRaceIdSorted(giftRows);
  const results        = groupByRaceId(resultRows);
  const completionGift = groupByRaceIdSorted(completionGiftRows);

  return raceRows.map((row) =>
    assembleRace(row, {
      categories:         categories.get(row.id) ?? [],
      giftRows:           gifts.get(row.id) ?? [],
      resultRows:         results.get(row.id) ?? [],
      completionGiftRows: completionGift.get(row.id) ?? [],
    }),
  );
}, ['series-races'], { revalidate: CACHE_TTL_SECONDS }));

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
export const getTotalRaceCount = cache(unstable_cache(async (): Promise<number> => {
  const db = getDatabase();
  const rows = await db.select({ count: sql<number>`count(*)` }).from(schema.races);
  return rows[0]?.count ?? 0;
}, ['total-race-count'], { revalidate: CACHE_TTL_SECONDS }));

const fetchOpenEntryCount = unstable_cache(async (today: string): Promise<number> => {
  const db = getDatabase();
  const rows = await db.select({ count: sql<number>`count(*)` }).from(schema.races).where(
    and(
      gte(schema.races.date, today),
      sql`EXISTS (
        SELECT 1 FROM race_entry_periods rep
        WHERE rep.race_id = ${schema.races.id}
          AND rep.start_date <= ${today}
          AND rep.end_date >= ${today}
      )`,
    )
  );
  return rows[0]?.count ?? 0;
}, ['open-entry-count'], { revalidate: CACHE_TTL_SECONDS });

/** 現在エントリー受付中の大会数 */
export const getOpenEntryCount = cache((): Promise<number> => fetchOpenEntryCount(getTodayJST()));

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
