'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import type { Race, Prefecture, RaceFilter as RaceFilterType, Locale } from '@/lib/types';
import { filterRaces, sortRacesByDate, emptyFilter } from '@/lib/utils';
import RaceCard from './RaceCard';
import RaceFilter from './RaceFilter';

interface RaceListProps {
  races: Race[];
  prefectures: Prefecture[];
  locale: Locale;
}

export default function RaceList({ races, prefectures, locale }: RaceListProps) {
  const t = useTranslations('races');
  const [filter, setFilter] = useState<RaceFilterType>(emptyFilter());

  const filteredRaces = useMemo(() => {
    const filtered = filterRaces(races, filter);
    return sortRacesByDate(filtered);
  }, [races, filter]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar filter */}
      <aside className="lg:w-72 flex-shrink-0">
        <div className="lg:sticky lg:top-20">
          <RaceFilter filter={filter} prefectures={prefectures} onChange={setFilter} />
        </div>
      </aside>

      {/* Results */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {t('count', { count: filteredRaces.length })}
          </p>
        </div>

        {filteredRaces.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-base">{t('noResults')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredRaces.map((race) => (
              <RaceCard key={race.id} race={race} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
