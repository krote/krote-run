'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { buildReport, classifyError, formatValue } = require('./report');

const emptySummary = () => ({
  changed: [], new: [], unchanged: 0, skipped: 0, errors: [],
  extracted: [], new_editions: [], forced: [], skipped_past: [], held: [],
  geocoded: { processed: 0, skipped: 0, failed: 0 },
  checks: { errors: 0, warnings: 0, byRule: {} },
});

describe('formatValue', () => {
  test('未設定は「未設定」と書く', () => {
    assert.equal(formatValue(null), '未設定');
    assert.equal(formatValue(''), '未設定');
  });

  test('配列は件数で表す', () => {
    assert.equal(formatValue([{ a: 1 }, { a: 2 }]), '2件');
  });

  test('長い文字列は切り詰める', () => {
    const value = formatValue('あ'.repeat(200));
    assert.ok(value.length < 200);
    assert.ok(value.endsWith('…'));
  });

  test('改行はスペースにする（表が崩れるため）', () => {
    assert.equal(formatValue('1行目\n2行目'), '1行目 2行目');
  });

  test('パイプはエスケープする（表が崩れるため）', () => {
    assert.match(formatValue('a|b'), /a\\\|b/);
  });
});

describe('classifyError', () => {
  test('HTTPステータスごとに分類する', () => {
    assert.equal(classifyError('HTTP 404'), 'ページが見つからない (404)');
    assert.equal(classifyError('HTTP 403'), 'アクセス拒否 (403)');
    assert.equal(classifyError('HTTP 500'), 'サーバーエラー (500)');
  });

  test('タイムアウトを分類する', () => {
    assert.equal(classifyError('The operation was aborted due to timeout'), 'タイムアウト');
  });

  test('抽出時のJSON不正を分類する', () => {
    assert.equal(classifyError('JSONの解析に失敗しました'), '抽出結果の解析失敗');
  });

  test('未知のエラーはその他にまとめる', () => {
    assert.equal(classifyError('something odd'), 'その他');
  });
});

describe('buildReport', () => {
  test('変更がない場合はその旨を書く', () => {
    const md = buildReport(emptySummary());
    assert.match(md, /変更はありません/);
  });

  describe('変更内容', () => {
    const summary = () => ({
      ...emptySummary(),
      extracted: [
        {
          race_id: 'tokyo-marathon-2027',
          race_name: '東京マラソン',
          diff: [
            { key: 'entry_fee', label: '参加費（円）', current: null, extracted: 16500 },
            { key: 'description_ja', label: '説明文（日）', current: '', extracted: '東京の街を走る大会。' },
          ],
        },
      ],
    });

    test('大会ごとに見出しを作る', () => {
      const md = buildReport(summary());
      assert.match(md, /東京マラソン/);
      assert.match(md, /tokyo-marathon-2027/);
    });

    test('項目・変更前・変更後を表にする', () => {
      const md = buildReport(summary());
      assert.match(md, /\| 項目 \| 変更前 \| 変更後 \|/);
      assert.match(md, /参加費（円）/);
      assert.match(md, /未設定/);
      assert.match(md, /16500/);
    });

    test('更新した大会数と項目数を集計する', () => {
      const md = buildReport(summary());
      assert.match(md, /1大会/);
      assert.match(md, /2項目/);
    });
  });

  describe('失敗の分析', () => {
    test('取得失敗を理由ごとに集計する', () => {
      const summary = {
        ...emptySummary(),
        errors: [
          { race_id: 'a', url: 'https://a.example/', error: 'HTTP 404' },
          { race_id: 'b', url: 'https://b.example/', error: 'HTTP 404' },
          { race_id: 'c', url: 'https://c.example/', error: 'The operation was aborted due to timeout' },
        ],
      };
      const md = buildReport(summary);
      assert.match(md, /ページが見つからない \(404\).*2/s);
      assert.match(md, /タイムアウト/);
      assert.match(md, /https:\/\/a\.example\//);
    });

    test('検査で保留した項目を理由つきで載せる', () => {
      const summary = {
        ...emptySummary(),
        held: [
          { race_id: 'x-2026', race_name: 'X大会', key: 'entry_periods', rule: 'entry_period_label_empty', message: 'entry_periods[0].label_ja が空文字です' },
        ],
      };
      const md = buildReport(summary);
      assert.match(md, /保留/);
      assert.match(md, /X大会/);
      assert.match(md, /entry_period_label_empty/);
      assert.match(md, /label_ja が空文字/);
    });

    test('開催済みのためスキップした更新を載せる', () => {
      const summary = {
        ...emptySummary(),
        skipped_past: [{ race_id: 'old-2025', race_name: '旧大会', diff: [{ label: '参加費（円）' }] }],
      };
      const md = buildReport(summary);
      assert.match(md, /開催済み/);
      assert.match(md, /旧大会/);
    });
  });

  describe('チェック結果', () => {
    test('ルールごとの件数を載せる', () => {
      const summary = {
        ...emptySummary(),
        checks: { errors: 0, warnings: 3, byRule: { entry_fee_missing: 3 } },
      };
      const md = buildReport(summary);
      assert.match(md, /entry_fee_missing/);
      assert.match(md, /3/);
    });

    test('エラーが無ければ合格と書く', () => {
      const md = buildReport({ ...emptySummary(), checks: { errors: 0, warnings: 0, byRule: {} } });
      assert.match(md, /エラーなし|合格/);
    });

    test('エラーがあれば目立つように書く', () => {
      const md = buildReport({ ...emptySummary(), checks: { errors: 2, warnings: 0, byRule: { coords_out_of_japan: 2 } } });
      assert.match(md, /エラー.*2/s);
      assert.match(md, /coords_out_of_japan/);
    });
  });

  test('次年度ファイルの自動作成を載せる', () => {
    const summary = {
      ...emptySummary(),
      new_editions: [{ race_id: 'tokyo-marathon-2026', new_race_id: 'tokyo-marathon-2027' }],
    };
    const md = buildReport(summary);
    assert.match(md, /tokyo-marathon-2027/);
  });
});
