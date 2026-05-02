import { eq, gte, asc, sql } from "drizzle-orm";
import { getDatabase } from "./db/client";
import * as schema from "./db/schema";
import type {
  Race, Prefecture, GiftCategory, RaceCategory, Wave, CourseInfo,
  AidStation, Checkpoint, AccessPoint, NearbySpot, WeatherHistory,
  ParticipationGift, GiftCategoryId, CourseSurface, ReceptionType, NearbySpotType,
  RaceSeries, RaceResult, EntryPeriod, EntryLink,
} from "./types";

// ==================
// Row → Type 変換ヘルパー
// ==================

function parseJson<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

type RaceRow = typeof schema.races.$inferSelect;
type CategoryRow = typeof schema.race_categories.$inferSelect;
type AidStationRow = typeof schema.aid_stations.$inferSelect;
type CheckpointRow = typeof schema.checkpoints.$inferSelect;
type AccessPointRow = typeof schema.access_points.$inferSelect;
type NearbySpotRow = typeof schema.nearby_spots.$inferSelect;
type WeatherRow = typeof schema.weather_history.$inferSelect;
type GiftRow = typeof schema.participation_gifts.$inferSelect;

function rowToCategory(row: CategoryRow): RaceCategory {
  return {
    id: row.id,
    distance_type: row.distance_type as RaceCategory["distance_type"],
    distance_km: row.distance_km,
    time_limit_minutes: row.time_limit_minutes,
    start_time: row.start_time,
    capacity: row.capacity,
    entry_fee: row.entry_fee ?? null,
    entry_fee_u25: row.entry_fee_u25 ?? null,
    name_ja: row.name_ja ?? null,
    name_en: row.name_en ?? null,
    description_ja: row.description_ja ?? null,
    description_en: row.description_en ?? null,
    eligibility_ja: row.eligibility_ja ?? null,
    eligibility_en: row.eligibility_en ?? null,
    course_gpx_file: row.course_gpx_file ?? null,
    waves: parseJson<Wave[] | null>(row.waves, null),
  };
}

function rowToAidStation(row: AidStationRow): AidStation {
  return {
    distance_km: row.distance_km,
    offerings_ja: row.offerings_ja,
    offerings_en: row.offerings_en,
    is_featured: row.is_featured,
  };
}

function rowToCheckpoint(row: CheckpointRow): Checkpoint {
  return {
    distance_km: row.distance_km,
    closing_time: row.closing_time,
  };
}

function rowToAccessPoint(row: AccessPointRow): AccessPoint {
  return {
    station_name_ja: row.station_name_ja,
    station_name_en: row.station_name_en,
    station_code: row.station_code,
    transport_to_venue_ja: row.transport_to_venue_ja,
    transport_to_venue_en: row.transport_to_venue_en,
    latitude: row.latitude,
    longitude: row.longitude,
  };
}

function rowToNearbySpot(row: NearbySpotRow): NearbySpot {
  return {
    type: row.type as NearbySpotType,
    name_ja: row.name_ja,
    name_en: row.name_en,
    description_ja: row.description_ja,
    description_en: row.description_en,
    distance_from_venue: row.distance_from_venue,
    url: row.url ?? null,
    latitude: row.latitude,
    longitude: row.longitude,
  };
}

function rowToWeather(row: WeatherRow): WeatherHistory {
  return {
    year: row.year,
    avg_temp: row.avg_temp,
    max_temp: row.max_temp,
    min_temp: row.min_temp,
    humidity_pct: row.humidity_pct,
    precipitation_mm: row.precipitation_mm,
    wind_speed_ms: row.wind_speed_ms,
  };
}

function rowToGift(row: GiftRow): ParticipationGift {
  return {
    gift_categories: parseJson<GiftCategoryId[]>(row.gift_categories, []),
    description_ja: row.description_ja,
    description_en: row.description_en,
    image: row.image ?? null,
  };
}

type EntryPeriodRow = typeof schema.race_entry_periods.$inferSelect;
type EntryLinkRow = typeof schema.race_entry_links.$inferSelect;

function rowToEntryLink(row: EntryLinkRow): EntryLink {
  return {
    id: row.id,
    race_id: row.race_id,
    site_name: row.site_name,
    url: row.url,
    sort_order: row.sort_order,
  };
}

