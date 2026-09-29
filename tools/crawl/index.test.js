'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { computeHash, hasChanged, buildUrlsToCheck, getLatestFilesPerSeries } = require('./index');

// ── computeHash ───────────────────────────────────────────────────

describe('computeHash', () => {
  test('同じテキストは同じハッシュを返す', () => {
    assert.equal(computeHash('hello world'), computeHash('hello world'));
  });

  test('異なるテキストは異なるハッシュを返す', () => {
    assert.notEqual(computeHash('hello'), computeHash('hello!'));
  });

  test('SHA-256形式（64文字の16進数）を返す', () => {
    assert.match(computeHash('test'), /^[0-9a-f]{64}$/);
  });

  test('空文字でもクラッシュしない', () => {
    assert.doesNotThrow(() => computeHash(''));
  });
});

// ── hasChanged ────────────────────────────────────────────────────

describe('hasChanged', () => {
  test('未登録URLはtrueを返す（新規）', () => {
    assert.equal(hasChanged('https://example.com/', 'newhash', {}), true);
  });

  test('ハッシュが一致する場合はfalseを返す', () => {
    const checksums = { 'https://example.com/': { hash: 'abc123' } };
    assert.equal(hasChanged('https://example.com/', 'abc123', checksums), false);
  });

  test('ハッシュが異なる場合はtrueを返す', () => {
    const checksums = { 'https://example.com/': { hash: 'abc123' } };
    assert.equal(hasChanged('https://example.com/', 'xyz789', checksums), true);
  });

  test('別URLのチェックサムは影響しない', () => {
    const checksums = { 'https://other.com/': { hash: 'abc123' } };
    assert.equal(hasChanged('https://example.com/', 'abc123', checksums), true);
  });
});

// ── buildUrlsToCheck ─────────────────────────────────────────────

describe('buildUrlsToCheck', () => {
  test('info_urls が登録済みならそのURLを返す', () => {
    const race = {
      id: 'test-2026',
      official_url: 'https://example.com/',
      info_urls: [
        { url: 'https://example.com/req/', label: '大会要項' },
        { url: 'https://example.com/entry/', label: 'エントリー' },
      ],
    };
    assert.deepEqual(buildUrlsToCheck(race), [
      'https://example.com/req/',
      'https://example.com/entry/',
    ]);
  });

  test('info_urls が空配列なら official_url を返す', () => {
    const race = { id: 'test-2026', official_url: 'https://example.com/', info_urls: [] };
    assert.deepEqual(buildUrlsToCheck(race), ['https://example.com/']);
  });

  test('info_urls がなければ official_url を返す', () => {
    const race = { id: 'test-2026', official_url: 'https://example.com/' };
    assert.deepEqual(buildUrlsToCheck(race), ['https://example.com/']);
  });

  test('info_urls も official_url もなければ空配列を返す', () => {
    const race = { id: 'test-2026', official_url: null };
    assert.deepEqual(buildUrlsToCheck(race), []);
  });

  test('official_url が空文字なら空配列を返す', () => {
    const race = { id: 'test-2026', official_url: '' };
    assert.deepEqual(buildUrlsToCheck(race), []);
  });
});

// ── isMissingCriticalFields ────────────────────────────────────────

const { isMissingCriticalFields } = require('./index');

describe('isMissingCriticalFields', () => {
  test('venue_name_ja も venue_address もなければ true', () => {
    const race = { id: 'test-2026', venue_name_ja: null, venue_address: null };
    assert.equal(isMissingCriticalFields(race), true);
  });

  test('venue_name_ja があれば false', () => {
    const race = { id: 'test-2026', venue_name_ja: '会場名', venue_address: null };
    assert.equal(isMissingCriticalFields(race), false);
  });

  test('venue_address があれば false', () => {
    const race = { id: 'test-2026', venue_name_ja: null, venue_address: '東京都千代田区' };
    assert.equal(isMissingCriticalFields(race), false);
  });

  test('両方空文字でも true（未設定扱い）', () => {
    const race = { id: 'test-2026', venue_name_ja: '', venue_address: '' };
    assert.equal(isMissingCriticalFields(race), true);
  });

  test('両方フィールド自体が存在しない場合も true', () => {
    const race = { id: 'test-2026' };
    assert.equal(isMissingCriticalFields(race), true);
  });
});

