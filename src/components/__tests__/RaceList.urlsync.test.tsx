// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RaceList from '../races/RaceList';
import { makeRace, makeCategory } from '../../lib/__tests__/fixtures';

/**
 * フィルタは全てクライアント側で処理しているのに、URL同期に next-intl の router.replace を
 * 使うと1文字入力するたびにサーバーへRSCリクエストが飛び、1MB超の大会一覧が毎回
 * サーバーでレンダリングされる。URLの書き換えは history.replaceState で行う。
 */
const routerReplace = vi.fn();
const routerPush = vi.fn();

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === 'count' && params) return `${params.count}件の大会`;
    return key;
  },
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
  useRouter: () => ({ replace: routerReplace, push: routerPush, back: vi.fn() }),
  usePathname: () => '/races',
}));

vi.mock('@/data/prefectures.json', () => ({
  default: [{ code: '13', name: '東京都', nameEn: 'Tokyo' }],
}));

const baseProps = {
  prefectures: [
    { code: '13', name: '東京都', nameEn: 'Tokyo', region: '関東', regionEn: 'Kanto', lat: 35.68, lng: 139.69 },
  ],
  giftCategories: [],
  locale: 'ja' as const,
};

const races = [
  makeRace({ id: 'tokyo-marathon-2027', name_ja: '東京マラソン', date: '2026-10-01', categories: [makeCategory()] }),
  makeRace({ id: 'osaka-marathon-2027', name_ja: '大阪マラソン', date: '2026-11-01', categories: [makeCategory()] }),
];

const user = userEvent.setup({ delay: null });
let replaceStateSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  localStorage.clear();
  routerReplace.mockClear();
  routerPush.mockClear();
  window.history.replaceState(null, '', '/ja/races');
  replaceStateSpy = vi.spyOn(window.history, 'replaceState');
});

afterEach(() => {
  replaceStateSpy.mockRestore();
});

describe('RaceList - URL同期', () => {
  it('検索してもサーバーへのナビゲーションを起こさない', async () => {
    render(<RaceList {...baseProps} races={races} />);
    await user.type(screen.getByPlaceholderText('大会名で検索…'), '東京');
    expect(routerReplace).not.toHaveBeenCalled();
    expect(routerPush).not.toHaveBeenCalled();
  });

  it('検索語が URL のクエリに反映される', async () => {
    render(<RaceList {...baseProps} races={races} />);
    await user.type(screen.getByPlaceholderText('大会名で検索…'), '東京');
    expect(replaceStateSpy).toHaveBeenCalled();
    expect(window.location.search).toContain(`q=${encodeURIComponent('東京')}`);
  });

  it('URL のパス（ロケール接頭辞を含む）は変えない', async () => {
    render(<RaceList {...baseProps} races={races} />);
    await user.type(screen.getByPlaceholderText('大会名で検索…'), '東京');
    expect(window.location.pathname).toBe('/ja/races');
  });

  it('検索語を消すと検索クエリも消える（他の絞り込みは残る）', async () => {
    render(<RaceList {...baseProps} races={races} />);
    const input = screen.getByPlaceholderText('大会名で検索…');
    await user.type(input, '東京');
    expect(window.location.search).toContain('q=');
    await user.clear(input);
    expect(window.location.search).not.toContain('q=');
  });

  it('絞り込み自体はこれまでどおり動く', async () => {
    render(<RaceList {...baseProps} races={races} />);
    await user.type(screen.getByPlaceholderText('大会名で検索…'), '東京');
    expect(screen.getByText('1件の大会')).toBeInTheDocument();
  });
});
