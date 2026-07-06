import type { Race, RaceCategory, EntryPeriod, EntryLink, RaceGallery, RaceVoice, RaceTimeBucket, RaceCourseHighlight, ParticipationGift, CompletionGift, AccessPoint, ReceptionSession, RaceTravelTime } from '../types';

/** テスト用の最小限 Race オブジェクトを生成するファクトリ */
export function makeRace(overrides: Partial<Race> = {}): Race {
  return {
    completion_gifts: [],
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
    entry_closed: false,
    reception_type: 'pre_day',
    reception_note_ja: '',
    reception_note_en: '',
    reception_sessions: [],
    travel_times: [],
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
    entry_links: [],
    result: null,
    gallery: [],
    voices: [],
    time_buckets: [],
    motif: null,
    motif_color: null,
    motif_romaji: null,
    tagline_ja: null,
    tagline_en: null,
    hero_image_url: null,
    hero_caption_ja: null,
    hero_caption_en: null,
    venue_name_ja: null,
    venue_name_en: null,
    venue_address: null,
    start_lat: null,
    start_lng: null,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
    ...overrides,
  };
}

export function makeCategory(overrides: Partial<RaceCategory> = {}): RaceCategory {
  return {
    id: 1,
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
    eligibility_ja: null,
    eligibility_en: null,
    course_gpx_file: null,
    waves: null,
    course_highlights: [],
    ...overrides,
  };
}

export function makeEntryLink(overrides: Partial<EntryLink> = {}): EntryLink {
  return {
    id: 1,
    race_id: 'test-race-2026',
    site_name: 'RUNNET',
    url: 'https://runnet.jp/test',
    sort_order: 0,
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

export function makeGallery(overrides: Partial<RaceGallery> = {}): RaceGallery {
  return {
    id: 1,
    race_id: 'test-race-2026',
    src: '/images/races/test-race-2026-1.jpg',
    caption_ja: 'テストキャプション',
    caption_en: 'Test caption',
    sort_order: 0,
    ...overrides,
  };
}

export function makeVoice(overrides: Partial<RaceVoice> = {}): RaceVoice {
  return {
    id: 1,
    race_id: 'test-race-2026',
    quote_ja: 'とても楽しいレースでした。',
    quote_en: null,
    author: '40代男性',
    sort_order: 0,
    ...overrides,
  };
}

export function makeTimeBucket(overrides: Partial<RaceTimeBucket> = {}): RaceTimeBucket {
  return {
    id: 1,
    race_id: 'test-race-2026',
    bucket: '4:00–4:30',
    pct: 25.0,
    sort_order: 0,
    ...overrides,
  };
}

export function makeCourseHighlight(overrides: Partial<RaceCourseHighlight> = {}): RaceCourseHighlight {
  return {
    id: 1,
    race_id: 'test-race-2026',
    category_id: null,
    km: 21.0,
    name_ja: '折り返し地点',
    name_en: 'Turnaround Point',
    note_ja: '眺望が素晴らしい',
    note_en: 'Great views',
    sort_order: 0,
    ...overrides,
  };
}

export function makeParticipationGift(overrides: Partial<ParticipationGift> = {}): ParticipationGift {
  return {
    gift_categories: ['medal'],
    description_ja: 'テスト参加賞',
    description_en: 'Test participation gift',
    image: null,
    ...overrides,
  };
}

export function makeCompletionGift(overrides: Partial<CompletionGift> = {}): CompletionGift {
  return {
    gift_categories: ['medal'],
    description_ja: 'テスト完走賞',
    description_en: 'Test completion gift',
    image: null,
    ...overrides,
  };
}

export function makeAccessPoint(overrides: Partial<AccessPoint> = {}): AccessPoint {
  return {
    station_name_ja: 'テスト駅',
    station_name_en: 'Test Station',
    station_code: 'test',
    transport_to_venue_ja: '徒歩10分',
    transport_to_venue_en: '10 min walk',
    latitude: 35.0,
    longitude: 135.0,
    walk_minutes: 10,
    is_primary: true,
    ...overrides,
  };
}

export function makeReceptionSession(overrides: Partial<ReceptionSession> = {}): ReceptionSession {
  return {
    id: 1,
    race_id: 'test-race-2026',
    date: '2026-10-01',
    open_time: '06:00',
    close_time: '08:30',
    location_ja: 'テスト会場',
    location_en: 'Test Venue',
    note_ja: '',
    note_en: '',
    sort_order: 0,
    ...overrides,
  };
}

export function makeRaceTravelTime(overrides: Partial<RaceTravelTime> = {}): RaceTravelTime {
  return {
    id: 1,
    race_id: 'test-race-2026',
    hub_id: 'tokyo',
    duration_minutes: 60,
    departure_time: null,
    calculated_at: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}
