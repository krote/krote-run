/**
 * data-mappers.ts の特性化テスト（characterization tests）
 * DB 非依存の純粋関数の振る舞いを固定する。
 */
import { describe, it, expect } from 'vitest';
import {
  parseJson,
  toSeriesId,
  rowToCategory,
  rowToAidStation,
  rowToCheckpoint,
  rowToAccessPoint,
  rowToNearbySpot,
  rowToWeather,
  rowToGift,
  rowToEntryPeriod,
  rowToEntryLink,
  rowToReceptionSession,
  rowToResult,
  rowToGallery,
  rowToVoice,
  rowToTimeBucket,
  rowToCourseHighlight,
  assembleRace,
  type RaceRelatedRows,
} from '../data-mappers';

// ── parseJson ────────────────────────────────────────────────

describe('parseJson', () => {
  it('正常なJSON文字列をパースして返す', () => {
    expect(parseJson<string[]>('["a","b"]', [])).toEqual(['a', 'b']);
  });

  it('不正なJSONの場合はフォールバック値を返す', () => {
    expect(parseJson<string[]>('invalid json', [])).toEqual([]);
  });

  it('nullのフォールバックが返せる', () => {
    expect(parseJson<null>('bad', null)).toBeNull();
  });
});

// ── toSeriesId ───────────────────────────────────────────────

describe('toSeriesId', () => {
  it('末尾の -YYYY を除去する', () => {
    expect(toSeriesId('tokyo-marathon-2026')).toBe('tokyo-marathon');
  });

  it('YYYYが2つある場合は最後だけ除去する', () => {
    expect(toSeriesId('race-2025-edition-2026')).toBe('race-2025-edition');
  });

  it('末尾に -YYYY がない場合はそのまま返す', () => {
    expect(toSeriesId('my-race')).toBe('my-race');
  });
});

// ── rowToAidStation ──────────────────────────────────────────

describe('rowToAidStation', () => {
  it('行データを AidStation 型に変換する', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      distance_km: 10.5,
      offerings_ja: '水、スポーツドリンク',
      offerings_en: 'Water, Sports drink',
      is_featured: true,
    };
    expect(rowToAidStation(row)).toEqual({
      distance_km: 10.5,
      offerings_ja: '水、スポーツドリンク',
      offerings_en: 'Water, Sports drink',
      is_featured: true,
    });
  });
});

// ── rowToCheckpoint ──────────────────────────────────────────

describe('rowToCheckpoint', () => {
  it('行データを Checkpoint 型に変換する', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      distance_km: 30.0,
      closing_time: '10:00',
    };
    expect(rowToCheckpoint(row)).toEqual({
      distance_km: 30.0,
      closing_time: '10:00',
    });
  });
});

// ── rowToAccessPoint ─────────────────────────────────────────

describe('rowToAccessPoint', () => {
  it('walk_minutes が null の場合は null を返す', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      station_name_ja: '東京駅',
      station_name_en: 'Tokyo Station',
      station_code: 'JR-001',
      transport_to_venue_ja: '徒歩15分',
      transport_to_venue_en: '15 min walk',
      latitude: 35.6812,
      longitude: 139.7671,
      walk_minutes: null,
      is_primary: true,
      sort_order: 0,
    };
    const result = rowToAccessPoint(row);
    expect(result.walk_minutes).toBeNull();
    expect(result.is_primary).toBe(true);
  });
});

// ── rowToWeather ─────────────────────────────────────────────

describe('rowToWeather', () => {
  it('行データを WeatherHistory 型に変換する', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      year: 2025,
      avg_temp: 12.5,
      max_temp: 18.0,
      min_temp: 7.0,
      humidity_pct: 65,
      precipitation_mm: 0,
      wind_speed_ms: 3.2,
    };
    const result = rowToWeather(row);
    expect(result.year).toBe(2025);
    expect(result.avg_temp).toBe(12.5);
  });
});

// ── rowToGift ────────────────────────────────────────────────

describe('rowToGift', () => {
  it('gift_categories は JSON パースされる', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      gift_categories: '["medal","towel"]',
      description_ja: 'メダル',
      description_en: 'Medal',
      image: null,
      sort_order: 0,
    };
    const result = rowToGift(row);
    expect(result.gift_categories).toEqual(['medal', 'towel']);
    expect(result.image).toBeNull();
  });

  it('gift_categories が不正なJSONの場合は空配列', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      gift_categories: 'invalid',
      description_ja: 'テスト',
      description_en: 'Test',
      image: null,
      sort_order: 0,
    };
    expect(rowToGift(row).gift_categories).toEqual([]);
  });
});

// ── rowToEntryPeriod ─────────────────────────────────────────

describe('rowToEntryPeriod', () => {
  it('category_id が null の場合は null を返す', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      category_id: null,
      label_ja: '一般エントリー',
      label_en: 'General Entry',
      start_date: '2025-10-01',
      end_date: '2025-12-31',
      entry_fee: null,
      sort_order: 0,
    };
    const result = rowToEntryPeriod(row);
    expect(result.category_id).toBeNull();
    expect(result.label_ja).toBe('一般エントリー');
  });
});

