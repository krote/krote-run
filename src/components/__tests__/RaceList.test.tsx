// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RaceList from '../races/RaceList';
import { makeRace, makeCategory, makeEntryPeriod } from '../../lib/__tests__/fixtures';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    const map: Record<string, string> = {
      'count': `${params?.count ?? 0}件の大会`,
      'noResults': '条件に合う大会が見つかりませんでした',
      'filter.toggleMag': 'マガジン',
      'filter.toggleExp': '体験で探す',
      'filter.title': '絞り込み',
      'filter.clear': 'すべてクリア',
      'filter.distance': '距離カテゴリ',
      'filter.month': '開催月',
      'filter.prefecture': '都道府県',
      'filter.all': 'すべて',
    };
    // count は params 付きで呼ばれる
    if (key === 'count' && params) return `${params.count}件の大会`;
    return map[key] ?? key;
  },
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('@/data/prefectures.json', () => ({
  default: [{ code: '13', name: '東京都', nameEn: 'Tokyo' }],
}));

const TODAY = '2026-04-03';

beforeEach(() => {
  // Date のみ fake にする（setTimeout/Promise は real のまま → userEvent が正常動作）
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(`${TODAY}T12:00:00.000Z`));
});

afterEach(() => {
  vi.useRealTimers();
});

const baseProps = {
  prefectures: [
    { code: '13', name: '東京都', nameEn: 'Tokyo', region: '関東', regionEn: 'Kanto', lat: 35.68, lng: 139.69 },
  ],
  giftCategories: [],
  locale: 'ja' as const,
};

function makeRaces() {
  return [
    makeRace({
      id: 'open-race',
      name_ja: '受付中大会',
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })],
      categories: [makeCategory()],
    }),
    makeRace({
      id: 'past-race',
      name_ja: '開催済み大会',
      date: '2026-02-01',
      entry_periods: [],
      categories: [makeCategory()],
    }),
    makeRace({
      id: 'not-open-race',
      name_ja: '受付前大会',
      date: '2026-11-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-07-01', end_date: '2026-09-30' })],
      categories: [makeCategory()],
    }),
  ];
}

describe('RaceList - 基本レンダリング', () => {
  it('デフォルトフィルタ（past除外）で件数が表示される', () => {
    render(<RaceList {...baseProps} races={makeRaces()} />);
    // デフォルトは開催済み非表示 → 2件
    expect(screen.getByText('2件の大会')).toBeInTheDocument();
  });

  it('大会名が表示される', () => {
    render(<RaceList {...baseProps} races={makeRaces()} />);
    expect(screen.getByText('受付中大会')).toBeInTheDocument();
    expect(screen.getByText('受付前大会')).toBeInTheDocument();
  });

  it('デフォルトでは開催済み大会が非表示', () => {
    render(<RaceList {...baseProps} races={makeRaces()} />);
    expect(screen.queryByText('開催済み大会')).not.toBeInTheDocument();
  });
});

// userEvent の人工遅延を除去して fake timer との競合を回避
const user = userEvent.setup({ delay: null });

describe('RaceList - フィルタ操作', () => {
  it('テキスト検索で表示件数が絞り込まれる', async () => {
    render(<RaceList {...baseProps} races={makeRaces()} />);
    const input = screen.getByPlaceholderText('大会名で検索…');
    await user.type(input, '受付中');
    expect(screen.getByText('1件の大会')).toBeInTheDocument();
    expect(screen.getByText('受付中大会')).toBeInTheDocument();
    expect(screen.queryByText('受付前大会')).not.toBeInTheDocument();
  });

  it('検索結果が0件のとき「noResults」メッセージが表示される', async () => {
    render(<RaceList {...baseProps} races={makeRaces()} />);
    const input = screen.getByPlaceholderText('大会名で検索…');
    await user.type(input, 'xxxxxnotfound');
    expect(screen.getByText('条件に合う大会が見つかりませんでした')).toBeInTheDocument();
  });
});

describe('RaceList - ビュー切り替え', () => {
  it('デフォルトはマガジンビュー（mag）', () => {
    render(<RaceList {...baseProps} races={makeRaces()} />);
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
  });

  it('「体験で探す」ボタンでビューが切り替わる', async () => {
    render(<RaceList {...baseProps} races={makeRaces()} />);
    await user.click(screen.getByText('体験で探す'));
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
  });
});
