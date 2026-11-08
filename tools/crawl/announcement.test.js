'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  buildAnnouncement, formatRaceLineJa, formatRaceLineEn, summarizeTopics, buildSlug, appendAnnouncement,
} = require('./announcement');

const prefectures = [
  { code: '31', name: '鳥取県', nameEn: 'Tottori' },
  { code: '13', name: '東京都', nameEn: 'Tokyo' },
  { code: '23', name: '愛知県', nameEn: 'Aichi' },
];

const tottori = { id: 'tottori-marathon-2027', name_ja: '鳥取マラソン', name_en: 'Tottori Marathon', date: '2027-03-14', prefecture: '31', city_ja: '鳥取市', city_en: 'Tottori City' };
const adachi = { id: 'adachi-2027', name_ja: 'あだち五色桜マラソン', name_en: 'Adachi Goshiki Sakura Marathon', date: '2027-04-11', prefecture: '13', city_ja: '足立区', city_en: 'Adachi City' };
const gamagori = { id: 'gamagori-2027', name_ja: 'がまごおりベイサイドトレイル', name_en: 'Gamagori Bayside Trail', date: '2027-01-23', prefecture: '23', city_ja: '蒲郡市', city_en: 'Gamagori City' };

describe('formatRaceLineJa / formatRaceLineEn', () => {
  test('既存のお知らせと同じ形式（大会名・M/D・都道府県＋市区町村）', () => {
    assert.equal(formatRaceLineJa(tottori, prefectures), '・鳥取マラソン（3/14・鳥取県鳥取市）');
    assert.equal(formatRaceLineEn(gamagori, prefectures), '- Gamagori Bayside Trail (Jan 23, Gamagori, Aichi)');
  });

  test('英語は市名と県名が同じなら県名を省く', () => {
    assert.equal(formatRaceLineEn(tottori, prefectures), '- Tottori Marathon (Mar 14, Tottori)');
  });

  test('開催地が欠けていれば日付だけ、英語名が無ければ日本語名を使う', () => {
    const race = { name_ja: '謎の大会', date: '2027-05-03' };
    assert.equal(formatRaceLineJa(race, prefectures), '・謎の大会（5/3）');
    assert.equal(formatRaceLineEn(race, prefectures), '- 謎の大会 (May 3)');
  });

  test('開催日も無ければ括弧ごと省く', () => {
    assert.equal(formatRaceLineJa({ name_ja: 'X' }, prefectures), '・X');
  });
});

describe('summarizeTopics', () => {
  test('diff の項目を利用者向けの話題にまとめ、多い順に最大6件', () => {
    const diffs = [
      [{ key: 'entry_periods' }, { key: 'entry_start_date' }, { key: 'aid_stations' }],
      [{ key: 'entry_periods' }, { key: 'checkpoints' }, { key: 'description_ja' }],
      [{ key: 'participation_gifts' }, { key: 'completion_gifts' }],
    ];
    const { ja, en } = summarizeTopics(diffs);
    assert.deepEqual(ja, ['エントリー期間', '参加賞・完走賞', 'エイドステーション', '関門']);
    assert.deepEqual(en, ['entry periods', 'participation and finisher gifts', 'aid stations', 'cutoffs']);
  });

  test('説明文・タグライン・モチーフは話題にしない', () => {
    assert.deepEqual(summarizeTopics([[{ key: 'description_ja' }, { key: 'tagline_en' }, { key: 'motif' }]]).ja, []);
  });
});

describe('buildSlug', () => {
  test('日付-race-data-update、重複時は連番', () => {
    assert.equal(buildSlug('2026-11-08', []), '2026-11-08-race-data-update');
    assert.equal(buildSlug('2026-11-08', ['2026-11-08-race-data-update']), '2026-11-08-race-data-update-2');
    assert.equal(buildSlug('2026-11-08', ['2026-11-08-race-data-update', '2026-11-08-race-data-update-2']), '2026-11-08-race-data-update-3');
  });
});

