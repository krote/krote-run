import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest';
import { filterRaces, sortRacesByDate, sortRaces, emptyFilter } from '../utils';
import { makeRace, makeCategory, makeEntryPeriod } from './fixtures';
import type { Race } from '../types';

const TODAY = '2026-04-02';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(`${TODAY}T12:00:00.000Z`));
});

afterEach(() => {
  vi.useRealTimers();
});

// テスト用レース一式
function makeRaces(): Race[] {
  return [
    // 受付中（open_entry）
    makeRace({
      id: 'race-open',
      name_ja: '受付中大会',
      name_en: 'Open Race',
      date: '2026-10-01',
      prefecture: '13',
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })],
      categories: [makeCategory({ distance_type: 'full', distance_km: 42.195 })],
      tags: ['フラット', '記録狙い'],
    }),
    // 受付前（entry_not_open）
    makeRace({
      id: 'race-not-open',
      name_ja: '受付前大会',
      name_en: 'Not Open Race',
      date: '2026-11-01',
      prefecture: '27',
      entry_periods: [makeEntryPeriod({ start_date: '2026-07-01', end_date: '2026-09-30' })],
      categories: [makeCategory({ distance_type: 'half', distance_km: 21.0975 })],
      tags: ['景色が良い'],
    }),
    // 受付終了（entry_closed）
    makeRace({
      id: 'race-closed',
      name_ja: '受付終了大会',
      name_en: 'Closed Race',
      date: '2026-09-01',
      prefecture: '13',
      entry_periods: [makeEntryPeriod({ start_date: '2026-01-01', end_date: '2026-03-31' })],
      categories: [makeCategory({ distance_type: 'full', distance_km: 42.195 })],
      tags: [],
    }),
    // 開催済み（past）
    makeRace({
      id: 'race-past',
      name_ja: '開催済み大会',
      name_en: 'Past Race',
      date: '2026-03-01',
      prefecture: '13',
      entry_periods: [],
      categories: [makeCategory({ distance_type: 'full', distance_km: 42.195 })],
      tags: [],
    }),
  ];
}

describe('filterRaces - ステータスフィルタ', () => {
  it('statuses が空なら全件返す', () => {
    const races = makeRaces();
    expect(filterRaces(races, { ...emptyFilter(), statuses: [] })).toHaveLength(4);
  });

  it('open_entry のみ指定すると受付中だけ返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), statuses: ['open_entry'] });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-open');
  });

  it('past を除外するデフォルト挙動（3ステータス指定）', () => {
    const races = makeRaces();
    const result = filterRaces(races, {
      ...emptyFilter(),
      statuses: ['open_entry', 'entry_not_open', 'entry_closed'],
    });
    expect(result).toHaveLength(3);
    expect(result.find(r => r.id === 'race-past')).toBeUndefined();
  });

  it('past のみ指定すると開催済みだけ返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), statuses: ['past'] });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-past');
  });
});

describe('filterRaces - 都道府県フィルタ', () => {
  it('指定した都道府県のみ返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), prefecture: '27' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-not-open');
  });

  it('該当なしの都道府県は空を返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), prefecture: '01' });
    expect(result).toHaveLength(0);
  });
});

describe('filterRaces - 距離タイプフィルタ', () => {
  it('half のみ指定するとハーフ大会だけ返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), distanceType: 'half' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-not-open');
  });

  it('full を指定するとフル大会をすべて返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), distanceType: 'full' });
    expect(result).toHaveLength(3);
  });
});

describe('filterRaces - 月フィルタ', () => {
  it('10月を指定すると10月開催の大会だけ返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), month: 10 });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-open');
  });
});

describe('filterRaces - タグフィルタ', () => {
  it('指定したタグを持つ大会だけ返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), tags: ['フラット'] });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-open');
  });

  it('複数タグはAND条件（すべて一致）', () => {
    const races = makeRaces();
    // 両方のタグを持つのは race-open のみ
    const result = filterRaces(races, { ...emptyFilter(), tags: ['フラット', '記録狙い'] });
    expect(result).toHaveLength(1);

    // race-open にない組み合わせは0件
    const result2 = filterRaces(races, { ...emptyFilter(), tags: ['フラット', '景色が良い'] });
    expect(result2).toHaveLength(0);
  });
});

describe('filterRaces - テキスト検索', () => {
  it('name_ja に部分一致する大会を返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), searchText: '受付中' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-open');
  });

  it('name_en に部分一致する大会を返す（大文字小文字無視）', () => {
    const races = makeRaces();
    // 'Past Race' は past レースのみが持つ固有の名称
    const result = filterRaces(races, { ...emptyFilter(), searchText: 'past race' });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-past');
  });

  it('マッチしない場合は空を返す', () => {
    const races = makeRaces();
    const result = filterRaces(races, { ...emptyFilter(), searchText: '存在しない大会' });
    expect(result).toHaveLength(0);
  });
});

