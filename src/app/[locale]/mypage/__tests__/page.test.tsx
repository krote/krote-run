// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyPage from '../page';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'ja',
}));

vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/mypage',
  useRouter: () => ({ replace: vi.fn() }),
}));

const { mockUseSession, mockSignOut } = vi.hoisted(() => ({
  mockUseSession: vi.fn(),
  mockSignOut: vi.fn(),
}));

vi.mock('@/lib/auth-client', () => ({
  useSession: () => mockUseSession(),
  signOut: mockSignOut,
}));

vi.mock('@/components/mypage/UserRaceList', () => ({
  default: () => <div>UserRaceList</div>,
}));

vi.mock('@/components/mypage/GearList', () => ({
  default: () => <div>GearList</div>,
}));

const STORAGE_KEY = 'hashiru_travel_settings';
const user = userEvent.setup({ delay: null });

beforeEach(() => {
  localStorage.clear();
  mockUseSession.mockReturnValue({ data: null, isPending: false });
});

describe('MyPage - 前泊設定セクション', () => {
  it('前泊判定の出発地セクションが表示される', () => {
    render(<MyPage />);
    expect(screen.getByText('東京')).toBeInTheDocument();
    expect(screen.getByText('大阪')).toBeInTheDocument();
    expect(screen.getByText('札幌')).toBeInTheDocument();
    expect(screen.getByText('福岡')).toBeInTheDocument();
  });

  it('未設定時は詳細設定（余裕時間・始発時刻・最寄り駅）が表示されない', () => {
    render(<MyPage />);
    expect(screen.queryByLabelText(/余裕時間/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/最寄り駅/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/始発時刻/)).not.toBeInTheDocument();
  });

  it('ハブをクリックすると選択され、詳細設定が表示される', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    expect(screen.getByLabelText(/余裕時間/)).toBeInTheDocument();
    expect(screen.getByLabelText(/最寄り駅/)).toBeInTheDocument();
    expect(screen.getByLabelText(/始発時刻/)).toBeInTheDocument();
  });

  it('ハブ選択後、localStorage に hubId が保存される', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.hubId).toBe('tokyo');
  });

  it('最寄り駅を入力すると localStorage に保存される', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    const input = screen.getByLabelText(/最寄り駅/);
    await user.type(input, '新宿駅');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.nearestStation).toBe('新宿駅');
  });

  it('クリアボタンで設定が削除され、詳細設定も消える', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    await user.click(screen.getByText('クリア'));
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(screen.queryByLabelText(/余裕時間/)).not.toBeInTheDocument();
  });
});
