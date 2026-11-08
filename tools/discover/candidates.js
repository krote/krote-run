'use strict';

/**
 * tools/discover/candidates.js
 * 集めた大会から未掲載の候補を絞り込む（#204）。
 *
 * 重複判定（#203 で決定）: 次のどちらかに当てはまれば掲載済みとみなす
 * 1. 大会名を正規化して一致（第N回・西暦・「大会」・空白・記号・「〜」以降のサブタイトルを除く）。
 *    年度違いの同じシリーズも掲載済み扱い（次年度ファイルはクロールが作るため）
 * 2. 開催日と都道府県が一致（表記揺れで名前が一致しない場合の保険）
 */

const DEFAULT_EXCLUDE_KEYWORDS = ['オンライン', 'リレー', '耐久', '練習会', '記録会'];

/** 大会名を比較用に正規化する */
function normalizeRaceName(name) {
  let text = String(name ?? '').normalize('NFKC').replace(/【[^】]*】/g, '');
  // 「〜」以降のサブタイトルを除く（名前全体が「〜」で始まる場合は残す）
  const main = text.replace(/[~〜].*$/, '');
  if (main.trim()) text = main;
  return text
    .replace(/第\s*\d+\s*回/g, '')
    .replace(/(19|20)\d{2}(年度?)?/g, '')
    .replace(/大会$/, '')
    .replace(/[\s\-_・･.,、。!！?？()（）[\]「」『』【】"'’“”&＆/]/g, '')
    .toLowerCase();
}

/**
 * 掲載済み大会の索引を作る
 * @param {object[]} races - race JSON（全年度）
 * @param {{ code: string, name: string }[]} prefectures
 */
function buildExistingIndex(races, prefectures) {
  const prefName = new Map(prefectures.map((p) => [p.code, p.name]));
  const byName = new Map();
  const byDatePref = new Map();
  for (const race of races) {
    const names = [race.name_ja, race.full_name_ja].filter(Boolean).map(normalizeRaceName).filter(Boolean);
    for (const n of names) if (!byName.has(n)) byName.set(n, race.id);
    if (race.date && race.prefecture) byDatePref.set(`${race.date}|${prefName.get(race.prefecture)}`, race.id);
  }
  return { byName, byDatePref };
}

/**
 * 掲載済みなら該当する race ID、未掲載なら null
 * @param {{ name: string, date: string|null, prefecture: string|null }} event
 */
function findDuplicate(event, index) {
  const byName = index.byName.get(normalizeRaceName(event.name));
  if (byName) return byName;
  if (event.date && event.prefecture) return index.byDatePref.get(`${event.date}|${event.prefecture}`) ?? null;
  return null;
}

/**
 * 期間・除外キーワードで絞り込み、同じ大会の重複を除く
 * @param {object[]} events
 * @param {{ from: string, to: string, excludeKeywords?: string[] }} opts - from/to は YYYY-MM-DD（両端含む）
 */
function filterEvents(events, { from, to, excludeKeywords = DEFAULT_EXCLUDE_KEYWORDS }) {
  const seen = new Set();
  return events.filter((e) => {
    if (!e.date || e.date < from || e.date > to) return false;
    if (excludeKeywords.some((kw) => e.name.includes(kw))) return false;
    // 申込区分ごとに別ページで掲載される大会があるため、ID に加えて名前＋開催日でもまとめる
    const keys = [e.source_id ? `id:${e.source_id}` : null, `name:${normalizeRaceName(e.name)}|${e.date}`].filter(Boolean);
    if (keys.some((k) => seen.has(k))) return false;
    keys.forEach((k) => seen.add(k));
    return true;
  });
}

function toCandidate(event) {
  return {
    id: `${event.source}-${event.source_id}`,
    selected: false,
    name: event.name,
    date: event.date,
    prefecture: event.prefecture,
    place: event.place,
    entry_start: event.entry_start,
    entry_end: event.entry_end,
    tags: event.tags,
    source_url: event.source_url,
  };
}

/** 作り直した候補に、前回ファイルの selected・note を引き継ぐ */
function mergeSelections(fresh, previous) {
  const prev = new Map((previous ?? []).map((c) => [c.id, c]));
  return fresh.map((c) => {
    const p = prev.get(c.id);
    if (!p) return c;
    return { ...c, selected: Boolean(p.selected), ...(p.note ? { note: p.note } : {}) };
  });
}

const DISTANCE_TAG = /(フル|ハーフ|ウルトラ|トレイル|km|Km|KM|ｋｍ|マイル)/;

/** 候補一覧の Markdown（選ぶときに見る用） */
function renderCandidatesMarkdown(candidates, { generatedAt, duplicates }) {
  const lines = [
    `# 未掲載大会の候補（${generatedAt}）`,
    '',
    `候補 ${candidates.length}件 / 掲載済みと判定して除外: ${duplicates}件`,
    '',
    '`tools/discover/candidates.json` で掲載したい大会の `"selected"` を `true` にし、`pnpm run discover -- --generate` を実行する。',
    '',
    '| 開催日 | 大会名 | 都道府県 | 距離タグ | エントリー期間 | 候補ID |',
    '|---|---|---|---|---|---|',
  ];
  for (const c of candidates) {
    const tags = (c.tags ?? []).filter((t) => DISTANCE_TAG.test(t)).join(' ');
    const entry = c.entry_start || c.entry_end ? `${c.entry_start ?? ''}〜${c.entry_end ?? ''}` : '';
    const name = c.name.replace(/\|/g, '\\|');
    lines.push(`| ${c.date} | [${name}](${c.source_url}) | ${c.prefecture ?? ''} | ${tags} | ${entry} | ${c.id} |`);
  }
  return `${lines.join('\n')}\n`;
}

/** 実行日（JST）から12か月先までの範囲（YYYY-MM-DD） */
function computeRange(now = new Date()) {
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const from = jst.toISOString().slice(0, 10);
  const end = new Date(jst);
  end.setUTCFullYear(end.getUTCFullYear() + 1);
  return { from, to: end.toISOString().slice(0, 10) };
}

/**
 * 生成結果を候補ファイルに反映する（生成済みは選択を外し、スキップは理由を残して選択を保つ）
 * @param {object[]} candidates
 * @param {Record<string, { race_id?: string, reason?: string }>} results - 候補 ID → 結果
 */
function markGenerated(candidates, results) {
  return candidates.map((c) => {
    const r = results[c.id];
    if (!r) return c;
    if (r.race_id) return { ...c, selected: false, generated_race_id: r.race_id };
    return { ...c, skipped_reason: r.reason };
  });
}

module.exports = {
  computeRange,
  markGenerated,
  normalizeRaceName,
  buildExistingIndex,
  findDuplicate,
  filterEvents,
  toCandidate,
  mergeSelections,
  renderCandidatesMarkdown,
  DEFAULT_EXCLUDE_KEYWORDS,
};
