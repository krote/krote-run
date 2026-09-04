// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RaceCard from '../races/RaceCard';
import { makeRace, makeCategory, makeEntryPeriod, makeRaceTravelTime } from '../../lib/__tests__/fixtures';
import type { TravelSettings } from '../../lib/travel';

// next-intl モック
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      unpublished: '未発表',
    };
    return map[key] ?? key;
  },
}));

// @/i18n/navigation モック
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// prefectures.json モック
vi.mock('@/data/prefectures.json', () => ({
  default: [
    { code: '13', name: '東京都', nameEn: 'Tokyo' },
    { code: '27', name: '大阪府', nameEn: 'Osaka' },
  ],
}));

const TODAY = '2026-04-03';

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date(`${TODAY}T12:00:00.000Z`));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('RaceCard - 基本レンダリング', () => {
  it('大会名が表示される', () => {
    const race = makeRace({ name_ja: '東京マラソン2026', date: '2026-10-01' });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('東京マラソン2026')).toBeInTheDocument();
  });

  it('en ロケールで英語名が表示される', () => {
    const race = makeRace({ name_en: 'Tokyo Marathon 2026', date: '2026-10-01' });
    render(<RaceCard race={race} locale="en" />);
    expect(screen.getByText('Tokyo Marathon 2026')).toBeInTheDocument();
  });

  it('大会ページへのリンクが設定される', () => {
    const race = makeRace({ id: 'tokyo-marathon-2026', date: '2026-10-01' });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/races/tokyo-marathon-2026');
  });

  it('距離が表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      categories: [makeCategory({ distance_km: 42.195 })],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('42.195km')).toBeInTheDocument();
  });
});

describe('RaceCard - ステータスバッジ', () => {
  it('受付中のバッジが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('エントリー受付中')).toBeInTheDocument();
  });

  it('もうすぐ締切バッジが表示される（14日以内）', () => {
    // 今日 2026-04-03、締切 2026-04-10（7日後）
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-04-10' })],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('もうすぐ締切')).toBeInTheDocument();
  });

  it('受付終了バッジが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-01-01', end_date: '2026-03-31' })],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('受付終了')).toBeInTheDocument();
  });

  it('開催済みバッジが表示される', () => {
    const race = makeRace({ date: '2026-03-01', entry_periods: [] });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('開催済み')).toBeInTheDocument();
  });

  it('受付前の大会はステータスバッジが表示されない', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-07-01', end_date: '2026-09-30' })],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.queryByText('エントリー受付中')).not.toBeInTheDocument();
    expect(screen.queryByText('受付終了')).not.toBeInTheDocument();
    expect(screen.queryByText('開催済み')).not.toBeInTheDocument();
  });

  it('entry_closed=true のとき受付終了バッジが表示される（アクティブな期間があっても）', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_closed: true,
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('受付終了')).toBeInTheDocument();
    expect(screen.queryByText('エントリー受付中')).not.toBeInTheDocument();
  });

  it('entry_closed=true のとき「もうすぐ締切」ではなく受付終了が表示される', () => {
    // アクティブかつ14日以内でも entry_closed が優先される
    const race = makeRace({
      date: '2026-10-01',
      entry_closed: true,
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-04-10' })],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('受付終了')).toBeInTheDocument();
    expect(screen.queryByText('もうすぐ締切')).not.toBeInTheDocument();
  });
});

describe('RaceCard - エントリー期間表示', () => {
  it('エントリー期間が未設定かつ開催前は「未発表」が表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [],
      entry_start_date: null,
      entry_end_date: null,
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText('未発表')).toBeInTheDocument();
  });

  it('エントリー期間が未設定かつ開催済みは何も表示されない', () => {
    const race = makeRace({
      date: '2026-03-01',
      entry_periods: [],
      entry_start_date: null,
      entry_end_date: null,
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.queryByText('未発表')).not.toBeInTheDocument();
  });

  it('複数エントリー期間がある場合「他N件」が表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [
        makeEntryPeriod({ id: 1, start_date: '2026-03-01', end_date: '2026-04-30' }),
        makeEntryPeriod({ id: 2, start_date: '2026-06-01', end_date: '2026-07-31' }),
        makeEntryPeriod({ id: 3, start_date: '2026-08-01', end_date: '2026-09-30' }),
      ],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.getByText(/他2件/)).toBeInTheDocument();
  });
});

describe('RaceCard - 日帰りステータスバッジ', () => {
  const baseSettings: TravelSettings = {
    hubId: 'tokyo',
    nearestStation: '東京駅',
    offsetMinutes: 0,
    firstTrainTime: '05:00',
  };

  it('travelSettings が未指定ならバッジは表示されない', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'pre_day',
      categories: [makeCategory({ start_time: '09:00' })],
    });
    render(<RaceCard race={race} locale="ja" />);
    expect(screen.queryByText('前泊必須')).not.toBeInTheDocument();
  });

  it('前日受付のみ大会は「前泊必須」バッジが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'pre_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [makeRaceTravelTime({ hub_id: 'tokyo', duration_minutes: 60 })],
    });
    render(<RaceCard race={race} locale="ja" travelSettings={baseSettings} />);
    expect(screen.getByText('前泊必須')).toBeInTheDocument();
  });

  it('日帰り可能な大会は「日帰り可」バッジが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [makeRaceTravelTime({ hub_id: 'tokyo', duration_minutes: 60 })],
    });
    render(<RaceCard race={race} locale="ja" travelSettings={baseSettings} />);
    expect(screen.getByText(/日帰り可/)).toBeInTheDocument();
  });

  it('移動時間が長い大会は「前泊推奨」バッジが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [makeRaceTravelTime({ hub_id: 'tokyo', duration_minutes: 360 })],
    });
    render(<RaceCard race={race} locale="ja" travelSettings={baseSettings} />);
    expect(screen.getByText(/前泊推奨/)).toBeInTheDocument();
  });

  it('travel_times がない大会は「移動時間不明」バッジが表示される', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [],
    });
    render(<RaceCard race={race} locale="ja" travelSettings={baseSettings} />);
    expect(screen.getByText('移動時間不明')).toBeInTheDocument();
  });

  it('start_time が未設定の大会はエラーにならず前泊系バッジも出ない', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [],
      travel_times: [],
    });
    expect(() => render(<RaceCard race={race} locale="ja" travelSettings={baseSettings} />)).not.toThrow();
    expect(screen.queryByText('前泊必須')).not.toBeInTheDocument();
    expect(screen.queryByText(/前泊推奨/)).not.toBeInTheDocument();
    expect(screen.queryByText(/日帰り可/)).not.toBeInTheDocument();
    expect(screen.queryByText('移動時間不明')).not.toBeInTheDocument();
  });
});
