/**
 * data.ts のクエリ発行パターンに対する回帰テスト。
 *
 * 背景: D1 の無料枠（rows_read 5,000,000/日）に到達したため、
 * 「表示に必要な行だけを読む」ことをテストで固定する。
 * D1 は ORDER BY のソート処理で走査した行も rows_read に計上するため、
 * 全件取得系クエリでは ORDER BY を発行せず JS 側で整列する。
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createFakeD1, type FakeD1 } from './fake-d1';
import * as schema from '../db/schema';
import {
  getRaces,
  getRaceById,
  getUpcomingRaces,
  getOpenEntryRaces,
  getSoonOpeningEntryRaces,
  getSeriesRaces,
  getRaceIndexEntries,
  getOpenEntryCount,
} from '../data';

let fake: FakeD1;

vi.mock('../db/client', () => ({
  getDatabase: () => fake.db,
}));

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: () => ({ env: {} }),
}));

// React の cache() はレンダリングコンテキスト外では素通しになるため、
// テストでは等価なメモ化に差し替え「cache() でラップされていること」を検証する。
// 本番のキャッシュはリクエスト単位なので、テストごとに clearMemoCaches() で破棄する。
const { memoCaches } = vi.hoisted(() => ({ memoCaches: [] as Map<string, unknown>[] }));

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    cache: <A extends unknown[], R>(fn: (...args: A) => R) => {
      const memo = new Map<string, unknown>();
      memoCaches.push(memo);
      return (...args: A): R => {
        const key = JSON.stringify(args);
        if (!memo.has(key)) memo.set(key, fn(...args));
        return memo.get(key) as R;
      };
    },
  };
});

// unstable_cache はリクエストをまたいで永続するデータキャッシュ。
// テストでは実キーと同じ「keyParts + 引数」でメモ化するスタブに差し替える（TTLは検証対象外）。
const { dataCache } = vi.hoisted(() => ({ dataCache: new Map<string, unknown>() }));

vi.mock('next/cache', () => ({
  unstable_cache: <A extends unknown[], R>(fn: (...args: A) => Promise<R>, keyParts: string[]) => {
    return async (...args: A): Promise<R> => {
      const key = JSON.stringify([keyParts, args]);
      if (!dataCache.has(key)) dataCache.set(key, await fn(...args));
      return dataCache.get(key) as R;
    };
  },
}));

/** 新しいリクエストが来た状態にする（リクエスト単位の React cache だけ破棄し、データキャッシュは残す） */
function startNewRequest() {
  for (const memo of memoCaches) memo.clear();
  fake.reset();
}

/** 2026-10-01 12:00 JST に固定 */
const NOW = new Date('2026-10-01T03:00:00Z');

function raceRow(id: string, date: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    name_ja: `${id} 大会`,
    name_en: `${id} race`,
    date,
    prefecture: '13',
    city_ja: '東京都',
    city_en: 'Tokyo',
    description_ja: '',
    description_en: '',
    official_url: '',
    entry_fee_by_category: 0,
    entry_capacity: 0,
    entry_closed: 0,
    reception_type: 'race_day',
    reception_note_ja: '',
    reception_note_en: '',
    tags: '[]',
    course_max_elevation_m: 0,
    course_min_elevation_m: 0,
    course_elevation_diff_m: 0,
    course_surface: 'road',
    course_certification: '[]',
    course_highlights_ja: '',
    course_highlights_en: '',
    created_at: '2026-01-01',
    updated_at: '2026-01-01',
    ...overrides,
  };
}

function categoryRow(id: number, raceId: string, name: string, sortOrder: number) {
  return {
    id,
    race_id: raceId,
    distance_type: 'full',
    distance_km: 42.195,
    time_limit_minutes: 360,
    start_time: '09:00',
    capacity: 1000,
    name_ja: name,
    name_en: name,
    waves: '[]',
    sort_order: sortOrder,
  };
}

function entryPeriodRow(id: number, raceId: string, start: string, end: string | null) {
  return {
    id,
    race_id: raceId,
    label_ja: '一般エントリー',
    label_en: 'General Entry',
    start_date: start,
    end_date: end,
    sort_order: 0,
  };
}

