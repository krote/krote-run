'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const {
  countXLength, buildXPostPrompt, buildTemplatePost, generateXPost, NEWS_URL, HASHTAGS, X_MAX_LENGTH,
} = require('./x-post');

const announcement = {
  title_ja: '新たに1大会を掲載・2大会の情報を更新しました',
  body_ja: [
    '以下の1大会を新たに掲載しました。',
    '・がまごおりベイサイドトレイル（1/23・愛知県蒲郡市）',
    'あわせて、以下の2大会の情報を各公式サイトの最新内容に更新しました。',
    '・高知龍馬マラソン（2/21・高知県高知市）',
    '・鳥取マラソン（3/14・鳥取県鳥取市）',
    '主な更新内容は、エントリー期間、エイドステーションです。',
  ].join('\n'),
};

describe('countXLength', () => {
  test('半角は1、全角（日本語）は2で数える', () => {
    assert.equal(countXLength('abc'), 3);
    assert.equal(countXLength('あいう'), 6);
    assert.equal(countXLength('a あ'), 4);
  });

  test('URL は長さに関係なく23で数える', () => {
    assert.equal(countXLength('https://hashiru.run/ja/news'), 23);
    assert.equal(countXLength('見て https://example.com/very/long/path?x=1'), 4 + 1 + 23);
  });

  test('改行は1で数える', () => {
    assert.equal(countXLength('a\nb'), 3);
  });

  test('上限は280', () => {
    assert.equal(X_MAX_LENGTH, 280);
  });
});

describe('buildXPostPrompt', () => {
  test('お知らせ本文・リンク・ハッシュタグ・文字数の条件を含める', () => {
    const p = buildXPostPrompt(announcement);
    assert.ok(p.includes('高知龍馬マラソン'));
    assert.ok(p.includes(NEWS_URL));
    for (const tag of HASHTAGS) assert.ok(p.includes(tag));
    assert.match(p, /280/);
  });

  test('再生成時は前回の超過を伝える', () => {
    const p = buildXPostPrompt(announcement, { previousLength: 312 });
    assert.match(p, /312/);
  });
});

describe('buildTemplatePost', () => {
  test('タイトル・大会名・リンク・ハッシュタグを含み、280以内に収める', () => {
    const text = buildTemplatePost(announcement);
    assert.ok(text.startsWith('新たに1大会を掲載・2大会の情報を更新しました'));
    assert.ok(text.includes('がまごおりベイサイドトレイル'));
    assert.ok(text.includes(NEWS_URL));
    assert.ok(text.endsWith(HASHTAGS.join(' ')));
    assert.ok(countXLength(text) <= X_MAX_LENGTH);
  });

  test('大会が多くても収まるまで大会名を減らす', () => {
    const many = { title_ja: '50大会の情報を更新しました', body_ja: Array.from({ length: 50 }, (_, i) => `・とても長い名前の第${i}回記念市民マラソン大会（1/1・北海道札幌市）`).join('\n') };
    const text = buildTemplatePost(many);
    assert.ok(countXLength(text) <= X_MAX_LENGTH);
    assert.match(text, /ほか\d+大会/);
  });
});

describe('generateXPost', () => {
  const meta = { model: 'm', inputTokens: 1, outputTokens: 1, cacheCreationTokens: 0, cacheReadTokens: 0, costUsd: 0 };
  const ok = `新しく1大会を掲載し、高知龍馬マラソンなど2大会を更新しました。\n${NEWS_URL}\n${HASHTAGS.join(' ')}`;

  test('LLM の文が条件を満たせばそのまま使う', async () => {
    const calls = [];
    const callFn = async (prompt, opts) => { calls.push(opts); return { text: ok, meta }; };
    const r = await generateXPost(announcement, { callFn, model: 'claude-sonnet-5-5' });
    assert.equal(r.text, ok);
    assert.equal(r.source, 'llm');
    assert.equal(calls.length, 1);
    assert.equal(calls[0].model, 'claude-sonnet-5-5');
    assert.ok(calls[0].systemPromptFile.endsWith('x-post-system-prompt.txt'));
    assert.deepEqual(r.metas, [meta]);
  });

  test('前後の空白・コードフェンスは取り除く', async () => {
    const r = await generateXPost(announcement, { callFn: async () => ({ text: `\`\`\`\n${ok}\n\`\`\`\n`, meta }) });
    assert.equal(r.text, ok);
  });

  test('280を超えたら1回だけ再生成する', async () => {
    const long = `${'あ'.repeat(200)}\n${NEWS_URL}`;
    const prompts = [];
    const texts = [long, ok];
    const r = await generateXPost(announcement, { callFn: async (p) => { prompts.push(p); return { text: texts.shift(), meta }; } });
    assert.equal(r.text, ok);
    assert.equal(prompts.length, 2);
    assert.match(prompts[1], /前回の文は\d+文字/);
  });

  test('再生成しても条件を満たさなければテンプレート文にする', async () => {
    const long = `${'あ'.repeat(200)}\n${NEWS_URL}`;
    const r = await generateXPost(announcement, { callFn: async () => ({ text: long, meta }) });
    assert.equal(r.source, 'template');
    assert.equal(r.text, buildTemplatePost(announcement));
    assert.equal(r.metas.length, 2);
  });

  test('リンクが無い文は条件を満たさないとみなす', async () => {
    const texts = ['リンクなしの文 #マラソン', ok];
    const r = await generateXPost(announcement, { callFn: async () => ({ text: texts.shift(), meta }) });
    assert.equal(r.text, ok);
  });

  test('LLM 呼び出しが失敗したらテンプレート文にする（PR 作成は止めない）', async () => {
    const r = await generateXPost(announcement, { callFn: async () => { throw new Error('boom'); } });
    assert.equal(r.source, 'template');
    assert.match(r.error, /boom/);
  });
});
