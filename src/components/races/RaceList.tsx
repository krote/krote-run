'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import type { Race, Prefecture, GiftCategory, RaceFilter as RaceFilterType, Locale } from '@/lib/types';
import { filterRaces, sortRaces, defaultFilter, filterToSearchParams } from '@/lib/utils';
import RaceCard from './RaceCard';
import RaceCardExp from './RaceCardExp';
import RaceFilter from './RaceFilter';

interface RaceListProps {
  races: Race[];
  prefectures: Prefecture[];
  giftCategories: GiftCategory[];
  locale: Locale;
  initialFilter?: RaceFilterType;
}

export default function RaceList({ races, prefectures, giftCategories, locale, initialFilter }: RaceListProps) {
  const t = useTranslations('races');
  const router = useRouter();
  const pathname = usePathname();

  // ローカル state で即時反映しつつ、URL も同期することでブラウザ履歴に残す
  const [filter, setFilterState] = useState<RaceFilterType>(initialFilter ?? defaultFilter());
  const view = filter.view;

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    races.forEach((r) => r.tags?.forEach((tag) => tagSet.add(tag)));
    return [...tagSet].sort();
  }, [races]);

  const filteredRaces = useMemo(() => {
    const filtered = filterRaces(races, filter);
    return sortRaces(filtered, filter.sort);
  }, [races, filter]);

  const updateFilter = useCallback((next: RaceFilterType) => {
    setFilterState(next);
    const params = filterToSearchParams(next);
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
  }, [router, pathname]);

  const setFilter = (next: RaceFilterType) => updateFilter(next);
  const setView = (v: 'mag' | 'exp') => updateFilter({ ...filter, view: v });
  const setSort = (s: RaceFilterType['sort']) => updateFilter({ ...filter, sort: s });

  const SORT_OPTIONS: { value: RaceFilterType['sort']; label: string }[] = [
    { value: 'date_asc', label: t('sort.dateAsc') },
    { value: 'entry_closing_soon', label: t('sort.entryClosingSoon') },
    { value: 'entry_opening_soon', label: t('sort.entryOpeningSoon') },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar filter */}
      <aside className="lg:w-64 flex-shrink-0">
        <div className="lg:sticky lg:top-20">
          <RaceFilter
            filter={filter}
            prefectures={prefectures}
            giftCategories={giftCategories}
            availableTags={availableTags}
            locale={locale}
            onChange={setFilter}
          />
        </div>
      </aside>

      {/* Results */}
      <div className="flex-1 min-w-0">
        {/* Results bar */}
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
          <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
            {t('count', { count: filteredRaces.length })}
          </p>

          <div className="flex items-center gap-2 ml-auto">
            {/* Sort selector */}
            <select
              value={filter.sort}
              onChange={(e) => setSort(e.target.value as RaceFilterType['sort'])}
              className="text-xs px-2.5 py-1.5 rounded-[3px] bg-white"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* View toggle */}
            <div
              className="flex rounded-[3px] overflow-hidden"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <button
                onClick={() => setView('mag')}
                className="px-3.5 py-1.5 text-xs font-semibold transition-colors"
                style={
                  view === 'mag'
                    ? { background: 'var(--color-ink)', color: 'white' }
                    : { background: 'white', color: 'var(--color-mid)' }
                }
              >
                {t('filter.toggleMag')}
              </button>
              <button
                onClick={() => setView('exp')}
                className="px-3.5 py-1.5 text-xs font-semibold transition-colors"
                style={
                  view === 'exp'
                    ? { background: 'var(--color-ink)', color: 'white' }
                    : { background: 'white', color: 'var(--color-mid)' }
                }
              >
                {t('filter.toggleExp')}
              </button>
            </div>
          </div>
        </div>

        {filteredRaces.length === 0 ? (
          <div className="text-center py-24" style={{ color: 'var(--color-light)' }}>
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-sm">{t('noResults')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRaces.map((race) =>
              view === 'mag' ? (
                <RaceCard key={race.id} race={race} locale={locale} from="races" />
              ) : (
                <RaceCardExp key={race.id} race={race} locale={locale} from="races" />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
