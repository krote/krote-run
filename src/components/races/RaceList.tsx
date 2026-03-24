'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { Race, Prefecture, GiftCategory, RaceFilter as RaceFilterType, Locale } from '@/lib/types';
import { filterRaces, sortRacesByDate, emptyFilter } from '@/lib/utils';
import RaceCard from './RaceCard';
import RaceCardExp from './RaceCardExp';
import RaceFilter from './RaceFilter';

interface RaceListProps {
  races: Race[];
  prefectures: Prefecture[];
  giftCategories: GiftCategory[];
  locale: Locale;
}

export default function RaceList({ races, prefectures, giftCategories, locale }: RaceListProps) {
  const t = useTranslations('races');
  const [filter, setFilter] = useState<RaceFilterType>(emptyFilter());
  const [view, setView] = useState<'mag' | 'exp'>('mag');

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    races.forEach((r) => r.tags?.forEach((tag) => tagSet.add(tag)));
    return [...tagSet].sort();
  }, [races]);

  const filteredRaces = useMemo(() => {
    const filtered = filterRaces(races, filter);
    return sortRacesByDate(filtered);
  }, [races, filter]);

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
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
            {t('count', { count: filteredRaces.length })}
          </p>

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

        {filteredRaces.length === 0 ? (
          <div className="text-center py-24" style={{ color: 'var(--color-light)' }}>
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-sm">{t('noResults')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRaces.map((race) =>
              view === 'mag' ? (
                <RaceCard key={race.id} race={race} locale={locale} />
              ) : (
                <RaceCardExp key={race.id} race={race} locale={locale} />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
