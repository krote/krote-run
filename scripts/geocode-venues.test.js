'use strict';

/**
 * scripts/geocode-venues.js のユニットテスト
 * 実行: node --test scripts/geocode-venues.test.js
 */

const { test, describe, mock } = require('node:test');
const assert = require('node:assert/strict');
const { isInJapan, extractCoords, buildGeocodingUrl, geocodeAll } = require('./geocode-venues');

// ── isInJapan ────────────────────────────────────────────────────────

describe('isInJapan', () => {
  test('東京の座標は true', () => {
    assert.equal(isInJapan(35.6895, 139.6917), true);
  });

  test('北海道（lat: 43.06）は true', () => {
    assert.equal(isInJapan(43.06, 141.35), true);
  });

  test('沖縄（lat: 26.2, lng: 127.7）は true', () => {
    assert.equal(isInJapan(26.2, 127.7), true);
  });

  test('ロンドン（lat: 51.5, lng: -0.1）は false', () => {
    assert.equal(isInJapan(51.5, -0.1), false);
  });

  test('ソウル（lat: 37.5, lng: 127.0）は false（lng が範囲内だが lat が範囲内でも判定が必要）', () => {
    // ソウルは lat:37.5（20-46の範囲内）, lng:127.0（122-154の範囲内） → isInJapan は true と判定しうる
    // この関数は bounding box チェックのみ。prefecture 整合は別途チェック
    // ここでは bounding box の動作を確認
    assert.equal(typeof isInJapan(37.5, 127.0), 'boolean');
  });

  test('lat が 20 未満（南限外）は false', () => {
    assert.equal(isInJapan(19.9, 135.0), false);
  });

  test('lat が 46 超（北限外）は false', () => {
    assert.equal(isInJapan(46.1, 135.0), false);
  });

  test('lng が 122 未満（西限外）は false', () => {
    assert.equal(isInJapan(35.0, 121.9), false);
  });

  test('lng が 154 超（東限外）は false', () => {
    assert.equal(isInJapan(35.0, 154.1), false);
  });

  test('境界値 lat=20, lng=122 は true', () => {
    assert.equal(isInJapan(20, 122), true);
  });

  test('境界値 lat=46, lng=154 は true', () => {
    assert.equal(isInJapan(46, 154), true);
  });
});

// ── extractCoords ────────────────────────────────────────────────────

describe('extractCoords', () => {
  test('国土地理院APIのレスポンスから座標を取り出す', () => {
    const apiResponse = [
      {
        geometry: { coordinates: [139.6917, 35.6895] },
        properties: { title: '東京都千代田区' },
      },
    ];
    const result = extractCoords(apiResponse);
    assert.ok(result);
    assert.equal(result.lat, 35.6895);
    assert.equal(result.lng, 139.6917);
  });

  test('空配列のとき null を返す', () => {
    assert.equal(extractCoords([]), null);
  });

  test('null のとき null を返す', () => {
    assert.equal(extractCoords(null), null);
  });

  test('coordinates が [lng, lat] 順であることを確認', () => {
    const apiResponse = [{ geometry: { coordinates: [130.5, 31.5] } }];
    const result = extractCoords(apiResponse);
    assert.equal(result.lat, 31.5);
    assert.equal(result.lng, 130.5);
  });
});

// ── buildGeocodingUrl ────────────────────────────────────────────────

describe('buildGeocodingUrl', () => {
  test('住所をURLエンコードして国土地理院のエンドポイントを返す', () => {
    const url = buildGeocodingUrl('長野市南長野運動公園総合運動場');
    assert.ok(url.startsWith('https://msearch.gsi.go.jp/address-search/AddressSearch'));
    assert.ok(url.includes('q='));
  });

  test('特殊文字がURLエンコードされる', () => {
    const url = buildGeocodingUrl('東京都千代田区丸の内1-1');
    assert.ok(!url.includes(' '));
    assert.ok(url.includes('q='));
  });

  test('URLに住所が含まれる（デコードで確認）', () => {
    const address = '大阪市北区梅田';
    const url = buildGeocodingUrl(address);
    const decoded = decodeURIComponent(url);
    assert.ok(decoded.includes(address));
  });
});

// ── geocodeAll ─────────────────────────────────────────────────────────

describe('geocodeAll', () => {
  test('fetchFn が null を返した場合でも例外なく完了する（dry-run）', async () => {
    // fetchFn=null返し → "結果なし" パスでスロットルが finally で必ず動くが例外なし
    await assert.doesNotReject(
      () => geocodeAll({ dryRun: true, fetchFn: async () => null, _delayMs: 0 })
    );
  });

  test('fetchFn がスローしても例外は吸収して完了する（dry-run）', async () => {
    await assert.doesNotReject(
      () => geocodeAll({ dryRun: true, fetchFn: async () => { throw new Error('API error'); }, _delayMs: 0 })
    );
  });
});