// ── isPastRace ──────────────────────────────────────────────────────

const { isPastRace } = require('./index');

describe('isPastRace', () => {
  test('開催日が今日より前なら true', () => {
    const race = { id: 'test-2026', date: '2026-01-01' };
    assert.equal(isPastRace(race, new Date('2026-09-12')), true);
  });

  test('開催日が今日より後なら false', () => {
    const race = { id: 'test-2027', date: '2027-01-01' };
    assert.equal(isPastRace(race, new Date('2026-09-12')), false);
  });

  test('開催日が今日と同日なら false（当日はまだ開催済みではない）', () => {
    const race = { id: 'test-2026', date: '2026-09-12' };
    assert.equal(isPastRace(race, new Date('2026-09-12')), false);
  });

  test('date が未設定なら false（判定不能なので更新をブロックしない）', () => {
    const race = { id: 'test-2026', date: null };
    assert.equal(isPastRace(race, new Date('2026-09-12')), false);
  });
});

// ── isEditionTransition ─────────────────────────────────────────────

const { isEditionTransition } = require('./index');

describe('isEditionTransition', () => {
  test('extracted.date の年が race.date の年と異なる場合は true（次年度への切り替わり）', () => {
    const race = { date: '2026-03-01' };
    assert.equal(isEditionTransition(race, { date: '2027-03-01' }), true);
  });

  test('extracted.date の年が race.date の年と同じ場合は false', () => {
    const race = { date: '2026-03-01' };
    assert.equal(isEditionTransition(race, { date: '2026-04-01' }), false);
  });

  test('extracted に date が含まれない場合は false', () => {
    const race = { date: '2026-03-01' };
    assert.equal(isEditionTransition(race, { venue_name_ja: '会場' }), false);
  });

  test('race.date が未設定の場合は false', () => {
    const race = { date: null };
    assert.equal(isEditionTransition(race, { date: '2027-03-01' }), false);
  });
});

// ── getLatestFilesPerSeries ───────────────────────────────────────

describe('getLatestFilesPerSeries', () => {
  test('同一シリーズに複数年がある場合は最新年のみ返す', () => {
    const files = ['tokyo-marathon-2026.json', 'tokyo-marathon-2027.json'];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, ['tokyo-marathon-2027.json']);
  });

  test('異なるシリーズはそれぞれ返す', () => {
    const files = ['kyoto-marathon-2027.json', 'tokyo-marathon-2027.json'];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, ['kyoto-marathon-2027.json', 'tokyo-marathon-2027.json']);
  });

  test('シリーズが混在する場合は各シリーズの最新のみ返す', () => {
    const files = [
      'ehime-marathon-2026.json',
      'ehime-marathon-2027.json',
      'tokyo-marathon-2026.json',
      'tokyo-marathon-2027.json',
      'kyoto-marathon-2027.json',
    ];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, [
      'ehime-marathon-2027.json',
      'kyoto-marathon-2027.json',
      'tokyo-marathon-2027.json',
    ]);
  });

  test('単独のファイルはそのまま返す', () => {
    const files = ['saitama-marathon-2026.json'];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, ['saitama-marathon-2026.json']);
  });

  test('結果はソートされている', () => {
    const files = ['tokyo-marathon-2026.json', 'kyoto-marathon-2026.json', 'ehime-marathon-2026.json'];
    const result = getLatestFilesPerSeries(files);
    assert.deepEqual(result, [
      'ehime-marathon-2026.json',
      'kyoto-marathon-2026.json',
      'tokyo-marathon-2026.json',
    ]);
  });

  test('空配列を渡すと空配列を返す', () => {
    assert.deepEqual(getLatestFilesPerSeries([]), []);
  });
});

// ── discoverInfoLinks ──────────────────────────────────────────────

const { discoverInfoLinks } = require('./index');

