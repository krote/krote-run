'use strict';

/**
 * tools/discover/generate.js
 * 選択した候補について、公式サイトから detail_level: light の race JSON を作る（#204）。
 *
 * 1. 公式 URL を Web 検索（claude -p + WebSearch）で特定する。見つからなければ作らない
 * 2. 公式サイトのトップページと、要項・エントリー・アクセス等のリンク先を取得する
 * 3. LLM で項目を抽出し、既存の race JSON と同じ形に組み立てる（データ品質ルールに沿って補正）
 * 4. 検査ゲート（tools/crawl/gate.js）で新たな違反を生む項目は外す
 */

const path = require('path');
const { validateRace } = require('../../scripts/validate-races');
const { FETCH_OPTS } = require('./sportsentry');

const SYSTEM_PROMPT_FILE = path.join(__dirname, 'discover-system-prompt.txt');
const MAX_INFO_URLS = 4;
const RECEPTION_TYPES = ['pre_day', 'race_day', 'both', 'pre_mail', 'none'];
const SURFACES = ['road', 'trail', 'mixed'];
const DISTANCE_TYPES = ['full', 'half', '10k', '5k', 'ultra', 'other'];

const candidateSummary = (c) => [
  `大会名: ${c.name}`,
  `開催日: ${c.date}`,
  `開催地: ${[c.prefecture, c.place].filter(Boolean).join(' ')}`,
  c.entry_start || c.entry_end ? `エントリー期間（スポーツエントリー掲載）: ${c.entry_start ?? '?'}〜${c.entry_end ?? '?'}` : null,
].filter(Boolean).join('\n');

function buildOfficialUrlPrompt(candidate) {
  return [
    'Web 検索で、次のランニング大会の主催者の公式サイト URL を特定してください。',
    '',
    candidateSummary(candidate),
    '',
    '条件:',
    '- RUNNET・スポーツエントリー・moshicom 等のエントリーサイト、まとめブログ、ニュース記事は公式サイトではない',
    '- 自治体や主催団体のサイト内の大会ページは公式サイトとしてよい',
    '- 最新回のページがまだ無くても、同じ大会（シリーズ）の公式サイトであれば答える。evidence に掲載されている回・開催年を書く',
    '- 同名の別大会と取り違えない（開催地で確かめる）。見つからなければ official_url は null',
    '',
    '次の JSON だけを返す: {"official_url": string|null, "evidence": string}',
  ].join('\n');
}

/** LLM 出力から最初の JSON オブジェクトを取り出す（コードフェンス・前後の文に対応） */
function parseJsonResponse(text) {
  const raw = String(text ?? '');
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(raw)?.[1];
  const source = fenced ?? raw;
  const start = source.indexOf('{');
  const end = source.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error(`JSON が見つからない応答: ${raw.slice(0, 120)}`);
  return JSON.parse(source.slice(start, end + 1));
}

