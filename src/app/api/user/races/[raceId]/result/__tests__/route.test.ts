import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── モック定義 ────────────────────────────────────────────────────────────
const {
  mockGetSession,
  mockSelectRows,
  mockInsertValues,
  mockUpdateWhere,
  mockDeleteWhere,
} = vi.hoisted(() => {
  const mockSelectRows = vi.fn<() => Promise<unknown[]>>().mockResolvedValue([]);
  const mockInsertValues = vi.fn().mockResolvedValue(undefined);
  const mockUpdateWhere = vi.fn().mockResolvedValue(undefined);
  const mockDeleteWhere = vi.fn().mockResolvedValue(undefined);
  return {
    mockGetSession: vi.fn(),
    mockSelectRows,
    mockInsertValues,
    mockUpdateWhere,
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
  drizzle: vi.fn(() => {
    const makeChain = () => {
      const chain: Record<string, unknown> = {};
      const terminal = () => {
        const p = mockSelectRows();
        return Object.assign(p, {
          orderBy: vi.fn(() => p),
          limit: vi.fn((n: number) => p.then((rows: unknown[]) => rows.slice(0, n))),
        });
      };
      chain.from = vi.fn(() => chain);
      chain.innerJoin = vi.fn(() => chain);
      chain.leftJoin = vi.fn(() => chain);
      chain.where = vi.fn(terminal);
      chain.orderBy = vi.fn(terminal);
      return chain;
    };

    return {
      select: vi.fn(makeChain),
      insert: vi.fn(() => ({ values: mockInsertValues })),
      update: vi.fn(() => ({
        set: vi.fn(() => ({ where: mockUpdateWhere })),
      })),
      delete: vi.fn(() => ({ where: mockDeleteWhere })),
    };
  }),
}));

vi.mock('drizzle-orm', async (importOriginal) => {
  const actual = await importOriginal<typeof import('drizzle-orm')>();
  return {
    ...actual,
    eq: vi.fn((_field: unknown, val: unknown) => val),
    and: vi.fn((...args: unknown[]) => args),
    sql: vi.fn((s: unknown) => s),
  };
});

import { GET, PUT, DELETE } from '../route';

// ─── テストデータ ──────────────────────────────────────────────────────────
const MOCK_USER = { id: 'user-1', name: 'テスト', email: 'test@example.com' };
const RACE_ID = 'nagano-marathon-2026';
const USER_RACE_ID = 'ur-uuid-1';

const MOCK_USER_RACE = {
  id: USER_RACE_ID,
  user_id: 'user-1',
  race_id: RACE_ID,
};

const MOCK_RESULT = {
  id: 'result-uuid-1',
  user_race_id: USER_RACE_ID,
  category_id: null,
  status: 'finished',
  finish_time_sec: 14400,
  note: '',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

function makeRequest(method: string, body?: unknown): Request {
  return new Request(`http://localhost/api/user/races/${RACE_ID}/result`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

function makeParams(raceId = RACE_ID) {
  return { params: Promise.resolve({ raceId }) };
}

// ─── GET ───────────────────────────────────────────────────────────────────
describe('GET /api/user/races/[raceId]/result', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await GET(makeRequest('GET'), makeParams());
    expect(res.status).toBe(401);
  });

  it('user_race が存在しない: 404', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);
    const res = await GET(makeRequest('GET'), makeParams());
    expect(res.status).toBe(404);
  });

  it('結果がない場合は null を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([]);
    const res = await GET(makeRequest('GET'), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toBeNull();
  });

  it('結果がある場合は結果を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([MOCK_RESULT]);
    const res = await GET(makeRequest('GET'), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('finished');
    expect(body.finish_time_sec).toBe(14400);
  });
});

