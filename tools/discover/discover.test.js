'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { parseJaDate, parseEventList, listPageUrl, fetchEventList } = require('./sportsentry');
const {
  normalizeRaceName, buildExistingIndex, findDuplicate, filterEvents, toCandidate, mergeSelections, renderCandidatesMarkdown,
  DEFAULT_EXCLUDE_KEYWORDS,
} = require('./candidates');
const {
  buildOfficialUrlPrompt, parseJsonResponse, buildNewRacePrompt, buildLightRace, toRaceId,
} = require('./generate');

const FIXTURE = fs.readFileSync(path.join(__dirname, 'fixtures', 'sportsentry-list.html'), 'utf-8');
const prefectures = [
  { code: '28', name: '兵庫県', nameEn: 'Hyogo' },
  { code: '47', name: '沖縄県', nameEn: 'Okinawa' },
  { code: '13', name: '東京都', nameEn: 'Tokyo' },
];

// ── スポーツエントリー一覧の解析 ─────────────────────────────────

describe('parseJaDate', () => {
  test('「2026年12月13日（日）」を YYYY-MM-DD にする', () => {
    assert.equal(parseJaDate('2026年12月13日（日）'), '2026-12-13');
    assert.equal(parseJaDate('2027年2月1日'), '2027-02-01');
  });

  test('日付でなければ null', () => {
    assert.equal(parseJaDate('未定'), null);
  });
});

describe('parseEventList', () => {
  const events = parseEventList(FIXTURE);

  test('一覧の大会を全て読む', () => {
    assert.equal(events.length, 2);
  });

  test('大会名・開催日・都道府県・会場・URL・タグを取り出す', () => {
    assert.deepEqual(events[0], {
      source: 'sportsentry',
      source_id: '107433',
      source_url: 'https://www.sportsentry.ne.jp/event/t/107433',
      name: '甲子園エンジョイラン～2026～',
      date: '2026-12-13',
      prefecture: '兵庫県',
      place: '西宮市甲子園町1-82 阪神甲子園球場',
      entry_start: '2026-10-26',
      entry_end: '2026-11-30',
      tags: ['5Km未満', '周回コース'],
    });
  });

  test('エントリー期間が無い大会は null', () => {
    assert.equal(events[1].entry_start, null);
    assert.equal(events[1].entry_end, null);
    assert.equal(events[1].date, '2027-02-21');
  });
});

describe('listPageUrl', () => {
  test('ランニングカテゴリの N ページ目', () => {
    assert.equal(listPageUrl(1), 'https://www.sportsentry.ne.jp/events/running');
    assert.equal(listPageUrl(3), 'https://www.sportsentry.ne.jp/events/running?page=3');
  });
});

describe('fetchEventList', () => {
  test('大会が無いページで止まり、ページ間で待つ', async () => {
    const pages = { 1: FIXTURE, 2: FIXTURE, 3: '<html></html>' };
    const fetched = [];
    const waits = [];
    const fetchFn = async (url) => {
      fetched.push(url);
      const page = Number(new URL(url).searchParams.get('page') ?? 1);
      return { ok: true, status: 200, text: async () => pages[page] ?? '' };
    };
    const events = await fetchEventList({ fetchFn, sleep: async (ms) => waits.push(ms), delayMs: 2000, log: () => {} });
    assert.equal(fetched.length, 3);
    assert.equal(events.length, 4);
    assert.deepEqual(waits, [2000, 2000]);
  });

  test('maxPages で打ち切る', async () => {
    const fetchFn = async () => ({ ok: true, status: 200, text: async () => FIXTURE });
    const events = await fetchEventList({ fetchFn, sleep: async () => {}, maxPages: 2, log: () => {} });
    assert.equal(events.length, 4);
  });

  test('HTTP エラーは例外', async () => {
    const fetchFn = async () => ({ ok: false, status: 503, text: async () => '' });
    await assert.rejects(fetchEventList({ fetchFn, sleep: async () => {}, log: () => {} }), /HTTP 503/);
  });
});

// ── 候補の絞り込みと重複判定 ─────────────────────────────────────

