import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Race } from '@/lib/types';

// ─── モック定義 ────────────────────────────────────────────────────────────
const { mockGetRaces } = vi.hoisted(() => ({
  mockGetRaces: vi.fn<[], Promise<Race[]>>(),
}));

vi.mock('@/lib/data', () => ({
  getRaces: mockGetRaces,
}));

// ─── テスト対象インポート ─────────────────────────────────────────────────
import sitemap from '../sitemap';

// ─── テストデータ ──────────────────────────────────────────────────────────
function makeRace(id: string, date: string): Race {
  return {
    id,
    name_ja: `${id} ja`,
    name_en: `${id} en`,
    full_name_ja: null,
    full_name_en: null,
    date,
    prefecture: 'tokyo',
    city_ja: '東京都',
    city_en: 'Tokyo',
    description_ja: '',
    description_en: '',
    website_url: null,
    image_url: null,
    venue_ja: null,
    venue_en: null,
    categories: [],
    participation_gifts: [],
    completion_gifts: [],
    tags: [],
    entry_periods: [],
    entry_start_date: null,
    entry_end_date: null,
    entry_closed: false,
    course_info: null,
    series_id: null,
    entry_links: [],
    access_points: [],
    nearby_spots: [],
    weather_info: [],
    results: [],
    gallery: [],
    voices: [],
    time_buckets: [],
    course_highlights: [],
    reception_sessions: [],
    travel_times: [],
  } as unknown as Race;
}

const MOCK_RACES = [
  makeRace('tokyo-marathon-2026', '2026-03-01'),
  makeRace('osaka-marathon-2026', '2026-11-29'),
];

const STATIC_PAGE_COUNT = 9; // STATIC_PAGES の件数
const LOCALE_COUNT = 2;      // ['ja', 'en']

// ─── sitemap() ──────────────────────────────────────────────────────────────
describe('sitemap()', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('静的ページ × ロケール数のエントリを含む', async () => {
    mockGetRaces.mockResolvedValue([]);

    const entries = await sitemap();

    expect(entries).toHaveLength(STATIC_PAGE_COUNT * LOCALE_COUNT);
  });

  it('レース × ロケール数のエントリを追加する', async () => {
    mockGetRaces.mockResolvedValue(MOCK_RACES);

    const entries = await sitemap();

    expect(entries).toHaveLength(STATIC_PAGE_COUNT * LOCALE_COUNT + MOCK_RACES.length * LOCALE_COUNT);
  });

  it('URLは BASE_URL/locale/... の形式', async () => {
    mockGetRaces.mockResolvedValue([]);

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain('https://hashiru.run/ja');
    expect(urls).toContain('https://hashiru.run/en');
    expect(urls).toContain('https://hashiru.run/ja/races');
    expect(urls).toContain('https://hashiru.run/en/races');
  });

  it('レースエントリのURLは /locale/races/:id 形式', async () => {
    mockGetRaces.mockResolvedValue(MOCK_RACES);

    const entries = await sitemap();
    const urls = entries.map((e) => e.url);

    expect(urls).toContain('https://hashiru.run/ja/races/tokyo-marathon-2026');
    expect(urls).toContain('https://hashiru.run/en/races/tokyo-marathon-2026');
    expect(urls).toContain('https://hashiru.run/ja/races/osaka-marathon-2026');
    expect(urls).toContain('https://hashiru.run/en/races/osaka-marathon-2026');
  });

  it('各エントリに alternates.languages が含まれる', async () => {
    mockGetRaces.mockResolvedValue([]);

    const entries = await sitemap();
    const home = entries.find((e) => e.url === 'https://hashiru.run/ja');

    expect(home?.alternates?.languages).toMatchObject({
      ja: 'https://hashiru.run/ja',
      en: 'https://hashiru.run/en',
    });
  });

  it('レースエントリの lastModified は race.date から生成される', async () => {
    mockGetRaces.mockResolvedValue([makeRace('test-race', '2026-03-01')]);

    const entries = await sitemap();
    const raceEntry = entries.find((e) => e.url === 'https://hashiru.run/ja/races/test-race');

    expect(raceEntry?.lastModified).toBeInstanceOf(Date);
    expect((raceEntry?.lastModified as Date).getFullYear()).toBe(2026);
  });

  it('トップページの priority は 1.0', async () => {
    mockGetRaces.mockResolvedValue([]);

    const entries = await sitemap();
    const home = entries.find((e) => e.url === 'https://hashiru.run/ja');

    expect(home?.priority).toBe(1.0);
  });
});
