'use strict';

/**
 * scripts/generate-seed-races.js のユニットテスト
 * 実行: node --test scripts/generate-seed-races.test.js
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { generateRaceSQL } = require('./generate-seed-races');

function makeRace(overrides = {}) {
  return {
    id: 'test-marathon-2027',
    name_ja: 'テストマラソン',
    name_en: 'Test Marathon',
    date: '2027-03-01',
    prefecture: 'tokyo',
    course_info: {},
    categories: [],
    ...overrides,
  };
}

describe('generateRaceSQL: race_travel_times', () => {
  test('travel_times が空なら race_travel_times を削除しない（seed-travel-times.sql で投入したデータを保持）', () => {
    const sql = generateRaceSQL(makeRace({ travel_times: [] }));
    assert.doesNotMatch(sql, /race_travel_times/);
  });

  test('travel_times が無いなら race_travel_times を削除しない', () => {
    const sql = generateRaceSQL(makeRace());
    assert.doesNotMatch(sql, /race_travel_times/);
  });

  test('travel_times があれば JSON の内容で置き換える（DELETE → INSERT）', () => {
    const sql = generateRaceSQL(makeRace({
      travel_times: [{ hub_id: 'tokyo', duration_minutes: 120, departure_time: '06:00', calculated_at: '2026-09-06' }],
    }));
    const del = sql.indexOf("DELETE FROM race_travel_times WHERE race_id = 'test-marathon-2027';");
    const ins = sql.indexOf('INSERT OR REPLACE INTO race_travel_times');
    assert.ok(del >= 0, 'DELETE が無い');
    assert.ok(ins > del, 'INSERT が DELETE の後に無い');
  });

  test('ほかの子テーブルは従来どおり削除する', () => {
    const sql = generateRaceSQL(makeRace());
    assert.match(sql, /DELETE FROM race_categories WHERE race_id = 'test-marathon-2027';/);
    assert.match(sql, /DELETE FROM race_entry_periods WHERE race_id = 'test-marathon-2027';/);
  });
});
