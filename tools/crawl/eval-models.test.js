'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { normalizeValue, compareExtraction, summarizeScores, parseArgs, renderMarkdown, blankForEval } = require('./eval-models');

describe('blankForEval', () => {
  const race = {
    id: 'a-2027', name_ja: 'A', date: '2027-03-01', entry_fee: 12000, venue_address: '東京都',
    entry_periods: [{ start_date: '2026-08-01' }],
    categories: [{ distance_type: 'full', entry_fee: 12000, start_time: '09:00', time_limit_minutes: 360, capacity: 100 }],
  };

  test('採点対象の項目を空にする（既存値を写すだけで正解にならないように）', () => {
    const b = blankForEval(race);
    assert.equal(b.date, null);
    assert.equal(b.entry_fee, null);
    assert.equal(b.venue_address, null);
    assert.deepEqual(b.entry_periods, []);
  });

  test('categories は distance_type だけ残す（抽出は既存種目への突き合わせのため）', () => {
    const b = blankForEval(race);
    assert.deepEqual(b.categories, [{ distance_type: 'full', entry_fee: null, start_time: null, time_limit_minutes: null, capacity: null }]);
  });

  test('id と大会名は残し、元のオブジェクトは変更しない', () => {
    const b = blankForEval(race);
    assert.equal(b.id, 'a-2027');
    assert.equal(b.name_ja, 'A');
    assert.equal(race.date, '2027-03-01');
  });
});

describe('normalizeValue', () => {
  test('数値文字列と数値を同一視する', () => {
    assert.equal(normalizeValue('12000'), normalizeValue(12000));
  });

  test('前後の空白を無視する', () => {
    assert.equal(normalizeValue(' 東京都 '), normalizeValue('東京都'));
  });

  test('空文字・undefined は null と同じ', () => {
    assert.equal(normalizeValue(''), null);
    assert.equal(normalizeValue(undefined), null);
  });
});

describe('compareExtraction', () => {
  const truth = {
    date: '2027-03-01',
    entry_fee: 12000,
    venue_address: '東京都新宿区',
    entry_capacity: null,
    entry_periods: [{ start_date: '2026-08-01', end_date: '2026-09-30', entry_fee: 12000 }],
    categories: [
      { distance_type: 'full', entry_fee: 12000, start_time: '09:00', time_limit_minutes: 360 },
      { distance_type: '10k', entry_fee: 5000, start_time: '09:30', time_limit_minutes: 90 },
    ],
  };

  test('正解に値がある項目だけを採点する（正解が null の項目は対象外）', () => {
    const result = compareExtraction(truth, { ...truth });
    assert.ok(!result.some((r) => r.field === 'entry_capacity'));
  });

  test('一致・不一致・欠落を判定する', () => {
    const result = compareExtraction(truth, {
      date: '2027-03-01', entry_fee: '12000', venue_address: '東京都渋谷区', entry_periods: null, categories: null,
    });
    const byField = Object.fromEntries(result.map((r) => [r.field, r.status]));
    assert.equal(byField.date, 'match');
    assert.equal(byField.entry_fee, 'match');
    assert.equal(byField.venue_address, 'mismatch');
    assert.equal(byField['entry_periods[0].start_date'], 'missing');
  });

  test('categories は distance_type で突き合わせる（順序に依存しない）', () => {
    const result = compareExtraction(truth, {
      ...truth,
      categories: [
        { distance_type: '10k', entry_fee: 5000, start_time: '09:30', time_limit_minutes: 90 },
        { distance_type: 'full', entry_fee: 11000, start_time: '09:00', time_limit_minutes: 360 },
      ],
    });
    const byField = Object.fromEntries(result.map((r) => [r.field, r.status]));
    assert.equal(byField['categories[full].entry_fee'], 'mismatch');
    assert.equal(byField['categories[10k].start_time'], 'match');
  });

  test('entry_periods は開始日順に並べて比較する', () => {
    const t = { entry_periods: [{ start_date: '2026-08-01', end_date: null, entry_fee: null }, { start_date: '2026-07-01', end_date: null, entry_fee: null }] };
    const e = { entry_periods: [{ start_date: '2026-07-01' }, { start_date: '2026-08-01' }] };
    const result = compareExtraction(t, e);
    assert.ok(result.every((r) => r.status === 'match'));
  });
});

