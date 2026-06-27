'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { computeHash, hasChanged, buildUrlsToCheck, getLatestFilesPerSeries } = require('./index');

// ── computeHash ───────────────────────────────────────────────────

describe('computeHash', () => {
  test('同じテキストは同じハッシュを返す', () => {
    assert.equal(computeHash('hello world'), computeHash('hello world'));
  });

  test('異なるテキストは異なるハッシュを返す', () => {
    assert.notEqual(computeHash('hello'), computeHash('hello!'));
  });

  test('SHA-256形式（64文字の16進数）を返す', () => {
    assert.match(computeHash('test'), /^[0-9a-f]{64}$/);
  });

  test('空文字でもクラッシュしない', () => {
    assert.doesNotThrow(() => computeHash(''));
  });
});

// ── hasChanged ────────────────────────────────────────────────────

describe('hasChanged', () => {
  test('未登録URLはtrueを返す（新規）', () => {
    assert.equal(hasChanged('https://example.com/', 'newhash', {}), true);
  });

  test('ハッシュが一致する場合はfalseを返す', () => {
    const checksums = { 'https://example.com/': { hash: 'abc123' } };
    assert.equal(hasChanged('https://example.com/', 'abc123', checksums), false);
  });

  test('ハッシュが異なる場合はtrueを返す', () => {
    const checksums = { 'https://example.com/': { hash: 'abc123' } };
    assert.equal(hasChanged('https://example.com/', 'xyz789', checksums), true);
  });

  test('別URLのチェックサムは影響しない', () => {
    const checksums = { 'https://other.com/': { hash: 'abc123' } };
    assert.equal(hasChanged('https://example.com/', 'abc123', checksums), true);
  });
});

// ── buildUrlsToCheck ─────────────────────────────────────────────

describe('buildUrlsToCheck', () => {
  test('info_urls が登録済みならそのURLを返す', () => {
    const race = {
      id: 'test-2026',
      official_url: 'https://example.com/',
      info_urls: [
        { url: 'https://example.com/req/', label: '大会要項' },
        { url: 'https://example.com/entry/', label: 'エントリー' },
      ],
    };
    assert.deepEqual(buildUrlsToCheck(race), [
      'https://example.com/req/',
      'https://example.com/entry/',
    ]);
  });

  test('info_urls が空配列なら official_url を返す', () => {
    const race = { id: 'test-2026', official_url: 'https://example.com/', info_urls: [] };
    assert.deepEqual(buildUrlsToCheck(race), ['https://example.com/']);
  });

  test('info_urls がなければ official_url を返す', () => {
    const race = { id: 'test-2026', official_url: 'https://example.com/' };
    assert.deepEqual(buildUrlsToCheck(race), ['https://example.com/']);
  });

  test('info_urls も official_url もなければ空配列を返す', () => {
    const race = { id: 'test-2026', official_url: null };
    assert.deepEqual(buildUrlsToCheck(race), []);
  });

  test('official_url が空文字なら空配列を返す', () => {
    const race = { id: 'test-2026', official_url: '' };
    assert.deepEqual(buildUrlsToCheck(race), []);
  });
});

// ── getLatestFilesPerSeries ───────────────────────────────────────

describe('getLatestFilesPerSeries', () => {
  test('同一シリーズに複数年がある場合は最新年のみ返す', () => {
    const files = ['tokyo-marathon-2026.json', 'tokyo-marathon-2027.json'];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, ['tokyo-marathon-2027.json']);
  });

  test('異なるシリーズはそれぞれ返す', () => {
    const files = ['kyoto-marathon-2027.json', 'tokyo-marathon-2027.json'];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, ['kyoto-marathon-2027.json', 'tokyo-marathon-2027.json']);
  });

  test('シリーズが混在する場合は各シリーズの最新のみ返す', () => {
    const files = [
      'ehime-marathon-2026.json',
      'ehime-marathon-2027.json',
      'tokyo-marathon-2026.json',
      'tokyo-marathon-2027.json',
      'kyoto-marathon-2027.json',
    ];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, [
      'ehime-marathon-2027.json',
      'kyoto-marathon-2027.json',
      'tokyo-marathon-2027.json',
    ]);
  });

  test('単独のファイルはそのまま返す', () => {
    const files = ['saitama-marathon-2026.json'];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, ['saitama-marathon-2026.json']);
  });

  test('結果はソートされている', () => {
    const files = ['tokyo-marathon-2026.json', 'kyoto-marathon-2026.json', 'ehime-marathon-2026.json'];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, [
      'ehime-marathon-2026.json',
      'kyoto-marathon-2026.json',
      'tokyo-marathon-2026.json',
    ]);
  });

  test('空配列を渡すと空配列を返す', () => {
    assert.deepEqual(getLatestFilesPerSeries([]), []);
  });
});