describe('discoverInfoLinks', () => {
  test('アクセスページのリンクを検出する', () => {
    const html = '<a href="/access/">アクセス</a><a href="/entry/">エントリー</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    const hrefs = links.map(l => l.href);
    assert.ok(hrefs.some(h => h.includes('access')));
  });

  test('受付ページのリンクを検出する', () => {
    const html = '<a href="/reception/">受付・受取り</a><a href="/other/">その他</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    assert.ok(links.some(l => l.href.includes('reception')));
  });

  test('エントリーページのリンクを検出する', () => {
    const html = '<a href="/entry/">エントリー</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    assert.ok(links.some(l => l.href.includes('entry')));
  });

  test('交通ページのリンクを検出する', () => {
    const html = '<a href="/traffic/">交通アクセス</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    assert.ok(links.length > 0);
  });

  test('関係ないリンクは除外する', () => {
    const html = '<a href="/about/">運営会社</a><a href="/news/">お知らせ</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    assert.equal(links.length, 0);
  });

  test('相対URLを絶対URLに変換する', () => {
    const html = '<a href="/access/">アクセス</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    assert.ok(links[0].href.startsWith('https://example.com'));
  });

  test('別ドメインのリンクは除外する', () => {
    const html = '<a href="https://other.com/access/">アクセス</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    assert.equal(links.length, 0);
  });

  test('重複するリンクは1件に絞る', () => {
    const html = '<a href="/access/">アクセス</a><a href="/access/">交通案内</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    const unique = new Set(links.map(l => l.href));
    assert.equal(unique.size, links.length);
  });

  test('空のHTMLは空配列を返す', () => {
    const links = discoverInfoLinks('', 'https://example.com/');
    assert.deepEqual(links, []);
  });

  test('href がない a タグは無視する', () => {
    const html = '<a name="top">アクセス</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    assert.equal(links.length, 0);
  });

  test('baseUrl が不正な場合は空配列を返す（fail closed）', () => {
    const html = '<a href="/access/">アクセス</a>';
    const links = discoverInfoLinks(html, 'not-a-url');
    assert.deepEqual(links, []);
  });

  test('同ドメイン前置詞を持つ別オリジンは除外する', () => {
    const html = '<a href="https://example.com.evil.com/access/">アクセス</a>';
    const base = 'https://example.com/';
    const links = discoverInfoLinks(html, base);
    assert.equal(links.length, 0);
  });
});

// ── 強制抽出の対象（欠落フィールドの補完） ──────────────────────────

const { getForcedExtractionReasons } = require('./index');

describe('getForcedExtractionReasons', () => {
  const future = '2099-01-01';
  const full = {
    id: 'test-2026', date: future,
    venue_name_ja: '会場', venue_address: '東京都千代田区',
    description_ja: '説明', description_en: 'desc',
    entry_fee: 5000, categories: [], entry_periods: [],
    entry_start_date: '2098-01-01',
  };

  test('欠落がなければ空配列', () => {
    assert.deepEqual(getForcedExtractionReasons(full), []);
  });

  test('会場情報がなければ理由に挙がる', () => {
    const reasons = getForcedExtractionReasons({ ...full, venue_name_ja: null, venue_address: null });
    assert.ok(reasons.includes('会場情報'));
  });

  test('参加費がどこにもなければ理由に挙がる', () => {
    const reasons = getForcedExtractionReasons({ ...full, entry_fee: null, categories: [{ distance_type: 'full', entry_fee: null }] });
    assert.ok(reasons.includes('参加費'));
  });

  test('カテゴリ別に参加費があれば挙がらない', () => {
    const reasons = getForcedExtractionReasons({ ...full, entry_fee: null, categories: [{ distance_type: 'full', entry_fee: 12000 }] });
    assert.ok(!reasons.includes('参加費'));
  });

  test('説明文が空なら理由に挙がる', () => {
    assert.ok(getForcedExtractionReasons({ ...full, description_ja: '' }).includes('説明文'));
    assert.ok(getForcedExtractionReasons({ ...full, description_en: '' }).includes('説明文'));
  });

  test('エントリー開始日がなければ理由に挙がる', () => {
    const reasons = getForcedExtractionReasons({ ...full, entry_start_date: null, entry_periods: [] });
    assert.ok(reasons.includes('エントリー開始日'));
  });

  test('開催済みの大会は対象外（補完しても意味がない）', () => {
    const past = { ...full, date: '2020-01-01', venue_name_ja: null, venue_address: null, description_ja: '' };
    assert.deepEqual(getForcedExtractionReasons(past), []);
  });

  test('複数欠落していれば全部挙がる', () => {
    const reasons = getForcedExtractionReasons({
      ...full, venue_name_ja: null, venue_address: null, description_ja: '', entry_fee: null,
    });
    assert.ok(reasons.length >= 3, `理由が足りない: ${reasons}`);
  });
});
