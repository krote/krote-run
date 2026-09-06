'use strict';

/**
 * scripts/calc-travel-times.js のユニットテスト
 * 実行: node --test scripts/calc-travel-times.test.js
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const {
  HUBS,
  getArrivalDeadline,
  NAVITIME_HOST,
  buildNavitimeUrl,
  extractShortestDurationMinutes,
  fetchTravelMinutes,
  buildUpsertSQL,
  calcTravelTimesForRace,
  generateSeedSQL,
} = require('./calc-travel-times');

// ── テスト用フィクスチャ ─────────────────────────────────────────────

function makeCategory(overrides = {}) {
  return { distance_type: 'full', start_time: '09:00', ...overrides };
}

function makeReceptionSession(overrides = {}) {
  return { date: '2026-10-01', close_time: null, ...overrides };
}

function makeRace(overrides = {}) {
  return {
    id: 'test-race-2026',
    date: '2026-10-01',
    reception_type: 'race_day',
    reception_sessions: [],
    categories: [makeCategory()],
    start_lat: 35.6812,
    start_lng: 139.7671,
    ...overrides,
  };
}

// ── getArrivalDeadline（reception.ts の同等ロジック） ─────────────────

describe('getArrivalDeadline', () => {
  test('start_time あり・当日受付締切なし → start_time - 30分', () => {
    const race = makeRace({ categories: [makeCategory({ start_time: '09:00' })] });
    assert.equal(getArrivalDeadline(race), '08:30');
  });

  test('当日受付締切が start_time - 30分より早い → 受付締切を返す', () => {
    const race = makeRace({
      reception_sessions: [makeReceptionSession({ date: '2026-10-01', close_time: '08:00' })],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    assert.equal(getArrivalDeadline(race), '08:00');
  });

  test('categories が空 → null', () => {
    const race = makeRace({ categories: [] });
    assert.equal(getArrivalDeadline(race), null);
  });

  test('start_time が空文字 → null', () => {
    const race = makeRace({ categories: [makeCategory({ start_time: '' })] });
    assert.equal(getArrivalDeadline(race), null);
  });

  test('複数 categories の最早 start_time を使う', () => {
    const race = makeRace({
      categories: [
        makeCategory({ start_time: '09:00' }),
        makeCategory({ start_time: '08:00' }),
        makeCategory({ start_time: '10:00' }),
      ],
    });
    assert.equal(getArrivalDeadline(race), '07:30');
  });

  test('前日のみの session は当日受付締切に含まれない → start_time基準', () => {
    const race = makeRace({
      reception_sessions: [makeReceptionSession({ date: '2026-09-30', close_time: '18:00' })],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    assert.equal(getArrivalDeadline(race), '08:30');
  });
});

// ── HUBS ────────────────────────────────────────────────────────────

describe('HUBS', () => {
  test('8ハブが定義されている', () => {
    assert.equal(Object.keys(HUBS).length, 8);
  });

  test('東京ハブの座標が正しい', () => {
    assert.equal(HUBS.tokyo.lat, 35.6812);
    assert.equal(HUBS.tokyo.lng, 139.7671);
  });
});

// ── buildNavitimeUrl ────────────────────────────────────────────────

describe('buildNavitimeUrl', () => {
  test('start/goal の座標を "lat,lng" 形式で含む', () => {
    const url = buildNavitimeUrl(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      { date: '2026-10-01', time: '08:30:00' }
    );
    assert.ok(url.includes('start=35.6812%2C139.7671'));
    assert.ok(url.includes('goal=35.8079%2C139.6782'));
  });

  test('goal_time に date と time を結合したISO形式を含む（arrive-by相当）', () => {
    const url = buildNavitimeUrl(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      { date: '2026-10-01', time: '08:30:00' }
    );
    assert.ok(url.includes(encodeURIComponent('2026-10-01T08:30:00')));
  });

  test('NAVITIME_HOST を含むエンドポイントを組み立てる', () => {
    const url = buildNavitimeUrl(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      { date: '2026-10-01', time: '08:30:00' }
    );
    assert.ok(url.startsWith(`https://${NAVITIME_HOST}/route_transit?`));
  });
});

// ── extractShortestDurationMinutes ──────────────────────────────────

describe('extractShortestDurationMinutes', () => {
  test('items が1件 → summary.move.time（分）を返す', () => {
    const res = { items: [{ summary: { move: { time: 236 } } }] };
    assert.equal(extractShortestDurationMinutes(res), 236);
  });

  test('複数 items → 最短の summary.move.time を返す', () => {
    const res = {
      items: [
        { summary: { move: { time: 180 } } },
        { summary: { move: { time: 60 } } },
        { summary: { move: { time: 300 } } },
      ],
    };
    assert.equal(extractShortestDurationMinutes(res), 60);
  });

  test('items が空配列 → null（経路なし）', () => {
    assert.equal(extractShortestDurationMinutes({ items: [] }), null);
  });

  test('items が欠落 → null', () => {
    assert.equal(extractShortestDurationMinutes({}), null);
  });

  test('summary.move.time が数値でない items は除外し、残りから最短を返す', () => {
    const res = {
      items: [
        { summary: {} },
        { summary: { move: { time: 90 } } },
      ],
    };
    assert.equal(extractShortestDurationMinutes(res), 90);
  });

  test('全itemsにtimeが無い → null', () => {
    const res = { items: [{ summary: {} }] };
    assert.equal(extractShortestDurationMinutes(res), null);
  });
});

// ── fetchTravelMinutes ──────────────────────────────────────────────

describe('fetchTravelMinutes', () => {
  test('正常レスポンス → 分をそのまま返す', async () => {
    const fetchFn = async () => ({
      ok: true,
      json: async () => ({ items: [{ summary: { move: { time: 236 } } }] }),
    });
    const minutes = await fetchTravelMinutes(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      '2026-10-01',
      '08:30:00',
      'test-api-key',
      fetchFn
    );
    assert.equal(minutes, 236);
  });

  test('items が空 → null を返す（不明扱い）', async () => {
    const fetchFn = async () => ({
      ok: true,
      json: async () => ({ items: [] }),
    });
    const minutes = await fetchTravelMinutes(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      '2026-10-01',
      '08:30:00',
      'test-api-key',
      fetchFn
    );
    assert.equal(minutes, null);
  });

  test('HTTPエラー → 例外を投げる', async () => {
    const fetchFn = async () => ({
      ok: false,
      status: 500,
      text: async () => 'Internal Server Error',
    });
    await assert.rejects(() =>
      fetchTravelMinutes(
        { lat: 35.6812, lng: 139.7671 },
        { lat: 35.8079, lng: 139.6782 },
        '2026-10-01',
        '08:30:00',
        'test-api-key',
        fetchFn
      )
    );
  });

  test('X-RapidAPI-Key / X-RapidAPI-Host ヘッダーが正しく渡される', async () => {
    let calledHeaders = null;
    const fetchFn = async (url, opts) => {
      calledHeaders = opts.headers;
      return { ok: true, json: async () => ({ items: [{ summary: { move: { time: 60 } } }] }) };
    };
    await fetchTravelMinutes(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      '2026-10-01',
      '08:30:00',
      'test-api-key',
      fetchFn
    );
    assert.equal(calledHeaders['X-RapidAPI-Key'], 'test-api-key');
    assert.equal(calledHeaders['X-RapidAPI-Host'], NAVITIME_HOST);
  });
});

// ── buildUpsertSQL ──────────────────────────────────────────────────

describe('buildUpsertSQL', () => {
  test('INSERT ... ON CONFLICT(race_id, hub_id) 形式を生成する', () => {
    const sql = buildUpsertSQL({
      race_id: 'tokyo-marathon-2026',
      hub_id: 'osaka',
      duration_minutes: 150,
      departure_time: null,
      calculated_at: '2026-09-02T00:00:00.000Z',
    });
    assert.ok(sql.includes('INSERT INTO race_travel_times'));
    assert.ok(sql.includes("'tokyo-marathon-2026'"));
    assert.ok(sql.includes("'osaka'"));
    assert.ok(sql.includes('150'));
    assert.ok(sql.includes('ON CONFLICT(race_id, hub_id) DO UPDATE SET'));
  });

  test('シングルクォートをエスケープする', () => {
    const sql = buildUpsertSQL({
      race_id: "o'hare-marathon-2026",
      hub_id: 'tokyo',
      duration_minutes: 100,
      departure_time: null,
      calculated_at: '2026-09-02T00:00:00.000Z',
    });
    assert.ok(sql.includes("o''hare-marathon-2026"));
  });
});

// ── calcTravelTimesForRace ──────────────────────────────────────────

describe('calcTravelTimesForRace', () => {
  test('start_lat/start_lng が無いレースは処理せず空配列を返す', async () => {
    const race = makeRace({ start_lat: null, start_lng: null });
    let called = false;
    const fetchFn = async () => { called = true; return { ok: true, json: async () => ({}) }; };
    const rows = await calcTravelTimesForRace(race, { apiKey: 'test-api-key', fetchFn });
    assert.deepEqual(rows, []);
    assert.equal(called, false);
  });

  test('到着期限が計算できないレースは処理せず空配列を返す', async () => {
    const race = makeRace({ categories: [] });
    let called = false;
    const fetchFn = async () => { called = true; return { ok: true, json: async () => ({}) }; };
    const rows = await calcTravelTimesForRace(race, { apiKey: 'test-api-key', fetchFn });
    assert.deepEqual(rows, []);
    assert.equal(called, false);
  });

  test('8ハブすべてに問い合わせ、経路が見つかったハブのみ行を返す', async () => {
    const race = makeRace();
    let callCount = 0;
    const fetchFn = async () => {
      callCount++;
      // fukuoka（8番目）だけ経路なし
      if (callCount === 8) {
        return { ok: true, json: async () => ({ items: [] }) };
      }
      return { ok: true, json: async () => ({ items: [{ summary: { move: { time: 60 } } }] }) };
    };
    const rows = await calcTravelTimesForRace(race, { apiKey: 'test-api-key', fetchFn });
    assert.equal(callCount, 8);
    assert.equal(rows.length, 7);
    assert.equal(rows[0].race_id, 'test-race-2026');
    assert.equal(rows[0].duration_minutes, 60);
  });

  test('1ハブでエラーが起きても他のハブは処理を継続する', async () => {
    const race = makeRace();
    let callCount = 0;
    const fetchFn = async () => {
      callCount++;
      if (callCount === 1) throw new Error('network error');
      return { ok: true, json: async () => ({ items: [{ summary: { move: { time: 30 } } }] }) };
    };
    const rows = await calcTravelTimesForRace(race, { apiKey: 'test-api-key', fetchFn });
    assert.equal(callCount, 8);
    assert.equal(rows.length, 7);
  });
});

// ── generateSeedSQL ─────────────────────────────────────────────────

describe('generateSeedSQL', () => {
  test('複数行の SQL ファイル内容を生成する', () => {
    const sql = generateSeedSQL([
      { race_id: 'race-a', hub_id: 'tokyo', duration_minutes: 60, departure_time: null, calculated_at: '2026-09-02T00:00:00.000Z' },
      { race_id: 'race-b', hub_id: 'osaka', duration_minutes: 120, departure_time: null, calculated_at: '2026-09-02T00:00:00.000Z' },
    ]);
    assert.ok(sql.includes('race-a'));
    assert.ok(sql.includes('race-b'));
    assert.equal((sql.match(/INSERT INTO race_travel_times/g) || []).length, 2);
  });

  test('空配列でも例外を投げずヘッダーのみのSQLを返す', () => {
    const sql = generateSeedSQL([]);
    assert.equal(typeof sql, 'string');
    assert.ok(!sql.includes('INSERT INTO race_travel_times'));
  });
});