function giftRow(id: number, raceId: string, sortOrder: number) {
  return { id, race_id: raceId, gift_categories: '[]', description_ja: `gift${id}`, description_en: '', sort_order: sortOrder };
}

/**
 * レースを count 件投入する（race-01 .. race-NN、すべて未来日）。
 * カテゴリは sort_order を逆順で投入し、JS側の整列が効いていることを検証できるようにする。
 * エントリー期間は「受付中」と「30日以内に開始」の両方を張り、ホーム用3関数すべてが対象にできるようにする。
 */
function seedRaces(count = 10) {
  const races = [];
  const categories = [];
  const periods = [];
  const gifts = [];
  for (let i = 1; i <= count; i++) {
    const id = `race-${String(i).padStart(2, '0')}`;
    races.push(raceRow(id, `2026-10-${String(i + 4).padStart(2, '0')}`));
    categories.push(categoryRow(i * 2, id, `${id}-second`, 2));
    categories.push(categoryRow(i * 2 + 1, id, `${id}-first`, 1));
    periods.push(entryPeriodRow(i, id, '2026-09-01', '2026-12-31'));      // 受付中
    periods.push(entryPeriodRow(100 + i, id, '2026-10-10', '2026-12-31')); // 30日以内に開始
    gifts.push(giftRow(i, id, 0));
  }
  fake.insert(schema.races, races);
  fake.insert(schema.race_categories, categories);
  fake.insert(schema.race_entry_periods, periods);
  fake.insert(schema.participation_gifts, gifts);
}

/** race_id で絞り込まれた（= 全件スキャンでない）クエリか */
function isFilteredByRaceId(sql: string): boolean {
  return /"race_id" (in \(|=)/.test(sql);
}

/** drizzle が発行した select 文のうち、指定テーブルを引いているもの */
function selectsFor(tableName: string) {
  return fake.queriesFor(tableName).filter((q) => q.sql.startsWith('select'));
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
  fake = createFakeD1();
  for (const memo of memoCaches) memo.clear();
  dataCache.clear();
});

afterEach(() => {
  vi.useRealTimers();
});

// ── ホームページ用の3関数: 表示対象のレースの子行だけ読む ────────────

describe.each([
  ['getUpcomingRaces', getUpcomingRaces],
  ['getOpenEntryRaces', getOpenEntryRaces],
  ['getSoonOpeningEntryRaces', getSoonOpeningEntryRaces],
] as const)('%s', (name, call) => {
  it('子テーブルを全件スキャンせず、表示対象のレースIDだけで絞り込む', async () => {
    seedRaces(10);
    fake.reset();

    const races = await call(3);
    expect(races.length, `${name} が1件も返していない`).toBeGreaterThan(0);
    expect(races.length).toBeLessThanOrEqual(3);

    for (const table of ['race_categories', 'participation_gifts', 'completion_gifts', 'race_entry_periods']) {
      const queries = selectsFor(table);
      expect(queries.length, `${table} のクエリが発行されていない`).toBeGreaterThan(0);
      for (const q of queries) {
        expect(isFilteredByRaceId(q.sql), `${table} を全件スキャンしている: ${q.sql}`).toBe(true);
        expect(q.params.length, `${table} の絞り込みIDが表示件数を超えている`).toBeLessThanOrEqual(3);
      }
    }
  });

  it('レース本体もSQL側で件数を絞り、表示しないレースの行を読まない', async () => {
    seedRaces(10);
    fake.reset();

    await call(3);

    const raceQuery = fake.queries.find((q) => /^select .* from "races"/.test(q.sql));
    expect(raceQuery, 'races のクエリが発行されていない').toBeDefined();
    expect(raceQuery!.sql, 'races に LIMIT が付いていない').toMatch(/limit \?/);
  });

  it('カテゴリを sort_order 昇順で組み立てる', async () => {
    seedRaces(3);

    const races = await call(3);

    expect(races).toHaveLength(3);
    for (const race of races) {
      expect(race.categories.map((c) => c.name_ja)).toEqual([`${race.id}-first`, `${race.id}-second`]);
    }
  });
});

