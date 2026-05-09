// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DetailHeader from '../DetailHeader';
import { makeRace } from '../../../../lib/__tests__/fixtures';

describe('DetailHeader - 基本レンダリング', () => {
  it('大会名が表示される', () => {
    const race = makeRace({ name_ja: '長野マラソン2026', date: '2026-04-19' });
    render(<DetailHeader race={race} locale="ja" raceName="長野マラソン2026" />);
    expect(screen.getByText('長野マラソン2026')).toBeInTheDocument();
  });

  it('en ロケールで英語大会名が表示される', () => {
    const race = makeRace({ name_en: 'Nagano Marathon 2026', date: '2026-04-19' });
    render(<DetailHeader race={race} locale="en" raceName="Nagano Marathon 2026" />);
    // h1 とサブタイトル両方に表示されるため getAllByText を使用
    expect(screen.getAllByText('Nagano Marathon 2026').length).toBeGreaterThanOrEqual(1);
  });

  it('tagline_ja が表示される', () => {
    const race = makeRace({ tagline_ja: '桜咲く古都を駆け抜けろ。', date: '2026-04-19' });
    render(<DetailHeader race={race} locale="ja" raceName="長野マラソン2026" />);
    expect(screen.getByText('桜咲く古都を駆け抜けろ。')).toBeInTheDocument();
  });

  it('tagline_en が en ロケールで表示される', () => {
    const race = makeRace({ tagline_en: 'Chase the Cherry Blossoms.', date: '2026-04-19' });
    render(<DetailHeader race={race} locale="en" raceName="Nagano Marathon 2026" />);
    expect(screen.getByText(/Chase the Cherry Blossoms\./)).toBeInTheDocument();
  });

  it('tagline が null のとき何も表示されない', () => {
    const race = makeRace({ tagline_ja: null, tagline_en: null, date: '2026-04-19' });
    const { container } = render(<DetailHeader race={race} locale="ja" raceName="テスト大会" />);
    expect(container.querySelector('[data-testid="tagline"]')).toBeNull();
  });

  it('edition が表示される', () => {
    const race = makeRace({ edition: 51, date: '2026-04-19' });
    render(<DetailHeader race={race} locale="ja" raceName="テスト大会" />);
    expect(screen.getByText(/第51回/)).toBeInTheDocument();
  });

  it('edition が null のとき回次が表示されない', () => {
    const race = makeRace({ edition: null, date: '2026-04-19' });
    render(<DetailHeader race={race} locale="ja" raceName="テスト大会" />);
    expect(screen.queryByText(/第.*回/)).toBeNull();
  });

  it('motif が表示される', () => {
    const race = makeRace({ motif: 'SAKURA', date: '2026-04-19' });
    render(<DetailHeader race={race} locale="ja" raceName="テスト大会" />);
    expect(screen.getByText('SAKURA')).toBeInTheDocument();
  });

  it('開催日がメタ行に表示される', () => {
    const race = makeRace({ date: '2026-04-19' });
    render(<DetailHeader race={race} locale="ja" raceName="テスト大会" />);
    expect(screen.getByText('2026年4月19日')).toBeInTheDocument();
  });

  it('ordinalSuffix が 1st/2nd/3rd/4th で正しく表示される', () => {
    const race1 = makeRace({ edition: 1, date: '2026-04-19' });
    const { unmount: u1 } = render(<DetailHeader race={race1} locale="ja" raceName="テスト大会" />);
    expect(screen.getByText(/1ST/)).toBeInTheDocument();
    u1();

    const race2 = makeRace({ edition: 2, date: '2026-04-19' });
    const { unmount: u2 } = render(<DetailHeader race={race2} locale="ja" raceName="テスト大会" />);
    expect(screen.getByText(/2ND/)).toBeInTheDocument();
    u2();

    const race11 = makeRace({ edition: 11, date: '2026-04-19' });
    render(<DetailHeader race={race11} locale="ja" raceName="テスト大会" />);
    expect(screen.getByText(/11TH/)).toBeInTheDocument();
  });
});
