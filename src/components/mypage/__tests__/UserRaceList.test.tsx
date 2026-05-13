// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import UserRaceList from '../UserRaceList';

// ─── モック ──────────────────────────────────────────────────────────────────
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const { mockUseSession } = vi.hoisted(() => ({
  mockUseSession: vi.fn(),
}));

vi.mock('@/lib/auth-client', () => ({
  useSession: () => mockUseSession(),
}));

// ─── テストデータ ──────────────────────────────────────────────────────────────
function makeRow(overrides: Partial<{
  id: string;
  race_id: string;
  is_planning: boolean;
  planning_category_id: number | null;
  entry_reminder_period_ids: string;
  gcal_race_event_id: string | null;
  gcal_entry_event_ids: string;
  created_at: string;
}> = {}) {
  return {
    id: 'row-1',
    race_id: 'tokyo-2026',
    is_planning: false,
    planning_category_id: null,
    entry_reminder_period_ids: '[]',
    gcal_race_event_id: null,
    gcal_entry_event_ids: '[]',
    created_at: '2026-01-01T00:00:00Z',
    ...overrides,
  };
}

const RACE_INFO = {
  id: 'tokyo-2026',
  name_ja: '東京マラソン2026',
  full_name_ja: null,
  date: '2026-03-01',
  categories: [
    { id: 1, name_ja: 'フルマラソン', distance_km: 42.195, distance_type: 'full' },
    { id: 2, name_ja: null, distance_km: 10, distance_type: 'short' },
  ],
};

const MOCK_SESSION = { user: { id: 'user-1', name: 'テスト', email: 'test@example.com' } };

function setupFetch(userRaces: unknown[], races: unknown[] = [RACE_INFO]) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/user/races')) {
        return Promise.resolve({ ok: true, json: async () => userRaces });
      }
      if (url.includes('/api/races/index')) {
        return Promise.resolve({ ok: true, json: async () => races });
      }
      return Promise.resolve({ ok: false, json: async () => [] });
    }),
  );
}

// ─── テスト ──────────────────────────────────────────────────────────────────
describe('UserRaceList — セッション状態', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未ログイン（session=null）: 何も描画しない', () => {
    mockUseSession.mockReturnValue({ data: null });

    const { container } = render(<UserRaceList />);
    expect(container.firstChild).toBeNull();
  });

  it('ローディング中: スケルトン UI を表示する', async () => {
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
    // fetch を解決させない（Promise.race で pending のまま）
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));

    render(<UserRaceList />);
    // animate-pulse のスケルトンが表示される
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});

describe('UserRaceList — データ表示', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
  });

  it('登録大会なし: 「登録している大会はありません。」を表示', async () => {
    setupFetch([]);

    render(<UserRaceList />);
    await waitFor(() => {
      expect(screen.getByText('登録している大会はありません。')).toBeInTheDocument();
    });
  });

  it('is_planning=true の大会は「参加予定」セクションに表示される', async () => {
    setupFetch([makeRow({ is_planning: true, race_id: 'tokyo-2026' })]);

    render(<UserRaceList />);
    await waitFor(() => {
      expect(screen.getByText('参加予定')).toBeInTheDocument();
      expect(screen.getByText('東京マラソン2026')).toBeInTheDocument();
    });
  });

  it('entry_reminder_period_ids が空でなく is_planning=false の大会は「受付開始リマインドのみ」に表示される', async () => {
    setupFetch([makeRow({ is_planning: false, entry_reminder_period_ids: '[10]' })]);

    render(<UserRaceList />);
    await waitFor(() => {
      expect(screen.getByText('受付開始リマインドのみ')).toBeInTheDocument();
      expect(screen.getByText('東京マラソン2026')).toBeInTheDocument();
    });
  });

  it('is_planning=false かつ entry_reminder_period_ids が空の大会は表示されない', async () => {
    // rows.length > 0 だが planning も reminder も条件を満たさない
    // → 「登録している大会はありません。」も出ないが、セクションタイトルも出ない
    setupFetch([makeRow({ is_planning: false, entry_reminder_period_ids: '[]' })]);

    render(<UserRaceList />);
    await waitFor(() => {
      expect(screen.queryByText('参加予定')).not.toBeInTheDocument();
      expect(screen.queryByText('受付開始リマインドのみ')).not.toBeInTheDocument();
    });
  });
});

describe('UserRaceList — getCatLabel ヘルパー', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
  });

  it('name_ja がある場合はその名前を使用', async () => {
    setupFetch([
      makeRow({ is_planning: true, planning_category_id: 1 }),
    ]);

    render(<UserRaceList />);
    await waitFor(() => {
      // カテゴリ id=1 は name_ja='フルマラソン'
      expect(screen.getByText(/フルマラソン/)).toBeInTheDocument();
    });
  });

  it('name_ja が null の場合は distance_km km を使用', async () => {
    setupFetch([
      makeRow({ is_planning: true, planning_category_id: 2 }),
    ]);

    render(<UserRaceList />);
    await waitFor(() => {
      // カテゴリ id=2 は name_ja=null, distance_km=10 → "10km"
      expect(screen.getByText(/10km/)).toBeInTheDocument();
    });
  });
});

describe('UserRaceList — 大会名解決', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseSession.mockReturnValue({ data: MOCK_SESSION });
  });

  it('raceMap に存在する race_id は大会名・日付を表示', async () => {
    setupFetch([makeRow({ is_planning: true })]);

    render(<UserRaceList />);
    await waitFor(() => {
      expect(screen.getByText('東京マラソン2026')).toBeInTheDocument();
      expect(screen.getByText('2026-03-01')).toBeInTheDocument();
    });
  });

  it('raceMap に存在しない race_id は race_id をそのまま表示（フォールバック）', async () => {
    setupFetch(
      [makeRow({ is_planning: true, race_id: 'unknown-race-999' })],
      [], // racesIndex は空
    );

    render(<UserRaceList />);
    await waitFor(() => {
      expect(screen.getByText('unknown-race-999')).toBeInTheDocument();
    });
  });
});
