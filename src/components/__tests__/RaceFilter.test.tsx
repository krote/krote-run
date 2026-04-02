// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RaceFilter from '../races/RaceFilter';
import { defaultFilter, emptyFilter } from '../../lib/utils';
import type { RaceFilter as RaceFilterType } from '../../lib/types';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      title: '絞り込み',
      clear: 'すべてクリア',
      distance: '距離カテゴリ',
      month: '開催月',
      prefecture: '都道府県',
      all: 'すべて',
    };
    return map[key] ?? key;
  },
}));

const user = userEvent.setup({ delay: null });

const defaultProps = {
  filter: defaultFilter(),
  prefectures: [
    { code: '13', name: '東京都', nameEn: 'Tokyo', region: '関東', regionEn: 'Kanto', lat: 35.68, lng: 139.69 },
    { code: '27', name: '大阪府', nameEn: 'Osaka', region: '近畿', regionEn: 'Kinki', lat: 34.69, lng: 135.50 },
  ],
  giftCategories: [
    { id: 'medal' as const, name_ja: 'メダル', name_en: 'Medal', icon: '🥇' },
  ],
  availableTags: ['フラット', '景色が良い'],
  locale: 'ja',
  onChange: vi.fn(),
};

describe('RaceFilter - 基本レンダリング', () => {
  it('タイトルが表示される', () => {
    render(<RaceFilter {...defaultProps} />);
    expect(screen.getByText('絞り込み')).toBeInTheDocument();
  });

  it('ステータスピルが4つ表示される', () => {
    render(<RaceFilter {...defaultProps} />);
    expect(screen.getByText('受付中')).toBeInTheDocument();
    expect(screen.getByText('受付前')).toBeInTheDocument();
    expect(screen.getByText('受付終了')).toBeInTheDocument();
    expect(screen.getByText('開催済み')).toBeInTheDocument();
  });

  it('都道府県の選択肢が表示される', () => {
    render(<RaceFilter {...defaultProps} />);
    expect(screen.getByText('東京都')).toBeInTheDocument();
    expect(screen.getByText('大阪府')).toBeInTheDocument();
  });

  it('タグが表示される', () => {
    render(<RaceFilter {...defaultProps} />);
    expect(screen.getByText('フラット')).toBeInTheDocument();
    expect(screen.getByText('景色が良い')).toBeInTheDocument();
  });
});

describe('RaceFilter - クリアボタン', () => {
  it('デフォルトフィルタでは「クリア」ボタンが表示されない', () => {
    render(<RaceFilter {...defaultProps} filter={defaultFilter()} />);
    expect(screen.queryByText('すべてクリア')).not.toBeInTheDocument();
  });

  it('フィルタ変更後は「クリア」ボタンが表示される', () => {
    const modified: RaceFilterType = { ...defaultFilter(), prefecture: '13' };
    render(<RaceFilter {...defaultProps} filter={modified} />);
    expect(screen.getByText('すべてクリア')).toBeInTheDocument();
  });

  it('クリアボタンクリックで onChange が defaultFilter() を渡して呼ばれる', async () => {
    const onChange = vi.fn();
    const modified: RaceFilterType = { ...defaultFilter(), prefecture: '13' };
    render(<RaceFilter {...defaultProps} filter={modified} onChange={onChange} />);
    await user.click(screen.getByText('すべてクリア'));
    expect(onChange).toHaveBeenCalledWith(defaultFilter());
  });
});

describe('RaceFilter - インタラクション', () => {
  it('テキスト入力で onChange が呼ばれる', async () => {
    const onChange = vi.fn();
    render(<RaceFilter {...defaultProps} onChange={onChange} />);
    const input = screen.getByPlaceholderText('大会名で検索…');
    // controlled component のため1文字ずつ検証
    await user.type(input, '東');
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ searchText: '東' }));
  });

  it('月ボタンクリックで onChange が正しい月を渡して呼ばれる', async () => {
    const onChange = vi.fn();
    render(<RaceFilter {...defaultProps} onChange={onChange} />);
    await user.click(screen.getByText('4月'));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ month: 4 }));
  });

  it('選択済みの月を再クリックすると month が null に戻る', async () => {
    const onChange = vi.fn();
    const withMonth: RaceFilterType = { ...defaultFilter(), month: 4 };
    render(<RaceFilter {...defaultProps} filter={withMonth} onChange={onChange} />);
    await user.click(screen.getByText('4月'));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ month: null }));
  });

  it('ステータスピルクリックで onChange が呼ばれる', async () => {
    const onChange = vi.fn();
    render(<RaceFilter {...defaultProps} onChange={onChange} />);
    // デフォルトは3ステータス選択済み。「開催済み」をクリックして追加
    await user.click(screen.getByText('開催済み'));
    expect(onChange).toHaveBeenCalled();
  });

  it('都道府県セレクト変更で onChange が呼ばれる', async () => {
    const onChange = vi.fn();
    render(<RaceFilter {...defaultProps} onChange={onChange} />);
    await user.selectOptions(screen.getByRole('combobox'), '13');
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ prefecture: '13' }));
  });
});
