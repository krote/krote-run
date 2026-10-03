'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const {
  buildBranchName, buildCommitMessage, buildPrTitle, shouldCreatePr, COMMIT_PATHS, regenerateSeed,
} = require('./pr');

describe('shouldCreatePr', () => {
  const summary = (over = {}) => ({ extracted: [], new_editions: [], held: [], errors: [], ...over });

  test('変更があれば作る', () => {
    assert.equal(shouldCreatePr(summary({ extracted: [{ race_id: 'a' }] }), { dryRun: false }), true);
  });

  test('次年度ファイルを作った場合も作る', () => {
    assert.equal(shouldCreatePr(summary({ new_editions: [{ race_id: 'a' }] }), { dryRun: false }), true);
  });

  test('変更が無ければ作らない', () => {
    assert.equal(shouldCreatePr(summary(), { dryRun: false }), false);
  });

  test('dry-run では作らない', () => {
    assert.equal(shouldCreatePr(summary({ extracted: [{ race_id: 'a' }] }), { dryRun: true }), false);
  });

  test('保留や失敗だけの場合は作らない（JSONに変更がないため）', () => {
    const s = summary({ held: [{ race_id: 'a' }], errors: [{ race_id: 'b' }] });
    assert.equal(shouldCreatePr(s, { dryRun: false }), false);
  });
});

describe('buildBranchName', () => {
  test('日付を含むブランチ名を作る', () => {
    assert.equal(buildBranchName(new Date('2026-09-27T10:00:00+09:00')), 'crawl/update-2026-09-27');
  });

  test('連番を付けられる（同日に複数回実行した場合）', () => {
    assert.equal(buildBranchName(new Date('2026-09-27T10:00:00+09:00'), 2), 'crawl/update-2026-09-27-2');
  });
});

describe('buildPrTitle', () => {
  test('更新した大会数を含める', () => {
    const title = buildPrTitle({ extracted: [{ race_id: 'a' }, { race_id: 'b' }], new_editions: [] });
    assert.match(title, /2大会/);
    assert.match(title, /^chore: /);
  });

  test('次年度ファイル作成の件数も含める', () => {
    const title = buildPrTitle({ extracted: [], new_editions: [{ race_id: 'a' }] });
    assert.match(title, /次年度/);
  });
});

describe('buildCommitMessage', () => {
  test('Conventional Commits 形式で本文は日本語', () => {
    const msg = buildCommitMessage({
      extracted: [{ race_id: 'tokyo-marathon-2027', race_name: '東京マラソン', diff: [{ label: '参加費（円）' }] }],
      new_editions: [],
    });
    assert.match(msg, /^chore: /);
    assert.match(msg, /東京マラソン/);
    assert.match(msg, /参加費/);
  });

  test('大会が多い場合は省略する', () => {
    const extracted = Array.from({ length: 30 }, (_, i) => ({
      race_id: `race-${i}`, race_name: `大会${i}`, diff: [{ label: '開催日' }],
    }));
    const msg = buildCommitMessage({ extracted, new_editions: [] });
    assert.ok(msg.split('\n').length < 30, 'コミットメッセージが長すぎる');
    assert.match(msg, /ほか/);
  });
});

describe('COMMIT_PATHS', () => {
  test('再生成した seed もコミット対象に含める', () => {
    assert.ok(COMMIT_PATHS.includes('migrations/seed-races-all.sql'));
  });

  test('race JSON とチェックサムも引き続き含める', () => {
    assert.ok(COMMIT_PATHS.includes('src/data/races'));
    assert.ok(COMMIT_PATHS.includes('tools/crawl/checksums.json'));
  });
});

describe('regenerateSeed', () => {
  test('generate-seed-races.js を node で実行する', () => {
    const calls = [];
    regenerateSeed((cmd, args) => calls.push({ cmd, args }));
    assert.equal(calls.length, 1);
    assert.equal(calls[0].cmd, process.execPath);
    assert.equal(path.basename(calls[0].args[0]), 'generate-seed-races.js');
  });
});
