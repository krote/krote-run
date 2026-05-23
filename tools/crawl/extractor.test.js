'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { buildExtractionPrompt, parseClaudeResponse, buildDiff } = require('./extractor');

// ── buildExtractionPrompt ─────────────────────────────────────────

describe('buildExtractionPrompt', () => {
  const race = {
    id: 'tokyo-marathon-2026',
    name_ja: '東京マラソン',
    date: '2026-03-01',
    entry_start_date: '2025-08-01',
    entry_end_date: '2025-10-31',
    entry_fee: 16200,
    entry_capacity: 38000,
  };
  const pageTexts = [
    { url: 'https://example.com/req/', text: '開催日: 2027年3月1日 参加費: 17000円' },
  ];

  test('レースIDを含む', () => {
    const prompt = buildExtractionPrompt(race, pageTexts);
    assert.ok(prompt.includes('tokyo-marathon-2026'));
  });

  test('ページテキストを含む', () => {
    const prompt = buildExtractionPrompt(race, pageTexts);
    assert.ok(prompt.includes('2027年3月1日'));
  });

  test('JSONのみを返すよう指示する', () => {
    const prompt = buildExtractionPrompt(race, pageTexts);
    assert.ok(prompt.toLowerCase().includes('json'));
  });

  test('複数ページのテキストを全て含む', () => {
    const multiPage = [
      { url: 'https://example.com/req/', text: 'ページ1のテキスト' },
      { url: 'https://example.com/entry/', text: 'ページ2のテキスト' },
    ];
    const prompt = buildExtractionPrompt(race, multiPage);
    assert.ok(prompt.includes('ページ1のテキスト'));
    assert.ok(prompt.includes('ページ2のテキスト'));
  });

  test('既存の開催日を含む', () => {
    const prompt = buildExtractionPrompt(race, pageTexts);
    assert.ok(prompt.includes('2026-03-01'));
  });
});

// ── parseClaudeResponse ───────────────────────────────────────────

describe('parseClaudeResponse', () => {
  test('クリーンなJSONをパースする', () => {
    const raw = '{"date": "2027-03-01", "entry_fee": 17000}';
    const result = parseClaudeResponse(raw);
    assert.deepEqual(result, { date: '2027-03-01', entry_fee: 17000 });
  });

  test('コードブロック(```json)を除去してパースする', () => {
    const raw = '```json\n{"date": "2027-03-01"}\n```';
    const result = parseClaudeResponse(raw);
    assert.deepEqual(result, { date: '2027-03-01' });
  });

  test('空オブジェクトをそのまま返す', () => {
    const result = parseClaudeResponse('{}');
    assert.deepEqual(result, {});
  });

  test('JSONでない応答は空オブジェクトを返す', () => {
    const result = parseClaudeResponse('変更はありませんでした。');
    assert.deepEqual(result, {});
  });

  test('不正なJSONは空オブジェクトを返す', () => {
    const result = parseClaudeResponse('{invalid json}');
    assert.deepEqual(result, {});
  });

  test('前後の空白を除去してパースする', () => {
    const raw = '  \n  {"date": "2027-03-01"}  \n  ';
    const result = parseClaudeResponse(raw);
    assert.deepEqual(result, { date: '2027-03-01' });
  });
});

// ── buildDiff ─────────────────────────────────────────────────────

describe('buildDiff', () => {
  const current = {
    date: '2026-03-01',
    entry_start_date: '2025-08-01',
    entry_end_date: '2025-10-31',
    entry_fee: 16200,
    entry_capacity: 38000,
  };

  test('値が変わったフィールドはchanged=trueになる', () => {
    const extracted = { date: '2027-03-01' };
    const diff = buildDiff(current, extracted);
    const dateEntry = diff.find(d => d.key === 'date');
    assert.ok(dateEntry);
    assert.equal(dateEntry.changed, true);
    assert.equal(dateEntry.current, '2026-03-01');
    assert.equal(dateEntry.extracted, '2027-03-01');
  });

  test('値が同じフィールドはchanged=falseになる', () => {
    const extracted = { date: '2026-03-01' };
    const diff = buildDiff(current, extracted);
    const dateEntry = diff.find(d => d.key === 'date');
    assert.equal(dateEntry.changed, false);
  });

  test('extractedにないフィールドはdiffに含まれない', () => {
    const extracted = { date: '2027-03-01' };
    const diff = buildDiff(current, extracted);
    assert.ok(!diff.find(d => d.key === 'entry_fee'));
  });

  test('extractedがnullのフィールドはdiffに含まれない', () => {
    const extracted = { date: '2027-03-01', entry_fee: null };
    const diff = buildDiff(current, extracted);
    assert.ok(!diff.find(d => d.key === 'entry_fee'));
  });

  test('extractedが空オブジェクトならdiffは空配列', () => {
    const diff = buildDiff(current, {});
    assert.deepEqual(diff, []);
  });

  test('数値と文字列の型違いも変更として検出する', () => {
    const extracted = { entry_fee: 17000 };
    const diff = buildDiff(current, extracted);
    const feeEntry = diff.find(d => d.key === 'entry_fee');
    assert.equal(feeEntry.changed, true);
  });
});
