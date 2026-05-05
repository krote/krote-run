// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HoverCard from '../HoverCard';
import { makeRace } from '../../../lib/__tests__/fixtures';

describe('HoverCard', () => {
  it('大会名が表示される', () => {
    const race = makeRace({ name_ja: '長野マラソン2026', date: '2026-04-19' });
    render(<HoverCard race={race} locale="ja" position={{ x: 100, y: 200 }} />);
    expect(screen.getByText('長野マラソン2026')).toBeInTheDocument();
  });

  it('en ロケールで name_en が表示される', () => {
    const race = makeRace({ name_en: 'Nagano Marathon 2026', date: '2026-04-19' });
    render(<HoverCard race={race} locale="en" position={{ x: 0, y: 0 }} />);
    expect(screen.getByText('Nagano Marathon 2026')).toBeInTheDocument();
  });

  it('開催日が表示される', () => {
    const race = makeRace({ date: '2026-04-19' });
    render(<HoverCard race={race} locale="ja" position={{ x: 0, y: 0 }} />);
    expect(screen.getAllByText(/2026/).length).toBeGreaterThan(0);
  });

  it('race が null のとき何も描画しない', () => {
    const { container } = render(<HoverCard race={null} locale="ja" position={{ x: 0, y: 0 }} />);
    expect(container.firstChild).toBeNull();
  });

  it('position に応じた style が設定される', () => {
    const race = makeRace({ date: '2026-04-19' });
    const { container } = render(<HoverCard race={race} locale="ja" position={{ x: 120, y: 300 }} />);
    const card = container.firstChild as HTMLElement;
    // offset +12 が加算される
    expect(card?.style.left).toContain('132');
    expect(card?.style.top).toContain('312');
  });

  it('公式都市名が表示される', () => {
    const race = makeRace({ city_ja: '長野市', date: '2026-04-19' });
    render(<HoverCard race={race} locale="ja" position={{ x: 0, y: 0 }} />);
    expect(screen.getByText(/長野市/)).toBeInTheDocument();
  });
});
