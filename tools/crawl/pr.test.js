'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const {
  buildBranchName, buildCommitMessage, buildPrTitle, shouldCreatePr, COMMIT_PATHS, regenerateSeed,
  findPreflightProblems, runPreflight, PREFLIGHT_ERROR_CODE,
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
    // お知らせをクロール PR に同梱する（#201）
    assert.ok(COMMIT_PATHS.includes('src/data/announcements.json'));
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

describe('findPreflightProblems', () => {
  const ok = { branch: 'main', ahead: 0, behind: 0, dirty: [] };

  test('main 上で origin/main と一致し、対象パスが綺麗なら問題なし', () => {
    assert.deepEqual(findPreflightProblems(ok), []);
  });

  test('main 以外のブランチを検出する', () => {
    const problems = findPreflightProblems({ ...ok, branch: 'news/2026-11-03-race-update' });
    assert.equal(problems.length, 1);
    assert.match(problems[0], /main ではありません/);
    assert.match(problems[0], /news\/2026-11-03-race-update/);
  });

  test('origin/main より遅れている（behind）ことを検出する', () => {
    const problems = findPreflightProblems({ ...ok, behind: 3 });
    assert.equal(problems.length, 1);
    assert.match(problems[0], /behind 3/);
    assert.match(problems[0], /git pull/);
  });

  test('origin/main より進んでいる（ahead）ことを検出する', () => {
    const problems = findPreflightProblems({ ...ok, ahead: 2 });
    assert.equal(problems.length, 1);
    assert.match(problems[0], /ahead 2/);
  });

  test('対象パスの未コミット変更を列挙する', () => {
    const problems = findPreflightProblems({ ...ok, dirty: ['src/data/races/a-2027.json', 'tools/crawl/checksums.json'] });
    assert.equal(problems.length, 1);
    assert.match(problems[0], /a-2027\.json/);
    assert.match(problems[0], /checksums\.json/);
  });

  test('未コミット変更が多い場合は10件までに省略する', () => {
    const dirty = Array.from({ length: 15 }, (_, i) => `src/data/races/race-${i}.json`);
    const [problem] = findPreflightProblems({ ...ok, dirty });
    assert.match(problem, /race-9\.json/);
    assert.doesNotMatch(problem, /race-10\.json/);
    assert.match(problem, /ほか5件/);
  });

  test('複数の問題はすべて返す', () => {
    const problems = findPreflightProblems({ branch: 'feat/x', ahead: 0, behind: 1, dirty: ['src/data/races/a.json'] });
    assert.equal(problems.length, 3);
  });

  test('基準ブランチを変更できる', () => {
    assert.deepEqual(findPreflightProblems({ ...ok, branch: 'develop' }, { baseBranch: 'develop' }), []);
  });
});

describe('runPreflight', () => {
  /** git の引数に応じて応答を返す偽の git */
  const fakeGit = ({ branch = 'main', counts = '0\t0', status = '', fetchError = null } = {}) => {
    const calls = [];
    const fn = (args) => {
      calls.push(args);
      if (args[0] === 'rev-parse') return branch;
      if (args[0] === 'fetch') { if (fetchError) throw fetchError; return ''; }
      if (args[0] === 'rev-list') return counts;
      if (args[0] === 'status') return status;
      throw new Error(`unexpected git ${args.join(' ')}`);
    };
    fn.calls = calls;
    return fn;
  };

  test('条件を満たせば例外を投げない', () => {
    const gitFn = fakeGit();
    assert.doesNotThrow(() => runPreflight({ gitFn }));
  });

  test('fetch してから origin/main と比較する', () => {
    const gitFn = fakeGit();
    runPreflight({ gitFn });
    const fetchIndex = gitFn.calls.findIndex((a) => a[0] === 'fetch');
    const revListIndex = gitFn.calls.findIndex((a) => a[0] === 'rev-list');
    assert.ok(fetchIndex >= 0 && fetchIndex < revListIndex);
    assert.deepEqual(gitFn.calls[fetchIndex], ['fetch', 'origin', 'main']);
    assert.ok(gitFn.calls[revListIndex].includes('main...origin/main'));
  });

  test('status は COMMIT_PATHS に限定し未追跡ファイルも含める', () => {
    const gitFn = fakeGit();
    runPreflight({ gitFn });
    const statusArgs = gitFn.calls.find((a) => a[0] === 'status');
    assert.ok(statusArgs.includes('--porcelain'));
    assert.ok(statusArgs.includes('--untracked-files=all'));
    for (const p of COMMIT_PATHS) assert.ok(statusArgs.includes(p));
  });

  test('ブランチ違い・遅れ・未コミット変更があれば理由つきで例外を投げる', () => {
    const gitFn = fakeGit({
      branch: 'news/2026-11-03-race-update',
      counts: '0\t3',
      status: ' M src/data/races/a-2027.json\n?? src/data/races/b-2027.json',
    });
    assert.throws(() => runPreflight({ gitFn }), (err) => {
      assert.match(err.message, /news\/2026-11-03-race-update/);
      assert.match(err.message, /behind 3/);
      assert.match(err.message, /a-2027\.json/);
      assert.match(err.message, /b-2027\.json/);
      return true;
    });
  });

  test('先頭行の空白が trim された status 出力でもパスを正しく取り出す', () => {
    const gitFn = fakeGit({ status: 'M src/data/races/a-2027.json\n M tools/crawl/checksums.json' });
    assert.throws(() => runPreflight({ gitFn }), (err) => {
      assert.match(err.message, / src\/data\/races\/a-2027\.json/);
      assert.match(err.message, / tools\/crawl\/checksums\.json/);
      return true;
    });
  });

  test('fetch に失敗したら中断する（安全側に倒す）', () => {
    const gitFn = fakeGit({ fetchError: new Error('Could not resolve host') });
    assert.throws(() => runPreflight({ gitFn }), /fetch/);
  });

  test('事前チェックの失敗は識別用のエラーコードを持つ', () => {
    for (const gitFn of [fakeGit({ branch: 'feat/x' }), fakeGit({ fetchError: new Error('offline') })]) {
      assert.throws(() => runPreflight({ gitFn }), (err) => err.code === PREFLIGHT_ERROR_CODE);
    }
  });
});