function rowToEntryPeriod(row: EntryPeriodRow): EntryPeriod {
  return {
    id: row.id,
    race_id: row.race_id,
    category_id: row.category_id ?? null,
    label_ja: row.label_ja,
    label_en: row.label_en,
    start_date: row.start_date,
    end_date: row.end_date,
    entry_fee: row.entry_fee ?? null,
    sort_order: row.sort_order,
  };
}

type ResultRow = typeof schema.race_results.$inferSelect;

function rowToResult(row: ResultRow): RaceResult {
  return {
    participants_count:   row.participants_count ?? null,
    finishers_count:      row.finishers_count ?? null,
    finisher_rate_pct:    row.finisher_rate_pct ?? null,
    weather_condition_ja: row.weather_condition_ja,
    weather_condition_en: row.weather_condition_en,
    temperature_c:        row.temperature_c ?? null,
    max_temp_c:           row.max_temp_c ?? null,
    min_temp_c:           row.min_temp_c ?? null,
    wind_speed_ms:        row.wind_speed_ms ?? null,
    humidity_pct:         row.humidity_pct ?? null,
    notes_ja:             row.notes_ja ?? null,
    notes_en:             row.notes_en ?? null,
  };
}

function assembleRace(
  row: RaceRow,
  categories: CategoryRow[],
  aidStations: AidStationRow[],
  checkpointRows: CheckpointRow[],
  accessPointRows: AccessPointRow[],
  nearbySpotRows: NearbySpotRow[],
  weatherRows: WeatherRow[],
  giftRows: GiftRow[],
  resultRows: ResultRow[] = [],
  entryPeriodRows: EntryPeriodRow[] = [],
  entryLinkRows: EntryLinkRow[] = [],
): Race {
  const course_info: CourseInfo = {
    max_elevation_m: row.course_max_elevation_m,
    min_elevation_m: row.course_min_elevation_m,
    elevation_diff_m: row.course_elevation_diff_m,
    surface: row.course_surface as CourseSurface,
    certification: parseJson<string[]>(row.course_certification, []),
    highlights_ja: row.course_highlights_ja,
    highlights_en: row.course_highlights_en,
    notes_ja: row.course_notes_ja ?? null,
    notes_en: row.course_notes_en ?? null,
  };

  return {
    id: row.id,
    name_ja: row.name_ja,
    name_en: row.name_en,
    full_name_ja: row.full_name_ja ?? null,
    full_name_en: row.full_name_en ?? null,
    edition: row.edition ?? null,
    date: row.date,
    prefecture: row.prefecture,
    city_ja: row.city_ja,
    city_en: row.city_en,
    description_ja: row.description_ja,
    description_en: row.description_en,
    official_url: row.official_url,
    entry_fee: row.entry_fee ?? null,
    entry_fee_by_category: row.entry_fee_by_category,
    entry_capacity: row.entry_capacity,
    entry_start_date: row.entry_start_date,
    entry_end_date: row.entry_end_date,
    entry_closed: row.entry_closed,
    reception_type: row.reception_type as ReceptionType,
    reception_note_ja: row.reception_note_ja,
    reception_note_en: row.reception_note_en,
    tags: parseJson<string[]>(row.tags, []),
    course_gpx_file: row.course_gpx_file ?? null,
    course_info,
    categories: categories.map(rowToCategory),
    aid_stations: aidStations.map(rowToAidStation),
    checkpoints: checkpointRows.map(rowToCheckpoint),
    access_points: accessPointRows.map(rowToAccessPoint),
    nearby_spots: nearbySpotRows.map(rowToNearbySpot),
    weather_history: weatherRows.map(rowToWeather),
    participation_gifts: giftRows.map(rowToGift),
    entry_periods: entryPeriodRows.map(rowToEntryPeriod),
    entry_links: entryLinkRows.map(rowToEntryLink),
    result: resultRows.length > 0 ? rowToResult(resultRows[0]) : null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

// ==================
// Race data
// ==================

export async function getRaces(): Promise<Race[]> {
  const db = getDatabase();

  const [raceRows, categoryRows, giftRows, entryPeriodRows] = await db.batch([
    db.select().from(schema.races).orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories).orderBy(asc(schema.race_categories.sort_order)),
    db.select().from(schema.participation_gifts).orderBy(asc(schema.participation_gifts.sort_order)),
    db.select().from(schema.race_entry_periods).orderBy(asc(schema.race_entry_periods.sort_order)),
  ]);

  return raceRows.map((row) =>
    assembleRace(
      row,
      categoryRows.filter((c) => c.race_id === row.id),
      [], [], [], [], [],
      giftRows.filter((g) => g.race_id === row.id),
      [],
      entryPeriodRows.filter((p) => p.race_id === row.id),
    ),
  );
}

export async function getRaceById(id: string): Promise<Race | null> {
  const db = getDatabase();

  const [raceRows, categoryRows, aidRows, checkRows, accessRows, spotRows, weatherRows, giftRows, resultRows, entryPeriodRows, entryLinkRows] =
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
    ]);

  const row = raceRows[0];
  if (!row) return null;

  return assembleRace(row, categoryRows, aidRows, checkRows, accessRows, spotRows, weatherRows, giftRows, resultRows, entryPeriodRows, entryLinkRows);
}