describe('normalizeRaceName', () => {
  test('第N回・西暦・大会・空白・記号・サブタイトルを除く', () => {
    assert.equal(normalizeRaceName('第31回 2027おきなわマラソン'), 'おきなわマラソン');
    assert.equal(normalizeRaceName('甲子園エンジョイラン～2026～'), '甲子園エンジョイラン');
    assert.equal(normalizeRaceName('第38回 テレ玉親子ふれあいマラソン大会'), 'テレ玉親子ふれあいマラソン');
    assert.equal(normalizeRaceName('ＡＴＨＥＮＳ　Half'), 'athenshalf');
  });

  test('【一般エントリー】等の申込区分の注記を除く', () => {
    assert.equal(normalizeRaceName('第24回 新宿シティハーフマラソン・区民健康マラソン【一般エントリー】'), '新宿シティハーフマラソン区民健康マラソン');
  });

  test('「〜」以降のサブタイトルを除く', () => {
    assert.equal(normalizeRaceName('みさとシティハーフマラソン～かいちゃん＆つぶちゃんマラソン～'), 'みさとシティハーフマラソン');
  });
});

describe('findDuplicate', () => {
  const races = [
    { id: 'okinawa-marathon-2026', name_ja: 'おきなわマラソン', date: '2026-02-15', prefecture: '47' },
    { id: 'tokyo-x-2027', name_ja: '東京なんとかラン', date: '2027-03-01', prefecture: '13' },
  ];
  const index = buildExistingIndex(races, prefectures);

  test('大会名を正規化して一致すれば重複（年度違いも同じシリーズとみなす）', () => {
    assert.equal(findDuplicate({ name: '第31回 2027おきなわマラソン', date: '2027-02-21', prefecture: '沖縄県' }, index), 'okinawa-marathon-2026');
  });

  test('名前が違っても開催日と都道府県が一致すれば重複', () => {
    assert.equal(findDuplicate({ name: 'TOKYO RUN', date: '2027-03-01', prefecture: '東京都' }, index), 'tokyo-x-2027');
  });

  test('どちらでもなければ null', () => {
    assert.equal(findDuplicate({ name: '甲子園エンジョイラン', date: '2026-12-13', prefecture: '兵庫県' }, index), null);
  });
});

describe('filterEvents', () => {
  const ev = (over) => ({ name: 'X マラソン', date: '2027-01-10', prefecture: '兵庫県', tags: [], ...over });
  const from = '2026-11-08';
  const to = '2027-11-08';

  test('期間外（開催済み・12か月より先）と日付不明は除く', () => {
    const r = filterEvents([ev({ date: '2026-11-01' }), ev({ date: '2027-12-01' }), ev({ date: null }), ev({})], { from, to });
    assert.equal(r.length, 1);
  });

  test('除外キーワード（オンライン・リレー・耐久・練習会・記録会）を含む大会は除く', () => {
    assert.deepEqual(DEFAULT_EXCLUDE_KEYWORDS, ['オンライン', 'リレー', '耐久', '練習会', '記録会']);
    const r = filterEvents([ev({ name: '5時間耐久リレーマラソン' }), ev({ name: 'オンラインラン' }), ev({})], { from, to });
    assert.equal(r.length, 1);
  });

  test('excludeKeywords: [] なら除外しない', () => {
    const r = filterEvents([ev({ name: '5時間耐久リレーマラソン' })], { from, to, excludeKeywords: [] });
    assert.equal(r.length, 1);
  });

  test('申込区分ごとに分かれて掲載された同じ大会（名前・開催日が同じ）は1件にする', () => {
    const r = filterEvents([
      ev({ source_id: '1', name: '新宿シティハーフ【一般エントリー】' }),
      ev({ source_id: '2', name: '新宿シティハーフ【区民先行エントリー】' }),
    ], { from, to });
    assert.equal(r.length, 1);
  });

  test('同じ大会が複数ページに出ても1件にする', () => {
    const r = filterEvents([ev({ source_id: '1' }), ev({ source_id: '1' })], { from, to });
    assert.equal(r.length, 1);
  });
});

describe('toCandidate / mergeSelections', () => {
  const event = parseEventList(FIXTURE)[0];

  test('候補には未選択の selected と出典 ID を付ける', () => {
    const c = toCandidate(event);
    assert.equal(c.id, 'sportsentry-107433');
    assert.equal(c.selected, false);
    assert.equal(c.name, '甲子園エンジョイラン～2026～');
  });

  test('作り直しても前回の selected・メモを引き継ぐ', () => {
    const fresh = [toCandidate(event)];
    const previous = [{ ...toCandidate(event), selected: true, note: '要確認' }];
    const merged = mergeSelections(fresh, previous);
    assert.equal(merged[0].selected, true);
    assert.equal(merged[0].note, '要確認');
  });
});

