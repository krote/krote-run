import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ─── モック定義（vi.hoisted でホイスト） ────────────────────────────────────
const { mockGetSession, mockSelectRows, mockInsertValues, mockUpdateSet, mockDeleteWhere } = vi.hoisted(() => {
  const mockSelectRows = vi.fn<[], Promise<unknown[]>>().mockResolvedValue([]);
  const mockInsertValues = vi.fn().mockResolvedValue(undefined);
  const mockUpdateSet = vi.fn();
  const mockDeleteWhere = vi.fn().mockResolvedValue(undefined);

  return {
    mockGetSession: vi.fn(),
    mockSelectRows,
    mockInsertValues,
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

// drizzle mock: select().from().where() を Promise に、insert/update/delete もチェーンに対応
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
    insert: vi.fn(() => ({
      values: mockInsertValues,
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: mockUpdateSet,
      })),
    })),
    delete: vi.fn(() => ({
      where: mockDeleteWhere,
    })),
  })),
}));

// drizzle-orm の eq/and はそのまま値を返すスタブ（他の export は実物を使用）
vi.mock('drizzle-orm', async (importOriginal) => {
  const actual = await importOriginal<typeof import('drizzle-orm')>();
  return {
    ...actual,
    eq: vi.fn((_field: unknown, val: unknown) => val),
    and: vi.fn((...args: unknown[]) => args),
  };
});

// ─── テスト対象インポート ─────────────────────────────────────────────────
import { GET } from '../route';

// ─── テストデータ ──────────────────────────────────────────────────────────
const MOCK_USER = { id: 'user-1', name: 'テストユーザー', email: 'test@example.com' };
const MOCK_ROW = {
  id: 'row-1',
  user_id: 'user-1',
  race_id: 'tokyo-2026',
  is_planning: true,
  is_participated: true,
  planning_category_id: null,
  entry_reminder_period_ids: '[]',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

function makeRequest(headers: Record<string, string> = {}): Request {
  return new Request('http://localhost/api/user/races', { headers });
}

// ─── GET /api/user/races ───────────────────────────────────────────────────
describe('GET /api/user/races', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateSet.mockResolvedValue(undefined);
  });

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);

    const res = await GET(makeRequest());
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe('Unauthorized');
  });

  it('認証済み: 登録大会一覧を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([MOCK_ROW]);

    const res = await GET(makeRequest());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveLength(1);
    expect(body[0].user_id).toBe('user-1');
  });

  it('認証済みで登録なし: 空配列を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValue([]);

    const res = await GET(makeRequest());
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual([]);
  });
});

// ─── 開催日を過ぎた「参加予定」大会の自動「参加済み」遷移 ───────────────────────
describe('GET /api/user/races — 開催日超過時の自動遷移', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateSet.mockResolvedValue(undefined);
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-17T03:00:00Z')); // JST 2026-09-17T12:00
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const makePlanningRow = () => ({
    id: 'row-2',
    user_id: 'user-1',
    race_id: 'mtfuji-climb-run-2026',
    is_planning: true,
    is_participated: false,
    planning_category_id: null,
    entry_reminder_period_ids: '[]',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  });

  it('開催日が過去の「参加予定」大会は is_participated を true に更新してDBに保存する', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([makePlanningRow()])
      .mockResolvedValueOnce([{ id: 'mtfuji-climb-run-2026', date: '2026-09-13' }]);

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(mockUpdateSet).toHaveBeenCalledTimes(1);
    expect(body[0].is_participated).toBe(true);
  });

  it('開催日が未来の「参加予定」大会は更新しない', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows
      .mockResolvedValueOnce([makePlanningRow()])
      .mockResolvedValueOnce([{ id: 'mtfuji-climb-run-2026', date: '2026-12-31' }]);

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(mockUpdateSet).not.toHaveBeenCalled();
    expect(body[0].is_participated).toBe(false);
  });

  it('既に is_participated=true の大会は更新処理の対象にしない（races照会自体をスキップ）', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockSelectRows.mockResolvedValueOnce([MOCK_ROW]);

    const res = await GET(makeRequest());
    await res.json();

    expect(mockSelectRows).toHaveBeenCalledTimes(1);
    expect(mockUpdateSet).not.toHaveBeenCalled();
  });
});