export async function getRacesByPrefecture(prefecture: string): Promise<Race[]> {
  const races = await getRaces();
  return races.filter((r) => r.prefecture === prefecture);
}

export async function getUpcomingRaces(limit = 6): Promise<Race[]> {
  const db = getDatabase();
  const today = new Date().toISOString().split("T")[0];

  const [raceRows, categoryRows, giftRows, entryPeriodRows] = await db.batch([
    db.select().from(schema.races).where(gte(schema.races.date, today)).orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories).orderBy(asc(schema.race_categories.sort_order)),
    db.select().from(schema.participation_gifts),
    db.select().from(schema.race_entry_periods).orderBy(asc(schema.race_entry_periods.sort_order)),
  ]);

  const limited = raceRows.slice(0, limit);

  return limited.map((row) =>
    assembleRace(
      row,
      categoryRows.filter((c) => c.race_id === row.id),
      [], [], [], [], [],
      giftRows.filter((g) => g.race_id === row.id),
      [],
      entryPeriodRows.filter((p) => p.race_id === row.id),
    ),
  );
}

export async function getOpenEntryRaces(limit = 8): Promise<Race[]> {
  const db = getDatabase();
  const today = new Date().toISOString().split("T")[0];

  const [raceRows, categoryRows, giftRows, entryPeriodRows] = await db.batch([
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
  ]);

  return raceRows.slice(0, limit).map((row) =>
    assembleRace(row, categoryRows.filter((c) => c.race_id === row.id), [], [], [], [], [], giftRows.filter((g) => g.race_id === row.id), [], entryPeriodRows.filter((p) => p.race_id === row.id)),
  );
}

export async function getSoonOpeningEntryRaces(limit = 6): Promise<Race[]> {
  const db = getDatabase();
  const today = new Date().toISOString().split("T")[0];
  const in30days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [raceRows, categoryRows, giftRows, entryPeriodRows] = await db.batch([
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
  ]);

  return raceRows.slice(0, limit).map((row) =>
    assembleRace(row, categoryRows.filter((c) => c.race_id === row.id), [], [], [], [], [], giftRows.filter((g) => g.race_id === row.id), [], entryPeriodRows.filter((p) => p.race_id === row.id)),
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

/** レースIDからシリーズIDを導出する（末尾の -YYYY を除去） */
export function toSeriesId(raceId: string): string {
  return raceId.replace(/-\d{4}$/, '');
}

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

  const [raceRows, categoryRows, giftRows, resultRows] = await db.batch([
    db.select().from(schema.races)
      .where(eq(schema.races.series_id, seriesId))
      .orderBy(asc(schema.races.date)),
    db.select().from(schema.race_categories).orderBy(asc(schema.race_categories.sort_order)),
    db.select().from(schema.participation_gifts),
    db.select().from(schema.race_results),
  ]);

  return raceRows
    .filter((row) => row.id !== excludeRaceId)
    .map((row) =>
      assembleRace(
        row,
        categoryRows.filter((c) => c.race_id === row.id),
        [], [], [], [], [],
        giftRows.filter((g) => g.race_id === row.id),
        resultRows.filter((r) => r.race_id === row.id),
      ),
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
