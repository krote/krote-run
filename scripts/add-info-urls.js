#!/usr/bin/env node
/**
 * scripts/add-info-urls.js
 * 全レースの official_url をフェッチして info_urls を自動設定する。
 * すでに info_urls が登録済みのレースはスキップ。
 *
 * Usage: node scripts/add-info-urls.js [--dry-run]
 */
'use strict';

const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../src/data/races');
const DRY_RUN = process.argv.includes('--dry-run');
const FETCH_TIMEOUT = 12000;
const REQUEST_DELAY = 800; // ms（サイトへの過負荷防止）

// ── ラベルマッピング（優先順）────────────────────────────────────
const LABEL_RULES = [
  {
    label: 'エントリー',
    urlPatterns: [/entry/i, /エントリー/, /moushikomi/, /apply/i, /申込/],
    textPatterns: [/エントリー/, /申込/, /参加申込/, /entry/i],
  },
  {
    label: '大会要項',
    urlPatterns: [/youkou/i, /essentials/i, /requirements/i, /kisoku/i, /kitei/i, /要項/, /規程/, /開催要/],
    textPatterns: [/大会要項/, /開催要項/, /参加要項/, /要項/, /規程/],
  },
  {
    label: 'コース情報',
    urlPatterns: [/course/i, /コース/, /map/i, /route/i],
    textPatterns: [/コース/, /route/i, /マップ/, /地図/],
  },
  {
    label: '大会の特色',
    urlPatterns: [/about/i, /overview/i, /concept/i, /特色/, /tokucho/, /charm/i, /highlight/i],
    textPatterns: [/大会の特色/, /特色/, /見どころ/, /魅力/, /概要/],
  },
  {
    label: '開催概要',
    urlPatterns: [/gaiyou/i, /kaisai/i, /outline/i, /summary/i, /info(?!rmation)/i],
    textPatterns: [/開催概要/, /大会概要/, /開催情報/],
  },
  {
    label: 'FAQ',
    urlPatterns: [/faq/i, /question/i, /q.?a/i, /よくある/],
    textPatterns: [/FAQ/i, /よくある質問/, /Q&A/i],
  },
  {
    label: 'アクセス',
    urlPatterns: [/access/i, /アクセス/, /venue/i, /kaijou/i, /会場/],
    textPatterns: [/アクセス/, /会場/, /交通/],
  },
];

// ── ユーティリティ ────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function matchesAny(str, patterns) {
  return patterns.some(p => p.test(str));
}

function assignLabel(href, linkText) {
  for (const rule of LABEL_RULES) {
    if (matchesAny(href, rule.urlPatterns) || matchesAny(linkText, rule.textPatterns)) {
      return rule.label;
    }
  }
  return null;
}

/** HTMLから同一ドメインのリンクを抽出してラベル付きで返す */
function extractLabeledLinks(html, baseUrl) {
  const base = new URL(baseUrl);
  const seen = new Set([baseUrl]);
  const results = [];

  const regex = /<a[^>]+href=["']([^"'#?][^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const href = m[1].trim();
    const rawText = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    try {
      const full = new URL(href, base).href;
      const fullUrl = new URL(full);
      // 同一ドメインのみ
      if (fullUrl.hostname !== base.hostname) continue;
      // クエリ・フラグメントなし・パスが違うもの
      const cleanUrl = `${fullUrl.origin}${fullUrl.pathname}`.replace(/\/$/, '') + '/';
      if (seen.has(cleanUrl)) continue;
      seen.add(cleanUrl);

      const label = assignLabel(fullUrl.pathname + fullUrl.href, rawText);
      if (label) {
        results.push({ url: cleanUrl, label, text: rawText });
      }
    } catch { /* ignore */ }
  }
  return results;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; HASHIRUBot/1.0)',
      'Accept-Language': 'ja,en;q=0.9',
    },
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

// ── メイン ────────────────────────────────────────────────────────

async function main() {
  const files = fs.readdirSync(RACES_DIR)
    .filter(f => f.endsWith('.json') && f !== 'index.json')
    .sort();

  const targets = files.filter(f => {
    const d = JSON.parse(fs.readFileSync(path.join(RACES_DIR, f), 'utf-8'));
    return !d.info_urls || d.info_urls.length === 0;
  });

  console.log(`対象: ${targets.length}件（全${files.length}件中）\n`);

  const stats = { updated: 0, skipped: 0, errors: 0 };

  for (const file of targets) {
    const filePath = path.join(RACES_DIR, file);
    const race = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (!race.official_url) {
      console.log(`[skip] ${race.id} — official_url なし`);
      stats.skipped++;
      continue;
    }

    process.stdout.write(`[fetch] ${race.id} ${race.official_url} ... `);
    try {
      const html = await fetchHtml(race.official_url);
      const links = extractLabeledLinks(html, race.official_url);

      // ラベルの重複を除去して最大5件
      const seen = new Set();
      const infoUrls = [];
      for (const link of links) {
        if (seen.has(link.label)) continue;
        seen.add(link.label);
        infoUrls.push({ url: link.url, label: link.label });
        if (infoUrls.length >= 5) break;
      }

      if (infoUrls.length === 0) {
        console.log('リンクなし');
        stats.skipped++;
      } else {
        console.log(`${infoUrls.length}件: ${infoUrls.map(u => u.label).join(', ')}`);
        if (!DRY_RUN) {
          const updated = { ...race, info_urls: infoUrls };
          fs.writeFileSync(filePath, JSON.stringify(updated, null, 2) + '\n', 'utf-8');
        }
        stats.updated++;
      }
    } catch (err) {
      console.log(`エラー: ${err.message}`);
      stats.errors++;
    }

    await sleep(REQUEST_DELAY);
  }

  console.log(`\n=== 完了 ===`);
  console.log(`更新: ${stats.updated}件`);
  console.log(`スキップ: ${stats.skipped}件`);
  console.log(`エラー: ${stats.errors}件`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
