// ==================
// Core Types
// ==================

export type Locale = 'ja' | 'en';

export type Distance = 'full' | 'half' | '10k' | '5k' | 'ultra' | 'other';

export type Level = 'beginner' | 'intermediate' | 'advanced';

export type Terrain = 'road' | 'trail' | 'track' | 'mixed';

// ==================
// Race
// ==================

export interface Race {
  id: string;
  name: string;
  nameEn: string;
  date: string; // ISO date string e.g. "2025-03-15"
  endDate?: string;
  prefecture: string; // e.g. "東京都"
  prefectureCode: string; // e.g. "13"
  city: string;
  venue?: string;
  distances: DistanceEntry[];
  website?: string;
  applicationPeriod?: {
    start: string;
    end: string;
  };
  capacity?: number;
  level: Level;
  terrain: Terrain;
  tags: string[];
  description?: string;
  descriptionEn?: string;
  courseMap?: CourseMapData;
  access?: AccessInfo;
  gift?: GiftInfo;
  createdAt?: string;
  updatedAt?: string;
}

export interface DistanceEntry {
  category: string; // e.g. "フルマラソン"
  categoryEn: string; // e.g. "Full Marathon"
  distanceKm: number;
  elevationM?: number; // cumulative elevation gain
  cutoffTime?: string; // e.g. "06:00:00"
  fee?: number; // JPY
}

// ==================
// Course
// ==================

export interface CourseMapData {
  centerLat: number;
  centerLng: number;
  zoom: number;
  gpxFile?: string; // filename under src/data/gpx/
  elevationProfile?: ElevationPoint[];
}

export interface ElevationPoint {
  distanceKm: number;
  elevationM: number;
}

// ==================
// Access
// ==================

export interface AccessInfo {
  nearestStation?: string;
  walkingMinutes?: number;
  busInfo?: string;
  shuttleInfo?: string;
  parkingAvailable: boolean;
  parkingCapacity?: number;
  parkingFee?: number; // JPY/day
}

// ==================
// Gift
// ==================

export interface GiftInfo {
  categories: string[]; // GiftCategory IDs
  notes?: string;
  notesEn?: string;
}

export interface GiftCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string; // emoji
  description?: string;
  descriptionEn?: string;
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
// Filter
// ==================

export interface RaceFilter {
  distance?: string; // Distance type key
  prefectureCode?: string;
  level?: Level;
  terrain?: Terrain;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
  searchQuery?: string;
}