describe('renderCandidatesMarkdown', () => {
  test('開催日・大会名・都道府県・距離タグ・エントリー期間の表にする', () => {
    const md = renderCandidatesMarkdown([toCandidate(parseEventList(FIXTURE)[0])], { generatedAt: '2026-11-08', duplicates: 3 });
    assert.match(md, /\| 2026-12-13 \| \[甲子園エンジョイラン～2026～\]\(https:\/\/www\.sportsentry\.ne\.jp\/event\/t\/107433\) \| 兵庫県 \| 5Km未満/);
    assert.match(md, /2026-10-26〜2026-11-30/);
    assert.match(md, /掲載済みと判定して除外: 3件/);
  });
});

// ── 選択した大会の JSON 生成 ─────────────────────────────────────

describe('buildOfficialUrlPrompt / parseJsonResponse', () => {
  const candidate = toCandidate(parseEventList(FIXTURE)[0]);

  test('大会名・開催日・開催地を渡し、情報サイトではなく公式サイトを求める', () => {
    const p = buildOfficialUrlPrompt(candidate);
    assert.ok(p.includes('甲子園エンジョイラン～2026～'));
    assert.ok(p.includes('2026-12-13'));
    assert.ok(p.includes('兵庫県'));
    assert.match(p, /RUNNET/);
    assert.match(p, /null/);
  });

  test('最新回のページが未公開でも大会（シリーズ）の公式サイトを答えさせる', () => {
    assert.match(buildOfficialUrlPrompt(candidate), /最新回のページがまだ無くても/);
  });

  test('コードフェンス付きの JSON も読む', () => {
    assert.deepEqual(parseJsonResponse('```json\n{"official_url": "https://a.jp/"}\n```\nSources: ...'), { official_url: 'https://a.jp/' });
  });

  test('JSON が無ければ例外', () => {
    assert.throws(() => parseJsonResponse('見つかりませんでした'), /JSON/);
  });
});

describe('buildNewRacePrompt', () => {
  test('候補の情報とページテキストを含め、必要な項目を JSON で求める', () => {
    const candidate = toCandidate(parseEventList(FIXTURE)[0]);
    const p = buildNewRacePrompt(candidate, [{ url: 'https://a.jp/', text: '参加費 3000円' }]);
    assert.ok(p.includes('参加費 3000円'));
    assert.ok(p.includes('甲子園エンジョイラン'));
    for (const key of ['id_slug', 'name_en', 'categories', 'entry_periods', 'description_ja', 'reception_type']) {
      assert.ok(p.includes(key), key);
    }
    // 公式サイトが前回大会の内容のままの場合に、古い日程・参加費を新しい回に流用させない
    assert.match(p, /別の回/);
  });
});

describe('toRaceId', () => {
  test('英小文字・数字・ハイフンにし、開催年を付ける', () => {
    assert.equal(toRaceId('Koshien Enjoy_Run!', '2026-12-13'), 'koshien-enjoy-run-2026');
    assert.equal(toRaceId('--okinawa--marathon-2027', '2027-02-21'), 'okinawa-marathon-2027');
  });
});

