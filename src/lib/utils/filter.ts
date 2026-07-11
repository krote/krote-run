import type { Race, RaceFilter, RaceStatus, DistanceType, RaceSortKey } from '../types';
import { getRaceStatus } from './race';

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
    sort: 'date_asc',
    view: 'mag',
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
    sort: 'date_asc',
    view: 'mag',
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
      const allGifts = [...race.participation_gifts, ...(race.completion_gifts ?? [])];
      const hasGift = filter.giftCategories.some((catId) =>
        allGifts.some((g) => g.gift_categories.includes(catId)),
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

export function sortRacesByDate(races: Race[], ascending = true): Race[] {
  return [...races].sort((a, b) => {
    const diff = new Date(a.date).getTime() - new Date(b.date).getTime();
    return ascending ? diff : -diff;
  });
}

/** 受付中の期間のうち最も早い終了日を取得（締切が近い順用） */
function getEarliestActiveEnd(race: Race, today: string): string | null {
  const periods = (race as { entry_periods?: { start_date: string; end_date: string | null }[] }).entry_periods ?? [];
  if (periods.length > 0) {
    const active = periods.filter((p) => p.start_date <= today && (p.end_date === null || p.end_date >= today));
    if (active.length === 0) return null;
    const withEnd = active.filter((p): p is { start_date: string; end_date: string } => p.end_date !== null);
    if (withEnd.length === 0) return null;
    return withEnd.reduce((min, p) => (p.end_date < min ? p.end_date : min), withEnd[0].end_date);
  }
  // 旧フィールドへのフォールバック
  const es = race.entry_start_date;
  const ee = race.entry_end_date;
  if (es && ee && es <= today && ee >= today) return ee;
  return null;
}

/** 未来の期間のうち最も早い開始日を取得（受付開始が近い順用） */
function getEarliestFutureStart(race: Race, today: string): string | null {
  const periods = (race as { entry_periods?: { start_date: string }[] }).entry_periods ?? [];
  if (periods.length > 0) {
    const future = periods.filter((p) => p.start_date > today);
    if (future.length === 0) return null;
    return future.reduce((min, p) => (p.start_date < min ? p.start_date : min), future[0].start_date);
  }
  // 旧フィールドへのフォールバック
  const es = race.entry_start_date;
  if (es && es > today) return es;
  return null;
}

export function sortRaces(races: Race[], sort: RaceSortKey): Race[] {
  const today = new Date().toISOString().split('T')[0];
  const sorted = [...races];

  if (sort === 'date_asc') {
    return sorted.sort((a, b) => a.date.localeCompare(b.date));
  }

  if (sort === 'entry_closing_soon') {
    // 受付中の期間で最も早く締め切るものを基準にソート。受付中でない大会は末尾
    return sorted.sort((a, b) => {
      const ea = getEarliestActiveEnd(a, today);
      const eb = getEarliestActiveEnd(b, today);
      if (!ea && !eb) return a.date.localeCompare(b.date);
      if (!ea) return 1;
      if (!eb) return -1;
      return ea.localeCompare(eb);
    });
  }

  if (sort === 'entry_opening_soon') {
    // 未来の期間で最も早く始まるものを基準にソート。未来の期間がない大会は末尾
    return sorted.sort((a, b) => {
      const sa = getEarliestFutureStart(a, today);
      const sb = getEarliestFutureStart(b, today);
      if (!sa && !sb) return a.date.localeCompare(b.date);
      if (!sa) return 1;
      if (!sb) return -1;
      return sa.localeCompare(sb);
    });
  }

  return sorted;
}

const VALID_SORTS: RaceSortKey[] = ['date_asc', 'entry_closing_soon', 'entry_opening_soon'];
const VALID_STATUSES: RaceFilter['statuses'] = ['open_entry', 'entry_not_open', 'entry_closed', 'past'];
const VALID_DISTANCE_TYPES: DistanceType[] = ['full', 'half', '10k', '5k', 'ultra', 'other'];

export function filterToSearchParams(filter: RaceFilter): URLSearchParams {
  const params = new URLSearchParams();
  if (filter.month !== null) params.set('month', String(filter.month));
  if (filter.prefecture !== null) params.set('pref', filter.prefecture);
  if (filter.distanceType !== null) params.set('dist', filter.distanceType);
  if (filter.giftCategories.length > 0) params.set('gift', filter.giftCategories.join(','));
  if (filter.tags.length > 0) params.set('tags', filter.tags.join(','));
  if (filter.searchText) params.set('q', filter.searchText);
  if (filter.statuses.length > 0) params.set('status', filter.statuses.join(','));
  if (filter.sort !== 'date_asc') params.set('sort', filter.sort);
  if (filter.view !== 'mag') params.set('view', filter.view);
  return params;
}

export function searchParamsToFilter(params: URLSearchParams | Record<string, string>): RaceFilter {
  const get = (key: string) =>
    params instanceof URLSearchParams ? params.get(key) : (params[key] ?? null);

  const month = get('month');
  const sort = get('sort');
  const view = get('view');
  const statusRaw = get('status');
  const giftRaw = get('gift');
  const tagsRaw = get('tags');
  const dist = get('dist');

  const statuses = statusRaw
    ? (statusRaw.split(',').filter((s) => VALID_STATUSES.includes(s as RaceStatus)) as RaceFilter['statuses'])
    : (['open_entry', 'entry_not_open', 'entry_closed'] as RaceFilter['statuses']);

  return {
    month: month ? parseInt(month) : null,
    prefecture: get('pref'),
    distanceType: dist && VALID_DISTANCE_TYPES.includes(dist as DistanceType) ? (dist as DistanceType) : null,
    giftCategories: giftRaw ? (giftRaw.split(',') as RaceFilter['giftCategories']) : [],
    timeLimitMin: null,
    tags: tagsRaw ? tagsRaw.split(',').filter(Boolean) : [],
    searchText: get('q') ?? '',
    statuses: statuses as RaceFilter['statuses'],
    sort: sort && VALID_SORTS.includes(sort as RaceSortKey) ? (sort as RaceSortKey) : 'date_asc',
    view: view === 'exp' ? 'exp' : 'mag',
  };
}
