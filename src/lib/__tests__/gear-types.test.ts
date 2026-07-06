import { describe, it, expect } from 'vitest';
import {
  GEAR_CATEGORIES,
  GEAR_USAGE_TAGS,
  RACE_RESULT_STATUSES,
  type GearCategory,
  type GearUsageTag,
  type RaceResultStatus,
  type UserGear,
  type UserRaceGear,
  type UserRaceResult,
} from '../types';

describe('GEAR_CATEGORIES', () => {
  it('必須カテゴリが含まれている', () => {
    const required: GearCategory[] = ['shoes', 'tops', 'bottoms', 'nutrition', 'other'];
    for (const cat of required) {
      expect(GEAR_CATEGORIES).toContain(cat);
    }
  });

  it('12件定義されている', () => {
    expect(GEAR_CATEGORIES).toHaveLength(12);
  });

  it('重複がない', () => {
    expect(new Set(GEAR_CATEGORIES).size).toBe(GEAR_CATEGORIES.length);
  });
});

describe('GEAR_USAGE_TAGS', () => {
  it('race / training / both の3値', () => {
    expect(GEAR_USAGE_TAGS).toContain('race');
    expect(GEAR_USAGE_TAGS).toContain('training');
    expect(GEAR_USAGE_TAGS).toContain('both');
    expect(GEAR_USAGE_TAGS).toHaveLength(3);
  });
});

describe('RACE_RESULT_STATUSES', () => {
  it('finished / dnf / dns の3値', () => {
    expect(RACE_RESULT_STATUSES).toContain('finished');
    expect(RACE_RESULT_STATUSES).toContain('dnf');
    expect(RACE_RESULT_STATUSES).toContain('dns');
    expect(RACE_RESULT_STATUSES).toHaveLength(3);
  });
});

describe('UserGear 型の形状', () => {
  it('必須フィールドを持つオブジェクトが組み立てられる', () => {
    const gear: UserGear = {
      id: 'gear-1',
      user_id: 'user-1',
      category: 'shoes',
      brand: 'HOKA',
      name: 'Speedgoat 5',
      amazon_url: null,
      asin: null,
      usage_tag: 'race',
      memo: '',
      is_retired: false,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    };
    expect(gear.id).toBe('gear-1');
    expect(gear.category).toBe('shoes');
    expect(gear.is_retired).toBe(false);
  });
});

describe('UserRaceGear 型の形状', () => {
  it('必須フィールドを持つオブジェクトが組み立てられる', () => {
    const raceGear: UserRaceGear = {
      id: 1,
      user_race_id: 'user-race-1',
      gear_id: 'gear-1',
      quantity: 6,
      used: null,
      used_quantity: null,
      note: '',
      sort_order: 0,
    };
    expect(raceGear.quantity).toBe(6);
    expect(raceGear.used).toBeNull();
  });
});

describe('UserRaceResult 型の形状', () => {
  it('必須フィールドを持つオブジェクトが組み立てられる', () => {
    const result: UserRaceResult = {
      id: 'result-1',
      user_race_id: 'user-race-1',
      category_id: null,
      status: 'finished',
      finish_time_sec: 14400,
      note: '',
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    };
    expect(result.status).toBe('finished');
    expect(result.finish_time_sec).toBe(14400);
  });

  it('dnf の場合 finish_time_sec は null 可', () => {
    const result: UserRaceResult = {
      id: 'result-2',
      user_race_id: 'user-race-2',
      category_id: null,
      status: 'dnf',
      finish_time_sec: null,
      note: '',
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
    };
    expect(result.status).toBe('dnf');
    expect(result.finish_time_sec).toBeNull();
  });
});
