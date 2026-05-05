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
    expect(screen.getByText('Nagano Marathon 2026')).toBeInTheDocument();
  });

  it('tagline_ja が表示される', () => {
    const race = makeRace({ tagline_ja: '桜咲く古都を駆け抜けろ。', date: '2026-04-19' });
    render(<DetailHeader race={race} locale="ja" raceName="長野マラソン2026" />);
    expect(screen.getByText('桜咲く古都を駆け抜けろ。')).toBeInTheDocument();
  });

  it('tagline_en が en ロケールで表示される', () => {
    const race = makeRace({ tagline_en: 'Chase the Cherry Blossoms.', date: '2026-04-19' });
    render(<DetailHeader race={race} locale="en" raceName="Nagano Marathon 2026" />);
    expect(screen.getByText('Chase the Cherry Blossoms.')).toBeInTheDocument();
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

  it('hero_image_url がある場合 img タグが描画される', () => {
    const race = makeRace({ hero_image_url: '/images/hero.jpg', date: '2026-04-19' });
    const { container } = render(<DetailHeader race={race} locale="ja" raceName="テスト大会" />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('/images/hero.jpg');
  });

  it('hero_image_url が null のとき img タグが描画されない', () => {
    const race = makeRace({ hero_image_url: null, date: '2026-04-19' });
    const { container } = render(<DetailHeader race={race} locale="ja" raceName="テスト大会" />);
    expect(container.querySelector('img')).toBeNull();
  });
});
