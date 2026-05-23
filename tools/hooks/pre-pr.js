#!/usr/bin/env node
/**
 * pre-pr.js — PR作成前テスト実行フック
 * Claude Code の PreToolUse (Bash) フックから呼ばれる。
 * "gh pr" を含むコマンドの場合のみテストを実行し、失敗時はブロックする。
 */

const { execSync } = require('child_process');
const ROOT = 'C:/Dev/krote-run';

const chunks = [];
process.stdin.on('data', (c) => chunks.push(c));
process.stdin.on('end', () => {
  let input;
  try {
    input = JSON.parse(Buffer.concat(chunks).toString());
  } catch {
    // JSON parse 失敗はスルー
    process.exit(0);
  }

  const cmd = input?.tool_input?.command ?? '';

  // gh pr コマンド以外はスルー
  if (!/gh pr/.test(cmd)) {
    process.exit(0);
  }

  console.log('\n[pre-PR] PR作成前テストを実行します...\n');

  let failed = false;

  // src/ のテスト (vitest)
  try {
    console.log('[pre-PR] src/ テスト (vitest)...');
    execSync('powershell -Command "pnpm vitest run"', { cwd: ROOT, stdio: 'inherit' });
    console.log('[pre-PR] src/ テスト: OK\n');
  } catch {
    console.error('[pre-PR] src/ テスト: FAILED\n');
    failed = true;
  }

  // tools/ のテスト (Node.js built-in test runner)
  try {
    console.log('[pre-PR] tools/ テスト (node --test)...');
    execSync('node --test tools/admin-server.test.js tools/crawl/index.test.js tools/crawl/extractor.test.js', { cwd: ROOT, stdio: 'inherit' });
    console.log('[pre-PR] tools/ テスト: OK\n');
  } catch {
    console.error('[pre-PR] tools/ テスト: FAILED\n');
    failed = true;
  }

  if (failed) {
    console.error('[pre-PR] テストが失敗しました。PR作成をブロックします。');
    console.error('         テストを修正してから再度 PR を作成してください。\n');
    process.exit(2);
  }

  console.log('[pre-PR] 全テスト通過。PR作成を続行します。\n');
  process.exit(0);
});
