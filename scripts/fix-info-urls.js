#!/usr/bin/env node
/**
 * scripts/fix-info-urls.js
 * info_urls の2種類の問題を一括修正する:
 * 1. ファイル拡張子 (.html/.php/.pdf 等) の末尾スラッシュを除去
 * 2. RSSフィードURL (/feed/) を削除
 *
 * Usage: node scripts/fix-info-urls.js [--dry-run]
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');
const DRY_RUN = process.argv.includes('--dry-run');

// ファイル拡張子パターン（末尾スラッシュを除去すべき）
const FILE_EXT_RE = /\.(html?|php|pdf|aspx|jsp|cgi|shtml)\/$/i;

// RSSフィードURLパターン（エントリーごと削除）
const FEED_RE = /\/feed\/$/i;

let totalFiles = 0;
let modifiedFiles = 0;

const files = fs.readdirSync(RACES_DIR)
  .filter(f => f.endsWith('.json') && f !== 'index.json')
  .sort();

for (const file of files) {
  const filePath = path.join(RACES_DIR, file);
  const race = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  totalFiles++;

  if (!Array.isArray(race.info_urls) || race.info_urls.length === 0) continue;

  const original = JSON.stringify(race.info_urls);
  let changed = false;
  const fixed = [];

  for (const entry of race.info_urls) {
    if (!entry.url) continue;

    // RSSフィードは削除
    if (FEED_RE.test(entry.url)) {
      console.log(`[feed 削除] ${file}: ${entry.url}`);
      changed = true;
      continue;
    }

    // ファイル拡張子末尾スラッシュを除去
    if (FILE_EXT_RE.test(entry.url)) {
      const newUrl = entry.url.replace(/\/$/, '');
      console.log(`[スラッシュ除去] ${file}: ${entry.url} → ${newUrl}`);
      fixed.push({ ...entry, url: newUrl });
      changed = true;
    } else {
      fixed.push(entry);
    }
  }

  if (!changed) continue;

  modifiedFiles++;
  if (!DRY_RUN) {
    const updated = { ...race, info_urls: fixed };
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2) + '\n', 'utf-8');
  }
}

console.log(`\n=== 完了 ===`);
console.log(`対象: ${totalFiles} ファイル`);
console.log(`修正: ${modifiedFiles} ファイル${DRY_RUN ? '（dry-run）' : ''}`);
