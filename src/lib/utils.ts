import type { RaceCategory, Race, RaceFilter, Locale, DistanceType } from './types';

// ==================
// Date formatting
// ==================

export function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateRange(
  startDate: string,
  endDate: string | undefined,
  locale: Locale,
): string {
  if (!endDate || startDate === endDate) return formatDate(startDate, locale);
  return `${formatDate(startDate, locale)} - ${formatDate(endDate, locale)}`;
}

// ==================
// Distance formatting
// ==================

const DISTANCE_LABELS: Record<DistanceType, { ja: string; en: string }> = {
  full: { ja: 'フルマラソン', en: 'Full Marathon' },
  half: { ja: 'ハーフマラソン', en: 'Half Marathon' },
  '10k': { ja: '10km', en: '10km' },
  '5k': { ja: '5km', en: '5km' },
  ultra: { ja: 'ウルトラマラソン', en: 'Ultra Marathon' },
  other: { ja: 'その他', en: 'Other' },
};

export function formatDistanceKm(km: number): string {
  if (km === 42.195) return 'Full (42.195km)';
  if (km === 21.0975) return 'Half (21.0975km)';
  return `${km}km`;
}

export function getDistanceLabel(key: DistanceType, locale: Locale): string {
  return DISTANCE_LABELS[key]?.[locale] ?? key;
}

export function getMainCategory(categories: RaceCategory[]): RaceCategory | null {
  if (categories.length === 0) return null;
  const full = categories.find((c) => c.distance_type === 'full');
  if (full) return full;
  return categories.reduce((max, c) => (c.distance_km > max.distance_km ? c : max), categories[0]);
}

export function getCategoryLabel(cat: RaceCategory, locale: Locale): string {
  if (locale === 'en' && cat.name_en) return cat.name_en;
  if (locale === 'ja' && cat.name_ja) return cat.name_ja;
  return getDistanceLabel(cat.distance_type, locale);
}

export function formatTimeLimitMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}時間` : `${h}時間${m}分`;
}

// ==================
// Locale helpers
// ==================

export function getRaceName(race: Race, locale: Locale): string {
  return locale === 'en' ? race.name_en : race.name_ja;
}

export function getRaceCity(race: Race, locale: Locale): string {
  return locale === 'en' ? race.city_en : race.city_ja;
}

export function getRaceDescription(race: Race, locale: Locale): string {
  return locale === 'en' ? race.description_en : race.description_ja;
}

// ==================
// Currency formatting
// ==================

export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

// ==================
// Race filtering
// ==================

export function emptyFilter(): RaceFilter {
  return {
    month: null,
    prefecture: null,
    distanceType: null,
    giftCategory: null,
    timeLimitMin: null,
    tags: [],
    searchText: '',
  };
}

export function isFilterEmpty(filter: RaceFilter): boolean {
  return (
    filter.month === null &&
    filter.prefecture === null &&
    filter.distanceType === null &&
    filter.giftCategory === null &&
    filter.timeLimitMin === null &&
    filter.tags.length === 0 &&
    filter.searchText === ''
  );
}

export function filterRaces(races: Race[], filter: RaceFilter): Race[] {
  return races.filter((race) => {
    if (filter.prefecture && race.prefecture !== filter.prefecture) return false;

    if (filter.month !== null) {
      const raceMonth = new Date(race.date).getMonth() + 1;
      if (raceMonth !== filter.month) return false;
    }

    if (filter.distanceType) {
      const hasType = race.categories.some((c) => c.distance_type === filter.distanceType);
      if (!hasType) return false;
    }

    if (filter.giftCategory) {
      const hasGift = race.participation_gifts.some((g) =>
        g.gift_categories.includes(filter.giftCategory!),
      );
      if (!hasGift) return false;
    }

    if (filter.timeLimitMin !== null) {
      const hasTime = race.categories.some((c) => c.time_limit_minutes >= filter.timeLimitMin!);
      if (!hasTime) return false;
    }

    if (filter.tags.length > 0) {
      const hasAllTags = filter.tags.every((tag) => race.tags.includes(tag));
      if (!hasAllTags) return false;
    }

    if (filter.searchText) {
      const q = filter.searchText.toLowerCase();
      if (!race.name_ja.toLowerCase().includes(q) && !race.name_en.toLowerCase().includes(q)) {
        return false;
      }
    }

    return true;
  });
}

// ==================
// Sorting
// ==================

export function sortRacesByDate(races: Race[], ascending = true): Race[] {
  return [...races].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return ascending ? diff : -diff;
  });
}

// ==================
// Misc
// ==================

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
