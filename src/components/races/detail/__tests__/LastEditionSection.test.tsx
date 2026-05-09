// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LastEditionSection from '../LastEditionSection';
import { makeRace } from '../../../../lib/__tests__/fixtures';
import type { RaceResult } from '@/lib/types';

const fullResult: RaceResult = {
  participants_count: 12000,
  finishers_count: 11500,
  finisher_rate_pct: 95.8,
  weather_condition_ja: '晴れ',
  weather_condition_en: 'Clear',
  temperature_c: 14,
  max_temp_c: 18,
  min_temp_c: 8,
  wind_speed_ms: 3.2,
  humidity_pct: 55,
  notes_ja: null,
  notes_en: null,
  avg_time: null,
};

describe('LastEditionSection', () => {
  it('result が null のとき何も描画しない', () => {
    const race = makeRace({ result: null, date: '2026-04-19' });
    const { container } = render(<LastEditionSection race={race} locale="ja" />);
    expect(container.querySelector('section')).toBeNull();
  });

  it('セクションに id="last-edition" が付く', () => {
    const race = makeRace({ result: fullResult, date: '2026-04-19' });
    const { container } = render(<LastEditionSection race={race} locale="ja" />);
    expect(container.querySelector('#last-edition')).not.toBeNull();
  });

  it('参加者数が表示される', () => {
    const race = makeRace({ result: fullResult, date: '2026-04-19' });
    render(<LastEditionSection race={race} locale="ja" />);
    expect(screen.getByText('12,000')).toBeInTheDocument();
  });

  it('完走率が表示される', () => {
    const race = makeRace({ result: fullResult, date: '2026-04-19' });
    render(<LastEditionSection race={race} locale="ja" />);
    expect(screen.getByText('95.8%')).toBeInTheDocument();
  });

  it('当日気温が表示される', () => {
    const race = makeRace({ result: fullResult, date: '2026-04-19' });
    render(<LastEditionSection race={race} locale="ja" />);
    expect(screen.getByText(/14°C/)).toBeInTheDocument();
  });

  it('en ロケールで weather_condition_en が表示される', () => {
    const race = makeRace({ result: fullResult, date: '2026-04-19' });
    render(<LastEditionSection race={race} locale="en" />);
    expect(screen.getByText('Clear')).toBeInTheDocument();
  });

  it('participants_count が null のとき参加者数カードが描画されない', () => {
    const result: RaceResult = { ...fullResult, participants_count: null };
    const race = makeRace({ result, date: '2026-04-19' });
    render(<LastEditionSection race={race} locale="ja" />);
    expect(screen.queryByText(/参加者数/)).toBeNull();
  });
});
