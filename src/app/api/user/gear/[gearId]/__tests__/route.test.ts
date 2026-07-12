import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── モック定義 ────────────────────────────────────────────────────────────
const { mockGetSession, mockSelectRows, mockSetFn, mockUpdateSet, mockDeleteWhere } = vi.hoisted(() => {
  const mockSelectRows = vi.fn<[], Promise<unknown[]>>().mockResolvedValue([]);
  const mockUpdateSet = vi.fn().mockResolvedValue(undefined);
  const mockSetFn = vi.fn(() => ({ where: mockUpdateSet }));
  const mockDeleteWhere = vi.fn().mockResolvedValue(undefined);
  return {
    mockGetSession: vi.fn(),
    mockSelectRows,
    mockSetFn,
    mockUpdateSet,
    mockDeleteWhere,
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
            limit: vi.fn((n: number) => rowsPromise.then((rows: unknown[]) => rows.slice(0, n))),
          });
        }),
      })),
    })),
    update: vi.fn(() => ({
      set: mockSetFn,
    })),
    delete: vi.fn(() => ({
      where: mockDeleteWhere,
    })),
  })),
}));

vi.mock('drizzle-orm', async (importOriginal) => {
  const actual = await importOriginal<typeof import('drizzle-orm')>();
  return {
    ...actual,
    eq: vi.fn((_field: unknown, val: unknown) => val),
    and: vi.fn((...args: unknown[]) => args),
  };
});

import { PATCH, DELETE } from '../route';

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

function makeRequest(method: string, body?: unknown): Request {
  return new Request('http://localhost/api/user/gear/gear-1', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

function makeParams(gearId = 'gear-1') {
  return { params: Promise.resolve({ gearId }) };
}

// ─── PATCH /api/user/gear/[gearId] ────────────────────────────────────────
describe('PATCH /api/user/gear/[gearId]', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await PATCH(makeRequest('PATCH', { name: '新しい名前' }), makeParams());
    expect(res.status).toBe(401);
  });

  it('存在しないギア: 404 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]); // 見つからない
    const res = await PATCH(makeRequest('PATCH', { name: '新しい名前' }), makeParams());
    expect(res.status).toBe(404);
  });

  it('他人のギア: 404 を返す（存在を秘匿）', async () => {
    mockGetSession.mockResolvedValue({ user: { ...MOCK_USER, id: 'other-user' } });
    mockSelectRows.mockResolvedValue([]); // user_id + gear_id 両方一致しないので空
    const res = await PATCH(makeRequest('PATCH', { name: '新しい名前' }), makeParams());
    expect(res.status).toBe(404);
  });

  it('認証済み・正常body: 200 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const updatedGear = { ...MOCK_GEAR, name: '新しい名前' };
    // 1回目: 存在確認、2回目: 更新後取得
    mockSelectRows
      .mockResolvedValueOnce([MOCK_GEAR])
      .mockResolvedValueOnce([updatedGear]);
    mockUpdateSet.mockResolvedValue(undefined);
    const res = await PATCH(makeRequest('PATCH', { name: '新しい名前' }), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.name).toBe('新しい名前');
  });

  it('category が不正: 400 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([MOCK_GEAR]);
    const res = await PATCH(makeRequest('PATCH', { category: 'invalid' }), makeParams());
    expect(res.status).toBe(400);
  });

  it('is_retired を true に更新できる', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const retiredGear = { ...MOCK_GEAR, is_retired: true };
    mockSelectRows
      .mockResolvedValueOnce([MOCK_GEAR])
      .mockResolvedValueOnce([retiredGear]);
    mockUpdateSet.mockResolvedValue(undefined);
    const res = await PATCH(makeRequest('PATCH', { is_retired: true }), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.is_retired).toBe(true);
  });

  it('amazon_url 更新時にasinが抽出される', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const updatedGear = { ...MOCK_GEAR, amazon_url: 'https://www.amazon.co.jp/dp/B0ZZZZZZZZ', asin: 'B0ZZZZZZZZ' };
    mockSelectRows
      .mockResolvedValueOnce([MOCK_GEAR])
      .mockResolvedValueOnce([updatedGear]);
    mockUpdateSet.mockResolvedValue(undefined);
    const res = await PATCH(
      makeRequest('PATCH', { amazon_url: 'https://www.amazon.co.jp/dp/B0ZZZZZZZZ' }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    const setCall = mockSetFn.mock.calls[0][0];
    expect(setCall.asin).toBe('B0ZZZZZZZZ');
  });
});

// ─── DELETE /api/user/gear/[gearId] ───────────────────────────────────────
describe('DELETE /api/user/gear/[gearId]', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(401);
  });

  it('存在しないギア: 404 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);
    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(404);
  });

  it('認証済み・存在するギア: 200 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([MOCK_GEAR]);
    mockDeleteWhere.mockResolvedValue(undefined);
    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });
});
