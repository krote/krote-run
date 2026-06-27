#!/usr/bin/env node
/**
 * tools/crawl/index.js
 * 大会公式サイトの更新チェッカー
 *
 * Usage:
 *   node tools/crawl/index.js           # 全レースをチェック
 *   node tools/crawl/index.js --dry-run # チェックサムを更新しない
 *
 * チェックサム: tools/crawl/checksums.json に保存
 */
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '../..');
const RACES_DIR = path.join(ROOT, 'src/data/races');
const CHECKSUMS_FILE = path.join(__dirname, 'checksums.json');

const { extractFromPages, applyAndSave, buildDiff, createNewEditionFile } = require('./extractor');

const FETCH_OPTS = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; HASHIRUBot/1.0; +https://hashiru.run)',
    'Accept-Language': 'ja,en;q=0.9',
  },
};

// ── 純粋関数（テスト対象） ────────────────────────────────────────

/** テキストの SHA-256 ハッシュを返す */
function computeHash(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

/**
 * URLのコンテンツが変更されたか判定する
 * @param {string} url
 * @param {string} newHash
 * @param {Record<string, {hash: string}>} checksums
 * @returns {boolean}
 */
function hasChanged(url, newHash, checksums) {
  return checksums[url]?.hash !== newHash;
}

/**
 * レースデータからチェック対象URLリストを構築する
 * info_urls が登録済みならそれを優先、なければ official_url を使用
 * @param {object} race
 * @returns {string[]}
 */
function buildUrlsToCheck(race) {
  if (race.info_urls && race.info_urls.length > 0) {
    return race.info_urls.map(u => u.url);
  }
  return race.official_url ? [race.official_url] : [];
}

/**
 * ファイルリストからシリーズごとに最新年のファイルのみ返す
 * 例: ['tokyo-marathon-2026.json', 'tokyo-marathon-2027.json'] → ['tokyo-marathon-2027.json']
 * @param {string[]} files - JSONファイル名の配列（index.json は除外済み前提）
 * @returns {string[]} ソート済みの最新ファイル一覧
 */
function getLatestFilesPerSeries(files) {
  const map = new Map(); // series → { file, year }
  for (const file of files) {
    const match = file.match(/^(.+)-(\d{4})\.json$/);
    if (!match) continue;
    const [, series, year] = match;
    const existing = map.get(series);
    if (!existing || year > existing.year) {
      map.set(series, { file, year });
    }
  }
  return [...map.values()].map(v => v.file).sort();
}

// ── I/O ──────────────────────────────────────────────────────────

function loadChecksums() {
  try {
    return JSON.parse(fs.readFileSync(CHECKSUMS_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveChecksums(checksums) {
  fs.mkdirSync(path.dirname(CHECKSUMS_FILE), { recursive: true });
  fs.writeFileSync(CHECKSUMS_FILE, JSON.stringify(checksums, null, 2) + '\n', 'utf-8');
}

// ── HTML処理 ─────────────────────────────────────────────────────

function cleanHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchPageText(url) {
  const res = await fetch(url, { ...FETCH_OPTS, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = cleanHtml(await res.text());
  if (text.length < 100) throw new Error('ページコンテンツが空または短すぎます（スキップ）');
  return text;
}

// ── クロール ─────────────────────────────────────────────────────

/**
 * 1レース分のURLを巡回してチェックサムを更新する
 * @returns {{ url: string, status: 'changed'|'new'|'unchanged'|'error', error?: string }[]}
 */
async function crawlRace(race, checksums, dryRun = false) {
  const urls = buildUrlsToCheck(race);
  const results = [];

  for (const url of urls) {
    let status;
    let error = null;
    let text = null;

    try {
      const fetchedText = await fetchPageText(url);
      const newHash = computeHash(fetchedText);
      const isNew = !checksums[url];
      const changed = hasChanged(url, newHash, checksums);

      if (changed) {
        status = isNew ? 'new' : 'changed';
        text = fetchedText;
      } else {
        status = 'unchanged';
      }

      if (!dryRun) {
        checksums[url] = {
          hash: newHash,
          last_checked: new Date().toISOString(),
          race_id: race.id,
        };
      }
    } catch (err) {
      status = 'error';
      error = err.message;
    }

    results.push({ url, status, error, text });
  }

  return results;
}

// ── メイン ───────────────────────────────────────────────────────

async function run(options = {}) {
  const dryRun = options.dryRun ?? false;

  const checksums = loadChecksums();
  const allFiles = fs.readdirSync(RACES_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .sort();
  const files = getLatestFilesPerSeries(allFiles);
  const skippedBySeries = allFiles.length - files.length;

  const summary = {
    changed: [],       // { race_id, url }
    new: [],           // { race_id, url }
    unchanged: 0,
    skipped: 0,        // info_urls も official_url もない
    errors: [],        // { race_id, url, error }
    extracted: [],     // { race_id, diff } LLM抽出で変更が見つかったもの
    new_editions: [],  // { race_id, new_race_id } 次年度ファイルを自動作成したもの
  };

  // 変更が検出されたレースを収集（LLM抽出用）
  const changedRaces = [];

  console.log(`[crawl] ${files.length}件のレースをチェックします（${skippedBySeries}件は旧年度のためスキップ）${dryRun ? ' (dry-run)' : ''}\n`);

  for (const file of files) {
    const race = JSON.parse(fs.readFileSync(path.join(RACES_DIR, file), 'utf-8'));
    const urls = buildUrlsToCheck(race);

    if (urls.length === 0) {
      summary.skipped++;
      continue;
    }

    process.stdout.write(`[${race.id}] `);
    const results = await crawlRace(race, checksums, dryRun);

    const changedTexts = [];
    for (const r of results) {
      if (r.status === 'changed') {
        summary.changed.push({ race_id: race.id, url: r.url });
        changedTexts.push({ url: r.url, text: r.text });
        console.log(`変更あり: ${r.url}`);
      } else if (r.status === 'new') {
        summary.new.push({ race_id: race.id, url: r.url });
        changedTexts.push({ url: r.url, text: r.text });
        console.log(`新規登録: ${r.url}`);
      } else if (r.status === 'error') {
        summary.errors.push({ race_id: race.id, url: r.url, error: r.error });
        console.log(`エラー: ${r.url} (${r.error})`);
      } else {
        summary.unchanged++;
        console.log(`変更なし: ${r.url}`);
      }
    }

    if (changedTexts.length > 0) {
      changedRaces.push({ race, changedTexts });
    }
  }

  if (!dryRun) {
    saveChecksums(checksums);
  }

  // ── LLM抽出フェーズ ──────────────────────────────────────────
  if (changedRaces.length > 0) {
    console.log(`\n[extract] 変更が検出された ${changedRaces.length}件のレースを抽出中...\n`);

    for (const { race, changedTexts } of changedRaces) {
      process.stdout.write(`[extract] ${race.id} ... `);
      try {
        const { extracted, diff } = await extractFromPages(race, changedTexts);
        const updatedFields = diff.filter(d => d.changed);

        if (updatedFields.length === 0) {
          console.log('抽出結果: 変更なし');
          continue;
        }

        console.log(`更新フィールド: ${updatedFields.map(d => d.label).join(', ')}`);
        for (const d of updatedFields) {
          const isComplex = Array.isArray(d.extracted) || (d.extracted && typeof d.extracted === 'object');
          if (isComplex) {
            const count = Array.isArray(d.extracted) ? `${d.extracted.length}件` : 'object';
            console.log(`  ${d.label}: (複合) → ${count}`);
          } else {
            console.log(`  ${d.label}: ${d.current} → ${d.extracted}`);
          }
        }

        if (!dryRun) {
          const saveResult = applyAndSave(race, extracted);
          if (saveResult.yearMismatch) {
            console.log(`  次年度大会を検出: ${race.id} (${saveResult.currentYear} → ${saveResult.extractedYear})`);
            const createResult = createNewEditionFile(race, extracted);
            if (createResult.created) {
              console.log(`  → 新規ファイル作成: src/data/races/${createResult.newId}.json`);
              summary.new_editions.push({ race_id: race.id, new_race_id: createResult.newId });
            } else {
              console.log(`  → ${createResult.newId}.json は既に存在するためスキップ`);
            }
            continue;
          }
          console.log(`  → ${race.id}.json を更新しました`);
        }

        summary.extracted.push({ race_id: race.id, diff: updatedFields });
      } catch (err) {
        console.error(`エラー: ${err.message}`);
        summary.errors.push({ race_id: race.id, url: '(extract)', error: err.message });
      }
    }
  }

  console.log('\n=== チェック完了 ===');
  console.log(`変更あり : ${summary.changed.length}件`);
  console.log(`新規     : ${summary.new.length}件`);
  console.log(`変更なし : ${summary.unchanged}件`);
  console.log(`LLM更新  : ${summary.extracted.length}件`);
  console.log(`新年度作成: ${summary.new_editions.length}件`);
  console.log(`エラー   : ${summary.errors.length}件`);
  console.log(`スキップ : ${summary.skipped}件（URL未設定）`);

  if (summary.extracted.length > 0) {
    console.log('\n--- 更新されたレース ---');
    for (const item of summary.extracted) {
      console.log(`  ${item.race_id}: ${item.diff.map(d => d.label).join(', ')}`);
    }
  }

  if (summary.new_editions.length > 0) {
    console.log('\n--- 次年度ファイル作成 ---');
    for (const item of summary.new_editions) {
      console.log(`  ${item.race_id} → src/data/races/${item.new_race_id}.json`);
    }
  }

  return summary;
}

// ── エントリーポイント ───────────────────────────────────────────

if (require.main === module) {
  const dryRun = process.argv.includes('--dry-run');
  run({ dryRun }).catch(err => {
    console.error('予期しないエラー:', err);
    process.exit(1);
  });
} else {
  module.exports = { computeHash, hasChanged, buildUrlsToCheck, getLatestFilesPerSeries };
}