function buildNewRacePrompt(candidate, pages) {
  const { allocateTextBudget, DEFAULT_TEXT_BUDGET } = require('../crawl/extractor');
  const pageText = allocateTextBudget(pages, DEFAULT_TEXT_BUDGET).pages
    .map((p) => `=== ${p.url} ===\n${p.text}`)
    .join('\n\n');

  return `以下はランニング大会の公式サイトのテキストです。大会ポータルに新規掲載するため、項目を抽出してください。

【候補の情報（大会情報サイトの掲載内容。公式サイトと食い違う場合は公式サイトを優先）】
${candidateSummary(candidate)}

【公式サイトのテキスト】
${pageText}

公式サイトが候補とは別の回（前回大会など）の内容しか載せていない場合は、date・entry_periods・entry_fee・entry_capacity・categories の参加費と定員を null（配列は []）にし、notes にその旨を書く。大会名・説明文・会場・種目の距離など回によって変わりにくい項目は抽出してよい。

次のキーを持つ JSON オブジェクトだけを返す。ページに書かれていない値は null（配列は []）にし、推測で埋めない。
{
  "id_slug": "大会名の英小文字ローマ字をハイフンでつないだもの（年・回数は含めない。例: tottori-marathon）",
  "name_ja": "回数・年を除いた大会名", "name_en": "英語名",
  "full_name_ja": "回数・年を含む正式名称", "full_name_en": "英語の正式名称", "edition": "回数（整数）",
  "date": "YYYY-MM-DD", "city_ja": "市区町村（例: 西宮市）", "city_en": "例: Nishinomiya City",
  "description_ja": "大会の特徴を2〜3文で", "description_en": "description_ja の英訳",
  "entry_fee": "全種目共通の参加費（円・整数）。種目で異なれば null",
  "entry_fee_by_category": "種目ごとに参加費が異なれば true",
  "entry_capacity": "全体の定員（整数）",
  "entry_periods": [{"label_ja": "区分名（不明なら 一般エントリー）", "label_en": "General Entry 等", "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD", "entry_fee": "整数|null"}],
  "reception_type": "pre_day（前日受付）| race_day（当日受付）| both | pre_mail（事前送付）| none",
  "reception_note_ja": "受付の補足", "reception_note_en": "英訳",
  "venue_name_ja": "会場名", "venue_name_en": "英語の会場名", "venue_address": "会場の住所",
  "surface": "road | trail | mixed",
  "categories": [{"distance_type": "full | half | 10k | 5k | ultra | other", "distance_km": "数値", "time_limit_minutes": "整数", "start_time": "HH:MM", "capacity": "整数", "entry_fee": "整数", "name_ja": "種目名", "name_en": "英語の種目名", "description_ja": "参加資格等", "description_en": "英訳"}],
  "tags": ["コースの特徴を表す短い日本語タグ（例: フラットコース）最大3件"],
  "notes": ["データの出典・不確かな点の注記（日本語）"]
}`;
}

/** スラッグを race ID にする（英小文字・数字・ハイフン＋開催年） */
function toRaceId(slug, date) {
  const year = String(date ?? '').slice(0, 4);
  const base = String(slug ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-?(19|20)\d{2}$/, '')
    .replace(/^-+|-+$/g, '');
  return `${base}-${year}`;
}

const orNull = (v) => (v === undefined || v === '' ? null : v);
const intOrNull = (v) => (Number.isFinite(Number(v)) && v !== null && v !== '' ? Math.round(Number(v)) : null);

/**
 * LLM の抽出結果と候補情報から、既存の race JSON と同じ形の light JSON を組み立てる。
 * データ品質ルール（CLAUDE.md）に沿って、空ラベル・null の開始日・entry_start_date を補正する
 * @param {object} generated - buildNewRacePrompt の応答
 * @param {{ candidate: object, officialUrl: string, infoUrls: { url: string, label: string }[], prefectures: object[], now?: Date }} ctx
 */
