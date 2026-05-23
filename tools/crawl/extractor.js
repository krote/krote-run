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
  { key: 'date',             label: '開催日' },
  { key: 'entry_start_date', label: '申込開始日' },
  { key: 'entry_end_date',   label: '申込締切日' },
  { key: 'entry_fee',        label: '参加費（円）' },
  { key: 'entry_capacity',   label: '定員（人）' },
];

// ── 純粋関数（テスト対象） ────────────────────────────────────────

/**
 * claude -p に渡すプロンプトを構築する
 * @param {object} race - 既存の race JSON
 * @param {{ url: string, text: string }[]} pageTexts - 変更が検出されたページ
 * @returns {string}
 */
function buildExtractionPrompt(race, pageTexts) {
  const existing = [
    `  開催日: ${race.date ?? '不明'}`,
    `  申込開始: ${race.entry_start_date ?? '不明'}`,
    `  申込締切: ${race.entry_end_date ?? '不明'}`,
    `  参加費: ${race.entry_fee != null ? race.entry_fee + '円' : '不明'}`,
    `  定員: ${race.entry_capacity ? race.entry_capacity + '人' : '不明'}`,
  ].join('\n');

  const pages = pageTexts
    .map(p => `=== ${p.url} ===\n${p.text.slice(0, 3000)}`)
    .join('\n\n');

  return `以下はマラソン大会「${race.name_ja}」(ID: ${race.id}) の公式サイトのテキストです。
変更された情報のみをJSONで返してください。変更がない項目はJSONに含めないこと。

【現在の登録値】
${existing}

【ページテキスト】
${pages}

【出力ルール】
- JSONのみ返すこと（説明文・コードブロック不要）
- 変更なければ {} を返す
- 不明な項目は含めない（nullにしない）
- 日付は YYYY-MM-DD 形式
- 参加費・定員は数値のみ（単位なし）

{"date":"YYYY-MM-DD","entry_start_date":"YYYY-MM-DD","entry_end_date":"YYYY-MM-DD","entry_fee":数値,"entry_capacity":数値}`;
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
    .map(f => ({
      key: f.key,
      label: f.label,
      current: current[f.key] ?? null,
      extracted: extracted[f.key],
      changed: String(current[f.key] ?? '') !== String(extracted[f.key] ?? ''),
    }));
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
function applyAndSave(race, extracted) {
  const filePath = path.join(RACES_DIR, `${race.id}.json`);
  const updated = {
    ...race,
    ...Object.fromEntries(
      Object.entries(extracted).filter(([, v]) => v != null)
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