// ─── PUT ───────────────────────────────────────────────────────────────────
describe('PUT /api/user/races/[raceId]/result', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await PUT(makeRequest('PUT', { status: 'finished', finish_time_sec: 14400 }), makeParams());
    expect(res.status).toBe(401);
  });

  it('user_race が存在しない: 404', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);
    const res = await PUT(makeRequest('PUT', { status: 'finished', finish_time_sec: 14400 }), makeParams());
    expect(res.status).toBe(404);
  });

  it('body が不正: 400', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([MOCK_USER_RACE]);
    const res = await PUT(makeRequest('PUT', { status: 'finished' }), makeParams()); // finish_time_sec なし
    expect(res.status).toBe(400);
  });

  it('新規作成: 結果を保存して返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])   // user_races lookup
      .mockResolvedValueOnce([])                  // 既存result なし
      .mockResolvedValueOnce([MOCK_RESULT]);      // upsert後の取得
    const res = await PUT(
      makeRequest('PUT', { status: 'finished', finish_time_sec: 14400 }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe('finished');
    expect(mockInsertValues).toHaveBeenCalledOnce();
  });

  it('既存あり: 更新して返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([MOCK_RESULT])       // 既存result あり
      .mockResolvedValueOnce([{ ...MOCK_RESULT, finish_time_sec: 13000 }]);
    const res = await PUT(
      makeRequest('PUT', { status: 'finished', finish_time_sec: 13000 }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    expect(mockUpdateWhere).toHaveBeenCalledOnce();
    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('dnf はタイムなしで保存できる', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ ...MOCK_RESULT, status: 'dnf', finish_time_sec: null }]);
    const res = await PUT(makeRequest('PUT', { status: 'dnf' }), makeParams());
    expect(res.status).toBe(200);
    expect(mockInsertValues).toHaveBeenCalledOnce();
  });

  it('同時作成でinsertがUNIQUE制約違反した場合はupdateにフォールバックする', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])   // user_races lookup
      .mockResolvedValueOnce([])                  // 既存result なし（並行リクエストとの競合前）
      .mockResolvedValueOnce([MOCK_RESULT]);      // フォールバック後の取得
    mockInsertValues.mockRejectedValueOnce(new Error('UNIQUE constraint failed: user_race_results.user_race_id'));

    const res = await PUT(
      makeRequest('PUT', { status: 'finished', finish_time_sec: 14400 }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    expect(mockInsertValues).toHaveBeenCalledOnce();
    expect(mockUpdateWhere).toHaveBeenCalledOnce();
  });

  it('category_id が指定したレースのカテゴリに属していない場合は400', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])   // user_races lookup
      .mockResolvedValueOnce([]);                 // race_categories lookup: 見つからない
    const res = await PUT(
      makeRequest('PUT', { status: 'finished', finish_time_sec: 14400, category_id: 999 }),
      makeParams(),
    );
    expect(res.status).toBe(400);
    expect(mockInsertValues).not.toHaveBeenCalled();
    expect(mockUpdateWhere).not.toHaveBeenCalled();
  });

  it('category_id が指定したレースのカテゴリに属している場合は保存できる', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])              // user_races lookup
      .mockResolvedValueOnce([{ id: 42, race_id: RACE_ID }]) // race_categories lookup: 見つかる
      .mockResolvedValueOnce([])                             // 既存result なし
      .mockResolvedValueOnce([{ ...MOCK_RESULT, category_id: 42 }]); // upsert後の取得
    const res = await PUT(
      makeRequest('PUT', { status: 'finished', finish_time_sec: 14400, category_id: 42 }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.category_id).toBe(42);
  });
});

// ─── DELETE ────────────────────────────────────────────────────────────────
describe('DELETE /api/user/races/[raceId]/result', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(401);
  });

  it('user_race が存在しない: 404', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);
    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(404);
  });

  it('結果がない場合は 404', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([]);
    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(404);
  });

  it('結果を削除して 204 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([MOCK_RESULT]);
    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(204);
    expect(mockDeleteWhere).toHaveBeenCalledOnce();
  });
});