function buildLightRace(generated, { candidate, officialUrl, infoUrls, prefectures, now = new Date() }) {
  const today = now.toISOString().slice(0, 10);
  // 開催日は大会情報サイトに掲載された最新回の日付を正とする（公式サイトが前回大会のままのことがある）
  const date = candidate.date ?? orNull(generated.date);
  const dateNote = generated.date && generated.date !== date
    ? [`公式サイトの開催日（${generated.date}）は候補の開催日と異なるため、候補の開催日（${date}）を採用。公式サイトが前回大会の内容の可能性あり`]
    : [];
  const pref = prefectures.find((p) => p.name === candidate.prefecture);

  const rawPeriods = Array.isArray(generated.entry_periods) ? generated.entry_periods : [];
  const fallbackStart = rawPeriods.map((p) => p.start_date).filter(Boolean).sort()[0] ?? candidate.entry_start ?? null;
  const entryPeriods = rawPeriods.map((p, i) => ({
    label_ja: orNull(p.label_ja) ?? '一般エントリー',
    label_en: orNull(p.label_en) ?? 'General Entry',
    start_date: orNull(p.start_date) ?? fallbackStart,
    end_date: orNull(p.end_date),
    entry_fee: intOrNull(p.entry_fee),
    category_id: null,
    sort_order: i,
  })).filter((p) => p.start_date);
  if (entryPeriods.length === 0 && candidate.entry_start) {
    entryPeriods.push({
      label_ja: '一般エントリー', label_en: 'General Entry', start_date: candidate.entry_start, end_date: candidate.entry_end,
      entry_fee: intOrNull(generated.entry_fee), category_id: null, sort_order: 0,
    });
  }
  const starts = entryPeriods.map((p) => p.start_date).sort();
  const ends = entryPeriods.map((p) => p.end_date).filter(Boolean).sort();

  const categories = (Array.isArray(generated.categories) ? generated.categories : []).map((c) => ({
    distance_type: DISTANCE_TYPES.includes(c.distance_type) ? c.distance_type : 'other',
    distance_km: Number.isFinite(Number(c.distance_km)) && c.distance_km !== null ? Number(c.distance_km) : null,
    time_limit_minutes: intOrNull(c.time_limit_minutes),
    start_time: orNull(c.start_time),
    capacity: intOrNull(c.capacity),
    entry_fee: intOrNull(c.entry_fee),
    entry_fee_u25: null,
    name_ja: orNull(c.name_ja),
    name_en: orNull(c.name_en),
    description_ja: orNull(c.description_ja),
    description_en: orNull(c.description_en),
    waves: null,
  }));

  const notes = [
    `スポーツエントリーの大会一覧（${candidate.source_url}）で未掲載大会の候補として発見し、公式サイトの情報から自動生成（${today}）`,
    ...dateNote,
    ...(Array.isArray(generated.notes) ? generated.notes.filter((n) => typeof n === 'string' && n.trim()) : []),
  ];

  return {
    id: toRaceId(generated.id_slug, date),
    name_ja: orNull(generated.name_ja) ?? candidate.name,
    name_en: orNull(generated.name_en),
    full_name_ja: orNull(generated.full_name_ja),
    full_name_en: orNull(generated.full_name_en),
    edition: intOrNull(generated.edition),
    date,
    prefecture: pref?.code ?? null,
    city_ja: orNull(generated.city_ja),
    city_en: orNull(generated.city_en),
    description_ja: orNull(generated.description_ja),
    description_en: orNull(generated.description_en),
    official_url: officialUrl,
    entry_fee: intOrNull(generated.entry_fee),
    entry_fee_by_category: Boolean(generated.entry_fee_by_category),
    entry_capacity: intOrNull(generated.entry_capacity),
    entry_start_date: starts[0] ?? null,
    entry_end_date: ends[ends.length - 1] ?? null,
    reception_type: RECEPTION_TYPES.includes(generated.reception_type) ? generated.reception_type : null,
    reception_note_ja: orNull(generated.reception_note_ja),
    reception_note_en: orNull(generated.reception_note_en),
    tags: Array.isArray(generated.tags) ? generated.tags.filter((t) => typeof t === 'string').slice(0, 3) : [],
    course_gpx_file: null,
    course_info: {
      max_elevation_m: null,
      min_elevation_m: null,
      elevation_diff_m: null,
      surface: SURFACES.includes(generated.surface) ? generated.surface : 'road',
      certification: [],
      highlights_ja: null,
      highlights_en: null,
      notes_ja: null,
      notes_en: null,
    },
    categories,
    aid_stations: [],
    checkpoints: [],
    access_points: [],
    nearby_spots: [],
    weather_history: [],
    participation_gifts: [],
    result: null,
    created_at: now.toISOString(),
    updated_at: now.toISOString(),
    _metadata: {
      data_source: `公式サイト（${officialUrl}）の公開情報から自動生成（${today}）`,
      data_accuracy_notes: notes,
      last_verified: today,
      detail_level: 'light',
    },
    entry_periods: entryPeriods,
    motif: null,
    motif_color: null,
    motif_romaji: null,
    tagline_ja: null,
    tagline_en: null,
    hero_image_url: null,
    hero_caption_ja: null,
    hero_caption_en: null,
    gallery: [],
    voices: [],
    time_buckets: [],
    course_highlights: [],
    info_urls: infoUrls,
    completion_gifts: [],
    venue_name_ja: orNull(generated.venue_name_ja),
    venue_name_en: orNull(generated.venue_name_en),
    venue_address: orNull(generated.venue_address),
    start_lat: null,
    start_lng: null,
  };
}

