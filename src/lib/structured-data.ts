import type { Race, Locale } from './types';
import { getCategoryLabel, getRaceName, getRaceCity, getRaceDescription } from './utils';
import prefecturesData from '@/data/prefectures.json';

export const SITE_ORIGIN = 'https://hashiru.run';
/** レース固有の画像がないときに使うサイト共通画像（public/og-default.png） */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-default.png`;

const SCHEMA = 'https://schema.org';

type Availability = 'InStock' | 'SoldOut' | 'PreOrder';

export interface OfferJsonLd {
  '@type': 'Offer';
  name: string;
  price?: number;
  priceCurrency?: 'JPY';
  url: string;
  availability: string;
  validFrom?: string;
}

export interface RaceJsonLd {
  '@context': string;
  '@type': 'SportsEvent';
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  url: string;
  eventStatus: string;
  eventAttendanceMode: string;
  image: string[];
  location: {
    '@type': 'Place';
    name: string;
    address: {
      '@type': 'PostalAddress';
      streetAddress?: string;
      addressLocality: string;
      addressRegion?: string;
      addressCountry: 'JP';
    };
    geo?: { '@type': 'GeoCoordinates'; latitude: number; longitude: number };
  };
  organizer: { '@type': 'Organization'; name: string; url: string };
  offers: OfferJsonLd[];
}

function toAbsoluteUrl(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  return `${SITE_ORIGIN}${src.startsWith('/') ? '' : '/'}${src}`;
}

/** "HH:MM" を開催日0時からの分に変換。不正値は null */
function parseMinutes(time: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!m) return null;
  return Number(m[1]) * 60 + Number(m[2]);
}

/** 開催日 + 分オフセットを JST の ISO 8601 文字列にする（日付またぎ対応） */
function toJstDateTime(date: string, minutes: number): string {
  const [y, mo, d] = date.split('-').map(Number);
  // UTC の各フィールドを JST の壁時計として扱い、オフセットは文字列で付与
  const wallClock = new Date(Date.UTC(y, mo - 1, d, 0, minutes));
  return `${wallClock.toISOString().slice(0, 19)}+09:00`;
}

function buildEventTimes(race: Race): { startDate: string; endDate: string } {
  const spans = race.categories
    .map((c) => {
      const start = parseMinutes(c.start_time);
      return start === null ? null : { start, end: start + c.time_limit_minutes };
    })
    .filter((s): s is { start: number; end: number } => s !== null);

  if (spans.length === 0) return { startDate: race.date, endDate: race.date };

  const start = Math.min(...spans.map((s) => s.start));
  const end = Math.max(...spans.map((s) => s.end));
  return { startDate: toJstDateTime(race.date, start), endDate: toJstDateTime(race.date, end) };
}

function getAvailability(race: Race, today: string): Availability {
  if (race.entry_closed || race.date < today) return 'SoldOut';
  if (race.entry_end_date !== null && today > race.entry_end_date) return 'SoldOut';
  if (race.entry_start_date !== null && today < race.entry_start_date) return 'PreOrder';
  return 'InStock';
}

function buildOffers(race: Race, locale: Locale, today: string): OfferJsonLd[] {
  const base = {
    url: race.entry_links[0]?.url ?? race.official_url,
    availability: `${SCHEMA}/${getAvailability(race, today)}`,
    ...(race.entry_start_date ? { validFrom: race.entry_start_date } : {}),
  };
  const withPrice = (price: number | null) =>
    price === null ? {} : { price, priceCurrency: 'JPY' as const };

  const priced = race.categories
    .map((c) => ({ name: getCategoryLabel(c, locale), price: c.entry_fee ?? race.entry_fee }))
    .filter((o) => o.price !== null);

  if (priced.length > 0) {
    return priced.map((o) => ({ '@type': 'Offer', name: o.name, ...withPrice(o.price), ...base }));
  }
  // 料金不明でもエントリー導線は伝える
  return [{ '@type': 'Offer', name: getRaceName(race, locale), ...withPrice(race.entry_fee), ...base }];
}

function buildLocation(race: Race, locale: Locale): RaceJsonLd['location'] {
  const city = getRaceCity(race, locale);
  const venueName = locale === 'en' ? (race.venue_name_en ?? race.venue_name_ja) : race.venue_name_ja;
  const pref = prefecturesData.find((p) => p.code === race.prefecture);
  const region = pref ? (locale === 'en' ? pref.nameEn : pref.name) : undefined;

  return {
    '@type': 'Place',
    name: venueName ?? city,
    address: {
      '@type': 'PostalAddress',
      ...(race.venue_address ? { streetAddress: race.venue_address } : {}),
      addressLocality: city,
      ...(region ? { addressRegion: region } : {}),
      addressCountry: 'JP',
    },
    ...(race.start_lat !== null && race.start_lng !== null
      ? { geo: { '@type': 'GeoCoordinates', latitude: race.start_lat, longitude: race.start_lng } }
      : {}),
  };
}

/** レース詳細ページの JSON-LD（schema.org/SportsEvent） */
export function buildRaceJsonLd(race: Race, locale: Locale, today: string): RaceJsonLd {
  const seriesName = getRaceName(race, locale);
  const fullName = locale === 'ja' ? race.full_name_ja : race.full_name_en;
  const images = [race.hero_image_url, ...race.gallery.map((g) => g.src)]
    .filter((src): src is string => !!src)
    .map(toAbsoluteUrl);

  return {
    '@context': SCHEMA,
    '@type': 'SportsEvent',
    name: fullName ?? seriesName,
    description: getRaceDescription(race, locale),
    ...buildEventTimes(race),
    url: `${SITE_ORIGIN}/${locale}/races/${race.id}`,
    // 中止・延期のデータを持たないため常に Scheduled（開催済みでも Scheduled が正）
    eventStatus: `${SCHEMA}/EventScheduled`,
    eventAttendanceMode: `${SCHEMA}/OfflineEventAttendanceMode`,
    image: images.length > 0 ? images : [DEFAULT_OG_IMAGE],
    location: buildLocation(race, locale),
    organizer: { '@type': 'Organization', name: seriesName, url: race.official_url },
    offers: buildOffers(race, locale, today),
  };
}
