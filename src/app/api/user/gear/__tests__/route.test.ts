import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── モック定義 ────────────────────────────────────────────────────────────
const { mockGetSession, mockSelectRows, mockInsertValues } = vi.hoisted(() => {
  const mockSelectRows = vi.fn<[], Promise<unknown[]>>().mockResolvedValue([]);
  const mockInsertValues = vi.fn().mockResolvedValue(undefined);
  return {
    mockGetSession: vi.fn(),
    mockSelectRows,
    mockInsertValues,
  };
});

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: vi.fn(() => ({ env: { DB: {} } })),
}));

vi.mock('@/lib/auth', () => ({
  createAuth: vi.fn(() => ({
    api: { getSession: mockGetSession },
  })),
}));

vi.mock('drizzle-orm/d1', () => ({
  drizzle: vi.fn(() => ({
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => {
          const rowsPromise = mockSelectRows();
          return Object.assign(rowsPromise, {
            orderBy: vi.fn(() => rowsPromise),
            limit: vi.fn((n: number) => rowsPromise.then((rows: unknown[]) => rows.slice(0, n))),
          });
        }),
      })),
    })),
    insert: vi.fn(() => ({
      values: mockInsertValues,
    })),
  })),
}));

vi.mock('drizzle-orm', async (importOriginal) => {
  const actual = await importOriginal<typeof import('drizzle-orm')>();
  return {
    ...actual,
    eq: vi.fn((_field: unknown, val: unknown) => val),
    and: vi.fn((...args: unknown[]) => args),
    asc: vi.fn((col: unknown) => col),
  };
});

import { GET, POST } from '../route';

// ─── テストデータ ──────────────────────────────────────────────────────────
const MOCK_USER = { id: 'user-1', name: 'テストユーザー', email: 'test@example.com' };
const MOCK_GEAR = {
  id: 'gear-1',
  user_id: 'user-1',
  category: 'shoes',
  brand: 'Nike',
  name: 'テストシューズ',
  amazon_url: null,
  asin: null,
  usage_tag: 'both',
  memo: '',
  is_retired: false,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

function makeRequest(method: string, body?: unknown, search?: string): Request {
  const url = `http://localhost/api/user/gear${search ?? ''}`;
  return new Request(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

// ─── GET /api/user/gear ────────────────────────────────────────────────────
describe('GET /api/user/gear', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await GET(makeRequest('GET'));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe('Unauthorized');
  });

  it('認証済み: ギア一覧を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([MOCK_GEAR]);
    const res = await GET(makeRequest('GET'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].id).toBe('gear-1');
  });

  it('認証済みでギアなし: 空配列を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);
    const res = await GET(makeRequest('GET'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });
});

// ─── POST /api/user/gear ───────────────────────────────────────────────────
describe('POST /api/user/gear', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await POST(makeRequest('POST', { category: 'shoes', name: 'シューズ' }));
    expect(res.status).toBe(401);
  });

  it('認証済み・正常body: 201 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockInsertValues.mockResolvedValue(undefined);
    mockSelectRows.mockResolvedValue([MOCK_GEAR]);
    const res = await POST(makeRequest('POST', { category: 'shoes', name: 'テストシューズ' }));
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.id).toBeDefined();
  });

  it('category が不正: 400 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const res = await POST(makeRequest('POST', { category: 'invalid', name: 'シューズ' }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeDefined();
  });

  it('name が未指定: 400 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const res = await POST(makeRequest('POST', { category: 'shoes' }));
    expect(res.status).toBe(400);
  });

  it('name が空文字（trim後）: 400 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const res = await POST(makeRequest('POST', { category: 'shoes', name: '   ' }));
    expect(res.status).toBe(400);
  });

  it('amazon_url 付きで保存するとasinが抽出される', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockInsertValues.mockResolvedValue(undefined);
    mockSelectRows.mockResolvedValue([{ ...MOCK_GEAR, amazon_url: 'https://www.amazon.co.jp/dp/B0XXXXXXXX', asin: 'B0XXXXXXXX' }]);

    const res = await POST(makeRequest('POST', {
      category: 'shoes',
      name: 'シューズ',
      amazon_url: 'https://www.amazon.co.jp/dp/B0XXXXXXXX',
    }));
    expect(res.status).toBe(201);

    // insert に渡った値にasinが含まれる（他人のタグは排除済み）
    const insertCall = mockInsertValues.mock.calls[0][0];
    expect(insertCall.asin).toBe('B0XXXXXXXX');
    expect(insertCall.amazon_url).toBe('https://www.amazon.co.jp/dp/B0XXXXXXXX');
  });

  it('amazon_url に他人のタグ付きURLを渡してもasinのみ保存される', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockInsertValues.mockResolvedValue(undefined);
    mockSelectRows.mockResolvedValue([MOCK_GEAR]);

    await POST(makeRequest('POST', {
      category: 'shoes',
      name: 'シューズ',
      amazon_url: 'https://www.amazon.co.jp/dp/B0XXXXXXXX?tag=someone-22&ref=xxx',
    }));

    const insertCall = mockInsertValues.mock.calls[0][0];
    expect(insertCall.asin).toBe('B0XXXXXXXX');
    // amazon_url はユーザーが貼った元URLをそのまま保存（asinで同一製品を判定する）
    expect(insertCall.amazon_url).toBe('https://www.amazon.co.jp/dp/B0XXXXXXXX?tag=someone-22&ref=xxx');
  });

  it('非Amazon URLは 400 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const res = await POST(makeRequest('POST', {
      category: 'shoes',
      name: 'シューズ',
      amazon_url: 'https://rakuten.co.jp/item/123',
    }));
    expect(res.status).toBe(400);
  });
});