describe('summarizeScores', () => {
  test('一致率と件数を集計する', () => {
    const s = summarizeScores([
      { status: 'match' }, { status: 'match' }, { status: 'mismatch' }, { status: 'missing' },
    ]);
    assert.deepEqual(s, { total: 4, match: 2, mismatch: 1, missing: 1, rate: 0.5 });
  });

  test('採点対象が無ければ rate は null', () => {
    assert.equal(summarizeScores([]).rate, null);
  });
});

describe('parseArgs', () => {
  test('--races と --models をカンマ区切りで受け取る', () => {
    const a = parseArgs(['--races', 'a-2027,b-2027', '--models', 'claude-haiku-5-5,claude-sonnet-5-5']);
    assert.deepEqual(a.races, ['a-2027', 'b-2027']);
    assert.deepEqual(a.models, ['claude-haiku-5-5', 'claude-sonnet-5-5']);
  });

  test('--models 省略時は Haiku / Sonnet / Opus 5.5 を比較する', () => {
    assert.deepEqual(parseArgs(['--races', 'a']).models, ['claude-haiku-5-5', 'claude-sonnet-5-5', 'claude-opus-5-5']);
  });

  test('--races が無ければ例外', () => {
    assert.throws(() => parseArgs([]), /--races/);
  });

  test('--refresh でページの再取得を指定できる', () => {
    assert.equal(parseArgs(['--races', 'a', '--refresh']).refresh, true);
    assert.equal(parseArgs(['--races', 'a']).refresh, false);
  });
});

describe('renderMarkdown', () => {
  test('モデルごとの一致率・保留・失敗・時間・トークンを表にする', () => {
    const md = renderMarkdown([
      {
        model: 'claude-sonnet-5-5',
        races: [{ raceId: 'a', scores: { total: 4, match: 3, mismatch: 1, missing: 0, rate: 0.75 }, held: 1, error: null, ms: 12000, meta: { inputTokens: 5000, outputTokens: 800, costUsd: 0.05 } }],
      },
    ]);
    assert.match(md, /claude-sonnet-5-5/);
    assert.match(md, /75\.0%/);
    assert.match(md, /\| 1 \|/);
    assert.match(md, /5,000/);
  });

  test('失敗した大会は失敗数に数え、一致率の計算から除く', () => {
    const md = renderMarkdown([
      {
        model: 'm',
        races: [
          { raceId: 'a', scores: { total: 2, match: 2, mismatch: 0, missing: 0, rate: 1 }, held: 0, error: null, ms: 1000, meta: { inputTokens: 1, outputTokens: 1, costUsd: 0 } },
          { raceId: 'b', scores: null, held: 0, error: 'timeout', ms: 180000, meta: null },
        ],
      },
    ]);
    assert.match(md, /100\.0%/);
    assert.match(md, /timeout/);
  });
});

describe('renderMarkdown - 入力トークン（#199）', () => {
  test('入力トークンはキャッシュ作成・読込を含めた合計で表示する', () => {
    const md = renderMarkdown([{
      model: 'm',
      races: [{ raceId: 'a', scores: { total: 1, match: 1, mismatch: 0, missing: 0, rate: 1 }, held: 0, error: null, ms: 1,
        meta: { inputTokens: 2, cacheCreationTokens: 3000, cacheReadTokens: 500, outputTokens: 10, costUsd: 0 } }],
    }]);
    assert.match(md, /3,502/);
  });
});
