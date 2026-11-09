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

  test('要項・募集ページのリンクを検出する（#208）', () => {
    const html = '<a href="/a/">大会要項</a><a href="/b/">ランナー募集</a><a href="/outline/">概要</a>';
    const links = discoverInfoLinks(html, 'https://example.com/');
    assert.equal(links.length, 3);
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

// ── #199: 抽出オプションの伝搬と LLM 使用量の集計 ───────────────────

const { buildExtractOptions, accumulateLlmUsage, emptyLlmUsage, fetchPageText } = require("./index");

describe('buildExtractOptions', () => {
  test('--no-cli 指定（useCli: false）を抽出に渡す', () => {
    assert.equal(buildExtractOptions({ useCli: false }, {}).useCli, false);
  });

  test('既定は CLI 経由', () => {
    assert.equal(buildExtractOptions({}, {}).useCli, true);
  });

  test('モデルは CRAWL_MODEL から解決する', () => {
    assert.equal(buildExtractOptions({}, { CRAWL_MODEL: 'claude-opus-5-5' }).model, 'claude-opus-5-5');
    assert.equal(buildExtractOptions({}, {}).model, 'claude-sonnet-5-5');
  });

  test('options.model が環境変数より優先される（評価スクリプトから指定するため）', () => {
    assert.equal(buildExtractOptions({ model: 'claude-haiku-5-5' }, { CRAWL_MODEL: 'claude-opus-5-5' }).model, 'claude-haiku-5-5');
  });
});

describe('accumulateLlmUsage', () => {
  const meta = (over = {}) => ({
    model: 'claude-sonnet-5-5', inputTokens: 100, outputTokens: 50,
    cacheCreationTokens: 600, cacheReadTokens: 10, costUsd: 0.01, ...over,
  });

  test('呼び出し回数とトークン数を合算する', () => {
    let usage = emptyLlmUsage();
    usage = accumulateLlmUsage(usage, meta());
    usage = accumulateLlmUsage(usage, meta({ inputTokens: 1, outputTokens: 2, costUsd: 0.02 }));
    assert.equal(usage.calls, 2);
    assert.equal(usage.inputTokens, 101);
    assert.equal(usage.outputTokens, 52);
    assert.equal(usage.cacheCreationTokens, 1200);
    assert.equal(usage.cacheReadTokens, 20);
    assert.ok(Math.abs(usage.costUsd - 0.03) < 1e-9);
  });

  test('使用モデルを重複なく記録する', () => {
    let usage = emptyLlmUsage();
    usage = accumulateLlmUsage(usage, meta());
    usage = accumulateLlmUsage(usage, meta());
    usage = accumulateLlmUsage(usage, meta({ model: 'claude-haiku-5-5' }));
    assert.deepEqual(usage.models, ['claude-sonnet-5-5', 'claude-haiku-5-5']);
  });

  test('costUsd が null（API 経路）でも壊れない', () => {
    const usage = accumulateLlmUsage(emptyLlmUsage(), meta({ costUsd: null }));
    assert.equal(usage.costUsd, 0);
  });

  test('元のオブジェクトを変更しない', () => {
    const before = emptyLlmUsage();
    accumulateLlmUsage(before, meta());
    assert.equal(before.calls, 0);
  });
});

describe('fetchPageText', () => {
  const htmlResponse = (body, { status = 200, contentType = 'text/html' } = {}) => ({
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ 'content-type': contentType }),
    text: async () => body,
    arrayBuffer: async () => new TextEncoder().encode(body).buffer,
  });

  test('HTML はタグを除いたテキストを返す', async () => {
    const body = `<html><body><p>${'大会要項 '.repeat(30)}</p></body></html>`;
    const text = await fetchPageText('https://example.com/', { fetchFn: async () => htmlResponse(body) });
    assert.ok(text.startsWith('大会要項'));
    assert.ok(!text.includes('<p>'));
  });

  test('HTTP エラーはステータスをメッセージに含める', async () => {
    await assert.rejects(
      fetchPageText('https://example.com/', { fetchFn: async () => htmlResponse('', { status: 404 }) }),
      /HTTP 404/,
    );
  });

  test('接続エラーは原因コードをメッセージに含める（#209 証明書エラーの分類用）', async () => {
    const fetchFn = async () => {
      throw new TypeError('fetch failed', { cause: Object.assign(new Error('unable to verify'), { code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' }) });
    };
    await assert.rejects(fetchPageText('https://example.com/', { fetchFn }), /fetch failed \(UNABLE_TO_VERIFY_LEAF_SIGNATURE\)/);
  });
});

describe('PDF のテキスト化（#211）', () => {
  const { isPdfBytes, extractPdfText, fetchPage, SPARSE_PDF_CHARS } = require('./index');
  const { makePdf } = require('./test-pdf');

  const response = (bytes, { contentType = 'application/pdf' } = {}) => ({
    ok: true,
    status: 200,
    headers: new Headers({ 'content-type': contentType }),
    arrayBuffer: async () => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
    text: async () => new TextDecoder().decode(bytes),
  });
  const longLines = Array.from({ length: 12 }, (_, i) => `Entry fee 10000 yen line ${i} for the full marathon category`);

  test('先頭が %PDF- なら PDF と判定する', () => {
    assert.equal(isPdfBytes(makePdf(['a'])), true);
    assert.equal(isPdfBytes(new TextEncoder().encode('<html></html>')), false);
    assert.equal(isPdfBytes(new Uint8Array()), false);
  });

  test('PDF からテキストを抽出する', async () => {
    const text = await extractPdfText(makePdf(['Entry fee 10000 yen', 'Start 9:00']));
    assert.match(text, /Entry fee 10000 yen/);
    assert.match(text, /Start 9:00/);
  });

  test('PDF の応答はバイナリではなく抽出テキストを返す', async () => {
    const page = await fetchPage('https://example.com/guide.pdf', { fetchFn: async () => response(makePdf(longLines)) });
    assert.equal(page.kind, 'pdf');
    assert.match(page.text, /Entry fee 10000 yen line 0/);
    assert.ok(!page.text.includes('endobj'));
    assert.equal(page.sparse, false);
  });

  test('Content-Type が PDF でも中身が HTML なら HTML として扱う（リンク切れ等）', async () => {
    const html = `<html><body>${'お知らせ '.repeat(40)}</body></html>`;
    const page = await fetchPage('https://example.com/guide.pdf', {
      fetchFn: async () => response(new TextEncoder().encode(html), { contentType: 'application/pdf' }),
    });
    assert.equal(page.kind, 'html');
    assert.ok(page.text.startsWith('お知らせ'));
  });

  test('テキストの少ない PDF（画像中心）は sparse として返す（短くてもエラーにしない）', async () => {
    const page = await fetchPage('https://example.com/p.pdf', { fetchFn: async () => response(makePdf(['FINISH START 9:00'])) });
    assert.equal(page.kind, 'pdf');
    assert.equal(page.sparse, true);
    assert.ok(page.text.length < SPARSE_PDF_CHARS);
  });

  test('テキストが全く取れない PDF はエラーにする', async () => {
    await assert.rejects(
      fetchPage('https://example.com/p.pdf', { fetchFn: async () => response(makePdf([])) }),
      /PDF からテキストを抽出できない/,
    );
  });

  test('fetchPageText は PDF でも抽出テキストを返す', async () => {
    const text = await fetchPageText('https://example.com/guide.pdf', { fetchFn: async () => response(makePdf(longLines)) });
    assert.match(text, /Entry fee/);
  });
});

describe('URL失効の判定（#208）', () => {
  const { isUrlExpired, recordFetchFailure, findRelinkCandidates, EXPIRE_AFTER_5XX } = require('./index');

  test('404 / 410 は1回で失効とみなす', () => {
    assert.equal(isUrlExpired('HTTP 404', 1), true);
    assert.equal(isUrlExpired('HTTP 410', 1), true);
  });

  test('5xx は連続失敗が閾値に達したら失効とみなす（一時障害を除くため）', () => {
    assert.equal(EXPIRE_AFTER_5XX, 3);
    assert.equal(isUrlExpired('HTTP 500', 2), false);
    assert.equal(isUrlExpired('HTTP 503', 3), true);
  });

  test('タイムアウト・証明書・403 などは失効扱いにしない', () => {
    assert.equal(isUrlExpired('The operation was aborted due to timeout', 10), false);
    assert.equal(isUrlExpired('fetch failed (UNABLE_TO_VERIFY_LEAF_SIGNATURE)', 10), false);
    assert.equal(isUrlExpired('HTTP 403', 10), false);
  });

  test('recordFetchFailure は連続失敗回数を1増やし、ハッシュは保つ', () => {
    const prev = { hash: 'h', last_checked: 'x', race_id: 'r' };
    const next = recordFetchFailure(prev, 'r', 'HTTP 500', new Date('2026-11-08T00:00:00Z'));
    assert.deepEqual(next, { hash: 'h', last_checked: '2026-11-08T00:00:00.000Z', race_id: 'r', fail_count: 1, last_error: 'HTTP 500' });
    assert.equal(recordFetchFailure(next, 'r', 'HTTP 500', new Date()).fail_count, 2);
    assert.equal(prev.fail_count, undefined);
  });

  test('recordFetchFailure は未登録 URL でも記録する', () => {
    const next = recordFetchFailure(undefined, 'r', 'HTTP 404', new Date('2026-11-08T00:00:00Z'));
    assert.equal(next.fail_count, 1);
    assert.equal(next.hash, null);
  });

  test('findRelinkCandidates はトップページの要項・エントリー等のリンクから登録済み URL を除く', () => {
    const html = '<a href="/2027/outline/">大会要項</a><a href="/2027/entry/">エントリー</a><a href="/old/entry/">エントリー（旧）</a><a href="/news/">ニュース</a>';
    const links = findRelinkCandidates(html, 'https://example.com/', ['https://example.com/old/entry/']);
    assert.deepEqual(links.map((l) => l.href), ['https://example.com/2027/outline/', 'https://example.com/2027/entry/']);
  });
});

describe('collectAnnouncementInputs（#201）', () => {
  const { collectAnnouncementInputs } = require('./index');
  const races = {
    'a-2027': { id: 'a-2027', name_ja: 'A' },
    'b-2028': { id: 'b-2028', name_ja: 'B 2028' },
    'c-2027': { id: 'c-2027', name_ja: 'C' },
  };
  const loadRace = (id) => races[id] ?? null;

  test('更新した大会は最新の JSON と diff、次年度ファイル・追加した大会は新規掲載にする', () => {
    const summary = {
      extracted: [{ race_id: 'a-2027', diff: [{ key: 'entry_periods' }] }],
      new_editions: [{ race_id: 'b-2027', new_race_id: 'b-2028' }],
      discovered: [{ race_id: 'c-2027' }],
    };
    const { added, updated } = collectAnnouncementInputs(summary, loadRace);
    assert.deepEqual(added.map((r) => r.id), ['b-2028', 'c-2027']);
    assert.deepEqual(updated, [{ race: races['a-2027'], diff: [{ key: 'entry_periods' }] }]);
  });

  test('JSON を読めない大会は除く', () => {
    const { added, updated } = collectAnnouncementInputs({ extracted: [{ race_id: 'x', diff: [] }], new_editions: [] }, loadRace);
    assert.deepEqual(added, []);
    assert.deepEqual(updated, []);
  });
});
