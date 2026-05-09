// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RaceCardExp from '../races/RaceCardExp';
import { makeRace, makeCategory, makeEntryPeriod } from '../../lib/__tests__/fixtures';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      viewRace: '詳細を見る',
      enter: 'エントリー',
    };
    return map[key] ?? key;
  },
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

const TODAY = '2026-04-03';

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(`${TODAY}T12:00:00.000Z`));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('RaceCardExp - 基本レンダリング', () => {
  it('大会名が表示される', () => {
    const race = makeRace({ name_ja: '東京マラソン2026', date: '2026-10-01' });
    render(<RaceCardExp race={race} locale="ja" />);
    expect(screen.getByText('東京マラソン2026')).toBeInTheDocument();
  });

  it('en ロケールで英語名が表示される', () => {
    const race = makeRace({ name_en: 'Tokyo Marathon 2026', date: '2026-10-01' });
    render(<RaceCardExp race={race} locale="en" />);
    expect(screen.getByText('Tokyo Marathon 2026')).toBeInTheDocument();
  });

  it('大会ページへのリンクが設定される', () => {
    const race = makeRace({ id: 'tokyo-marathon-2026', date: '2026-10-01' });
    render(<RaceCardExp race={race} locale="ja" />);
    const link = screen.getByText('詳細を見る').closest('a');
    expect(link).toHaveAttribute('href', '/races/tokyo-marathon-2026');
  });

  it('距離バッジが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      categories: [makeCategory({ distance_km: 42.195 })],
    });
    render(<RaceCardExp race={race} locale="ja" />);
    expect(screen.getByText('42.195 km')).toBeInTheDocument();
  });
});

describe('RaceCardExp - エントリー状態', () => {
  it('受付中のとき「エントリー受付中」ハイライトが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })],
    });
    render(<RaceCardExp race={race} locale="ja" />);
    expect(screen.getByText('エントリー受付中')).toBeInTheDocument();
  });

  it('受付中のとき公式サイトへのエントリーボタンが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      official_url: 'https://example.com/entry',
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })],
    });
    render(<RaceCardExp race={race} locale="ja" />);
    const btn = screen.getByText('エントリー').closest('a');
    expect(btn).toHaveAttribute('href', 'https://example.com/entry');
  });

  it('開催済みのときエントリーボタンが表示されない', () => {
    const race = makeRace({
      date: '2026-03-01',
      official_url: 'https://example.com/entry',
      entry_periods: [makeEntryPeriod({ start_date: '2026-01-01', end_date: '2026-02-28' })],
    });
    render(<RaceCardExp race={race} locale="ja" />);
    expect(screen.queryByText('エントリー')).not.toBeInTheDocument();
  });

  it('期間未設定かつ開催前は「未発表」ハイライトが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [],
      entry_start_date: null,
      entry_end_date: null,
    });
    render(<RaceCardExp race={race} locale="ja" />);
    expect(screen.getByText('未発表')).toBeInTheDocument();
  });
});
