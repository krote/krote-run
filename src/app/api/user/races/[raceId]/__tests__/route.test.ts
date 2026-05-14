import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── モック定義（vi.hoisted でホイスト） ────────────────────────────────────
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
  drizzle: vi.fn(() => ({
    select: vi.fn(() => ({
      from: vi.fn(() => ({
        where: vi.fn(() => {
          // Promise を一度だけ生成し、await / .limit() 両方で使いまわす
          const rowsPromise = mockSelectRows();
          return Object.assign(rowsPromise, {
            limit: vi.fn((n: number) => rowsPromise.then((rows: unknown[]) => rows.slice(0, n))),
          });
        }),
      })),
    })),
    insert: vi.fn(() => ({
      values: mockInsertValues,
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: mockUpdateWhere,
      })),
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

// ─── テスト対象インポート ─────────────────────────────────────────────────
import { GET, PATCH, DELETE } from '../route';

// ─── テストデータ ──────────────────────────────────────────────────────────
const MOCK_USER = { id: 'user-1', name: 'テスト', email: 'test@example.com' };
const RACE_ID = 'tokyo-2026';
const MOCK_ROW = {
  id: 'row-1',
  user_id: 'user-1',
  race_id: RACE_ID,
  is_planning: false,
  planning_category_id: null,
  entry_reminder_period_ids: '[]',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

function makeRequest(method = 'GET', body?: unknown): Request {
  return new Request(`http://localhost/api/user/races/${RACE_ID}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

function makeParams(raceId = RACE_ID) {
  return { params: Promise.resolve({ raceId }) };
}

// ─── GET /api/user/races/[raceId] ─────────────────────────────────────────
describe('GET /api/user/races/[raceId]', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);

    const res = await GET(makeRequest(), makeParams());
    expect(res.status).toBe(401);
  });

  it('登録あり: 登録情報を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([MOCK_ROW]);

    const res = await GET(makeRequest(), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.race_id).toBe(RACE_ID);
  });

  it('登録なし: null を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);

    const res = await GET(makeRequest(), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toBeNull();
  });
});

// ─── PATCH /api/user/races/[raceId] ───────────────────────────────────────
describe('PATCH /api/user/races/[raceId]', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);

    const res = await PATCH(makeRequest('PATCH', { is_planning: true }), makeParams());
    expect(res.status).toBe(401);
  });

  it('新規登録（レコードなし）: INSERT して更新後データを返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    // 1回目: existing なし, 2回目: insert 後の取得
    const inserted = { ...MOCK_ROW, is_planning: true };
    mockSelectRows
      .mockResolvedValueOnce([])     // existing check
      .mockResolvedValueOnce([inserted]); // fetch after insert

    const res = await PATCH(makeRequest('PATCH', { is_planning: true }), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.is_planning).toBe(true);
    expect(mockInsertValues).toHaveBeenCalledOnce();
  });

  it('既存更新（レコードあり）: UPDATE して更新後データを返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const updated = { ...MOCK_ROW, is_planning: true };
    mockSelectRows
      .mockResolvedValueOnce([MOCK_ROW]) // existing check
      .mockResolvedValueOnce([updated]); // fetch after update

    const res = await PATCH(makeRequest('PATCH', { is_planning: true }), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.is_planning).toBe(true);
    expect(mockUpdateWhere).toHaveBeenCalledOnce();
    expect(mockInsertValues).not.toHaveBeenCalled();
  });

  it('entry_reminder_period_ids の部分更新が機能する', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const updated = { ...MOCK_ROW, entry_reminder_period_ids: '[10,20]' };
    mockSelectRows
      .mockResolvedValueOnce([MOCK_ROW])
      .mockResolvedValueOnce([updated]);

    const res = await PATCH(
      makeRequest('PATCH', { entry_reminder_period_ids: [10, 20] }),
      makeParams(),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.entry_reminder_period_ids).toBe('[10,20]');
  });
});

// ─── DELETE /api/user/races/[raceId] ──────────────────────────────────────
describe('DELETE /api/user/races/[raceId]', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);

    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(401);
  });

  it('認証済み: レコードを削除して { ok: true } を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });

    const res = await DELETE(makeRequest('DELETE'), makeParams());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true });
    expect(mockDeleteWhere).toHaveBeenCalledOnce();
  });
});

// ─── parseIds ユーティリティ（内部関数の動作確認） ───────────────────────
describe('parseIds（PATCH 経由の動作確認）', () => {
  beforeEach(() => vi.clearAllMocks());

  it('不正な JSON を持つ既存レコードがあっても空配列として扱われる', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const existingWithBadJson = { ...MOCK_ROW, entry_reminder_period_ids: 'NOT_JSON' };
    const updated = { ...MOCK_ROW, entry_reminder_period_ids: '[]' };
    mockSelectRows
      .mockResolvedValueOnce([existingWithBadJson])
      .mockResolvedValueOnce([updated]);

    // entry_reminder_period_ids を明示しないと既存値を parseIds で解析する
    const res = await PATCH(makeRequest('PATCH', { is_planning: false }), makeParams());
    expect(res.status).toBe(200);
    // parseIds が [] を返し、JSON.stringify([]) = '[]' として update が呼ばれる
    expect(mockUpdateWhere).toHaveBeenCalledOnce();
  });
});
