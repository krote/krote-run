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

describe('MyPage - 前泊設定セクションの入力順序', () => {
  it('ハブ未選択でも最寄り駅・始発時刻の入力欄が表示される', () => {
    render(<MyPage />);
    expect(screen.getByLabelText(/最寄り駅/)).toBeInTheDocument();
    expect(screen.getByLabelText(/始発時刻/)).toBeInTheDocument();
  });

  it('8つのハブボタンが表示される', () => {
    render(<MyPage />);
    expect(screen.getByText('東京')).toBeInTheDocument();
    expect(screen.getByText('大阪')).toBeInTheDocument();
    expect(screen.getByText('札幌')).toBeInTheDocument();
    expect(screen.getByText('福岡')).toBeInTheDocument();
  });

  it('ハブ未選択時は「ハブ駅までの移動時間＋余裕時間」欄が表示されない', () => {
    render(<MyPage />);
    expect(screen.queryByLabelText(/ハブ駅までの移動時間/)).not.toBeInTheDocument();
  });

  it('ハブ未選択時はクリアボタンが表示されない', () => {
    render(<MyPage />);
    expect(screen.queryByText('クリア')).not.toBeInTheDocument();
  });

  it('ハブをクリックすると選択され、「ハブ駅までの移動時間＋余裕時間」欄が表示される', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    expect(screen.getByLabelText(/ハブ駅までの移動時間/)).toBeInTheDocument();
  });

  it('ハブ選択後、localStorage に hubId が保存される', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.hubId).toBe('tokyo');
  });
});

describe('MyPage - ハブ選択前の下書き入力', () => {
  it('ハブ選択前に最寄り駅を入力しても localStorage には保存されない', async () => {
    render(<MyPage />);
    const input = screen.getByLabelText(/最寄り駅/);
    await user.type(input, '新宿駅');
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('ハブ選択前に入力した最寄り駅は、ハブ選択時に localStorage へ引き継がれる', async () => {
    render(<MyPage />);
    const input = screen.getByLabelText(/最寄り駅/);
    await user.type(input, '新宿駅');
    await user.click(screen.getByText('東京'));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.nearestStation).toBe('新宿駅');
  });

  it('ハブ選択前に入力した始発時刻は、ハブ選択時に localStorage へ引き継がれる', async () => {
    render(<MyPage />);
    const input = screen.getByLabelText(/始発時刻/) as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '05:30');
    await user.click(screen.getByText('東京'));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.firstTrainTime).toBe('05:30');
  });
});

describe('MyPage - ハブ選択後の編集', () => {
  it('最寄り駅を入力すると localStorage に保存される', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    const input = screen.getByLabelText(/最寄り駅/);
    await user.type(input, '新宿駅');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.nearestStation).toBe('新宿駅');
  });

  it('「ハブ駅までの移動時間＋余裕時間」を変更すると localStorage に保存される', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    const input = screen.getByLabelText(/ハブ駅までの移動時間/);
    await user.clear(input);
    await user.type(input, '20');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.offsetMinutes).toBe(20);
  });

  it('始発時刻を変更すると localStorage に保存される', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    const input = screen.getByLabelText(/始発時刻/) as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '05:30');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.firstTrainTime).toBe('05:30');
  });

  it('クリアボタンで設定が削除され、「ハブ駅までの移動時間＋余裕時間」欄も消える', async () => {
    render(<MyPage />);
    await user.click(screen.getByText('東京'));
    await user.click(screen.getByText('クリア'));
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(screen.queryByLabelText(/ハブ駅までの移動時間/)).not.toBeInTheDocument();
  });

  it('クリア後も最寄り駅の入力内容は表示され続ける', async () => {
    render(<MyPage />);
    const stationInput = screen.getByLabelText(/最寄り駅/);
    await user.type(stationInput, '新宿駅');
    await user.click(screen.getByText('東京'));
    await user.click(screen.getByText('クリア'));
    expect(screen.getByLabelText(/最寄り駅/)).toHaveValue('新宿駅');
  });
});
