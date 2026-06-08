'use strict';

/**
 * tools/crawl/extractor.js
 * 変更が検出されたページから claude -p を使って大会情報を抽出する
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RACES_DIR = path.join(__dirname, '../../src/data/races');

// 抽出対象フィールドの定義
const DIFF_FIELDS = [
  { key: 'date',                label: '開催日',              type: 'scalar' },
  { key: 'entry_start_date',    label: '申込開始日（旧）',    type: 'scalar' },
  { key: 'entry_end_date',      label: '申込締切日（旧）',    type: 'scalar' },
  { key: 'entry_fee',           label: '参加費（円）',        type: 'scalar' },
  { key: 'entry_capacity',      label: '定員（人）',          type: 'scalar' },
  { key: 'course_info',         label: 'コース情報',          type: 'object' },
  { key: 'entry_periods',       label: 'エントリー期間',      type: 'array'  },
  { key: 'participation_gifts', label: '参加賞',              type: 'array'  },
  { key: 'completion_gifts',    label: '完走賞',              type: 'array'  },
  { key: 'nearby_spots',        label: '周辺スポット',        type: 'array'  },
  { key: 'motif',               label: 'モチーフ',            type: 'scalar' },
  { key: 'motif_color',         label: 'モチーフカラー',      type: 'scalar' },
  { key: 'motif_romaji',        label: 'モチーフローマ字',    type: 'scalar' },
  { key: 'tagline_ja',          label: 'タグライン（日）',    type: 'scalar' },
  { key: 'tagline_en',          label: 'タグライン（英）',    type: 'scalar' },
];

// ── 純粋関数（テスト対象） ────────────────────────────────────────

/**
 * claude -p に渡すプロンプトを構築する
 * @param {object} race - 既存の race JSON
 * @param {{ url: string, text: string }[]} pageTexts - 変更が検出されたページ
 * @returns {string}
 */
function buildExtractionPrompt(race, pageTexts) {
  const existingScalar = [
    `  開催日: ${race.date ?? '不明'}`,
    `  申込開始: ${race.entry_start_date ?? '不明'}`,
    `  申込締切: ${race.entry_end_date ?? '不明'}`,
    `  参加費: ${race.entry_fee != null ? race.entry_fee + '円' : '不明'}`,
    `  定員: ${race.entry_capacity ? race.entry_capacity + '人' : '不明'}`,
    `  motif: ${race.motif ?? '未設定'}`,
    `  motif_color: ${race.motif_color ?? '未設定'}`,
    `  motif_romaji: ${race.motif_romaji ?? '未設定'}`,
    `  tagline_ja: ${race.tagline_ja ?? '未設定'}`,
    `  tagline_en: ${race.tagline_en ?? '未設定'}`,
  ].join('\n');

  const existingComplex = [
    `  course_info: ${JSON.stringify(race.course_info ?? null)}`,
    `  entry_periods: ${JSON.stringify(race.entry_periods ?? [])}`,
    `  participation_gifts: ${JSON.stringify(race.participation_gifts ?? [])}`,
    `  completion_gifts: ${JSON.stringify(race.completion_gifts ?? [])}`,
    `  nearby_spots: ${JSON.stringify(race.nearby_spots ?? [])}`,
  ].join('\n');

  const pages = pageTexts
    .map(p => `=== ${p.url} ===\n${p.text.slice(0, 3000)}`)
    .join('\n\n');

  return `以下はマラソン大会「${race.name_ja}」(ID: ${race.id}) の公式サイトのテキストです。
変更された情報のみをJSONで返してください。変更がない項目はJSONに含めないこと。

【現在の登録値】
${existingScalar}

【現在の登録値（構造データ）】
${existingComplex}

【ページテキスト】
${pages}

【出力ルール】
- JSONのみ返すこと（説明文・コードブロック不要）
- 変更なければ {} を返す
- 不明・未確認の項目は含めない（nullにしない）
- 日付は YYYY-MM-DD 形式
- 参加費・定員は数値のみ（単位なし）
- motif_color は #RRGGBB 形式
- nearby_spots の lat/lng が不明な場合は 0 を使用
- participation_gifts と completion_gifts は別々に設定すること（完走賞・メダルは completion_gifts）

【出力スキーマ例】
{
  "date": "YYYY-MM-DD",
  "entry_start_date": "YYYY-MM-DD",
  "entry_end_date": "YYYY-MM-DD",
  "entry_fee": 数値,
  "entry_capacity": 数値,
  "course_info": {"max_elevation_m":数値,"min_elevation_m":数値,"elevation_diff_m":数値,"surface":"road|trail|mixed","certification":[],"highlights_ja":"文字列","highlights_en":"文字列","notes_ja":null,"notes_en":null},
  "entry_periods": [{"label_ja":"一般エントリー","label_en":"General Entry","start_date":"YYYY-MM-DD","end_date":"YYYY-MM-DD","entry_fee":数値またはnull,"category_id":null,"sort_order":0}],
  "participation_gifts": [{"gift_categories":["tshirt"],"description_ja":"説明","description_en":"description","image":null}],
  "completion_gifts": [{"gift_categories":["medal"],"description_ja":"説明","description_en":"description","image":null}],
  "nearby_spots": [{"type":"観光地|温泉|グルメ|宿泊","name_ja":"名称","name_en":"name","description_ja":"説明","description_en":"description","distance_from_venue":"徒歩5分","url":null,"latitude":0,"longitude":0}],
  "motif": "文字列",
  "motif_color": "#RRGGBB",
  "motif_romaji": "romaji",
  "tagline_ja": "キャッチコピー",
  "tagline_en": "tagline"
}`;
}

