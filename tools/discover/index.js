#!/usr/bin/env node
/**
 * tools/discover/index.js
 * 未掲載大会の探索と、選んだ大会の race JSON 生成（#204）
 *
 * Usage:
 *   pnpm run discover                         # 候補を集めて tools/discover/candidates.json / .md に出力
 *   pnpm run discover -- --include-all        # 除外キーワード（リレー・耐久等）を無効にする
 *   pnpm run discover -- --max-pages 5        # 取得ページ数を制限（動作確認用）
 *   pnpm run discover -- --generate           # selected: true の候補から light JSON を生成して PR 作成
 *   pnpm run discover -- --generate --dry-run # 生成内容の確認のみ（ファイル更新・PR 作成なし）
 *
 * 方針は docs/crawl-rules.md「未掲載大会の探索」と #203 を参照。
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const RACES_DIR = path.join(ROOT, 'src/data/races');
const PREFECTURES_FILE = path.join(ROOT, 'src/data/prefectures.json');
const ANNOUNCEMENTS_FILE = path.join(ROOT, 'src/data/announcements.json');
const CANDIDATES_FILE = path.join(__dirname, 'candidates.json');
const CANDIDATES_MD = path.join(__dirname, 'candidates.md');

const { fetchEventList } = require('./sportsentry');
const {
  buildExistingIndex, findDuplicate, filterEvents, toCandidate, mergeSelections, renderCandidatesMarkdown, computeRange, markGenerated,
} = require('./candidates');
const { generateRace } = require('./generate');
const { callClaudeP, resolveModel } = require('../crawl/extractor');
const { buildReport } = require('../crawl/report');
const { runPreflight, createCrawlPr, shouldCreatePr, formatDateJst, PREFLIGHT_ERROR_CODE } = require('../crawl/pr');
const { buildAnnouncement, appendAnnouncement } = require('../crawl/announcement');
const { generateXPost } = require('../crawl/x-post');
const { accumulateLlmUsage, emptyLlmUsage } = require('../crawl/index');
const { geocodeAll } = require('../../scripts/geocode-venues');
const { shouldRelaunchWithExtraCa, relaunchWithExtraCa } = require('../crawl/extra-ca');

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));

function loadAllRaces() {
  return fs.readdirSync(RACES_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'index.json')
    .map((f) => readJson(path.join(RACES_DIR, f)));
}

function loadCandidatesFile() {
  try {
    return readJson(CANDIDATES_FILE);
  } catch {
    return { candidates: [] };
  }
}

function saveCandidatesFile(data) {
  fs.writeFileSync(CANDIDATES_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

// ── 候補の収集 ───────────────────────────────────────────────────

async function discover({ includeAll = false, maxPages } = {}) {
  const prefectures = readJson(PREFECTURES_FILE);
  const index = buildExistingIndex(loadAllRaces(), prefectures);
  const range = computeRange();

  console.log(`[discover] スポーツエントリーの大会一覧を取得します（対象: ${range.from}〜${range.to}）`);
  const events = await fetchEventList({ maxPages });
  const inRange = filterEvents(events, { ...range, ...(includeAll ? { excludeKeywords: [] } : {}) });

  const fresh = [];
  let duplicates = 0;
  for (const event of inRange) {
    if (findDuplicate(event, index)) duplicates++;
    else fresh.push(toCandidate(event));
  }
  fresh.sort((a, b) => a.date.localeCompare(b.date));

  const candidates = mergeSelections(fresh, loadCandidatesFile().candidates);
  const generatedAt = formatDateJst(new Date());
  saveCandidatesFile({ generated_at: generatedAt, source: 'sportsentry', range, candidates });
  fs.writeFileSync(CANDIDATES_MD, renderCandidatesMarkdown(candidates, { generatedAt, duplicates }), 'utf-8');

  console.log(`\n[discover] 取得 ${events.length}件 → 対象期間・除外キーワード適用後 ${inRange.length}件`);
  console.log(`[discover] 掲載済み ${duplicates}件を除外し、候補 ${candidates.length}件を出力しました`);
  console.log(`  ${path.relative(ROOT, CANDIDATES_FILE)}（"selected": true を付ける）`);
  console.log(`  ${path.relative(ROOT, CANDIDATES_MD)}（一覧表）`);
  console.log('[discover] 選んだら `pnpm run discover -- --generate` を実行してください');
}

// ── 選んだ候補の JSON 生成 ───────────────────────────────────────

async function generate({ dryRun = false } = {}) {
  if (!dryRun) runPreflight();

  const file = loadCandidatesFile();
  const selected = file.candidates.filter((c) => c.selected);
  if (selected.length === 0) {
    console.log('[discover] selected: true の候補がありません。candidates.json で選んでください');
    return null;
  }

  const prefectures = readJson(PREFECTURES_FILE);
  const model = resolveModel();
  const summary = {
    kind: 'discover',
    changed: [], new: [], unchanged: 0, skipped: 0, errors: [], extracted: [], new_editions: [], forced: [], skipped_past: [],
    held: [], checks: { errors: 0, warnings: 0, byRule: {} }, geocoded: { processed: 0, skipped: 0, failed: 0 },
    llm: emptyLlmUsage(), discovered: [], discover_skipped: [],
  };
  const results = {};

  console.log(`[discover] ${selected.length}件の候補から race JSON を生成します（モデル ${model}）${dryRun ? ' (dry-run)' : ''}\n`);
  for (const candidate of selected) {
    process.stdout.write(`[generate] ${candidate.name} ... `);
    try {
      const r = await generateRace(candidate, { callFn: callClaudeP, model, prefectures });
      for (const meta of r.metas) summary.llm = accumulateLlmUsage(summary.llm, meta);

      if (r.skipped) {
        console.log(`スキップ: ${r.skipped}`);
        summary.discover_skipped.push({ candidate_id: candidate.id, name: candidate.name, reason: r.skipped });
        results[candidate.id] = { reason: r.skipped };
        continue;
      }

      const target = path.join(RACES_DIR, `${r.race.id}.json`);
      if (fs.existsSync(target)) {
        const reason = `${r.race.id}.json が既に存在する（掲載済みの可能性）`;
        console.log(`スキップ: ${reason}`);
        summary.discover_skipped.push({ candidate_id: candidate.id, name: candidate.name, reason });
        results[candidate.id] = { reason };
        continue;
      }

      for (const h of r.held) summary.held.push({ race_id: r.race.id, race_name: r.race.name_ja, ...h });
      // dry-run は内容確認用に一時ディレクトリへ書き出す
      const out = dryRun ? path.join(os.tmpdir(), `discover-dry-${r.race.id}.json`) : target;
      fs.writeFileSync(out, JSON.stringify(r.race, null, 2) + '\n', 'utf-8');
      console.log(`→ ${dryRun ? `${out}（dry-run）` : `${r.race.id}.json`}`);
      summary.discovered.push({
        race_id: r.race.id, race_name: r.race.name_ja, date: r.race.date, official_url: r.race.official_url,
        source_url: candidate.source_url, issues: r.issues,
      });
      results[candidate.id] = { race_id: r.race.id };
    } catch (err) {
      console.log(`失敗: ${err.message}`);
      summary.discover_skipped.push({ candidate_id: candidate.id, name: candidate.name, reason: `生成に失敗: ${err.message}` });
      results[candidate.id] = { reason: `生成に失敗: ${err.message}` };
    }
  }

  if (!dryRun) {
    saveCandidatesFile({ ...file, candidates: markGenerated(file.candidates, results) });
    console.log('\n[geocode] 追加した大会の座標を補完中...\n');
    summary.geocoded = await geocodeAll({ dryRun });
  }

  // お知らせ（新規掲載）と X 投稿文（#201 / #202 と共通）
  if (summary.discovered.length > 0) {
    const added = dryRun
      ? []
      : summary.discovered.map((d) => readJson(path.join(RACES_DIR, `${d.race_id}.json`)));
    const announcement = added.length > 0 ? buildAnnouncement({
      added,
      updated: [],
      date: formatDateJst(new Date()),
      existingSlugs: readJson(ANNOUNCEMENTS_FILE).map((a) => a.slug),
      prefectures,
    }) : null;
    if (announcement) {
      appendAnnouncement(ANNOUNCEMENTS_FILE, announcement);
      summary.announcement = announcement;
      const xPost = await generateXPost(announcement, { model });
      for (const meta of xPost.metas) summary.llm = accumulateLlmUsage(summary.llm, meta);
      summary.x_post = xPost;
    }
  }

  const report = buildReport(summary);
  summary.report = report;

  if (shouldCreatePr(summary, { dryRun })) {
    console.log('\n[pr] 追加した大会をブランチにまとめて PR を作成します...');
    try {
      const result = createCrawlPr(summary, report, { branchPrefix: 'discover/add' });
      console.log(result.created ? `[pr] 作成しました: ${result.url}` : `[pr] 作成しませんでした（${result.reason}）`);
    } catch (err) {
      console.error(`[pr] 作成に失敗しました: ${err.message}`);
      console.log(report);
    }
  } else {
    console.log(`\n--- レポート${dryRun ? '（dry-run のため PR は作成しません）' : ''} ---\n`);
    console.log(report);
  }
  return summary;
}

// ── エントリーポイント ───────────────────────────────────────────

if (require.main === module && shouldRelaunchWithExtraCa(process.env)) {
  process.exit(relaunchWithExtraCa());
} else if (require.main === module) {
  const argv = process.argv.slice(2);
  const maxPagesIndex = argv.indexOf('--max-pages');
  const maxPages = maxPagesIndex >= 0 ? Number(argv[maxPagesIndex + 1]) : undefined;
  const task = argv.includes('--generate')
    ? generate({ dryRun: argv.includes('--dry-run') })
    : discover({ includeAll: argv.includes('--include-all'), maxPages });
  task.catch((err) => {
    if (err.code === PREFLIGHT_ERROR_CODE) {
      console.error(`[preflight] ${err.message}`);
      process.exit(1);
    }
    console.error('予期しないエラー:', err);
    process.exit(1);
  });
}

module.exports = { discover, generate };