// ── rowToEntryLink ───────────────────────────────────────────

describe('rowToEntryLink', () => {
  it('行データを EntryLink 型に変換する', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      site_name: 'RUNNET',
      url: 'https://runnet.example.com',
      sort_order: 0,
    };
    expect(rowToEntryLink(row)).toEqual({
      id: 1,
      race_id: 'test-race-2026',
      site_name: 'RUNNET',
      url: 'https://runnet.example.com',
      sort_order: 0,
    });
  });
});

// ── rowToReceptionSession ────────────────────────────────────

describe('rowToReceptionSession', () => {
  it('close_time が null の場合は null を返す', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      date: '2026-10-01',
      open_time: '07:00',
      close_time: null,
      location_ja: null,
      location_en: null,
      note_ja: null,
      note_en: null,
      sort_order: 0,
    };
    expect(rowToReceptionSession(row).close_time).toBeNull();
    expect(rowToReceptionSession(row).open_time).toBe('07:00');
  });
});

// ── rowToResult ──────────────────────────────────────────────

describe('rowToResult', () => {
  it('nullable フィールドが null で返る', () => {
    const row = {
      id: 1,
      race_id: 'test-race-2026',
      participants_count: null,
      finishers_count: null,
      finisher_rate_pct: null,
      weather_condition_ja: '晴れ',
      weather_condition_en: 'Sunny',
      temperature_c: null,
      max_temp_c: null,
      min_temp_c: null,
      wind_speed_ms: null,
      humidity_pct: null,
      notes_ja: null,
      notes_en: null,
      avg_time: null,
    };
    const result = rowToResult(row);
    expect(result.participants_count).toBeNull();
    expect(result.weather_condition_ja).toBe('晴れ');
  });
});

// ── rowToCategory ────────────────────────────────────────────

describe('rowToCategory', () => {
  const baseRow = {
    id: 1,
    race_id: 'test-race-2026',
    distance_type: 'full',
    distance_km: 42.195,
    time_limit_minutes: 360,
    start_time: '09:00',
    capacity: 5000,
    entry_fee: 12000,
    entry_fee_u25: null,
    name_ja: null,
    name_en: null,
    description_ja: null,
    description_en: null,
    eligibility_ja: null,
    eligibility_en: null,
    course_gpx_file: null,
    waves: '[]',
    sort_order: 0,
  };

  it('waves は JSON パースされる', () => {
    const row = { ...baseRow, waves: '[{"name":"A","start_time":"09:00"}]' };
    const result = rowToCategory(row);
    expect(result.waves).toEqual([{ name: 'A', start_time: '09:00' }]);
  });

  it('waves が不正JSONの場合は null', () => {
    const row = { ...baseRow, waves: 'invalid' };
    expect(rowToCategory(row).waves).toBeNull();
  });

  it('course_highlights がない場合は空配列', () => {
    expect(rowToCategory(baseRow).course_highlights).toEqual([]);
  });

  it('course_highlights が渡された場合は変換される', () => {
    const highlight = {
      id: 1,
      race_id: 'test-race-2026',
      category_id: 1,
      km: 30,
      name_ja: '難所',
      name_en: null,
      note_ja: null,
      note_en: null,
      sort_order: 0,
    };
    const result = rowToCategory(baseRow, [highlight]);
    expect(result.course_highlights).toHaveLength(1);
    expect(result.course_highlights[0].name_ja).toBe('難所');
  });
});

// ── rowToGallery / rowToVoice / rowToTimeBucket / rowToCourseHighlight ──

describe('rowToGallery', () => {
  it('caption が null の場合は null を返す', () => {
    const row = { id: 1, race_id: 'test-race-2026', src: '/img/1.jpg', caption_ja: null, caption_en: null, sort_order: 0 };
    expect(rowToGallery(row).caption_ja).toBeNull();
  });
});

describe('rowToVoice', () => {
  it('quote_en と author が null の場合は null を返す', () => {
    const row = { id: 1, race_id: 'test-race-2026', quote_ja: '最高！', quote_en: null, author: null, sort_order: 0 };
    const result = rowToVoice(row);
    expect(result.quote_en).toBeNull();
    expect(result.author).toBeNull();
  });
});

describe('rowToTimeBucket', () => {
  it('行データを RaceTimeBucket 型に変換する', () => {
    const row = { id: 1, race_id: 'test-race-2026', bucket: '4:00-4:30', pct: 12.5, sort_order: 0 };
    expect(rowToTimeBucket(row)).toEqual({ id: 1, race_id: 'test-race-2026', bucket: '4:00-4:30', pct: 12.5, sort_order: 0 });
  });
});

