import { describe, it, expect } from 'vitest';
import { SITE_ORIGIN, DEFAULT_OG_IMAGE, OG_IMAGE, buildRaceMetadata } from '../seo';
import { makeRace } from './fixtures';

describe('seo', () => {
  it('OG画像は絶対URL（SNSクローラは相対パスを解決しない）', () => {
    expect(DEFAULT_OG_IMAGE).toBe(`${SITE_ORIGIN}/og-default.png`);
    expect(DEFAULT_OG_IMAGE).toMatch(/^https:\/\//);
  });

  it('OG_IMAGE は Metadata の images にそのまま渡せる形', () => {
    expect(OG_IMAGE).toEqual({
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt: 'HASHIRU — 日本全国のマラソン・ランニング大会情報ポータル',
    });
  });
});

describe('buildRaceMetadata', () => {
  it('canonical と言語別URLを出す', () => {
    const meta = buildRaceMetadata(makeRace(), 'ja');
    expect(meta.alternates?.canonical).toBe('https://hashiru.run/ja/races/test-race-2026');
    expect(meta.alternates?.languages).toEqual({
      ja: 'https://hashiru.run/ja/races/test-race-2026',
      en: 'https://hashiru.run/en/races/test-race-2026',
    });
  });

  it('og:image はサイト共通画像', () => {
    const meta = buildRaceMetadata(makeRace(), 'ja');
    expect(meta.openGraph?.images).toEqual([OG_IMAGE]);
    expect(meta.twitter?.images).toEqual([OG_IMAGE]);
  });

  it('大会固有の画像があれば優先する', () => {
    const meta = buildRaceMetadata(makeRace({ hero_image_url: 'https://cdn.example.com/hero.jpg' }), 'ja');
    expect(meta.openGraph?.images).toEqual(['https://cdn.example.com/hero.jpg']);
  });

  it('説明が空でも title は大会名', () => {
    const meta = buildRaceMetadata(makeRace({ description_ja: '' }), 'ja');
    expect(meta.title).toBe('テスト大会2026');
    expect(meta.description).toBe('');
  });
});
