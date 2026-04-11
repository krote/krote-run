// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RaceRegistrationButtons from '../races/RaceRegistrationButtons';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'ja',
}));

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
  signIn: { social: vi.fn() },
  signOut: vi.fn(),
}));

const user = userEvent.setup({ delay: null });

const SINGLE_CAT = [{ id: 1, name_ja: 'フルマラソン', name_en: 'Full Marathon', distance_km: 42.195, distance_type: 'full' }];
const MULTI_CAT = [
  { id: 1, name_ja: 'フルマラソン', name_en: 'Full Marathon', distance_km: 42.195, distance_type: 'full' },
  { id: 2, name_ja: 'ハーフマラソン', name_en: 'Half Marathon', distance_km: 21.0975, distance_type: 'half' },
];
const ENTRY_PERIODS = [
  { id: 10, label_ja: '一般エントリー', label_en: 'General', start_date: '2025-10-01' },
];

const BASE_PROPS = {
  raceId: 'tokyo-marathon-2026',
  raceName: '東京マラソン2026',
  raceDate: '2026-03-01',
  categories: SINGLE_CAT,
  entryPeriods: ENTRY_PERIODS,
  today: '2025-09-01',
};

describe('RaceRegistrationButtons — 未ログイン', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({ data: null, isPending: false });
  });

  it('ボタンが表示されない', () => {
    render(<RaceRegistrationButtons {...BASE_PROPS} />);
    expect(screen.queryByText('参加予定')).not.toBeInTheDocument();
  });
});

describe('RaceRegistrationButtons — ローディング中', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({ data: null, isPending: true });
  });

  it('ボタンが表示されない', () => {
    render(<RaceRegistrationButtons {...BASE_PROPS} />);
    expect(screen.queryByText('参加予定')).not.toBeInTheDocument();
  });
});

describe('RaceRegistrationButtons — ログイン済み', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: { user: { id: 'u1', name: 'テスト', email: 'test@example.com', image: null } },
      isPending: false,
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => null,
    }));
  });

  it('参加予定ボタンと受付開始リマインドボタンが表示される', async () => {
    render(<RaceRegistrationButtons {...BASE_PROPS} />);
    await waitFor(() => {
      expect(screen.getByText(/参加予定/)).toBeInTheDocument();
      expect(screen.getByText(/受付開始リマインド/)).toBeInTheDocument();
    });
  });

  it('entryPeriods が空の場合、受付開始リマインドボタンが非表示', async () => {
    render(<RaceRegistrationButtons {...BASE_PROPS} entryPeriods={[]} />);
    await waitFor(() => {
      expect(screen.getByText(/参加予定/)).toBeInTheDocument();
    });
    expect(screen.queryByText(/受付開始リマインド/)).not.toBeInTheDocument();
  });

  it('参加予定ボタンをクリックすると PATCH が呼ばれる', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => null })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ is_planning: true, planning_category_id: 1, entry_reminder_period_ids: '[]' }) });
    vi.stubGlobal('fetch', fetchMock);

    render(<RaceRegistrationButtons {...BASE_PROPS} />);
    await waitFor(() => screen.getByText(/参加予定/));
    await user.click(screen.getByText(/参加予定/));

    expect(fetchMock).toHaveBeenCalledWith(
      `/api/user/races/${BASE_PROPS.raceId}`,
      expect.objectContaining({ method: 'PATCH' }),
    );
  });

  it('参加予定登録済みの場合、ボタンがアクティブスタイルになる', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ is_planning: true, planning_category_id: 1, entry_reminder_period_ids: '[]' }),
    }));

    render(<RaceRegistrationButtons {...BASE_PROPS} />);
    await waitFor(() => {
      const btn = screen.getByText(/参加予定/).closest('button');
      expect(btn).toHaveStyle({ background: 'white' });
    });
  });

  it('カテゴリ複数の場合、ドロップダウンが表示される', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => null,
    }));

    render(<RaceRegistrationButtons {...BASE_PROPS} categories={MULTI_CAT} />);
    await waitFor(() => screen.getByText(/参加予定/));
    await user.click(screen.getByText(/参加予定/));

    await waitFor(() => {
      expect(screen.getByText('フルマラソン')).toBeInTheDocument();
      expect(screen.getByText('ハーフマラソン')).toBeInTheDocument();
    });
  });

  it('リマインドボタンをクリックすると entry_reminder_period_ids を含む PATCH が呼ばれる', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => null })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ is_planning: false, planning_category_id: null, entry_reminder_period_ids: '[10]' }) });
    vi.stubGlobal('fetch', fetchMock);

    render(<RaceRegistrationButtons {...BASE_PROPS} />);
    await waitFor(() => screen.getByText(/受付開始リマインド/));
    await user.click(screen.getByText(/受付開始リマインド/));

    const body = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(body.entry_reminder_period_ids).toContain(10);
  });
});
