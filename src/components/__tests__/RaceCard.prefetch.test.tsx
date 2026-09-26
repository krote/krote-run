// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import RaceCard from '../races/RaceCard';
import RaceCardExp from '../races/RaceCardExp';
import { makeCategory, makeRaceListItem } from '../../lib/__tests__/fixtures';

/**
 * 大会カードのリンクが先読み（prefetch）されると、画面内のカード分だけ
 * 大会詳細ページがサーバーでレンダリングされる。詳細ページはD1に複数クエリを投げるため、
 * 検索で絞り込むたびに大量の動的レンダリングが発生し Worker の CPU 上限に達する。
 */
const linkProps: Record<string, unknown>[] = [];

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => {
    linkProps.push({ href, ...props });
    return <a href={href}>{children}</a>;
  },
}));

vi.mock('@/data/prefectures.json', () => ({
  default: [{ code: '13', name: '東京都', nameEn: 'Tokyo' }],
}));

beforeEach(() => {
  linkProps.length = 0;
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-04-03T12:00:00.000Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

const race = makeRaceListItem({ categories: [makeCategory()] });

describe('大会カードの先読み', () => {
  it('RaceCard は詳細ページを先読みしない', () => {
    render(<RaceCard race={race} locale="ja" />);
    expect(linkProps).toHaveLength(1);
    expect(linkProps[0].prefetch).toBe(false);
  });

  it('RaceCardExp は詳細ページを先読みしない', () => {
    render(<RaceCardExp race={race} locale="ja" />);
    expect(linkProps.length).toBeGreaterThan(0);
    for (const props of linkProps) {
      expect(props.prefetch, `${String(props.href)} を先読みしている`).toBe(false);
    }
  });
});
