'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { screenExtraction } = require('./gate');

/**
 * クロールの抽出結果をそのまま JSON に書くと、レビューで指摘された種類の問題が
 * 何度でも混入する。適用前に scripts/validate-races.js のルールで検査し、
 * 新たな違反を生むフィールドだけを取り除く（保留する）。
 */

const baseRace = () => ({
  id: 'test-race-2026',
  name_ja: 'テスト大会',
  date: '2026-10-01',
  entry_start_date: '2026-04-01',
  entry_fee: 5000,
  entry_fee_by_category: false,
  categories: [{ distance_type: 'full', distance_km: 42.195, entry_fee: 5000, start_time: '09:00' }],
  entry_periods: [
    { label_ja: '一般エントリー', label_en: 'General Entry', start_date: '2026-04-01', end_date: '2026-06-30', entry_fee: 5000, category_id: null, sort_order: 0 },
  ],
  course_info: { certification: ['JAAF'] },
  reception_type: 'pre_day',
  reception_note_ja: '',
});

describe('screenExtraction', () => {
  test('ルールに触れない抽出結果はそのまま通す', () => {
    const result = screenExtraction(baseRace(), { entry_capacity: 10000 });
    assert.deepEqual(result.applied, { entry_capacity: 10000 });
    assert.deepEqual(result.held, []);
  });

  test('抽出なしなら空の結果を返す', () => {
    const result = screenExtraction(baseRace(), {});
    assert.deepEqual(result.applied, {});
    assert.deepEqual(result.held, []);
  });

  describe('新たな違反を生むフィールドを保留する', () => {
    test('label_ja が空の entry_periods は保留される', () => {
      const extracted = {
        entry_periods: [{ label_ja: '', label_en: '', start_date: '2026-05-01', end_date: '2026-07-31', entry_fee: 6000, category_id: null, sort_order: 0 }],
      };
      const result = screenExtraction(baseRace(), extracted);
      assert.equal(result.applied.entry_periods, undefined, 'ルール違反のまま適用されている');
      assert.equal(result.held.length, 1);
      assert.equal(result.held[0].key, 'entry_periods');
      assert.equal(result.held[0].rule, 'entry_period_label_empty');
      assert.ok(result.held[0].message.length > 0);
    });

    test('certification が小文字なら保留される', () => {
      const extracted = { course_info: { certification: ['jaaf'] } };
      const result = screenExtraction(baseRace(), extracted);
      assert.equal(result.applied.course_info, undefined);
      assert.equal(result.held[0].rule, 'certification_case');
    });

    test('start_date が null の entry_periods は保留される', () => {
      const extracted = {
        entry_periods: [{ label_ja: '一般', label_en: 'General', start_date: null, end_date: '2026-07-31', entry_fee: 6000, category_id: null, sort_order: 0 }],
      };
      const result = screenExtraction(baseRace(), extracted);
      assert.equal(result.applied.entry_periods, undefined);
      assert.equal(result.held[0].rule, 'entry_period_start_date_null');
    });

    test('問題のないフィールドは保留されたフィールドと一緒に落とさない', () => {
      const extracted = {
        entry_capacity: 12000,
        course_info: { certification: ['jaaf'] },
      };
      const result = screenExtraction(baseRace(), extracted);
      assert.equal(result.applied.entry_capacity, 12000, '無関係なフィールドまで保留している');
      assert.equal(result.held.length, 1);
    });
  });

  describe('既存データの違反は保留理由にしない', () => {
    test('もともと違反しているルールは、無関係な更新をブロックしない', () => {
      const race = baseRace();
      // 既存データが既に違反している状態（小文字の認定）
      race.course_info = { certification: ['jaaf'] };
      const result = screenExtraction(race, { entry_capacity: 10000 });
      assert.equal(result.applied.entry_capacity, 10000);
      assert.deepEqual(result.held, []);
    });

    test('既存の違反を解消する更新は通す', () => {
      const race = baseRace();
      race.course_info = { certification: ['jaaf'] };
      const result = screenExtraction(race, { course_info: { certification: ['JAAF'] } });
      assert.deepEqual(result.applied.course_info, { certification: ['JAAF'] });
      assert.deepEqual(result.held, []);
    });
  });

  test('entry_start_date と entry_periods を同時に更新する場合、整合していれば通る', () => {
    const extracted = {
      entry_start_date: '2026-05-01',
      entry_periods: [{ label_ja: '一般', label_en: 'General', start_date: '2026-05-01', end_date: '2026-07-31', entry_fee: 6000, category_id: null, sort_order: 0 }],
    };
    const result = screenExtraction(baseRace(), extracted);
    assert.deepEqual(result.held, [], `保留された: ${JSON.stringify(result.held)}`);
    assert.equal(result.applied.entry_start_date, '2026-05-01');
  });
});
