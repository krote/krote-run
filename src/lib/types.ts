// ==================
// Locale
// ==================

export type Locale = 'ja' | 'en';

// ==================
// Race
// ==================

export interface Race {
  id: string;
  name_ja: string;
  name_en: string;
  /** 回次・年号を含む正式名称。例: "第51回東京マラソン2026" */
  full_name_ja: string | null;
  full_name_en: string | null;
  /** 開催回次。例: 51 */
  edition: number | null;
  date: string; // ISO date string e.g. "2025-03-15"
  prefecture: string; // 都道府県コード e.g. "13"
  city_ja: string;
  city_en: string;
  description_ja: string;
  description_en: string;
  official_url: string;
  /** 全カテゴリ共通の参加費。カテゴリ別の場合は null */
  entry_fee: number | null;
  /** true のとき entry_fee は null でカテゴリ別に設定 */
  entry_fee_by_category: boolean;
  entry_capacity: number;
  entry_start_date: string | null;
  entry_end_date: string | null;
  reception_type: ReceptionType;
  reception_note_ja: string;
  reception_note_en: string;
  tags: string[];
  course_gpx_file: string | null;
  course_info: CourseInfo;
  categories: RaceCategory[];
  aid_stations: AidStation[];
  checkpoints: Checkpoint[];
  access_points: AccessPoint[];
  nearby_spots: NearbySpot[];
  weather_history: WeatherHistory[];
  participation_gifts: ParticipationGift[];
  entry_periods: EntryPeriod[];
  result: RaceResult | null;      // 開催実績（未開催の場合は null）
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export type ReceptionType = 'pre_day' | 'race_day' | 'both' | 'pre_mail' | 'none';

// ==================
// EntryPeriod
// ==================

export interface EntryPeriod {
  id: number;
  race_id: string;
  category_id: number | null;
  label_ja: string;
  label_en: string;
  start_date: string; // YYYY-MM-DD
  end_date: string;   // YYYY-MM-DD
  entry_fee: number | null;
  sort_order: number;
}

// ==================
// RaceCategory / Wave
// ==================

export interface RaceCategory {
  id: number;
  distance_type: DistanceType;
  distance_km: number;
  time_limit_minutes: number;
  start_time: string; // e.g. "08:30"
  capacity: number;
  entry_fee: number | null;
  entry_fee_u25: number | null;
  name_ja: string | null;
  name_en: string | null;
  description_ja: string | null;
  description_en: string | null;
  waves: Wave[] | null;
}

export type DistanceType = 'full' | 'half' | '10k' | '5k' | 'ultra' | 'other';

export interface Wave {
  wave: string; // e.g. "A", "B", "第1ウェーブ"
  start_time: string; // e.g. "09:00"
  end_time: string; // e.g. "15:00"
}

// ==================
// CourseInfo
// ==================

export interface CourseInfo {
  max_elevation_m: number;
  min_elevation_m: number;
  elevation_diff_m: number;
  surface: CourseSurface;
  /** 認定情報 e.g. ["AIMS", "陸連公認"] */
  certification: string[];
  highlights_ja: string;
  highlights_en: string;
  notes_ja: string | null;
  notes_en: string | null;
}

export type CourseSurface = 'road' | 'trail' | 'mixed';

// ==================
// AidStation
// ==================

export interface AidStation {
  distance_km: number;
  offerings_ja: string;
  offerings_en: string;
  is_featured: boolean;
}

// ==================
// Checkpoint
// ==================

export interface Checkpoint {
  distance_km: number;
  closing_time: string; // e.g. "11:30"
}

// ==================
// AccessPoint
// ==================

export interface AccessPoint {
  station_name_ja: string;
  station_name_en: string;
  station_code: string;
  transport_to_venue_ja: string;
  transport_to_venue_en: string;
  latitude: number;
  longitude: number;
}

// ==================
// NearbySpot
// ==================

export type NearbySpotType = '観光地' | '温泉' | 'グルメ' | '宿泊';

export interface NearbySpot {
  type: NearbySpotType;
  name_ja: string;
  name_en: string;
  description_ja: string;
  description_en: string;
  distance_from_venue: string; // e.g. "徒歩5分", "車で15分"
  url: string | null;
  latitude: number;
  longitude: number;
}

// ==================
// WeatherHistory
// ==================

export interface WeatherHistory {
  year: number;
  avg_temp: number; // °C
  max_temp: number; // °C
  min_temp: number; // °C
  humidity_pct: number; // 0–100
  precipitation_mm: number;
  wind_speed_ms: number;
}

// ==================
// ParticipationGift
// ==================

export type GiftCategoryId =
  | 'medal'
  | 'tshirt'
  | 'towel'
  | 'local_product'
  | 'food'
  | 'goods'
  | 'coupon'
  | 'certificate'
  | 'other';

export interface ParticipationGift {
  gift_categories: GiftCategoryId[];
  description_ja: string;
  description_en: string;
  image: string | null;
}

export interface GiftCategory {
  id: GiftCategoryId;
  name_ja: string;
  name_en: string;
  icon: string; // emoji
}

// ==================
// RaceSeries（シリーズマスタ）
// ==================

export interface RaceSeries {
  id: string;             // e.g. "nagano-marathon"
  name_ja: string;        // "長野マラソン"
  name_en: string;        // "Nagano Marathon"
  first_held_year: number | null;
  website_url: string | null;
}

// ==================
// RaceResult（各年の大会実績）
// ==================

export interface RaceResult {
  participants_count: number | null;
  finishers_count: number | null;
  finisher_rate_pct: number | null;
  weather_condition_ja: string;
  weather_condition_en: string;
  temperature_c: number | null;
  max_temp_c: number | null;
  min_temp_c: number | null;
  wind_speed_ms: number | null;
  humidity_pct: number | null;
  notes_ja: string | null;
  notes_en: string | null;
}

// ==================
// CourseProfile（ビルド時自動生成）
// ==================

export interface CourseProfile {
  race_id: string;
  distance_km: number;
  total_elevation_gain_m: number;
  total_elevation_loss_m: number;
  points: CoursePoint[];
}

export interface CoursePoint {
  lat: number;
  lng: number;
  ele: number; // elevation in metres
  dist_km: number;
}

// ==================
// Prefecture
// ==================

export interface Prefecture {
  code: string; // JIS code e.g. "13"
  name: string; // e.g. "東京都"
  nameEn: string; // e.g. "Tokyo"
  region: string; // e.g. "関東"
  regionEn: string; // e.g. "Kanto"
  lat: number;
  lng: number;
}

// ==================
// UserSetting（localStorage用）
// ==================

export interface UserSetting {
  home_station_name: string;
  home_station_code: string;
  preferred_language: Locale;
  favorite_race_ids: string[];
}

// ==================
// RaceStatus
// ==================

/** レースのエントリー・開催状態 */
export type RaceStatus =
  | 'open_entry'      // 受付中
  | 'entry_not_open'  // 受付前（エントリー開始前）
  | 'entry_closed'    // 受付終了（開催前）
  | 'past';           // 開催済み

export type RaceSortKey =
  | 'date_asc'           // 開催日が近い順（デフォルト）
  | 'entry_closing_soon' // エントリー締切が近い順
  | 'entry_opening_soon'; // エントリー開始が近い順

// ==================
// RaceFilter（検索フィルタ）
// ==================

export interface RaceFilter {
  month: number | null; // 1–12
  prefecture: string | null; // 都道府県コード
  distanceType: DistanceType | null;
  giftCategories: GiftCategoryId[];
  timeLimitMin: number | null; // 分単位の最小制限時間
  tags: string[];
  searchText: string;
  /** 表示するステータス。空配列 = すべて表示 */
  statuses: RaceStatus[];
  sort: RaceSortKey;
  view: 'mag' | 'exp';
}
