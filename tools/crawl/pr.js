'use strict';

/**
 * tools/crawl/pr.js
 * クロールの結果をブランチにコミットし、レポートを本文にした PR を作成する。
 *
 * クロールは race JSON を書き換えるため、実行しただけでは作業ツリーが汚れる。
 * 実行の締めくくりとして PR まで作り、レビューできる状態で止める。
 */

const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const MAX_COMMIT_BODY_LINES = 20;

/** PR にコミットするパス。seed を含めないと DB 投入時に古い seed が使われる */
const COMMIT_PATHS = ['src/data/races', 'tools/crawl/checksums.json', 'migrations/seed-races-all.sql'];

const SEED_SCRIPT = path.join(__dirname, '..', '..', 'scripts', 'generate-seed-races.js');

/** JSON に変更が入った場合のみ PR を作る（保留・失敗だけでは作らない） */
function shouldCreatePr(summary, { dryRun = false } = {}) {
  if (dryRun) return false;
  const changed = (summary.extracted ?? []).length + (summary.new_editions ?? []).length;
  return changed > 0;
}

function formatDateJst(date) {
  const jst = new Date(date.getTime() + (9 * 60 + date.getTimezoneOffset()) * 60_000);
  const y = jst.getFullYear();
  const m = String(jst.getMonth() + 1).padStart(2, '0');
  const d = String(jst.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function buildBranchName(date = new Date(), suffix = 1) {
  const base = `crawl/update-${formatDateJst(date)}`;
  return suffix > 1 ? `${base}-${suffix}` : base;
}

function buildPrTitle(summary) {
  const parts = [];
  const raceCount = (summary.extracted ?? []).length;
  const editionCount = (summary.new_editions ?? []).length;

  if (raceCount > 0) parts.push(`${raceCount}大会のデータを更新`);
  if (editionCount > 0) parts.push(`次年度ファイル${editionCount}件を作成`);

  return `chore: クロールで${parts.join('・')}`;
}

function buildCommitMessage(summary) {
  const lines = [buildPrTitle(summary), ''];
  const races = summary.extracted ?? [];

  for (const race of races.slice(0, MAX_COMMIT_BODY_LINES)) {
    const labels = (race.diff ?? []).map((d) => d.label).join(', ');
    lines.push(`- ${race.race_name ?? race.race_id}: ${labels}`);
  }
  if (races.length > MAX_COMMIT_BODY_LINES) {
    lines.push(`- ほか${races.length - MAX_COMMIT_BODY_LINES}大会`);
  }

  for (const edition of summary.new_editions ?? []) {
    lines.push(`- 次年度ファイル作成: ${edition.new_race_id}`);
  }

  return lines.join('\n');
}

// ── 副作用 ───────────────────────────────────────────────────────

function git(args, opts = {}) {
  return execFileSync('git', args, { encoding: 'utf-8', ...opts }).trim();
}

/** 更新後の race JSON から seed-races-all.sql を再生成する */
function regenerateSeed(run = (cmd, args) => execFileSync(cmd, args, { stdio: 'inherit' })) {
  run(process.execPath, [SEED_SCRIPT]);
}

function branchExists(name) {
  try {
    git(['rev-parse', '--verify', name], { stdio: ['ignore', 'pipe', 'ignore'] });
    return true;
  } catch {
    return false;
  }
}

/**
 * ブランチを作ってコミットし、PR を作成する。
 * @param {object} summary
 * @param {string} body - PR 本文（report.js が生成した Markdown）
 * @param {{ now?: Date, baseBranch?: string }} [opts]
 * @returns {{ created: boolean, branch?: string, url?: string, reason?: string }}
 */
function createCrawlPr(summary, body, opts = {}) {
  const now = opts.now ?? new Date();
  const baseBranch = opts.baseBranch ?? 'main';

  regenerateSeed();

  const changedFiles = git(['status', '--porcelain', '--', ...COMMIT_PATHS]);
  if (!changedFiles) {
    return { created: false, reason: '変更されたファイルがありません' };
  }

  let branch = buildBranchName(now);
  for (let i = 2; branchExists(branch); i++) {
    branch = buildBranchName(now, i);
  }

  git(['switch', '-c', branch, baseBranch]);
  git(['add', '--', ...COMMIT_PATHS]);

  const messageFile = path.join(os.tmpdir(), `crawl-commit-${Date.now()}.txt`);
  fs.writeFileSync(messageFile, buildCommitMessage(summary), 'utf-8');
  const bodyFile = path.join(os.tmpdir(), `crawl-pr-${Date.now()}.md`);
  fs.writeFileSync(bodyFile, body, 'utf-8');

  try {
    git(['commit', '-F', messageFile]);
    git(['push', '-u', 'origin', branch]);
    const url = execFileSync('gh', [
      'pr', 'create',
      '--base', baseBranch,
      '--head', branch,
      '--title', buildPrTitle(summary),
      '--body-file', bodyFile,
    ], { encoding: 'utf-8' }).trim();
    return { created: true, branch, url };
  } finally {
    fs.rmSync(messageFile, { force: true });
    fs.rmSync(bodyFile, { force: true });
  }
}

module.exports = {
  shouldCreatePr, buildBranchName, buildPrTitle, buildCommitMessage, createCrawlPr, COMMIT_PATHS, regenerateSeed,
};
