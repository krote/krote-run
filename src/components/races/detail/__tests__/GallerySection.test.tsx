// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GallerySection from '../GallerySection';
import { makeRace, makeGallery, makeVoice } from '../../../../lib/__tests__/fixtures';

describe('GallerySection', () => {
  it('gallery も voices も空のとき何も描画しない', () => {
    const race = makeRace({ gallery: [], voices: [], date: '2026-04-19' });
    const { container } = render(<GallerySection race={race} locale="ja" />);
    expect(container.querySelector('section')).toBeNull();
  });

  it('セクションに id="gallery" が付く', () => {
    const race = makeRace({ gallery: [makeGallery()], date: '2026-04-19' });
    const { container } = render(<GallerySection race={race} locale="ja" />);
    expect(container.querySelector('#gallery')).not.toBeNull();
  });

  it('gallery の画像が描画される', () => {
    const item = makeGallery({ src: '/images/races/test-1.jpg', caption_ja: '大会写真' });
    const race = makeRace({ gallery: [item], date: '2026-04-19' });
    const { container } = render(<GallerySection race={race} locale="ja" />);
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src')).toBe('/images/races/test-1.jpg');
  });

  it('ja ロケールで caption_ja が表示される', () => {
    const item = makeGallery({ caption_ja: '桜のゴールゲート', caption_en: 'Cherry blossom gate' });
    const race = makeRace({ gallery: [item], date: '2026-04-19' });
    render(<GallerySection race={race} locale="ja" />);
    expect(screen.getByText('桜のゴールゲート')).toBeInTheDocument();
  });

  it('en ロケールで caption_en が表示される', () => {
    const item = makeGallery({ caption_ja: '桜のゴールゲート', caption_en: 'Cherry blossom gate' });
    const race = makeRace({ gallery: [item], date: '2026-04-19' });
    render(<GallerySection race={race} locale="en" />);
    expect(screen.getByText('Cherry blossom gate')).toBeInTheDocument();
  });

  it('voices の quote_ja が表示される', () => {
    const voice = makeVoice({ quote_ja: '最高のコースでした！', author: '田中太郎' });
    const race = makeRace({ voices: [voice], date: '2026-04-19' });
    render(<GallerySection race={race} locale="ja" />);
    expect(screen.getByText(/最高のコースでした！/)).toBeInTheDocument();
    expect(screen.getByText(/田中太郎/)).toBeInTheDocument();
  });

  it('voices の author が null のとき匿名表示', () => {
    const voice = makeVoice({ quote_ja: '楽しかった', author: null });
    const race = makeRace({ voices: [voice], date: '2026-04-19' });
    render(<GallerySection race={race} locale="ja" />);
    expect(screen.getByText(/楽しかった/)).toBeInTheDocument();
  });
});
