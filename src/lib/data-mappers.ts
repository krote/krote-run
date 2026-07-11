/**
 * data-mappers.ts — DB 行 → アプリ型の純粋変換関数（DB 非依存）
 *
 * data.ts はクエリ発行 + これらのマッパー呼び出しに専念する。
 * 単体テストは src/lib/__tests__/data-mappers.test.ts で実施。
 */
import * as schema from './db/schema';
import type {
  Race, RaceCategory, Wave, CourseInfo,
  AidStation, Checkpoint, AccessPoint, NearbySpot, WeatherHistory,
  ParticipationGift, CompletionGift, GiftCategoryId, CourseSurface, ReceptionType, NearbySpotType,
  RaceResult, EntryPeriod, EntryLink,
  RaceGallery, RaceVoice, RaceTimeBucket, RaceCourseHighlight, ReceptionSession, RaceTravelTime,
} from './types';

// ==================
// Row 型エイリアス（Drizzle の infer から生成）
// ==================

export type RaceRow = typeof schema.races.$inferSelect;
export type CategoryRow = typeof schema.race_categories.$inferSelect;
export type AidStationRow = typeof schema.aid_stations.$inferSelect;
export type CheckpointRow = typeof schema.checkpoints.$inferSelect;
export type AccessPointRow = typeof schema.access_points.$inferSelect;
export type NearbySpotRow = typeof schema.nearby_spots.$inferSelect;
export type WeatherRow = typeof schema.weather_history.$inferSelect;
export type GiftRow = typeof schema.participation_gifts.$inferSelect;
export type CompletionGiftRow = typeof schema.completion_gifts.$inferSelect;
export type EntryPeriodRow = typeof schema.race_entry_periods.$inferSelect;
export type EntryLinkRow = typeof schema.race_entry_links.$inferSelect;
export type ReceptionSessionRow = typeof schema.reception_sessions.$inferSelect;
export type TravelTimeRow = typeof schema.race_travel_times.$inferSelect;
export type ResultRow = typeof schema.race_results.$inferSelect;
export type GalleryRow = typeof schema.race_gallery.$inferSelect;
export type VoiceRow = typeof schema.race_voices.$inferSelect;
export type TimeBucketRow = typeof schema.race_time_buckets.$inferSelect;
export type CourseHighlightRow = typeof schema.race_course_highlights.$inferSelect;

// ==================
// assembleRace 用の関連行オブジェクト型
// ==================

export type RaceRelatedRows = {
  categories?: CategoryRow[];
  aidStations?: AidStationRow[];
  checkpointRows?: CheckpointRow[];
  accessPointRows?: AccessPointRow[];
  nearbySpotRows?: NearbySpotRow[];
  weatherRows?: WeatherRow[];
  giftRows?: GiftRow[];
  resultRows?: ResultRow[];
  entryPeriodRows?: EntryPeriodRow[];
  entryLinkRows?: EntryLinkRow[];
  galleryRows?: GalleryRow[];
  voiceRows?: VoiceRow[];
  timeBucketRows?: TimeBucketRow[];
  courseHighlightRows?: CourseHighlightRow[];
  completionGiftRows?: CompletionGiftRow[];
  receptionSessionRows?: ReceptionSessionRow[];
  travelTimeRows?: TravelTimeRow[];
};

// ==================
// ユーティリティ
// ==================

export function parseJson<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/** レースIDからシリーズIDを導出する（末尾の -YYYY を除去） */
export function toSeriesId(raceId: string): string {
  return raceId.replace(/-\d{4}$/, '');
}

// ==================
// Row → Type 変換
// ==================

export function rowToCategory(row: CategoryRow, highlights: CourseHighlightRow[] = []): RaceCategory {
  return {
    id: row.id,
    distance_type: row.distance_type as RaceCategory['distance_type'],
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
    course_highlights: highlights.map(rowToCourseHighlight),
  };
}

export function rowToAidStation(row: AidStationRow): AidStation {
  return {
    distance_km: row.distance_km,
    offerings_ja: row.offerings_ja,
    offerings_en: row.offerings_en,
    is_featured: row.is_featured,
  };
}

export function rowToCheckpoint(row: CheckpointRow): Checkpoint {
  return {
    distance_km: row.distance_km,
    closing_time: row.closing_time,
  };
}

export function rowToAccessPoint(row: AccessPointRow): AccessPoint {
  return {
    station_name_ja: row.station_name_ja,
    station_name_en: row.station_name_en,
    station_code: row.station_code,
    transport_to_venue_ja: row.transport_to_venue_ja,
    transport_to_venue_en: row.transport_to_venue_en,
    latitude: row.latitude,
    longitude: row.longitude,
    walk_minutes: row.walk_minutes ?? null,
    is_primary: row.is_primary,
  };
}