/**
 * claude -p の出力テキストからJSONオブジェクトを取り出す
 * @param {string} raw
 * @returns {object}
 */
function parseClaudeResponse(raw) {
  try {
    const cleaned = raw
      .replace(/```json\s*/gi, '')
      .replace(/```\s*/g, '')
      .trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) return {};
    return JSON.parse(match[0]);
  } catch {
    return {};
  }
}

/**
 * 現在のraceデータと抽出結果を比較してdiffを返す
 * @param {object} current - 現在の race JSON
 * @param {object} extracted - parseClaudeResponse の結果
 * @returns {{ key: string, label: string, current: any, extracted: any, changed: boolean }[]}
 */
function buildDiff(current, extracted) {
  return DIFF_FIELDS
    .filter(f => extracted[f.key] != null)
    .map(f => {
      const isComplex = f.type === 'object' || f.type === 'array';
      const currentVal = current[f.key] ?? (f.type === 'array' ? [] : null);
      const currentStr = isComplex
        ? JSON.stringify(currentVal)
        : String(current[f.key] ?? '');
      const extractedStr = isComplex
        ? JSON.stringify(extracted[f.key])
        : String(extracted[f.key] ?? '');
      return {
        key: f.key,
        label: f.label,
        current: currentVal,
        extracted: extracted[f.key],
        changed: currentStr !== extractedStr,
      };
    });
}

// ── 副作用関数 ────────────────────────────────────────────────────

/**
 * claude -p でプロンプトを実行して結果テキストを返す
 * @param {string} prompt
 * @returns {string}
 */
function callClaudeP(prompt) {
  const result = spawnSync('claude', ['-p', prompt], {
    encoding: 'utf-8',
    timeout: 60000,
    maxBuffer: 4 * 1024 * 1024,
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`claude -p 失敗 (exit ${result.status}): ${result.stderr?.trim()}`);
  }
  return result.stdout.trim();
}

/**
 * 変更が検出されたページからレース情報を抽出する
 * @param {object} race
 * @param {{ url: string, text: string }[]} pageTexts
 * @returns {{ extracted: object, diff: object[] }}
 */
async function extractFromPages(race, pageTexts) {
  const prompt = buildExtractionPrompt(race, pageTexts);
  const raw = callClaudeP(prompt);
  const extracted = parseClaudeResponse(raw);
  const diff = buildDiff(race, extracted);
  return { extracted, diff };
}

/**
 * diffを race JSON に適用して保存する
 * @param {object} race
 * @param {object} extracted
 */
const ALLOWED_KEYS = new Set(DIFF_FIELDS.map(f => f.key));

function applyAndSave(race, extracted) {
  const filePath = path.join(RACES_DIR, `${race.id}.json`);
  const updated = {
    ...race,
    ...Object.fromEntries(
      Object.entries(extracted).filter(([k, v]) => v != null && ALLOWED_KEYS.has(k))
    ),
    updated_at: new Date().toISOString(),
    _metadata: {
      ...race._metadata,
      last_verified: new Date().toISOString().slice(0, 10),
      data_accuracy_notes: [
        ...(race._metadata?.data_accuracy_notes ?? []),
        `${new Date().toISOString().slice(0, 10)}: 自動クロールで更新`,
      ],
    },
  };
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2) + '\n', 'utf-8');
  return updated;
}

// ── エクスポート ──────────────────────────────────────────────────

module.exports = {
  buildExtractionPrompt,
  parseClaudeResponse,
  buildDiff,
  extractFromPages,
  applyAndSave,
};
