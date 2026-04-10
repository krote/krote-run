// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RaceRegistrationButtons from '../races/RaceRegistrationButtons';

// next-intl モック（Link は不使用だが念のため）
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

const BASE_PROPS = {
  raceId: 'tokyo-marathon-2026',
  raceName: '東京マラソン2026',
  raceDate: '2026-03-01',
  entryStartDate: '2025-10-01',
  today: '2025-09-01', // entry_start_date より前
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
    // 登録状態は null（未登録）
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

  it('entry_start_date が過去の場合、受付開始リマインドボタンが非表示', async () => {
    render(
      <RaceRegistrationButtons
        {...BASE_PROPS}
        entryStartDate="2025-08-01" // today より前
      />,
    );
    await waitFor(() => {
      expect(screen.getByText(/参加予定/)).toBeInTheDocument();
    });
    expect(screen.queryByText(/受付開始リマインド/)).not.toBeInTheDocument();
  });

  it('entry_start_date が null の場合、受付開始リマインドボタンが非表示', async () => {
    render(<RaceRegistrationButtons {...BASE_PROPS} entryStartDate={null} />);
    await waitFor(() => {
      expect(screen.getByText(/参加予定/)).toBeInTheDocument();
    });
    expect(screen.queryByText(/受付開始リマインド/)).not.toBeInTheDocument();
  });

  it('参加予定ボタンをクリックすると PATCH が呼ばれる', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => null }) // GET (初期状態)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ is_planning: true, entry_reminder: false }) }); // PATCH
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
      json: async () => ({ is_planning: true, entry_reminder: false }),
    }));

    render(<RaceRegistrationButtons {...BASE_PROPS} />);
    await waitFor(() => {
      const btn = screen.getByText(/参加予定/).closest('button');
      expect(btn).toHaveStyle({ background: 'var(--color-ink)' });
    });
  });
});