describe('filterRaces - 複合条件', () => {
  it('都道府県 + ステータスの組み合わせ', () => {
    const races = makeRaces();
    const result = filterRaces(races, {
      ...emptyFilter(),
      prefecture: '13',
      statuses: ['open_entry'],
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('race-open');
  });
});

describe('sortRacesByDate', () => {
  it('昇順（デフォルト）で日付が早い順に並ぶ', () => {
    const races = [
      makeRace({ id: 'c', date: '2026-12-01' }),
      makeRace({ id: 'a', date: '2026-03-01' }),
      makeRace({ id: 'b', date: '2026-06-01' }),
    ];
    const sorted = sortRacesByDate(races);
    expect(sorted.map(r => r.id)).toEqual(['a', 'b', 'c']);
  });

  it('降順で日付が遅い順に並ぶ', () => {
    const races = [
      makeRace({ id: 'c', date: '2026-12-01' }),
      makeRace({ id: 'a', date: '2026-03-01' }),
      makeRace({ id: 'b', date: '2026-06-01' }),
    ];
    const sorted = sortRacesByDate(races, false);
    expect(sorted.map(r => r.id)).toEqual(['c', 'b', 'a']);
  });

  it('元の配列を変更しない（immutable）', () => {
    const races = [
      makeRace({ id: 'b', date: '2026-06-01' }),
      makeRace({ id: 'a', date: '2026-03-01' }),
    ];
    const original = [...races];
    sortRacesByDate(races);
    expect(races[0].id).toBe(original[0].id);
  });

  it('空配列は空配列を返す', () => {
    expect(sortRacesByDate([])).toEqual([]);
  });
});

describe('sortRaces - date_asc', () => {
  it('開催日の昇順で並ぶ', () => {
    const races = [
      makeRace({ id: 'c', date: '2026-12-01' }),
      makeRace({ id: 'a', date: '2026-04-01' }),
      makeRace({ id: 'b', date: '2026-08-01' }),
    ];
    const sorted = sortRaces(races, 'date_asc');
    expect(sorted.map((r) => r.id)).toEqual(['a', 'b', 'c']);
  });

  it('元の配列を変更しない', () => {
    const races = [
      makeRace({ id: 'b', date: '2026-08-01' }),
      makeRace({ id: 'a', date: '2026-04-01' }),
    ];
    const original = [...races];
    sortRaces(races, 'date_asc');
    expect(races[0].id).toBe(original[0].id);
  });
});

describe('sortRaces - entry_closing_soon', () => {
  it('受付終了が近い順（end_date 昇順）に並ぶ', () => {
    const races = [
      makeRace({ id: 'late', date: '2026-10-01', entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })] }),
      makeRace({ id: 'soon', date: '2026-10-01', entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-04-10' })] }),
    ];
    const sorted = sortRaces(races, 'entry_closing_soon');
    expect(sorted[0].id).toBe('soon');
    expect(sorted[1].id).toBe('late');
  });

  it('受付中でない大会は末尾に移動する', () => {
    const races = [
      makeRace({ id: 'no-entry', date: '2026-10-01', entry_periods: [] }),
      makeRace({ id: 'active', date: '2026-10-01', entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-04-10' })] }),
    ];
    const sorted = sortRaces(races, 'entry_closing_soon');
    expect(sorted[0].id).toBe('active');
    expect(sorted[1].id).toBe('no-entry');
  });

  it('受付中がない場合は開催日順で並ぶ', () => {
    const races = [
      makeRace({ id: 'b', date: '2026-12-01', entry_periods: [] }),
      makeRace({ id: 'a', date: '2026-08-01', entry_periods: [] }),
    ];
    const sorted = sortRaces(races, 'entry_closing_soon');
    expect(sorted[0].id).toBe('a');
    expect(sorted[1].id).toBe('b');
  });
});

describe('sortRaces - entry_opening_soon', () => {
  it('受付開始が近い順（start_date 昇順）に並ぶ', () => {
    const races = [
      makeRace({ id: 'far', date: '2026-10-01', entry_periods: [makeEntryPeriod({ start_date: '2026-09-01', end_date: '2026-09-30' })] }),
      makeRace({ id: 'near', date: '2026-10-01', entry_periods: [makeEntryPeriod({ start_date: '2026-05-01', end_date: '2026-06-30' })] }),
    ];
    const sorted = sortRaces(races, 'entry_opening_soon');
    expect(sorted[0].id).toBe('near');
    expect(sorted[1].id).toBe('far');
  });

  it('未来の受付がない大会は末尾に移動する', () => {
    const races = [
      makeRace({ id: 'no-future', date: '2026-10-01', entry_periods: [makeEntryPeriod({ start_date: '2026-01-01', end_date: '2026-03-31' })] }),
      makeRace({ id: 'has-future', date: '2026-10-01', entry_periods: [makeEntryPeriod({ start_date: '2026-05-01', end_date: '2026-06-30' })] }),
    ];
    const sorted = sortRaces(races, 'entry_opening_soon');
    expect(sorted[0].id).toBe('has-future');
    expect(sorted[1].id).toBe('no-future');
  });
});
