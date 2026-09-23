import type { Metadata } from 'next';
import type { Race, Locale } from './types';
import { getRaceDescription } from './utils';

export const SITE_ORIGIN = 'https://hashiru.run';
export const SITE_NAME = 'HASHIRU';

/** レース固有の画像がないときに使うサイト共通画像（public/og-default.png） */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-default.png`;

export const OG_IMAGE = {
  url: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: 'HASHIRU — 日本全国のマラソン・ランニング大会情報ポータル',
};

export function toAbsoluteUrl(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_ORIGIN}${src.startsWith('/') ? '' : '/'}${src}`;
}

/** 大会固有の画像（ヒーロー→ギャラリーの順）。1枚もなければ空配列 */
export function getRaceImageUrls(race: Race): string[] {
  return [race.hero_image_url, ...race.gallery.map((g) => g.src)]
    .filter((src): src is string => !!src)
    .map(toAbsoluteUrl);
}

/** レース詳細ページの metadata */
export function buildRaceMetadata(race: Race, locale: Locale): Metadata {
  const isJa = locale !== 'en';
  const name = isJa ? race.name_ja : (race.name_en ?? race.name_ja);
  const description = getRaceDescription(race, locale);
  const url = `${SITE_ORIGIN}/${locale}/races/${race.id}`;
  const raceImages = getRaceImageUrls(race);
  const images = raceImages.length > 0 ? raceImages : [OG_IMAGE];

  return {
    title: name,
    description,
    alternates: {
      canonical: url,
      languages: {
        ja: `${SITE_ORIGIN}/ja/races/${race.id}`,
        en: `${SITE_ORIGIN}/en/races/${race.id}`,
      },
    },
    openGraph: {
      type: 'website',
      title: name,
      description,
      url,
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: name,
      description,
      images,
    },
  };
}
