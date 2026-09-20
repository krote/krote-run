import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── モック定義 ────────────────────────────────────────────────────────────
type RaceIndexEntry = { id: string; name_ja: string; name_en: string; date: string };

const { mockGetRaceIndexEntries } = vi.hoisted(() => ({
  mockGetRaceIndexEntries: vi.fn<() => Promise<RaceIndexEntry[]>>(),
}));

// sitemap は id/date しか使わないため、子テーブルを引かない軽量クエリを使う
vi.mock('@/lib/data', () => ({
  getRaceIndexEntries: mockGetRaceIndexEntries,
}));

// ─── テスト対象インポート ─────────────────────────────────────────────────
import sitemap from '../sitemap';

// ─── テストデータ ──────────────────────────────────────────────────────────
function makeRace(id: string, date: string): RaceIndexEntry {
  return { id, name_ja: `${id} ja`, name_en: `${id} en`, date };
}

const MOCK_RACES = [
  makeRace('tokyo-marathon-2026', '2026-03-01'),
  makeRace('osaka-marathon-2026', '2026-11-29'),
];

const STATIC_PAGE_COUNT = 10; // STATIC_PAGES の件数
const LOCALE_COUNT = 2;      // ['ja', 'en']

// ─── sitemap() ──────────────────────────────────────────────────────────────
describe('sitemap()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('静的ページ × ロケール数のエントリを含む', async () => {
    mockGetRaceIndexEntries.mockResolvedValue([]);

    const entries = await sitemap();

    expect(entries).toHaveLength(STATIC_PAGE_COUNT * LOCALE_COUNT);
  });

  it('レース × ロケール数のエントリを追加する', async () => {
    mockGetRaceIndexEntries.mockResolvedValue(MOCK_RACES);

    const entries = await sitemap();

    expect(entries).toHaveLength(STATIC_PAGE_COUNT * LOCALE_COUNT + MOCK_RACES.length * LOCALE_COUNT);
  });

  it('URLは BASE_URL/locale/... の形式', async () => {
    mockGetRaceIndexEntries.mockResolvedValue([]);

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain('https://hashiru.run/ja');
    expect(urls).toContain('https://hashiru.run/en');
    expect(urls).toContain('https://hashiru.run/ja/races');
    expect(urls).toContain('https://hashiru.run/en/races');
  });

  it('レースエントリのURLは /locale/races/:id 形式', async () => {
    mockGetRaceIndexEntries.mockResolvedValue(MOCK_RACES);

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain('https://hashiru.run/ja/races/tokyo-marathon-2026');
    expect(urls).toContain('https://hashiru.run/en/races/tokyo-marathon-2026');
    expect(urls).toContain('https://hashiru.run/ja/races/osaka-marathon-2026');
    expect(urls).toContain('https://hashiru.run/en/races/osaka-marathon-2026');
  });

  it('各エントリに alternates.languages が含まれる', async () => {
    mockGetRaceIndexEntries.mockResolvedValue([]);

    const entries = await sitemap();
    const home = entries.find((e) => e.url === 'https://hashiru.run/ja');

    expect(home?.alternates?.languages).toMatchObject({
      ja: 'https://hashiru.run/ja',
      en: 'https://hashiru.run/en',
    });
  });

  it('レースエントリの lastModified は race.date から生成される', async () => {
    mockGetRaceIndexEntries.mockResolvedValue([makeRace('test-race', '2026-03-01')]);

    const entries = await sitemap();
    const raceEntry = entries.find((e) => e.url === 'https://hashiru.run/ja/races/test-race');

    expect(raceEntry?.lastModified).toBeInstanceOf(Date);
    expect((raceEntry?.lastModified as Date).getFullYear()).toBe(2026);
  });

  it('トップページの priority は 1.0', async () => {
    mockGetRaceIndexEntries.mockResolvedValue([]);

    const entries = await sitemap();
    const home = entries.find((e) => e.url === 'https://hashiru.run/ja');

    expect(home?.priority).toBe(1.0);
  });
});