export function rowToNearbySpot(row: NearbySpotRow): NearbySpot {
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

export function rowToWeather(row: WeatherRow): WeatherHistory {
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

export function rowToGift(row: GiftRow | CompletionGiftRow): ParticipationGift | CompletionGift {
  return {
    gift_categories: parseJson<GiftCategoryId[]>(row.gift_categories, []),
    description_ja: row.description_ja,
    description_en: row.description_en,
    image: row.image ?? null,
  };
}

export function rowToEntryLink(row: EntryLinkRow): EntryLink {
  return {
    id: row.id,
    race_id: row.race_id,
    site_name: row.site_name,
    url: row.url,
    sort_order: row.sort_order,
  };
}

export function rowToEntryPeriod(row: EntryPeriodRow): EntryPeriod {
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

export function rowToReceptionSession(row: ReceptionSessionRow): ReceptionSession {
  return {
    id: row.id,
    race_id: row.race_id,
    date: row.date,
    open_time: row.open_time,
    close_time: row.close_time,
    location_ja: row.location_ja,
    location_en: row.location_en,
    note_ja: row.note_ja,
    note_en: row.note_en,
    sort_order: row.sort_order,
  };
}

export function rowToRaceTravelTime(row: TravelTimeRow): RaceTravelTime {
  return {
    id: row.id,
    race_id: row.race_id,
    hub_id: row.hub_id,
    duration_minutes: row.duration_minutes,
    departure_time: row.departure_time ?? null,
    calculated_at: row.calculated_at,
  };
}

export function rowToResult(row: ResultRow): RaceResult {
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
    avg_time:             row.avg_time ?? null,
  };
}

export function rowToGallery(row: GalleryRow): RaceGallery {
  return {
    id: row.id,
    race_id: row.race_id,
    src: row.src,
    caption_ja: row.caption_ja ?? null,
    caption_en: row.caption_en ?? null,
    sort_order: row.sort_order,
  };
}

export function rowToVoice(row: VoiceRow): RaceVoice {
  return {
    id: row.id,
    race_id: row.race_id,
    quote_ja: row.quote_ja,
    quote_en: row.quote_en ?? null,
    author: row.author ?? null,
    sort_order: row.sort_order,
  };
}

export function rowToTimeBucket(row: TimeBucketRow): RaceTimeBucket {
  return {
    id: row.id,
    race_id: row.race_id,
    bucket: row.bucket,
    pct: row.pct,
    sort_order: row.sort_order,
  };
}

export function rowToCourseHighlight(row: CourseHighlightRow): RaceCourseHighlight {
  return {
    id: row.id,
    race_id: row.race_id,
    category_id: row.category_id ?? null,
    km: row.km,
    name_ja: row.name_ja,
    name_en: row.name_en ?? null,
    note_ja: row.note_ja ?? null,
    note_en: row.note_en ?? null,
    sort_order: row.sort_order,
  };
}

// ==================
// assembleRace（オブジェクト引数）
// ==================

export function assembleRace(row: RaceRow, related: RaceRelatedRows = {}): Race {
  const {
    categories = [],
    aidStations = [],
    checkpointRows = [],
    accessPointRows = [],
    nearbySpotRows = [],
    weatherRows = [],
    giftRows = [],
    resultRows = [],
    entryPeriodRows = [],
    entryLinkRows = [],
    galleryRows = [],
    voiceRows = [],
    timeBucketRows = [],
    courseHighlightRows = [],
    completionGiftRows = [],
    receptionSessionRows = [],
    travelTimeRows = [],
  } = related;

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
    reception_sessions: receptionSessionRows.map(rowToReceptionSession),
    travel_times: travelTimeRows.map(rowToRaceTravelTime),
    tags: parseJson<string[]>(row.tags, []),
    course_gpx_file: row.course_gpx_file ?? null,
    course_info,
    categories: (() => {
      // category_id 指定あり → そのカテゴリへ、null → メインカテゴリ（先頭）へ振り分け
      const mainCatId = categories.length > 0 ? categories[0].id : null;
      const byCat = new Map<number, CourseHighlightRow[]>();
      for (const h of courseHighlightRows) {
        const targetId = h.category_id ?? mainCatId;
        if (targetId == null) continue;
        if (!byCat.has(targetId)) byCat.set(targetId, []);
        byCat.get(targetId)!.push(h);
      }
      return categories.map(cat => rowToCategory(cat, byCat.get(cat.id) ?? []));
    })(),
    aid_stations: aidStations.map(rowToAidStation),
    checkpoints: checkpointRows.map(rowToCheckpoint),
    access_points: accessPointRows.map(rowToAccessPoint),
    nearby_spots: nearbySpotRows.map(rowToNearbySpot),
    weather_history: weatherRows.map(rowToWeather),
    participation_gifts: giftRows.map(rowToGift) as ParticipationGift[],
    completion_gifts: completionGiftRows.map(rowToGift) as CompletionGift[],
    entry_periods: entryPeriodRows.map(rowToEntryPeriod),
    entry_links: entryLinkRows.map(rowToEntryLink),
    result: resultRows.length > 0 ? rowToResult(resultRows[0]) : null,
    gallery:      galleryRows.map(rowToGallery),
    voices:       voiceRows.map(rowToVoice),
    time_buckets: timeBucketRows.map(rowToTimeBucket),
    motif:           row.motif ?? null,
    motif_color:     row.motif_color ?? null,
    motif_romaji:    row.motif_romaji ?? null,
    tagline_ja:      row.tagline_ja ?? null,
    tagline_en:      row.tagline_en ?? null,
    hero_image_url:  row.hero_image_url ?? null,
    hero_caption_ja: row.hero_caption_ja ?? null,
    hero_caption_en: row.hero_caption_en ?? null,
    venue_name_ja:   row.venue_name_ja ?? null,
    venue_name_en:   row.venue_name_en ?? null,
    venue_address:   row.venue_address ?? null,
    start_lat:       row.start_lat ?? null,
    start_lng:       row.start_lng ?? null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}