describe('rowToCourseHighlight', () => {
  it('category_id が null の場合は null を返す', () => {
    const row = { id: 1, race_id: 'r', category_id: null, km: 10, name_ja: 'test', name_en: null, note_ja: null, note_en: null, sort_order: 0 };
    expect(rowToCourseHighlight(row).category_id).toBeNull();
  });
});

// ── assembleRace ─────────────────────────────────────────────

describe('assembleRace', () => {
  const baseRaceRow = {
    id: 'test-race-2026',
    name_ja: 'テスト大会',
    name_en: 'Test Race',
    series_id: null,
    full_name_ja: null,
    full_name_en: null,
    edition: null,
    date: '2026-10-01',
    prefecture: '13',
    city_ja: '東京都',
    city_en: 'Tokyo',
    description_ja: '説明',
    description_en: 'Description',
    official_url: 'https://example.com',
    entry_fee: 10000,
    entry_fee_by_category: false,
    entry_capacity: 3000,
    entry_start_date: '2026-01-01',
    entry_end_date: '2026-08-31',
    entry_closed: false,
    reception_type: 'race_day',
    reception_note_ja: '',
    reception_note_en: '',
    tags: '["trail"]',
    course_gpx_file: null,
    course_max_elevation_m: 500,
    course_min_elevation_m: 10,
    course_elevation_diff_m: 490,
    course_surface: 'road',
    course_certification: '["JAAF"]',
    course_highlights_ja: 'コース説明',
    course_highlights_en: 'Course info',
    course_notes_ja: null,
    course_notes_en: null,
    venue_name_ja: null,
    venue_name_en: null,
    venue_address: null,
    start_lat: null,
    start_lng: null,
    motif: null,
    motif_color: null,
    motif_romaji: null,
    tagline_ja: null,
    tagline_en: null,
    hero_image_url: null,
    hero_caption_ja: null,
    hero_caption_en: null,
    created_at: '2026-01-01T00:00:00.000Z',
    updated_at: '2026-01-01T00:00:00.000Z',
  };

  it('最小データで Race 型を返す（オブジェクト引数）', () => {
    const race = assembleRace(baseRaceRow, {});
    expect(race.id).toBe('test-race-2026');
    expect(race.name_ja).toBe('テスト大会');
    expect(race.categories).toEqual([]);
    expect(race.aid_stations).toEqual([]);
    expect(race.tags).toEqual(['trail']);
    expect(race.result).toBeNull();
  });

  it('course_certification は JSON パースされる', () => {
    const race = assembleRace(baseRaceRow, {});
    expect(race.course_info.certification).toEqual(['JAAF']);
  });

  it('reception_sessions が渡された場合は変換される', () => {
    const session = {
      id: 1,
      race_id: 'test-race-2026',
      date: '2026-10-01',
      open_time: '07:00',
      close_time: '08:30',
      location_ja: null,
      location_en: null,
      note_ja: null,
      note_en: null,
      sort_order: 0,
    };
    const race = assembleRace(baseRaceRow, { receptionSessionRows: [session] });
    expect(race.reception_sessions).toHaveLength(1);
    expect(race.reception_sessions[0].close_time).toBe('08:30');
  });

  it('resultRows が複数ある場合は先頭のみ使う', () => {
    const resultRow = {
      id: 1,
      race_id: 'test-race-2026',
      participants_count: 3000,
      finishers_count: 2800,
      finisher_rate_pct: 93.3,
      weather_condition_ja: '晴れ',
      weather_condition_en: 'Sunny',
      temperature_c: 15,
      max_temp_c: 20,
      min_temp_c: 10,
      wind_speed_ms: 3,
      humidity_pct: 60,
      notes_ja: null,
      notes_en: null,
      avg_time: null,
    };
    const race = assembleRace(baseRaceRow, { resultRows: [resultRow] });
    expect(race.result?.participants_count).toBe(3000);
  });

  it('courseHighlightRows が category_id なしの場合はメインカテゴリに振り分けられる', () => {
    const catRow = {
      id: 10,
      race_id: 'test-race-2026',
      distance_type: 'full',
      distance_km: 42.195,
      time_limit_minutes: 360,
      start_time: '09:00',
      capacity: 3000,
      entry_fee: null,
      entry_fee_u25: null,
      name_ja: null,
      name_en: null,
      description_ja: null,
      description_en: null,
      eligibility_ja: null,
      eligibility_en: null,
      course_gpx_file: null,
      waves: '[]',
      sort_order: 0,
    };
    const highlight = {
      id: 1,
      race_id: 'test-race-2026',
      category_id: null, // メインカテゴリへ振り分け
      km: 30,
      name_ja: '難所',
      name_en: null,
      note_ja: null,
      note_en: null,
      sort_order: 0,
    };
    const race = assembleRace(baseRaceRow, {
      categories: [catRow],
      courseHighlightRows: [highlight],
    });
    expect(race.categories[0].course_highlights).toHaveLength(1);
    expect(race.categories[0].course_highlights[0].name_ja).toBe('難所');
  });
});