describe('buildAnnouncement', () => {
  const base = { date: '2026-11-08', existingSlugs: [], prefectures };

  test('更新のみ: タイトル・本文（開催日順の一覧と主な更新内容）', () => {
    const a = buildAnnouncement({
      ...base,
      added: [],
      updated: [{ race: adachi, diff: [{ key: 'entry_periods' }] }, { race: tottori, diff: [{ key: 'aid_stations' }] }],
    });
    assert.equal(a.slug, '2026-11-08-race-data-update');
    assert.equal(a.date, '2026-11-08');
    assert.equal(a.title_ja, '2大会の情報を更新しました');
    assert.equal(a.title_en, '2 Races Updated');
    assert.equal(a.body_ja, [
      '以下の2大会の情報を各公式サイトの最新内容に更新しました。',
      '・鳥取マラソン（3/14・鳥取県鳥取市）',
      '・あだち五色桜マラソン（4/11・東京都足立区）',
      '主な更新内容は、エントリー期間、エイドステーションです。',
    ].join('\n'));
    assert.match(a.body_en, /^We've updated the following 2 races with the latest information from their official websites:\n- Tottori Marathon/);
    assert.match(a.body_en, /Updates mainly cover entry periods and aid stations\.$/);
    assert.equal(a.link_href, '/races');
    assert.equal(a.link_label_ja, '大会一覧を見る');
    assert.equal(a.link_label_en, 'Browse all races');
  });

  test('新規掲載と更新の両方: 分けて書く', () => {
    const a = buildAnnouncement({ ...base, added: [gamagori], updated: [{ race: tottori, diff: [{ key: 'checkpoints' }] }] });
    assert.equal(a.title_ja, '新たに1大会を掲載・1大会の情報を更新しました');
    assert.equal(a.title_en, '1 Race Added, 1 Race Updated');
    assert.match(a.body_ja, /^以下の1大会を新たに掲載しました。\n・がまごおりベイサイドトレイル（1\/23・愛知県蒲郡市）\nあわせて、以下の1大会の情報を/);
    assert.match(a.body_en, /^We've added the following race:\n- Gamagori Bayside Trail \(Jan 23, Gamagori, Aichi\)\nWe've also updated the following race/);
  });

  test('新規掲載のみ', () => {
    const a = buildAnnouncement({ ...base, added: [gamagori, tottori], updated: [] });
    assert.equal(a.title_ja, '新たに2大会を掲載しました');
    assert.equal(a.title_en, '2 Races Added');
    assert.doesNotMatch(a.body_ja, /主な更新内容/);
  });

  test('対象がなければ null', () => {
    assert.equal(buildAnnouncement({ ...base, added: [], updated: [] }), null);
  });

  test('一覧が多い場合は20件まで書き、残りは件数で示す', () => {
    const many = Array.from({ length: 23 }, (_, i) => ({ race: { name_ja: `大会${i}`, date: `2027-01-${String(i + 1).padStart(2, '0')}` }, diff: [] }));
    const a = buildAnnouncement({ ...base, added: [], updated: many });
    assert.equal((a.body_ja.match(/^・/gm) ?? []).length, 20);
    assert.match(a.body_ja, /ほか3大会/);
    assert.match(a.body_en, /and 3 more/);
  });
});

describe('appendAnnouncement', () => {
  test('announcements.json の末尾に追記する（2スペースインデント・末尾改行）', () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'ann-')), 'announcements.json');
    fs.writeFileSync(file, JSON.stringify([{ slug: 'old' }], null, 2) + '\n');
    appendAnnouncement(file, { slug: 'new' });
    const text = fs.readFileSync(file, 'utf-8');
    assert.deepEqual(JSON.parse(text).map((a) => a.slug), ['old', 'new']);
    assert.ok(text.endsWith('}\n]\n'));
  });
});
