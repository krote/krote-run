import type { Race, RaceCategory, EntryPeriod } from '../types';

/** テスト用の最小限 Race オブジェクトを生成するファクトリ */
export function makeRace(overrides: Partial<Race> = {}): Race {
  return {
    id: 'test-race-2026',
    name_ja: 'テスト大会2026',
    name_en: 'Test Race 2026',
    full_name_ja: null,
    full_name_en: null,
    edition: null,
    date: '2026-10-01',
    prefecture: '13',
    city_ja: '東京都',
    city_en: 'Tokyo',
    description_ja: 'テスト用の大会です',
    description_en: 'A test race',
    official_url: 'https://example.com',
    entry_fee: 5000,
    entry_fee_by_category: false,
    entry_capacity: 0,
    entry_start_date: null,
    entry_end_date: null,
    reception_type: 'pre_day',
    reception_note_ja: '',
    reception_note_en: '',
    tags: [],
    course_gpx_file: null,
    course_info: {
      max_elevation_m: 0,
      min_elevation_m: 0,
      elevation_diff_m: 0,
      surface: 'road',
      certification: [],
      highlights_ja: '',
      highlights_en: '',
      notes_ja: null,
      notes_en: null,
    },
    categories: [],
    aid_stations: [],
    checkpoints: [],
    access_points: [],
    nearby_spots: [],
    weather_history: [],
    participation_gifts: [],
    entry_periods: [],
    result: null,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
    ...overrides,
  };
}

export function makeCategory(overrides: Partial<RaceCategory> = {}): RaceCategory {
  return {
    distance_type: 'full',
    distance_km: 42.195,
    time_limit_minutes: 360,
    start_time: '09:00',
    capacity: 0,
    entry_fee: null,
    entry_fee_u25: null,
    name_ja: null,
    name_en: null,
    description_ja: null,
    description_en: null,
    waves: null,
    ...overrides,
  };
}

export function makeEntryPeriod(overrides: Partial<EntryPeriod> = {}): EntryPeriod {
  return {
    id: 1,
    race_id: 'test-race-2026',
    category_id: null,
    label_ja: '一般エントリー',
    label_en: 'General Entry',
    start_date: '2026-04-01',
    end_date: '2026-06-30',
    entry_fee: null,
    sort_order: 0,
    ...overrides,
  };
}