// ── 開催済みのレースは「受付中」扱いしない（races.date の索引で走査範囲も絞れる） ──

describe('開催日による絞り込み', () => {
  /** 開催日は過去だがエントリー期間だけ開いている（データ不整合）レースを1件投入する */
  function seedPastRaceWithOpenEntry() {
    fake.insert(schema.races, [raceRow('past-race', '2026-09-01')]);
    fake.insert(schema.race_entry_periods, [
      entryPeriodRow(900, 'past-race', '2026-08-01', '2026-12-31'),
      entryPeriodRow(901, 'past-race', '2026-10-10', '2026-12-31'),
    ]);
    fake.insert(schema.race_categories, [categoryRow(900, 'past-race', 'past-first', 1)]);
  }

  it('getOpenEntryRaces は開催済みのレースを返さない', async () => {
    seedPastRaceWithOpenEntry();

    const races = await getOpenEntryRaces(8);

    expect(races.map((r) => r.id)).not.toContain('past-race');
  });

  it('getSoonOpeningEntryRaces は開催済みのレースを返さない', async () => {
    seedPastRaceWithOpenEntry();

    const races = await getSoonOpeningEntryRaces(6);

    expect(races.map((r) => r.id)).not.toContain('past-race');
  });

  it('getOpenEntryCount は開催済みのレースを数えない', async () => {
    seedRaces(3);
    seedPastRaceWithOpenEntry();

    expect(await getOpenEntryCount()).toBe(3);
  });
});

// ── getRaces: 全件取得なので全件スキャンは許容するが ORDER BY は出さない ──

describe('getRaces', () => {
  it('子テーブルの取得で ORDER BY を発行しない（ソート行も rows_read に計上されるため）', async () => {
    seedRaces(5);
    fake.reset();

    await getRaces();

    for (const table of ['race_categories', 'participation_gifts', 'completion_gifts', 'race_entry_periods', 'reception_sessions']) {
      const queries = selectsFor(table);
      expect(queries.length, `${table} のクエリが発行されていない`).toBeGreaterThan(0);
      for (const q of queries) {
        expect(q.sql, `${table} で ORDER BY を発行している: ${q.sql}`).not.toMatch(/order by/i);
      }
    }
  });

  it('SQLでソートしなくても sort_order 昇順で組み立てる', async () => {
    seedRaces(3);

    const races = await getRaces();

    expect(races).toHaveLength(3);
    for (const race of races) {
      expect(race.categories.map((c) => c.name_ja)).toEqual([`${race.id}-first`, `${race.id}-second`]);
    }
  });

  it('開催日昇順で返す', async () => {
    seedRaces(5);

    const races = await getRaces();

    expect(races.map((r) => r.date)).toEqual([...races.map((r) => r.date)].sort());
  });
});

// ── getSeriesRaces: シリーズ内のレースの子行だけ読む ──────────────

describe('getSeriesRaces', () => {
  it('子テーブルをシリーズ内のレースIDだけで絞り込む', async () => {
    seedRaces(10);
    fake.insert(schema.race_series, [{ id: 'series-a', name_ja: 'シリーズA', name_en: 'Series A' }]);
    fake.insert(schema.races, [
      raceRow('series-race-1', '2026-11-01', { series_id: 'series-a' }),
      raceRow('series-race-2', '2026-11-02', { series_id: 'series-a' }),
    ]);
    fake.reset();

    const races = await getSeriesRaces('series-a', 'series-race-1');

    expect(races.map((r) => r.id)).toEqual(['series-race-2']);
    for (const table of ['race_categories', 'participation_gifts', 'completion_gifts', 'race_results']) {
      const queries = selectsFor(table);
      expect(queries.length, `${table} のクエリが発行されていない`).toBeGreaterThan(0);
      for (const q of queries) {
        expect(isFilteredByRaceId(q.sql), `${table} を全件スキャンしている: ${q.sql}`).toBe(true);
      }
    }
  });
});

