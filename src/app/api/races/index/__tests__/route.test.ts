import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── モック定義（vi.hoisted でホイスト） ────────────────────────────────────
const { mockBatch, orderBySpy } = vi.hoisted(() => ({
  mockBatch: vi.fn<() => Promise<unknown[][]>>(),
  orderBySpy: vi.fn(() => ({})),
}));

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: vi.fn(() => ({ env: { DB: {} } })),
}));

vi.mock('drizzle-orm/d1', () => ({
  drizzle: vi.fn(() => ({
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        orderBy: orderBySpy,
      })),
    })),
    batch: mockBatch,
  })),
}));

vi.mock('drizzle-orm', async (importOriginal) => {
  const actual = await importOriginal<typeof import('drizzle-orm')>();
  return { ...actual, asc: vi.fn((f) => f) };
});

// ─── テスト対象インポート ─────────────────────────────────────────────────
import { GET } from '../route';

// ─── テストデータ ──────────────────────────────────────────────────────────
const MOCK_RACE_ROWS = [
  { id: 'tokyo-2026', name_ja: '東京マラソン2026', full_name_ja: '東京マラソン 2026', date: '2026-03-01' },
  { id: 'osaka-2026', name_ja: '大阪マラソン2026', full_name_ja: '大阪マラソン 2026', date: '2026-11-29' },
];

const MOCK_CATEGORY_ROWS = [
  { id: 'cat-1', race_id: 'tokyo-2026', name_ja: 'フルマラソン', name_en: 'Full Marathon', distance_km: 42.195, distance_type: 'full' },
  { id: 'cat-2', race_id: 'tokyo-2026', name_ja: '10km', name_en: '10km', distance_km: 10, distance_type: '10k' },
  { id: 'cat-3', race_id: 'osaka-2026', name_ja: 'フルマラソン', name_en: 'Full Marathon', distance_km: 42.195, distance_type: 'full' },
];

// ─── GET /api/races/index ──────────────────────────────────────────────────
describe('GET /api/races/index', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('race_categories の取得で ORDER BY を発行しない（ソート行も D1 の rows_read に計上されるため）', async () => {
    mockBatch.mockResolvedValue([MOCK_RACE_ROWS, MOCK_CATEGORY_ROWS]);

    await GET();

    // ORDER BY はインデックスのある races.date の1本だけ
    expect(orderBySpy).toHaveBeenCalledTimes(1);
  });

  it('カテゴリは sort_order 昇順で並べ替えて返す', async () => {
    const unsorted = [
      { id: 'cat-b', race_id: 'tokyo-2026', name_ja: '10km', name_en: '10km', distance_km: 10, distance_type: '10k', sort_order: 2 },
      { id: 'cat-a', race_id: 'tokyo-2026', name_ja: 'フル', name_en: 'Full', distance_km: 42.195, distance_type: 'full', sort_order: 1 },
    ];
    mockBatch.mockResolvedValue([[MOCK_RACE_ROWS[0]], unsorted]);

    const res = await GET();
    const body = (await res.json()) as { categories: { id: string }[] }[];

    expect(body[0].categories.map((c) => c.id)).toEqual(['cat-a', 'cat-b']);
  });

  it('200 とレース一覧を返す', async () => {
    mockBatch.mockResolvedValue([MOCK_RACE_ROWS, MOCK_CATEGORY_ROWS]);

    const res = await GET();
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveLength(2);
  });

  it('各レースにカテゴリが紐付く', async () => {
    mockBatch.mockResolvedValue([MOCK_RACE_ROWS, MOCK_CATEGORY_ROWS]);

    const res = await GET();
    const body = await res.json();

    const tokyo = body.find((r: { id: string }) => r.id === 'tokyo-2026');
    expect(tokyo).toBeDefined();
    expect(tokyo.categories).toHaveLength(2);
    expect(tokyo.categories[0].distance_type).toBe('full');
  });

  it('カテゴリなしのレースは空配列を返す', async () => {
    const raceWithNoCategory = [{ id: 'nara-2027', name_ja: '奈良マラソン2027', full_name_ja: null, date: '2027-12-14' }];
    mockBatch.mockResolvedValue([raceWithNoCategory, []]);

    const res = await GET();
    const body = await res.json();

    expect(body).toHaveLength(1);
    expect(body[0].categories).toEqual([]);
  });

  it('レースが存在しない場合は空配列を返す', async () => {
    mockBatch.mockResolvedValue([[], []]);

    const res = await GET();
    const body = await res.json();

    expect(body).toEqual([]);
  });

  it('レースは id / name_ja / full_name_ja / date を含む', async () => {
    mockBatch.mockResolvedValue([MOCK_RACE_ROWS, MOCK_CATEGORY_ROWS]);

    const res = await GET();
    const body = await res.json();

    const race = body[0];
    expect(race).toMatchObject({
      id: 'tokyo-2026',
      name_ja: '東京マラソン2026',
      full_name_ja: '東京マラソン 2026',
      date: '2026-03-01',
    });
  });
});