describe('buildLightRace', () => {
  const candidate = toCandidate(parseEventList(FIXTURE)[0]);
  const generated = {
    id_slug: 'koshien-enjoy-run',
    name_ja: '甲子園エンジョイラン', name_en: 'Koshien Enjoy Run',
    full_name_ja: '甲子園エンジョイラン～2026～', full_name_en: 'Koshien Enjoy Run 2026', edition: null,
    date: '2026-12-13', city_ja: '西宮市', city_en: 'Nishinomiya City',
    description_ja: '阪神甲子園球場を走る', description_en: 'Run in Koshien Stadium',
    entry_fee: 3000, entry_fee_by_category: false, entry_capacity: 1000,
    entry_periods: [{ label_ja: '', label_en: '', start_date: null, end_date: '2026-11-30', entry_fee: 3000 }],
    reception_type: 'race_day', reception_note_ja: null, reception_note_en: null,
    venue_name_ja: '阪神甲子園球場', venue_name_en: 'Hanshin Koshien Stadium', venue_address: '兵庫県西宮市甲子園町1-82',
    surface: 'road',
    categories: [{ distance_type: 'other', distance_km: 3, time_limit_minutes: 30, start_time: '10:00', capacity: 1000, entry_fee: 3000, name_ja: '3km', name_en: '3km', description_ja: null, description_en: null }],
    tags: ['周回コース'],
    notes: ['定員は公式サイトの記載による'],
  };
  const now = new Date('2026-11-08T03:00:00Z');
  const race = buildLightRace(generated, {
    candidate, officialUrl: 'https://koshien.example/', infoUrls: [{ url: 'https://koshien.example/entry', label: 'エントリー' }], prefectures, now,
  });

  test('ID・都道府県コード・公式URL・info_urls を設定する', () => {
    assert.equal(race.id, 'koshien-enjoy-run-2026');
    assert.equal(race.prefecture, '28');
    assert.equal(race.official_url, 'https://koshien.example/');
    assert.deepEqual(race.info_urls, [{ url: 'https://koshien.example/entry', label: 'エントリー' }]);
  });

  test('エントリー区分の空ラベル・null の開始日をデータ品質ルールに沿って補う', () => {
    assert.equal(race.entry_periods[0].label_ja, '一般エントリー');
    assert.equal(race.entry_periods[0].label_en, 'General Entry');
    assert.equal(race.entry_periods[0].start_date, '2026-10-26');
    assert.equal(race.entry_start_date, '2026-10-26');
    assert.equal(race.entry_end_date, '2026-11-30');
  });

  test('既存の race JSON と同じ項目をすべて持つ（未取得は null / 空配列）', () => {
    for (const key of ['course_gpx_file', 'aid_stations', 'checkpoints', 'access_points', 'nearby_spots', 'weather_history',
      'participation_gifts', 'completion_gifts', 'gallery', 'voices', 'time_buckets', 'course_highlights', 'motif', 'tagline_ja',
      'hero_image_url', 'start_lat', 'start_lng', 'result']) {
      assert.ok(key in race, key);
    }
    assert.equal(race.course_info.surface, 'road');
    assert.deepEqual(race.course_info.certification, []);
  });

  test('_metadata に出典・注記・detail_level: light を記録する', () => {
    assert.equal(race._metadata.detail_level, 'light');
    assert.equal(race._metadata.last_verified, '2026-11-08');
    assert.match(race._metadata.data_source, /https:\/\/koshien\.example\//);
    assert.ok(race._metadata.data_accuracy_notes.some((n) => /スポーツエントリー/.test(n)));
    assert.ok(race._metadata.data_accuracy_notes.includes('定員は公式サイトの記載による'));
  });

  test('categories の waves・entry_fee_u25 を補い、sort_order を振る', () => {
    assert.equal(race.categories[0].waves, null);
    assert.equal(race.categories[0].entry_fee_u25, null);
    assert.equal(race.entry_periods[0].sort_order, 0);
  });

  test('開催日は候補（大会情報サイトの最新回）を正とし、公式サイトの日付と違えば注記する', () => {
    const r = buildLightRace({ ...generated, date: '2025-12-14' }, { candidate, officialUrl: 'https://a/', infoUrls: [], prefectures, now });
    assert.equal(r.date, '2026-12-13');
    assert.equal(r.id, 'koshien-enjoy-run-2026');
    assert.ok(r._metadata.data_accuracy_notes.some((n) => /2025-12-14/.test(n)));
  });

  test('不正な reception_type・surface は既定値にする', () => {
    const r = buildLightRace({ ...generated, reception_type: 'xxx', surface: 'sand' }, { candidate, officialUrl: 'https://a/', infoUrls: [], prefectures, now });
    assert.equal(r.reception_type, null);
    assert.equal(r.course_info.surface, 'road');
  });
});

describe('computeRange / markGenerated（#204）', () => {
  const { computeRange, markGenerated } = require('./candidates');

  test('実行日（JST）から12か月先までを対象にする', () => {
    assert.deepEqual(computeRange(new Date('2026-11-07T20:00:00Z')), { from: '2026-11-08', to: '2027-11-08' });
  });

  test('生成した候補は選択を外して race ID を記録し、スキップした候補は理由を残す', () => {
    const candidates = [{ id: 'a', selected: true }, { id: 'b', selected: true }, { id: 'c', selected: false }];
    const r = markGenerated(candidates, { a: { race_id: 'a-2027' }, b: { reason: '公式サイトが見つからない' } });
    assert.deepEqual(r, [
      { id: 'a', selected: false, generated_race_id: 'a-2027' },
      { id: 'b', selected: true, skipped_reason: '公式サイトが見つからない' },
      { id: 'c', selected: false },
    ]);
  });
});
