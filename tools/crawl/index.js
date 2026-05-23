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

const { extractFromPages, applyAndSave, buildDiff } = require('./extractor');

const FETCH_OPTS = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; HASHIRUBot/1.0; +https://hashiru.run)',
    'Accept-Language': 'ja,en;q=0.9',
  },
  signal: AbortSignal.timeout(15000),
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
  const res = await fetch(url, FETCH_OPTS);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return cleanHtml(await res.text());
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
  const files = fs.readdirSync(RACES_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .sort();

  const summary = {
    changed: [],    // { race_id, url }
    new: [],        // { race_id, url }
    unchanged: 0,
    skipped: 0,     // info_urls も official_url もない
    errors: [],     // { race_id, url, error }
    extracted: [],  // { race_id, diff } LLM抽出で変更が見つかったもの
  };

  // 変更が検出されたレースを収集（LLM抽出用）
  const changedRaces = [];

  console.log(`[crawl] ${files.length}件のレースをチェックします${dryRun ? ' (dry-run)' : ''}\n`);

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
          console.log(`  ${d.label}: ${d.current} → ${d.extracted}`);
        }

        if (!dryRun) {
          applyAndSave(race, extracted);
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
  console.log(`エラー   : ${summary.errors.length}件`);
  console.log(`スキップ : ${summary.skipped}件（URL未設定）`);

  if (summary.extracted.length > 0) {
    console.log('\n--- 更新されたレース ---');
    for (const item of summary.extracted) {
      console.log(`  ${item.race_id}: ${item.diff.map(d => d.label).join(', ')}`);
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
  module.exports = { computeHash, hasChanged, buildUrlsToCheck };
}