// ── getRaceById: 同一リクエスト内の重複呼び出しを束ねる ───────────

describe('getRaceById', () => {
  it('同じIDで2回呼んでもD1へのクエリは1回分に束ねられる（React cache）', async () => {
    seedRaces(3);
    fake.reset();

    const [first, second] = await Promise.all([getRaceById('race-01'), getRaceById('race-01')]);

    expect(first?.id).toBe('race-01');
    expect(second?.id).toBe('race-01');
    const raceQueries = fake.queries.filter((q) => /^select .* from "races"/.test(q.sql));
    expect(raceQueries).toHaveLength(1);
  });
});

// ── getRaceIndexEntries: サイトマップ用の軽量クエリ ────────────────

describe('getRaceIndexEntries', () => {
  it('races テーブルのみを、必要な列だけ読む', async () => {
    seedRaces(5);
    fake.reset();

    const entries = await getRaceIndexEntries();

    expect(entries).toHaveLength(5);
    expect(Object.keys(entries[0]).sort()).toEqual(['date', 'id', 'name_en', 'name_ja']);
    expect(fake.queries).toHaveLength(1);
    expect(fake.queries[0].sql).toMatch(/from "races"/);
    expect(fake.queries[0].sql).not.toMatch(/race_categories|participation_gifts|race_entry_periods/);
  });

  it('開催日昇順で返す', async () => {
    seedRaces(5);

    const entries = await getRaceIndexEntries();

    expect(entries.map((e) => e.date)).toEqual([...entries.map((e) => e.date)].sort());
  });
});

// ── リクエストをまたぐデータキャッシュ（unstable_cache） ────────────

describe('unstable_cache によるリクエスト間キャッシュ', () => {
  it('getRaces は2回目のリクエストでD1に到達しない', async () => {
    seedRaces(5);
    await getRaces();

    startNewRequest();
    const races = await getRaces();

    expect(races).toHaveLength(5);
    expect(fake.queries, '2回目のリクエストでD1にクエリが飛んでいる').toHaveLength(0);
  });

  it('getRaceById は2回目のリクエストでD1に到達しない', async () => {
    seedRaces(3);
    await getRaceById('race-01');

    startNewRequest();
    const race = await getRaceById('race-01');

    expect(race?.id).toBe('race-01');
    expect(fake.queries).toHaveLength(0);
  });

  it('getRaceById は別IDならキャッシュを共有しない', async () => {
    seedRaces(3);
    await getRaceById('race-01');

    startNewRequest();
    const race = await getRaceById('race-02');

    expect(race?.id).toBe('race-02');
    expect(fake.queries.length).toBeGreaterThan(0);
  });

  it('同じJST日付のうちは getOpenEntryRaces もキャッシュから返す', async () => {
    seedRaces(5);
    await getOpenEntryRaces(8);

    startNewRequest();
    vi.setSystemTime(new Date('2026-10-01T14:00:00Z')); // 同日 23:00 JST
    await getOpenEntryRaces(8);

    expect(fake.queries).toHaveLength(0);
  });

  it.each([
    ['getOpenEntryRaces', () => getOpenEntryRaces(8)],
    ['getSoonOpeningEntryRaces', () => getSoonOpeningEntryRaces(6)],
    ['getUpcomingRaces', () => getUpcomingRaces(6)],
  ])('%s は JST日付が変わるとキャッシュを使い回さない', async (_name, call) => {
    seedRaces(5);
    await call();

    startNewRequest();
    vi.setSystemTime(new Date('2026-10-01T15:30:00Z')); // 翌日 00:30 JST
    await call();

    expect(fake.queries.length, '日付が変わったのに古いキャッシュを返している').toBeGreaterThan(0);
  });

  it('getOpenEntryCount も JST日付が変わると再取得する', async () => {
    seedRaces(5);
    expect(await getOpenEntryCount()).toBe(5);

    startNewRequest();
    vi.setSystemTime(new Date('2026-10-01T15:30:00Z')); // 翌日 00:30 JST
    await getOpenEntryCount();

    expect(fake.queries.length).toBeGreaterThan(0);
  });
});
