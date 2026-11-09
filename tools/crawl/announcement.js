'use strict';

/**
 * tools/crawl/announcement.js
 * クロール結果から「お知らせ」（src/data/announcements.json）のエントリを生成する（#201）。
 *
 * 事実誤認を混ぜないよう、本文は LLM を使わず diff と race JSON から決定的に組み立てる。
 * 文面は手作業で掲載してきた既存のお知らせ（2026-10-25 / 2026-11-03）の形式に合わせている。
 */

const fs = require('fs');

const MAX_LISTED_RACES = 20;
const MAX_TOPICS = 6;

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * diff のフィールドを利用者向けの「更新内容」にまとめる対応表（並び順は同数時の優先順）。
 * 説明文・タグライン・モチーフ等の内部的な項目は話題にしない
 */
const TOPICS = [
  { ja: '開催日', en: 'race dates', keys: ['date'] },
  { ja: 'エントリー期間', en: 'entry periods', keys: ['entry_periods', 'entry_start_date', 'entry_end_date'] },
  { ja: '参加費', en: 'entry fees', keys: ['entry_fee'] },
  { ja: '定員', en: 'capacity', keys: ['entry_capacity'] },
  { ja: '種目情報', en: 'category details', keys: ['categories'] },
  { ja: 'コース情報', en: 'course information', keys: ['course_info'] },
  { ja: '参加賞・完走賞', en: 'participation and finisher gifts', keys: ['participation_gifts', 'completion_gifts'] },
  { ja: 'エイドステーション', en: 'aid stations', keys: ['aid_stations'] },
  { ja: '関門', en: 'cutoffs', keys: ['checkpoints'] },
  { ja: '会場情報', en: 'venue information', keys: ['venue_name_ja', 'venue_name_en', 'venue_address'] },
  { ja: 'アクセス', en: 'access', keys: ['access_points'] },
  { ja: '受付方法', en: 'check-in procedures', keys: ['reception_type', 'reception_note_ja', 'reception_note_en'] },
  { ja: '周辺スポット', en: 'nearby spots', keys: ['nearby_spots'] },
];

function parseDate(date) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(date ?? '');
  return m ? { month: Number(m[2]), day: Number(m[3]) } : null;
}

function findPrefecture(race, prefectures) {
  return prefectures.find((p) => p.code === race.prefecture) ?? null;
}

/** 「・鳥取マラソン（3/14・鳥取県鳥取市）」。欠けている要素は省く */
function formatRaceLineJa(race, prefectures) {
  const d = parseDate(race.date);
  const pref = findPrefecture(race, prefectures);
  const place = pref ? `${pref.name}${race.city_ja ?? ''}` : '';
  const parts = [d ? `${d.month}/${d.day}` : null, place || null].filter(Boolean);
  return `・${race.name_ja}${parts.length ? `（${parts.join('・')}）` : ''}`;
}

/** 「- Gamagori Bayside Trail (Jan 23, Gamagori, Aichi)」。市名と県名が同じなら県名を省く */
function formatRaceLineEn(race, prefectures) {
  const d = parseDate(race.date);
  const pref = findPrefecture(race, prefectures);
  const city = (race.city_en ?? '').replace(/\s+(City|Town|Village|Ward)$/i, '').trim();
  const places = [];
  if (city) places.push(city);
  if (pref && pref.nameEn !== city) places.push(pref.nameEn);
  const parts = [d ? `${MONTHS_EN[d.month - 1]} ${d.day}` : null, ...places].filter(Boolean);
  return `- ${race.name_en || race.name_ja}${parts.length ? ` (${parts.join(', ')})` : ''}`;
}

/**
 * 大会ごとの diff から主な更新内容を集計する（1大会につき話題1回まで数える）
 * @param {{ key: string }[][]} diffs
 * @returns {{ ja: string[], en: string[] }}
 */
function summarizeTopics(diffs) {
  const counts = TOPICS.map(() => 0);
  for (const diff of diffs) {
    const keys = new Set(diff.map((d) => d.key));
    TOPICS.forEach((t, i) => {
      if (t.keys.some((k) => keys.has(k))) counts[i]++;
    });
  }
  const ranked = TOPICS
    .map((t, i) => ({ t, count: counts[i], i }))
    .filter((x) => x.count > 0)
    .sort((a, b) => b.count - a.count || a.i - b.i)
    .slice(0, MAX_TOPICS);
  return { ja: ranked.map((x) => x.t.ja), en: ranked.map((x) => x.t.en) };
}

