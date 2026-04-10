// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../layout/Header';

// next-intl モック
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      'races': '大会一覧',
      'calendar': 'カレンダー',
      'mypage': 'マイページ',
      'login': 'ログイン',
      'logout': 'ログアウト',
      'loginTitle': 'ログイン',
      'loginWithGoogle': 'Googleでログイン',
      'loginWithPasskey': 'パスキーでログイン',
      'loginOptional': 'ログインはオプションです。',
    };
    return map[key] ?? key;
  },
  useLocale: () => 'ja',
}));

// @/i18n/navigation モック
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
  usePathname: () => '/races',
}));

// vi.mock はホイストされるため、vi.hoisted() で変数を事前定義する
const { mockSignIn, mockSignOut, mockUseSession } = vi.hoisted(() => ({
  mockSignIn: { social: vi.fn() },
  mockSignOut: vi.fn(),
  mockUseSession: vi.fn(),
}));

vi.mock('@/lib/auth-client', () => ({
  useSession: () => mockUseSession(),
  signIn: mockSignIn,
  signOut: mockSignOut,
}));

const user = userEvent.setup({ delay: null });

describe('Header - 未ログイン状態', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({ data: null, isPending: false });
  });

  it('ログインボタンが表示される', () => {
    render(<Header />);
    expect(screen.getByText('ログイン')).toBeInTheDocument();
  });

  it('ナビゲーションリンクが表示される', () => {
    render(<Header />);
    expect(screen.getAllByText('大会一覧').length).toBeGreaterThan(0);
    expect(screen.getAllByText('カレンダー').length).toBeGreaterThan(0);
  });

  it('ログインボタンをクリックするとドロップダウンが開く', async () => {
    render(<Header />);
    await user.click(screen.getByText('ログイン'));
    expect(screen.getByText('Googleでログイン')).toBeInTheDocument();
  });

  it('Googleでログインをクリックすると signIn.social が呼ばれる', async () => {
    render(<Header />);
    await user.click(screen.getByText('ログイン'));
    await user.click(screen.getByText('Googleでログイン'));
    expect(mockSignIn.social).toHaveBeenCalledWith({ provider: 'google' });
  });

  it('ドロップダウン外をクリックすると閉じる', async () => {
    render(<Header />);
    await user.click(screen.getByText('ログイン'));
    expect(screen.getByText('Googleでログイン')).toBeInTheDocument();
    // backdrop div（fixed inset-0）をクリック
    const backdrop = document.querySelector('.fixed.inset-0') as HTMLElement;
    await user.click(backdrop);
    expect(screen.queryByText('Googleでログイン')).not.toBeInTheDocument();
  });
});

describe('Header - ローディング状態', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({ data: null, isPending: true });
  });

  it('ローディング中はログインボタンもアバターも表示されない', () => {
    render(<Header />);
    expect(screen.queryByText('ログイン')).not.toBeInTheDocument();
    // animate-pulse のスケルトンが表示される
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
  });
});

describe('Header - ログイン済み状態', () => {
  beforeEach(() => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: 'user-1',
          name: 'テストユーザー',
          email: 'test@example.com',
          image: null,
        },
        session: { id: 'session-1' },
      },
      isPending: false,
    });
  });

  it('ログインボタンが表示されない', () => {
    render(<Header />);
    expect(screen.queryByText('ログイン')).not.toBeInTheDocument();
  });

  it('ユーザーイニシャルが表示される', () => {
    render(<Header />);
    // name の先頭文字（テ）がアバターに表示される
    expect(screen.getByText('テ')).toBeInTheDocument();
  });

  it('アバタークリックでドロップダウンが開く', async () => {
    render(<Header />);
    await user.click(screen.getByLabelText('User menu'));
    expect(screen.getByText('マイページ')).toBeInTheDocument();
    expect(screen.getByText('ログアウト')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('ログアウトをクリックすると signOut が呼ばれる', async () => {
    render(<Header />);
    await user.click(screen.getByLabelText('User menu'));
    await user.click(screen.getByText('ログアウト'));
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('アバターに画像がある場合は img が表示される', () => {
    mockUseSession.mockReturnValue({
      data: {
        user: {
          id: 'user-1',
          name: 'テストユーザー',
          email: 'test@example.com',
          image: 'https://example.com/avatar.jpg',
        },
        session: { id: 'session-1' },
      },
      isPending: false,
    });
    render(<Header />);
    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.src).toBe('https://example.com/avatar.jpg');
  });
});
