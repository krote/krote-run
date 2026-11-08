'use strict';

/**
 * tools/discover/sportsentry.js
 * スポーツエントリーの「マラソン・ランニング」大会一覧から、未掲載大会の候補の手がかりを集める（#204）。
 *
 * #203 の調査結果に基づく利用方針:
 * - robots.txt で許可された一覧ページ（/events/running?page=N）だけを読む
 * - 取り出すのは大会名・開催日・開催地・距離タグ・エントリー期間だけ。本文・画像・クチコミは使わない
 * - リクエスト間隔は2秒。HASHIRUBot の UA を名乗る（偽装しない）
 * - JSON の中身は大会の公式サイトから作る（ここで集めた情報は候補の判断材料にとどめる）
 */

const BASE_URL = 'https://www.sportsentry.ne.jp';
const DEFAULT_DELAY_MS = 2000;
const DEFAULT_MAX_PAGES = 200;

const FETCH_OPTS = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (compatible; HASHIRUBot/1.0; +https://hashiru.run)',
    'Accept-Language': 'ja,en;q=0.9',
  },
};

/** 「2026年12月13日（日）」→ "2026-12-13" */
function parseJaDate(text) {
  const m = /(\d{4})年(\d{1,2})月(\d{1,2})日/.exec(text ?? '');
  if (!m) return null;
  return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/[\s　]+/g, ' ').trim();
}

/**
 * 一覧ページの HTML から大会を取り出す
 * @param {string} html
 * @returns {object[]}
 */
function parseEventList(html) {
  const blocks = String(html ?? '').split('<div class="detailSingle">').slice(1);
  const events = [];

  for (const block of blocks) {
    const link = /<a href="\/event\/t\/(\d+)"[^>]*>([\s\S]*?)<\/a>/.exec(block);
    if (!link) continue;

    const prefecture = /detailSingle__Title--Place[^"]*">([\s\S]*?)<\/p>/.exec(block);
    // PC 表示用の情報欄（SP 用と同じ内容が重複しているため片方だけ読む）
    const info = /<div class="detailSingle__Info">([\s\S]*?)<p class="tag">/.exec(block)?.[1]
      ?? /<div class="detailSingle__Info">([\s\S]*)$/.exec(block)?.[1]
      ?? '';
    const paragraphs = [...info.matchAll(/<p(?![^>]*mainText)[^>]*>([\s\S]*?)<\/p>/g)].map((m) => stripTags(m[1]));

    const date = parseJaDate(paragraphs.find((p) => parseJaDate(p) && !p.startsWith('[エントリー]')));
    const entryLine = paragraphs.find((p) => p.startsWith('[エントリー]')) ?? '';
    const [entryStartText, entryEndText] = entryLine.replace('[エントリー]', '').split('〜');
    const place = paragraphs.find((p) => !parseJaDate(p) && !p.startsWith('[エントリー]')) ?? null;

    const tagBlock = /<p class="tag">([\s\S]*?)<\/p>/.exec(block)?.[1] ?? '';
    const tags = [...tagBlock.matchAll(/<a [^>]*>([\s\S]*?)<\/a>/g)].map((m) => stripTags(m[1]).replace(/^[＃#]/, ''));

    events.push({
      source: 'sportsentry',
      source_id: link[1],
      source_url: `${BASE_URL}/event/t/${link[1]}`,
      name: stripTags(link[2]),
      date,
      prefecture: prefecture ? stripTags(prefecture[1]) : null,
      place,
      entry_start: parseJaDate(entryStartText),
      entry_end: parseJaDate(entryEndText),
      tags,
    });
  }

  return events;
}

function listPageUrl(page) {
  return page > 1 ? `${BASE_URL}/events/running?page=${page}` : `${BASE_URL}/events/running`;
}

const defaultSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 一覧を1ページ目から順に取得し、大会が無いページで止める
 * @param {{ fetchFn?: typeof fetch, sleep?: Function, delayMs?: number, maxPages?: number, log?: Function }} [opts]
 */
async function fetchEventList({
  fetchFn = fetch, sleep = defaultSleep, delayMs = DEFAULT_DELAY_MS, maxPages = DEFAULT_MAX_PAGES, log = console.log,
} = {}) {
  const events = [];
  for (let page = 1; page <= maxPages; page++) {
    if (page > 1) await sleep(delayMs);
    const res = await fetchFn(listPageUrl(page), { ...FETCH_OPTS, signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`スポーツエントリー一覧 ${page}ページ目: HTTP ${res.status}`);
    const found = parseEventList(await res.text());
    if (found.length === 0) break;
    events.push(...found);
    log(`[discover] スポーツエントリー ${page}ページ目: ${found.length}件`);
  }
  return events;
}

module.exports = { parseJaDate, parseEventList, listPageUrl, fetchEventList, BASE_URL, FETCH_OPTS };
