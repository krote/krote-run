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
  buildOtpEndpoint,
  buildPlanQuery,
  extractShortestDurationSeconds,
  secondsToMinutes,
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

// ── buildOtpEndpoint ────────────────────────────────────────────────

describe('buildOtpEndpoint', () => {
  test('デフォルト URL からエンドポイントを組み立てる', () => {
    assert.equal(
      buildOtpEndpoint('http://localhost:8080'),
      'http://localhost:8080/otp/routers/default/index/graphql'
    );
  });

  test('末尾スラッシュがあっても正しく組み立てる', () => {
    assert.equal(
      buildOtpEndpoint('http://localhost:8080/'),
      'http://localhost:8080/otp/routers/default/index/graphql'
    );
  });
});

// ── buildPlanQuery ──────────────────────────────────────────────────

describe('buildPlanQuery', () => {
  test('from/to の座標を含む', () => {
    const query = buildPlanQuery(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      { date: '2026-10-01', time: '08:30:00' }
    );
    assert.ok(query.includes('35.6812'));
    assert.ok(query.includes('139.7671'));
    assert.ok(query.includes('35.8079'));
    assert.ok(query.includes('139.6782'));
  });

  test('arriveBy: true と date/time を含む', () => {
    const query = buildPlanQuery(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      { date: '2026-10-01', time: '08:30:00' }
    );
    assert.ok(query.includes('arriveBy: true'));
    assert.ok(query.includes('date: "2026-10-01"'));
    assert.ok(query.includes('time: "08:30:00"'));
  });

  test('TRANSIT と WALK の transportModes を含む', () => {
    const query = buildPlanQuery(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      { date: '2026-10-01', time: '08:30:00' }
    );
    assert.ok(query.includes('mode: TRANSIT'));
    assert.ok(query.includes('mode: WALK'));
  });

  test('itineraries { duration legs { mode distance } } を含む', () => {
    const query = buildPlanQuery(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      { date: '2026-10-01', time: '08:30:00' }
    );
    assert.ok(query.includes('duration'));
    assert.ok(query.includes('legs'));
  });
});

// ── extractShortestDurationSeconds ──────────────────────────────────

describe('extractShortestDurationSeconds', () => {
  test('itineraries が1件 → その duration を返す', () => {
    const res = { data: { plan: { itineraries: [{ duration: 14124, legs: [] }] } } };
    assert.equal(extractShortestDurationSeconds(res), 14124);
  });

  test('複数 itineraries → 最短の duration を返す', () => {
    const res = {
      data: {
        plan: {
          itineraries: [
            { duration: 3600, legs: [] },
            { duration: 1800, legs: [] },
            { duration: 5400, legs: [] },
          ],
        },
      },
    };
    assert.equal(extractShortestDurationSeconds(res), 1800);
  });

  test('itineraries が空配列 → null（経路なし）', () => {
    const res = { data: { plan: { itineraries: [] } } };
    assert.equal(extractShortestDurationSeconds(res), null);
  });

  test('plan が null → null', () => {
    const res = { data: { plan: null } };
    assert.equal(extractShortestDurationSeconds(res), null);
  });

  test('data が欠落 → null', () => {
    assert.equal(extractShortestDurationSeconds({}), null);
  });

  test('errors フィールドがある場合は null', () => {
    const res = { errors: [{ message: 'boom' }], data: null };
    assert.equal(extractShortestDurationSeconds(res), null);
  });
});

// ── secondsToMinutes ────────────────────────────────────────────────

describe('secondsToMinutes', () => {
  test('3600秒 → 60分', () => {
    assert.equal(secondsToMinutes(3600), 60);
  });

  test('3660秒 → 61分（切り上げ）', () => {
    assert.equal(secondsToMinutes(3660), 61);
  });

  test('14124秒 → 236分', () => {
    assert.equal(secondsToMinutes(14124), 236);
  });

  test('0秒 → 0分', () => {
    assert.equal(secondsToMinutes(0), 0);
  });
});

// ── fetchTravelMinutes ──────────────────────────────────────────────

describe('fetchTravelMinutes', () => {
  test('正常レスポンス → 分に変換して返す', async () => {
    const fetchFn = async () => ({
      ok: true,
      json: async () => ({ data: { plan: { itineraries: [{ duration: 14124, legs: [] }] } } }),
    });
    const minutes = await fetchTravelMinutes(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      '2026-10-01',
      '08:30:00',
      'http://localhost:8080',
      fetchFn
    );
    assert.equal(minutes, 236);
  });

  test('itineraries が空 → null を返す（不明扱い）', async () => {
    const fetchFn = async () => ({
      ok: true,
      json: async () => ({ data: { plan: { itineraries: [] } } }),
    });
    const minutes = await fetchTravelMinutes(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      '2026-10-01',
      '08:30:00',
      'http://localhost:8080',
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
        'http://localhost:8080',
        fetchFn
      )
    );
  });

  test('fetchFn に組み立てたエンドポイント URL が渡される', async () => {
    let calledUrl = null;
    const fetchFn = async (url) => {
      calledUrl = url;
      return { ok: true, json: async () => ({ data: { plan: { itineraries: [{ duration: 60, legs: [] }] } } }) };
    };
    await fetchTravelMinutes(
      { lat: 35.6812, lng: 139.7671 },
      { lat: 35.8079, lng: 139.6782 },
      '2026-10-01',
      '08:30:00',
      'http://localhost:8080',
      fetchFn
    );
    assert.equal(calledUrl, 'http://localhost:8080/otp/routers/default/index/graphql');
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
    const rows = await calcTravelTimesForRace(race, { otpUrl: 'http://localhost:8080', fetchFn });
    assert.deepEqual(rows, []);
    assert.equal(called, false);
  });

  test('到着期限が計算できないレースは処理せず空配列を返す', async () => {
    const race = makeRace({ categories: [] });
    let called = false;
    const fetchFn = async () => { called = true; return { ok: true, json: async () => ({}) }; };
    const rows = await calcTravelTimesForRace(race, { otpUrl: 'http://localhost:8080', fetchFn });
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
        return { ok: true, json: async () => ({ data: { plan: { itineraries: [] } } }) };
      }
      return { ok: true, json: async () => ({ data: { plan: { itineraries: [{ duration: 3600, legs: [] }] } } }) };
    };
    const rows = await calcTravelTimesForRace(race, { otpUrl: 'http://localhost:8080', fetchFn });
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
      return { ok: true, json: async () => ({ data: { plan: { itineraries: [{ duration: 1800, legs: [] }] } } }) };
    };
    const rows = await calcTravelTimesForRace(race, { otpUrl: 'http://localhost:8080', fetchFn });
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