function joinEn(items) {
  if (items.length <= 1) return items.join('');
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function buildSlug(date, existingSlugs) {
  const base = `${date}-race-data-update`;
  const taken = new Set(existingSlugs);
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}

const byDate = (a, b) => String(a.date ?? '').localeCompare(String(b.date ?? ''));

function listLines(races, prefectures) {
  const sorted = [...races].sort(byDate);
  const shown = sorted.slice(0, MAX_LISTED_RACES);
  const rest = sorted.length - shown.length;
  const ja = shown.map((r) => formatRaceLineJa(r, prefectures));
  const en = shown.map((r) => formatRaceLineEn(r, prefectures));
  if (rest > 0) {
    ja.push(`（ほか${rest}大会）`);
    en.push(`- and ${rest} more`);
  }
  return { ja, en };
}

const racesEn = (n) => (n === 1 ? 'race' : `${n} races`);
const titleCountEn = (n, verb) => `${n} ${n === 1 ? 'Race' : 'Races'} ${verb}`;

/**
 * お知らせエントリを組み立てる
 * @param {object} params
 * @param {object[]} params.added - 新たに掲載した大会の race JSON（次年度ファイル・探索で追加した大会）
 * @param {{ race: object, diff: { key: string }[] }[]} params.updated - 情報を更新した大会と diff
 * @param {string} params.date - 掲載日（YYYY-MM-DD、JST）
 * @param {string[]} params.existingSlugs - 既存のお知らせの slug
 * @param {{ code: string, name: string, nameEn: string }[]} params.prefectures
 * @returns {object|null} 対象が無ければ null
 */
function buildAnnouncement({ added, updated, date, existingSlugs, prefectures }) {
  const a = added.length;
  const u = updated.length;
  if (a === 0 && u === 0) return null;

  const titleJa = [a > 0 ? `新たに${a}大会を掲載` : null, u > 0 ? `${u}大会の情報を更新` : null].filter(Boolean).join('・');
  const titleEn = [a > 0 ? titleCountEn(a, 'Added') : null, u > 0 ? titleCountEn(u, 'Updated') : null].filter(Boolean).join(', ');

  const bodyJa = [];
  const bodyEn = [];

  if (a > 0) {
    const lines = listLines(added, prefectures);
    bodyJa.push(`以下の${a}大会を新たに掲載しました。`, ...lines.ja);
    bodyEn.push(`We've added the following ${racesEn(a)}:`, ...lines.en);
  }

  if (u > 0) {
    const lines = listLines(updated.map((x) => x.race), prefectures);
    bodyJa.push(`${a > 0 ? 'あわせて、' : ''}以下の${u}大会の情報を各公式サイトの最新内容に更新しました。`, ...lines.ja);
    bodyEn.push(`We've ${a > 0 ? 'also ' : ''}updated the following ${racesEn(u)} with the latest information from their official websites:`, ...lines.en);

    const topics = summarizeTopics(updated.map((x) => x.diff ?? []));
    if (topics.ja.length > 0) {
      bodyJa.push(`主な更新内容は、${topics.ja.join('、')}です。`);
      bodyEn.push(`Updates mainly cover ${joinEn(topics.en)}.`);
    }
  }

  return {
    slug: buildSlug(date, existingSlugs),
    date,
    title_ja: `${titleJa}しました`,
    title_en: titleEn,
    body_ja: bodyJa.join('\n'),
    body_en: bodyEn.join('\n'),
    link_href: '/races',
    link_label_ja: '大会一覧を見る',
    link_label_en: 'Browse all races',
  };
}

/** announcements.json の末尾にエントリを追記する（既存ファイルと同じ整形） */
function appendAnnouncement(file, entry) {
  const list = JSON.parse(fs.readFileSync(file, 'utf-8'));
  list.push(entry);
  fs.writeFileSync(file, JSON.stringify(list, null, 2) + '\n', 'utf-8');
}

module.exports = {
  buildAnnouncement,
  formatRaceLineJa,
  formatRaceLineEn,
  summarizeTopics,
  buildSlug,
  appendAnnouncement,
  TOPICS,
};
