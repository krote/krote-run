import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── モック定義 ────────────────────────────────────────────────────────────
const {
  mockGetSession,
  mockSelectRows,
  mockInsertValues,
  mockUpdateWhere,
  mockDeleteWhere,
} = vi.hoisted(() => {
  const mockSelectRows = vi.fn<[], Promise<unknown[]>>().mockResolvedValue([]);
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
    ne: vi.fn((_field: unknown, val: unknown) => val),
    and: vi.fn((...args: unknown[]) => args),
    asc: vi.fn((col: unknown) => col),
    desc: vi.fn((col: unknown) => col),
    inArray: vi.fn((_field: unknown, vals: unknown) => vals),
  };
});

import { GET, PUT, PATCH } from '../route';

// ─── テストデータ ──────────────────────────────────────────────────────────
const MOCK_USER = { id: 'user-1', name: 'テスト', email: 'test@example.com' };
const RACE_ID = 'gunma-marathon-2026';
const USER_RACE_ID = 'ur-uuid-1';

const MOCK_USER_RACE = {
  id: USER_RACE_ID,
  user_id: 'user-1',
  race_id: RACE_ID,
  is_planning: true,
  planning_category_id: null,
  entry_reminder_period_ids: '[]',
  gear_is_public: false,
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

const MOCK_GEAR_ITEM = {
  gear_id: 'gear-1',
  quantity: 1,
  used: null,
  used_quantity: null,
  note: '',
  sort_order: 0,
  name: 'テストシューズ',
  brand: 'Nike',
  category: 'shoes',
  asin: null,
  amazon_url: null,
};

function makeRequest(method: string, body?: unknown, search = ''): Request {
  return new Request(`http://localhost/api/user/races/${RACE_ID}/gear${search}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

function makeParams(raceId = RACE_ID) {
  return { params: Promise.resolve({ raceId }) };
}

// ─── GET /api/user/races/[raceId]/gear ────────────────────────────────────
describe('GET /api/user/races/[raceId]/gear', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await GET(makeRequest('GET'), makeParams());
    expect(res.status).toBe(401);
  });

  it('user_race が存在しない: 404', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]); // user_races lookup → not found
    const res = await GET(makeRequest('GET'), makeParams());
    expect(res.status).toBe(404);
  });

  it('装備リストを返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])   // user_races lookup
      .mockResolvedValueOnce([MOCK_GEAR_ITEM]);  // gear items
    const res = await GET(makeRequest('GET'), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].gear_id).toBe('gear-1');
  });

  it('装備リストが空なら空配列を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([]);
    const res = await GET(makeRequest('GET'), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });
});

// ─── GET ?source=candidates ────────────────────────────────────────────────
describe('GET /api/user/races/[raceId]/gear?source=candidates', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await GET(makeRequest('GET', undefined, '?source=candidates'), makeParams());
    expect(res.status).toBe(401);
  });

  it('コピー元候補を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    // user_race_gear + user_races join → [{user_race_id, race_id}...]
    mockSelectRows.mockResolvedValue([
      { user_race_id: 'ur-other', race_id: 'tokyo-marathon-2026' },
      { user_race_id: 'ur-other', race_id: 'tokyo-marathon-2026' }, // duplicate = 2 gear items
    ]);
    const res = await GET(makeRequest('GET', undefined, '?source=candidates'), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].race_id).toBe('tokyo-marathon-2026');
    expect(body[0].gear_count).toBe(2);
  });

  it('候補がない場合は空配列', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);
    const res = await GET(makeRequest('GET', undefined, '?source=candidates'), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });
});

// ─── PUT /api/user/races/[raceId]/gear ────────────────────────────────────
describe('PUT /api/user/races/[raceId]/gear', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await PUT(makeRequest('PUT', { items: [] }), makeParams());
    expect(res.status).toBe(401);
  });

  it('user_race が存在しない: 404', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);
    const res = await PUT(makeRequest('PUT', { items: [] }), makeParams());
    expect(res.status).toBe(404);
  });

  it('body が不正: 400', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([MOCK_USER_RACE]);
    const res = await PUT(makeRequest('PUT', { items: 'invalid' }), makeParams());
    expect(res.status).toBe(400);
  });

  it('他人の gear_id を含む: 400', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])  // user_races lookup
      .mockResolvedValueOnce([]);                // 自分のgear → 0件（無効なgear_id）
    const res = await PUT(
      makeRequest('PUT', { items: [{ gear_id: 'other-users-gear', quantity: 1, sort_order: 0 }] }),
      makeParams(),
    );
    expect(res.status).toBe(400);
  });

  it('正常: リストを保存して返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])           // user_races lookup
      .mockResolvedValueOnce([{ id: 'gear-1' }])        // gear ownership check
      .mockResolvedValueOnce([])                          // existing gear items
      .mockResolvedValueOnce([MOCK_GEAR_ITEM]);          // updated list
    const res = await PUT(
      makeRequest('PUT', { items: [{ gear_id: 'gear-1', quantity: 1, sort_order: 0 }] }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    expect(mockInsertValues).toHaveBeenCalledOnce();
  });

  it('空リストでも正常（既存を全削除）', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([])   // existing gear items
      .mockResolvedValueOnce([]);  // updated list
    const res = await PUT(makeRequest('PUT', { items: [] }), makeParams());
    expect(res.status).toBe(200);
    expect(mockDeleteWhere).toHaveBeenCalledOnce();
    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('PUT で used/note が保持される（同一 gear_id が残る場合）', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const existingWithRecord = {
      gear_id: 'gear-1',
      user_race_id: USER_RACE_ID,
      quantity: 1,
      sort_order: 0,
      used: true,
      used_quantity: 1,
      note: 'とても良かった',
    };
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([{ id: 'gear-1' }])       // ownership check
      .mockResolvedValueOnce([existingWithRecord])       // existing items
      .mockResolvedValueOnce([MOCK_GEAR_ITEM]);         // updated list
    await PUT(
      makeRequest('PUT', { items: [{ gear_id: 'gear-1', quantity: 2, sort_order: 0 }] }),
      makeParams(),
    );
    const insertCall = mockInsertValues.mock.calls[0][0];
    expect(insertCall.used).toBe(true);
    expect(insertCall.note).toBe('とても良かった');
  });

  it('PUT で新規 gear_id は used=null, note="" で挿入される', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([{ id: 'gear-new' }])  // ownership check
      .mockResolvedValueOnce([])                      // existing items（既存なし）
      .mockResolvedValueOnce([MOCK_GEAR_ITEM]);
    await PUT(
      makeRequest('PUT', { items: [{ gear_id: 'gear-new', quantity: 1, sort_order: 0 }] }),
      makeParams(),
    );
    const insertCall = mockInsertValues.mock.calls[0][0];
    expect(insertCall.used).toBeNull();
    expect(insertCall.note).toBe('');
  });
});

// ─── PATCH /api/user/races/[raceId]/gear ──────────────────────────────────
describe('PATCH /api/user/races/[raceId]/gear', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await PATCH(makeRequest('PATCH', { gear_id: 'g1', used: true }), makeParams());
    expect(res.status).toBe(401);
  });

  it('user_race が存在しない: 404', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);
    const res = await PATCH(makeRequest('PATCH', { gear_id: 'g1', used: true }), makeParams());
    expect(res.status).toBe(404);
  });

  it('body が不正: 400', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([MOCK_USER_RACE]);
    const res = await PATCH(makeRequest('PATCH', { gear_id: 'g1' }), makeParams());
    expect(res.status).toBe(400);
  });

  it('gear_id がリスト内に存在しない: 404', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([]);  // gear item not found
    const res = await PATCH(makeRequest('PATCH', { gear_id: 'nonexistent', used: true }), makeParams());
    expect(res.status).toBe(404);
  });

  it('使用記録を更新して返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const existingItem = { ...MOCK_GEAR_ITEM, user_race_id: USER_RACE_ID };
    const updatedItem = { ...existingItem, used: true, note: 'good' };
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([existingItem])   // gear item found
      .mockResolvedValueOnce([updatedItem]);   // after update
    const res = await PATCH(
      makeRequest('PATCH', { gear_id: 'gear-1', used: true, note: 'good' }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    expect(mockUpdateWhere).toHaveBeenCalledOnce();
    const body = await res.json();
    expect(body.used).toBe(true);
  });

  it('used=null でリセットできる', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const existingItem = { ...MOCK_GEAR_ITEM, user_race_id: USER_RACE_ID, used: true };
    const resetItem = { ...existingItem, used: null };
    mockSelectRows
      .mockResolvedValueOnce([MOCK_USER_RACE])
      .mockResolvedValueOnce([existingItem])
      .mockResolvedValueOnce([resetItem]);
    const res = await PATCH(
      makeRequest('PATCH', { gear_id: 'gear-1', used: null }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.used).toBeNull();
  });
});
