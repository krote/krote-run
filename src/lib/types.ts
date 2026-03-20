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
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export type ReceptionType = 'pre_day' | 'race_day' | 'both' | 'pre_mail' | 'none';

// ==================
// RaceCategory / Wave
// ==================

export interface RaceCategory {
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
}
