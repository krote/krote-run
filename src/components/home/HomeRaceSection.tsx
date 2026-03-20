'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Race, Locale } from '@/lib/types';
import RaceCard from '@/components/races/RaceCard';
import RaceCardExp from '@/components/races/RaceCardExp';
import { Link } from '@/i18n/navigation';

interface Props {
  races: Race[];
  locale: Locale;
}

export default function HomeRaceSection({ races, locale }: Props) {
  const t = useTranslations('home.sections');
  const [view, setView] = useState<'mag' | 'exp'>('mag');

  return (
    <section className="max-w-[1120px] mx-auto px-9 py-14">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8 pb-3.5 border-b-2 border-[var(--color-ink)]">
        <div>
          <h2 className="font-serif text-[1.35rem] font-bold text-[var(--color-ink)]">
            {t('upcoming')}
          </h2>
          <p className="text-[0.78rem] text-[var(--color-mid)] italic mt-0.5">
            {t('upcomingSub')}
          </p>
        </div>
        <div className="flex items-center gap-5 shrink-0">
          {/* Toggle */}
          <div className="flex border border-[var(--color-border)] rounded overflow-hidden">
            <button
              onClick={() => setView('mag')}
              className={`px-3.5 py-[5px] text-[0.73rem] font-semibold font-sans border-r border-[var(--color-border)] transition-all cursor-pointer ${
                view === 'mag'
                  ? 'bg-[var(--color-ink)] text-white'
                  : 'bg-white text-[var(--color-mid)] hover:text-[var(--color-ink)]'
              }`}
            >
              {t('toggleMag')}
            </button>
            <button
              onClick={() => setView('exp')}
              className={`px-3.5 py-[5px] text-[0.73rem] font-semibold font-sans transition-all cursor-pointer ${
                view === 'exp'
                  ? 'bg-[var(--color-ink)] text-white'
                  : 'bg-white text-[var(--color-mid)] hover:text-[var(--color-ink)]'
              }`}
            >
              {t('toggleExp')}
            </button>
          </div>
          <Link
            href="/races"
            className="text-[0.73rem] font-semibold text-[var(--color-primary)] no-underline tracking-[0.07em] uppercase hover:underline"
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {races.length > 0
          ? races.map((race) =>
              view === 'mag'
                ? <RaceCard key={race.id} race={race} locale={locale} />
                : <RaceCardExp key={race.id} race={race} locale={locale} />
            )
          : (
            <p className="col-span-3 text-center py-12 text-[var(--color-mid)]">
              {locale === 'en' ? 'No upcoming races found.' : '近日開催の大会はありません。'}
            </p>
          )
        }
      </div>
    </section>
  );
}
