'use strict';

/**
 * tools/crawl/x-post.js
 * お知らせエントリ（announcement.js）から X（Twitter）投稿文を1件生成する（#202）。
 *
 * 投稿は手動で行う。ここでは PR 本文に載せる文章を作るだけ。
 * LLM で要約し、文字数（X の重み付きカウント）とリンクの有無をコードで検証する。
 * 条件を満たさなければ1回だけ再生成し、それでもだめならテンプレート文にする。
 */

const path = require('path');

const NEWS_URL = 'https://hashiru.run/ja/news';
const HASHTAGS = ['#マラソン', '#ランニング'];
const X_MAX_LENGTH = 280;
/** X は URL を長さに関係なく t.co の23文字として数える */
const X_URL_LENGTH = 23;
const MAX_ATTEMPTS = 2;
const SYSTEM_PROMPT_FILE = path.join(__dirname, 'x-post-system-prompt.txt');

/** 重み1で数える文字の範囲（twitter-text v3 の設定。それ以外の文字＝日本語等は2） */
const LIGHT_RANGES = [[0x0000, 0x10ff], [0x2000, 0x200d], [0x2010, 0x201f], [0x2032, 0x2037]];

/**
 * X の重み付き文字数を数える（上限280）。半角1・全角2・URL は23
 * @param {string} text
 */
function countXLength(text) {
  const urlPattern = /https?:\/\/\S+/g;
  const urls = text.match(urlPattern) ?? [];
  const rest = text.normalize('NFC').replace(urlPattern, '');
  let length = urls.length * X_URL_LENGTH;
  for (const ch of rest) {
    const cp = ch.codePointAt(0);
    length += LIGHT_RANGES.some(([lo, hi]) => cp >= lo && cp <= hi) ? 1 : 2;
  }
  return length;
}

/**
 * LLM に渡す指示
 * @param {{ title_ja: string, body_ja: string }} announcement
 * @param {{ previousLength?: number, missingLink?: boolean }} [retry] - 再生成時の前回の問題
 */
function buildXPostPrompt(announcement, retry = {}) {
  const lines = [
    '次のお知らせを、X（Twitter）のまとめ投稿1件に要約してください。',
    '',
    '条件:',
    `- 文字数は X の数え方（全角2・半角1・URL は23）で${X_MAX_LENGTH}以内。全角なら本文はおよそ100字までが目安`,
    '- 新規掲載・更新した大会数と、代表的な大会名を2〜3件入れる（全大会を列挙しない）',
    '- 気になる大会のエントリー期間などを確認するよう促す一文を入れてよい',
    `- 末尾にリンク ${NEWS_URL} を1行で入れ、その次の行にハッシュタグ ${HASHTAGS.join(' ')} を入れる`,
    '- 絵文字は使わない。お知らせに書かれていない事実を足さない',
  ];
  if (retry.previousLength) {
    lines.push(`- 前回の文は${retry.previousLength}文字で上限を超えた。大会名を減らすなどして短くする`);
  }
  if (retry.missingLink) {
    lines.push(`- 前回の文にはリンク ${NEWS_URL} が無かった。必ず入れる`);
  }
  lines.push('', '【お知らせ】', announcement.title_ja, announcement.body_ja);
  return lines.join('\n');
}

/** お知らせ本文の「・大会名（…）」行から大会名を取り出す */
function extractRaceNames(body) {
  return body
    .split('\n')
    .filter((l) => l.startsWith('・'))
    .map((l) => l.slice(1).replace(/（.*$/, '').trim())
    .filter(Boolean);
}

/**
 * LLM が使えない・条件を満たさない場合のテンプレート文。
 * 280以内に収まるまで載せる大会名を減らす
 */
function buildTemplatePost(announcement) {
  const names = extractRaceNames(announcement.body_ja);
  const footer = `${NEWS_URL}\n${HASHTAGS.join(' ')}`;
  for (let n = Math.min(names.length, 5); n >= 0; n--) {
    const rest = names.length - n;
    const list = n > 0 ? `${names.slice(0, n).join('、')}${rest > 0 ? `ほか${rest}大会` : ''}` : '';
    const text = [announcement.title_ja, list, footer].filter(Boolean).join('\n\n');
    if (countXLength(text) <= X_MAX_LENGTH) return text;
  }
  return [announcement.title_ja, footer].join('\n\n');
}

/** LLM 出力の前後の空白・コードフェンスを取り除く */
function cleanOutput(text) {
  return String(text ?? '')
    .trim()
    .replace(/^```[a-z]*\n?/i, '')
    .replace(/\n?```$/, '')
    .trim();
}

/**
 * X 投稿文を生成する
 * @param {{ title_ja: string, body_ja: string }} announcement
 * @param {{ callFn?: Function, model?: string, useCli?: boolean }} [opts]
 *   callFn: extractor.js の callClaudeP 互換（テストで差し替える）
 * @returns {Promise<{ text: string, source: 'llm'|'template', length: number, metas: object[], error?: string }>}
 */
async function generateXPost(announcement, opts = {}) {
  const callFn = opts.callFn ?? require('./extractor').callClaudeP;
  const metas = [];
  let retry = {};

  try {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const { text: raw, meta } = await callFn(buildXPostPrompt(announcement, retry), {
        model: opts.model,
        useCli: opts.useCli,
        systemPromptFile: SYSTEM_PROMPT_FILE,
      });
      metas.push(meta);
      const text = cleanOutput(raw);
      const length = countXLength(text);
      const missingLink = !text.includes(NEWS_URL);
      if (!missingLink && length <= X_MAX_LENGTH) {
        return { text, source: 'llm', length, metas };
      }
      retry = { previousLength: length > X_MAX_LENGTH ? length : undefined, missingLink };
    }
  } catch (err) {
    const text = buildTemplatePost(announcement);
    return { text, source: 'template', length: countXLength(text), metas, error: err.message };
  }

  const text = buildTemplatePost(announcement);
  return { text, source: 'template', length: countXLength(text), metas };
}

module.exports = {
  countXLength,
  buildXPostPrompt,
  buildTemplatePost,
  generateXPost,
  NEWS_URL,
  HASHTAGS,
  X_MAX_LENGTH,
  SYSTEM_PROMPT_FILE,
};
