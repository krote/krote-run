'use strict';

/**
 * scripts/calc-travel-times.js のユニットテスト
 * 実行: node --test scripts/calc-travel-times.test.js
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { buildRoutesApiUrl, parseDurationSeconds, secondsToMinutes } = require('./calc-travel-times');

// ── buildRoutesApiUrl ────────────────────────────────────────────────

describe('buildRoutesApiUrl', () => {
  test('Google Maps Routes API の URL を生成する', () => {
    const url = buildRoutesApiUrl(
      { lat: 35.6812, lng: 139.7671 }, // 東京
      { lat: 35.0117, lng: 135.7683 }, // 京都
      '2026-10-01T08:00:00+09:00'
    );
    assert.ok(url.startsWith('https://routes.googleapis.com/directions/v2:computeRoutes'), `URL が正しくない: ${url}`);
  });

  test('URL が文字列であること', () => {
    const url = buildRoutesApiUrl(
      { lat: 35.0, lng: 135.0 },
      { lat: 34.0, lng: 135.0 },
      '2026-10-01T08:00:00+09:00'
    );
    assert.equal(typeof url, 'string');
  });
});

// ── parseDurationSeconds ─────────────────────────────────────────────

describe('parseDurationSeconds', () => {
  test('Google Routes API のレスポンス duration（"3600s"）を秒数に変換', () => {
    assert.equal(parseDurationSeconds('3600s'), 3600);
  });

  test('小数秒（"5400.5s"）も変換できる', () => {
    assert.equal(parseDurationSeconds('5400.5s'), 5400.5);
  });

  test('数字のみの文字列も受け付ける', () => {
    assert.equal(parseDurationSeconds('1800'), 1800);
  });

  test('不正な文字列は NaN を返す', () => {
    assert.ok(isNaN(parseDurationSeconds('invalid')));
  });
});

// ── secondsToMinutes ─────────────────────────────────────────────────

describe('secondsToMinutes', () => {
  test('3600秒 → 60分（切り上げ）', () => {
    assert.equal(secondsToMinutes(3600), 60);
  });

  test('3660秒 → 61分', () => {
    assert.equal(secondsToMinutes(3660), 61);
  });

  test('5401秒 → 91分（切り上げ）', () => {
    assert.equal(secondsToMinutes(5401), 91);
  });

  test('0秒 → 0分', () => {
    assert.equal(secondsToMinutes(0), 0);
  });
});
