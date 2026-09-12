// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SettingsPage from '../page';

vi.mock('next-intl', () => ({
  useLocale: () => 'ja',
}));

const STORAGE_KEY = 'hashiru_travel_settings';
const user = userEvent.setup({ delay: null });

beforeEach(() => {
  localStorage.clear();
});

describe('SettingsPage - 初期状態', () => {
  it('タイトルが表示される', () => {
    render(<SettingsPage />);
    expect(screen.getByText('前泊判定の設定')).toBeInTheDocument();
  });

  it('8つのハブボタンが表示される', () => {
    render(<SettingsPage />);
    expect(screen.getByText('東京')).toBeInTheDocument();
    expect(screen.getByText('大阪')).toBeInTheDocument();
    expect(screen.getByText('札幌')).toBeInTheDocument();
    expect(screen.getByText('福岡')).toBeInTheDocument();
  });

  it('未設定時は詳細設定（余裕時間・始発時刻・最寄り駅）が表示されない', () => {
    render(<SettingsPage />);
    expect(screen.queryByLabelText(/余裕時間/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/最寄り駅/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/始発時刻/)).not.toBeInTheDocument();
  });

  it('未設定時はクリアボタンが表示されない', () => {
    render(<SettingsPage />);
    expect(screen.queryByText('クリア')).not.toBeInTheDocument();
  });
});

describe('SettingsPage - ハブ選択', () => {
  it('ハブをクリックすると選択され、詳細設定が表示される', async () => {
    render(<SettingsPage />);
    await user.click(screen.getByText('東京'));
    expect(screen.getByLabelText(/余裕時間/)).toBeInTheDocument();
    expect(screen.getByLabelText(/最寄り駅/)).toBeInTheDocument();
    expect(screen.getByLabelText(/始発時刻/)).toBeInTheDocument();
  });

  it('ハブ選択後、localStorage に hubId が保存される', async () => {
    render(<SettingsPage />);
    await user.click(screen.getByText('東京'));
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.hubId).toBe('tokyo');
  });

  it('クリアボタンで設定が削除され、詳細設定も消える', async () => {
    render(<SettingsPage />);
    await user.click(screen.getByText('東京'));
    await user.click(screen.getByText('クリア'));
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(screen.queryByLabelText(/余裕時間/)).not.toBeInTheDocument();
  });
});

describe('SettingsPage - 詳細設定の編集', () => {
  it('最寄り駅を入力すると localStorage に保存される', async () => {
    render(<SettingsPage />);
    await user.click(screen.getByText('東京'));
    const input = screen.getByLabelText(/最寄り駅/);
    await user.type(input, '新宿駅');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.nearestStation).toBe('新宿駅');
  });

  it('余裕時間を変更すると localStorage に保存される', async () => {
    render(<SettingsPage />);
    await user.click(screen.getByText('東京'));
    const input = screen.getByLabelText(/余裕時間/);
    await user.clear(input);
    await user.type(input, '20');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.offsetMinutes).toBe(20);
  });

  it('始発時刻を変更すると localStorage に保存される', async () => {
    render(<SettingsPage />);
    await user.click(screen.getByText('東京'));
    const input = screen.getByLabelText(/始発時刻/) as HTMLInputElement;
    await user.clear(input);
    await user.type(input, '05:30');
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored.firstTrainTime).toBe('05:30');
  });
});
