'use strict';

/**
 * scripts/validate-races.js のユニットテスト
 * 実行: node --test scripts/validate-races.test.js
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { validateRace } = require('./validate-races');

// ── ヘルパー ─────────────────────────────────────────────────────────

function makeRace(overrides = {}) {
  return {
    id: 'test-marathon-2026',
    date: '2026-03-01',
    entry_start_date: '2025-08-01',
    entry_end_date: '2025-10-31',
    reception_type: 'pre_day',
    reception_note_ja: '前日受付のみ',
    reception_note_en: 'Pre-race day only',
    course_info: {
      certification: ['JAAF', 'WA'],
    },
    entry_periods: [
      {
        label_ja: '一般エントリー',
        label_en: 'General Entry',
        start_date: '2025-08-01',
        end_date: '2025-10-31',
        entry_fee: 10000,
        category_id: null,
        sort_order: 0,
      },
    ],
    access_points: [],
    start_lat: null,
    start_lng: null,
    ...overrides,
  };
}

// ── Rule 1: entry_periods label_ja / label_en 空文字禁止 ─────────────

describe('Rule 1: entry_periods label 空文字禁止', () => {
  test('label_ja が空文字のとき error を返す', () => {
    const race = makeRace({
      entry_periods: [{ label_ja: '', label_en: 'General Entry', start_date: '2025-08-01', end_date: null, entry_fee: null, category_id: null, sort_order: 0 }],
    });
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'entry_period_label_empty' && i.level === 'error');
    assert.equal(errs.length, 1);
    assert.ok(errs[0].message.includes('label_ja'));
  });

  test('label_en が空文字のとき error を返す', () => {
    const race = makeRace({
      entry_periods: [{ label_ja: '一般', label_en: '', start_date: '2025-08-01', end_date: null, entry_fee: null, category_id: null, sort_order: 0 }],
    });
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'entry_period_label_empty' && i.level === 'error');
    assert.equal(errs.length, 1);
    assert.ok(errs[0].message.includes('label_en'));
  });

  test('label_ja と label_en の両方が空のとき 2件 error を返す', () => {
    const race = makeRace({
      entry_periods: [{ label_ja: '', label_en: '', start_date: '2025-08-01', end_date: null, entry_fee: null, category_id: null, sort_order: 0 }],
    });
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'entry_period_label_empty');
    assert.equal(errs.length, 2);
  });

  test('label が正常なとき error を返さない', () => {
    const race = makeRace();
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'entry_period_label_empty');
    assert.equal(errs.length, 0);
  });

  test('entry_periods が空配列のとき error を返さない', () => {
    const race = makeRace({ entry_periods: [] });
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'entry_period_label_empty');
    assert.equal(errs.length, 0);
  });
});

// ── Rule 2: certification 大文字統一 ────────────────────────────────

describe('Rule 2: certification 大文字統一', () => {
  test('小文字の certification があるとき error を返す', () => {
    const race = makeRace({
      course_info: { certification: ['jaaf', 'WA'] },
    });
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'certification_case' && i.level === 'error');
    assert.equal(errs.length, 1);
    assert.ok(errs[0].message.includes('jaaf'));
  });

  test('混在（aims + WA）のとき error を返す', () => {
    const race = makeRace({
      course_info: { certification: ['aims', 'WA'] },
    });
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'certification_case');
    assert.equal(errs.length, 1);
    assert.ok(errs[0].message.includes('aims'));
  });

  test('すべて大文字のとき error を返さない', () => {
    const race = makeRace({
      course_info: { certification: ['JAAF', 'WA', 'AIMS', 'WMM'] },
    });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'certification_case').length, 0);
  });

  test('certification が空配列のとき error を返さない', () => {
    const race = makeRace({ course_info: { certification: [] } });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'certification_case').length, 0);
  });

  test('course_info が null のとき error を返さない', () => {
    const race = makeRace({ course_info: null });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'certification_case').length, 0);
  });
});

// ── Rule 3: entry_periods start_date null 禁止 ───────────────────────

describe('Rule 3: entry_periods start_date null 禁止', () => {
  test('start_date が null のとき error を返す', () => {
    const race = makeRace({
      entry_periods: [{ label_ja: '一般', label_en: 'General', start_date: null, end_date: null, entry_fee: null, category_id: null, sort_order: 0 }],
    });
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'entry_period_start_date_null' && i.level === 'error');
    assert.equal(errs.length, 1);
  });

  test('start_date が設定されているとき error を返さない', () => {
    const race = makeRace();
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'entry_period_start_date_null').length, 0);
  });

  test('複数 entry_periods で1件 null のとき 1件 error を返す', () => {
    const race = makeRace({
      entry_periods: [
        { label_ja: 'A', label_en: 'A', start_date: '2025-08-01', end_date: null, entry_fee: null, category_id: null, sort_order: 0 },
        { label_ja: 'B', label_en: 'B', start_date: null, end_date: null, entry_fee: null, category_id: null, sort_order: 1 },
      ],
    });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'entry_period_start_date_null').length, 1);
  });
});

// ── Rule 4: entry_start_date = 最早 start_date ──────────────────────

describe('Rule 4: entry_start_date は最早 start_date と一致', () => {
  test('entry_start_date が最早 start_date より遅いとき error を返す', () => {
    const race = makeRace({
      entry_start_date: '2025-09-01',
      entry_periods: [
        { label_ja: '一般', label_en: 'General', start_date: '2025-08-01', end_date: null, entry_fee: null, category_id: null, sort_order: 0 },
      ],
    });
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'entry_start_date_mismatch' && i.level === 'error');
    assert.equal(errs.length, 1);
    assert.ok(errs[0].message.includes('2025-08-01'));
    assert.ok(errs[0].message.includes('2025-09-01'));
  });

  test('entry_start_date が最早 start_date と一致するとき error を返さない', () => {
    const race = makeRace();
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'entry_start_date_mismatch').length, 0);
  });

  test('複数 entry_periods のうち最早を使う', () => {
    const race = makeRace({
      entry_start_date: '2025-07-01',
      entry_periods: [
        { label_ja: 'A', label_en: 'A', start_date: '2025-07-01', end_date: null, entry_fee: null, category_id: null, sort_order: 0 },
        { label_ja: 'B', label_en: 'B', start_date: '2025-08-01', end_date: null, entry_fee: null, category_id: null, sort_order: 1 },
      ],
    });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'entry_start_date_mismatch').length, 0);
  });

  test('entry_periods が空のとき error を返さない', () => {
    const race = makeRace({ entry_periods: [] });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'entry_start_date_mismatch').length, 0);
  });

  test('entry_start_date が null のとき error を返さない（未設定は許容）', () => {
    const race = makeRace({ entry_start_date: null });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'entry_start_date_mismatch').length, 0);
  });
});

// ── Rule 5: reception_type mismatch ─────────────────────────────────

describe('Rule 5: reception_type 矛盾検知', () => {
  test('pre_day かつ note に「当日受付」含むとき warning を返す', () => {
    const race = makeRace({
      reception_type: 'pre_day',
      reception_note_ja: '前日・当日受付あり',
    });
    const issues = validateRace(race);
    const warns = issues.filter(i => i.rule === 'reception_type_mismatch' && i.level === 'warning');
    assert.equal(warns.length, 1);
  });

  test('pre_day かつ note に「当日」含むとき warning を返す', () => {
    const race = makeRace({
      reception_type: 'pre_day',
      reception_note_ja: '当日7:00〜9:00受付',
    });
    const issues = validateRace(race);
    const warns = issues.filter(i => i.rule === 'reception_type_mismatch');
    assert.equal(warns.length, 1);
  });

  test('pre_day かつ note に当日記述なしのとき warning を返さない', () => {
    const race = makeRace({
      reception_type: 'pre_day',
      reception_note_ja: '大会前日12:00〜19:00のみ',
    });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'reception_type_mismatch').length, 0);
  });

  test('both のとき warning を返さない', () => {
    const race = makeRace({
      reception_type: 'both',
      reception_note_ja: '前日・当日受付あり',
    });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'reception_type_mismatch').length, 0);
  });

  test('race_day のとき warning を返さない', () => {
    const race = makeRace({
      reception_type: 'race_day',
      reception_note_ja: '当日受付のみ',
    });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'reception_type_mismatch').length, 0);
  });

  test('reception_note_ja が空のとき warning を返さない', () => {
    const race = makeRace({
      reception_type: 'pre_day',
      reception_note_ja: '',
    });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'reception_type_mismatch').length, 0);
  });
});

// ── Rule 6: start_lat/lng 日本国内範囲 ──────────────────────────────

describe('Rule 6: 座標が日本国内範囲', () => {
  test('start_lat が範囲外のとき error を返す', () => {
    const race = makeRace({ start_lat: 51.5, start_lng: 139.7 }); // ロンドン緯度
    const issues = validateRace(race);
    const errs = issues.filter(i => i.rule === 'coords_out_of_japan' && i.level === 'error');
    assert.equal(errs.length, 1);
  });

  test('start_lng が範囲外のとき error を返す', () => {
    const race = makeRace({ start_lat: 35.7, start_lng: 100.0 }); // 経度範囲外
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'coords_out_of_japan').length, 1);
  });

  test('正常な座標のとき error を返さない', () => {
    const race = makeRace({ start_lat: 35.6895, start_lng: 139.6917 });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'coords_out_of_japan').length, 0);
  });

  test('start_lat が null のとき error を返さない（未設定は許容）', () => {
    const race = makeRace({ start_lat: null, start_lng: null });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'coords_out_of_japan').length, 0);
  });

  test('北海道の座標（lat: 43.xx）は valid', () => {
    const race = makeRace({ start_lat: 43.0, start_lng: 141.3 });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'coords_out_of_japan').length, 0);
  });

  test('沖縄の座標（lat: 26.xx, lng: 127.xx）は valid', () => {
    const race = makeRace({ start_lat: 26.2, start_lng: 127.7 });
    const issues = validateRace(race);
    assert.equal(issues.filter(i => i.rule === 'coords_out_of_japan').length, 0);
  });
});

// ── validateRace の返り値構造 ────────────────────────────────────────

describe('validateRace 返り値構造', () => {
  test('正常なレースでは空配列を返す', () => {
    const issues = validateRace(makeRace());
    assert.deepEqual(issues, []);
  });

  test('各 issue は rule / level / message を持つ', () => {
    const race = makeRace({
      entry_periods: [{ label_ja: '', label_en: 'General', start_date: '2025-08-01', end_date: null, entry_fee: null, category_id: null, sort_order: 0 }],
    });
    const issues = validateRace(race);
    assert.ok(issues.length > 0);
    const issue = issues[0];
    assert.ok('rule' in issue, 'rule プロパティが必要');
    assert.ok('level' in issue, 'level プロパティが必要');
    assert.ok('message' in issue, 'message プロパティが必要');
    assert.ok(['error', 'warning'].includes(issue.level), 'level は error か warning');
  });
});
