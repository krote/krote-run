import type { RaceCategory, Race, RaceFilter, RaceStatus, Locale, DistanceType } from './types';

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
// Race status
// ==================

export function getRaceStatus(race: Race): RaceStatus {
  const today = new Date().toISOString().split('T')[0];
  if (race.date < today) return 'past';
  const { entry_start_date: es, entry_end_date: ee } = race;
  if (es && ee && es <= today && ee >= today) return 'open_entry';
  if (es && es > today) return 'entry_not_open';
  return 'entry_closed';
}

// ==================
// Race filtering
// ==================

/** デフォルト初期フィルタ（開催済みを非表示） */
export function defaultFilter(): RaceFilter {
  return {
    month: null,
    prefecture: null,
    distanceType: null,
    giftCategories: [],
    timeLimitMin: null,
    tags: [],
    searchText: '',
    statuses: ['open_entry', 'entry_not_open', 'entry_closed'],
  };
}

/** 完全クリア（すべて表示） */
export function emptyFilter(): RaceFilter {
  return {
    month: null,
    prefecture: null,
    distanceType: null,
    giftCategories: [],
    timeLimitMin: null,
    tags: [],
    searchText: '',
    statuses: [],
  };
}

export function isDefaultFilter(filter: RaceFilter): boolean {
  const def = defaultFilter();
  return (
    filter.month === null &&
    filter.prefecture === null &&
    filter.distanceType === null &&
    filter.giftCategories.length === 0 &&
    filter.timeLimitMin === null &&
    filter.tags.length === 0 &&
    filter.searchText === '' &&
    filter.statuses.length === def.statuses.length &&
    def.statuses.every((s) => filter.statuses.includes(s))
  );
}

export function isFilterEmpty(filter: RaceFilter): boolean {
  return (
    filter.month === null &&
    filter.prefecture === null &&
    filter.distanceType === null &&
    filter.giftCategories.length === 0 &&
    filter.timeLimitMin === null &&
    filter.tags.length === 0 &&
    filter.searchText === '' &&
    filter.statuses.length === 0
  );
}

export function filterRaces(races: Race[], filter: RaceFilter): Race[] {
  return races.filter((race) => {
    if (filter.statuses.length > 0) {
      const status = getRaceStatus(race);
      if (!filter.statuses.includes(status)) return false;
    }

    if (filter.prefecture && race.prefecture !== filter.prefecture) return false;

    if (filter.month !== null) {
      const raceMonth = new Date(race.date).getMonth() + 1;
      if (raceMonth !== filter.month) return false;
    }

    if (filter.distanceType) {
      const hasType = race.categories.some((c) => c.distance_type === filter.distanceType);
      if (!hasType) return false;
    }

    if (filter.giftCategories.length > 0) {
      const hasGift = filter.giftCategories.some((catId) =>
        race.participation_gifts.some((g) => g.gift_categories.includes(catId)),
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
