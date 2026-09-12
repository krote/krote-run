// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TravelStatusSection from '../TravelStatusSection';
import { makeRace, makeCategory, makeRaceTravelTime } from '../../../../lib/__tests__/fixtures';

const STORAGE_KEY = 'hashiru_travel_settings';

beforeEach(() => {
  localStorage.clear();
});

describe('TravelStatusSection - travelSettings 未設定', () => {
  it('何も表示しない', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [makeRaceTravelTime({ hub_id: 'tokyo', duration_minutes: 60 })],
    });
    const { container } = render(<TravelStatusSection race={race} locale="ja" />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('TravelStatusSection - travelSettings 設定済み', () => {
  const settings = {
    hubId: 'tokyo',
    nearestStation: '東京駅',
    offsetMinutes: 0,
    firstTrainTime: '05:00',
  };

  beforeEach(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  });

  it('日帰り可能な大会はステータスと出発時刻が表示される', async () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [makeRaceTravelTime({ hub_id: 'tokyo', duration_minutes: 60 })],
      venue_address: '東京都新宿区西新宿2-8-1',
    });
    render(<TravelStatusSection race={race} locale="ja" />);
    expect(await screen.findByText(/日帰り可/)).toBeInTheDocument();
  });

  it('Googleマップ経路リンクが venue_address 宛に生成される', async () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [makeRaceTravelTime({ hub_id: 'tokyo', duration_minutes: 60 })],
      venue_address: '東京都新宿区西新宿2-8-1',
    });
    render(<TravelStatusSection race={race} locale="ja" />);
    const link = await screen.findByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('https://www.google.com/maps/dir/?api=1'));
    expect(link).toHaveAttribute('href', expect.stringContaining('destination='));
    expect(link).toHaveAttribute('href', expect.stringContaining('arrival_time='));
  });

  it('venue_address も start_lat/lng もない場合はリンクを表示しない', async () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [makeRaceTravelTime({ hub_id: 'tokyo', duration_minutes: 60 })],
      venue_address: null,
      start_lat: null,
      start_lng: null,
    });
    render(<TravelStatusSection race={race} locale="ja" />);
    await screen.findByText(/日帰り可/);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('start_time 未整備の大会はエラーにならず何も表示しない', async () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [],
      travel_times: [],
    });
    const { container } = render(<TravelStatusSection race={race} locale="ja" />);
    // useEffect 経由での設定読み込み後も何も描画されないこと
    await vi.waitFor(() => expect(container.textContent).toBe(''));
  });

  it('travel_times が空でもエラーにならず「移動時間不明」が表示される', async () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'race_day',
      categories: [makeCategory({ start_time: '09:00' })],
      travel_times: [],
    });
    render(<TravelStatusSection race={race} locale="ja" />);
    expect(await screen.findByText('移動時間不明')).toBeInTheDocument();
  });
});
