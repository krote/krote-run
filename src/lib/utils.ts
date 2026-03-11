import type { DistanceEntry, Locale, RaceFilter, Race } from './types';

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

const DISTANCE_LABELS: Record<string, { ja: string; en: string }> = {
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

export function getDistanceLabel(key: string, locale: Locale): string {
  return DISTANCE_LABELS[key]?.[locale] ?? key;
}

export function getMainDistance(distances: DistanceEntry[]): DistanceEntry | null {
  if (distances.length === 0) return null;
  // Prefer full marathon, then longest
  const full = distances.find(
    (d) => d.distanceKm === 42.195 || d.category.includes('フル') || d.categoryEn.includes('Full'),
  );
  if (full) return full;
  return distances.reduce((max, d) => (d.distanceKm > max.distanceKm ? d : max), distances[0]);
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

export function filterRaces(races: Race[], filter: RaceFilter): Race[] {
  return races.filter((race) => {
    if (filter.prefectureCode && race.prefectureCode !== filter.prefectureCode) return false;
    if (filter.level && race.level !== filter.level) return false;
    if (filter.terrain && race.terrain !== filter.terrain) return false;
    if (filter.dateFrom && race.date < filter.dateFrom) return false;
    if (filter.dateTo && race.date > filter.dateTo) return false;

    if (filter.distance) {
      const hasDistance = race.distances.some((d) => {
        if (filter.distance === 'full') return d.distanceKm === 42.195;
        if (filter.distance === 'half') return d.distanceKm === 21.0975;
        if (filter.distance === '10k') return d.distanceKm === 10;
        if (filter.distance === '5k') return d.distanceKm === 5;
        if (filter.distance === 'ultra') return d.distanceKm > 42.195;
        return true;
      });
      if (!hasDistance) return false;
    }

    if (filter.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      if (!race.name.toLowerCase().includes(q) && !race.nameEn.toLowerCase().includes(q)) {
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