/**
 * 候補1件から race JSON を作る（I/O あり）
 * @param {object} candidate
 * @param {{ callFn: Function, fetchFn?: typeof fetch, model: string, prefectures: object[], now?: Date }} deps
 * @returns {Promise<{ race?: object, held?: object[], issues?: object[], skipped?: string, metas: object[] }>}
 */
async function generateRace(candidate, deps) {
  const { fetchPage, discoverInfoLinks } = require('../crawl/index');
  const { screenExtraction } = require('../crawl/gate');
  const metas = [];
  const call = async (prompt, extra = {}) => {
    const { text, meta } = await deps.callFn(prompt, { model: deps.model, systemPromptFile: SYSTEM_PROMPT_FILE, ...extra });
    metas.push(meta);
    return parseJsonResponse(text);
  };

  const { official_url: officialUrl, evidence } = await call(buildOfficialUrlPrompt(candidate), { tools: 'WebSearch' });
  if (!officialUrl) return { skipped: `公式サイトが見つからない（${evidence ?? '根拠なし'}）`, metas };

  // トップページの HTML からリンクを探し、要項・エントリー等のページも読む
  const fetchFn = deps.fetchFn ?? fetch;
  const topRes = await fetchFn(officialUrl, { ...FETCH_OPTS, signal: AbortSignal.timeout(15000) });
  if (!topRes.ok) return { skipped: `公式サイトを取得できない（HTTP ${topRes.status}）: ${officialUrl}`, metas };
  const topHtml = await topRes.text();
  const links = discoverInfoLinks(topHtml, officialUrl).slice(0, MAX_INFO_URLS);

  const pages = [];
  for (const url of [officialUrl, ...links.map((l) => l.href)]) {
    try {
      pages.push({ url, text: (await fetchPage(url, { fetchFn })).text });
    } catch {
      // 取れないページは使わない（トップページだけでも生成する）
    }
  }
  if (pages.length === 0) return { skipped: `公式サイトのテキストを取得できない: ${officialUrl}`, metas };

  const generated = await call(buildNewRacePrompt(candidate, pages));
  const race = buildLightRace(generated, {
    candidate,
    officialUrl,
    infoUrls: links.map((l) => ({ url: l.href, label: l.text || '大会情報' })),
    prefectures: deps.prefectures,
    now: deps.now,
  });

  // 新たな違反を生む項目は既定値（空の race）に戻す
  const { id, ...fields } = race;
  const blank = Object.fromEntries(Object.keys(fields).map((k) => [k, Array.isArray(fields[k]) ? [] : null]));
  const { applied, held } = screenExtraction({ id, ...blank }, fields);
  const screened = { id, ...fields };
  for (const h of held) screened[h.key] = Array.isArray(fields[h.key]) ? [] : null;
  Object.assign(screened, applied);

  return { race: screened, held, issues: validateRace(screened), metas };
}

module.exports = {
  buildOfficialUrlPrompt,
  parseJsonResponse,
  buildNewRacePrompt,
  buildLightRace,
  toRaceId,
  generateRace,
  SYSTEM_PROMPT_FILE,
};
