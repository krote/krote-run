'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Race, Locale } from '@/lib/types';
import RaceCard from '@/components/races/RaceCard';
import RaceCardExp from '@/components/races/RaceCardExp';
import { Link } from '@/i18n/navigation';

interface Props {
  upcoming: Race[];
  openEntry: Race[];
  soonOpening: Race[];
  locale: Locale;
}

interface SectionProps {
  title: string;
  subtitle: string;
  races: Race[];
  locale: Locale;
  view: 'mag' | 'exp';
  accentColor?: string;
}

function RaceSection({ title, subtitle, races, locale, view, accentColor = 'var(--color-ink)' }: SectionProps) {
  const t = useTranslations('home.sections');

  if (races.length === 0) return null;

  return (
    <section className="max-w-[1120px] mx-auto px-9 py-10">
      <div
        className="flex items-center justify-between mb-7 pb-3 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <div>
          <h2 className="font-serif text-[1.25rem] font-bold" style={{ color: accentColor }}>
            {title}
          </h2>
          <p className="text-[0.75rem] text-[var(--color-mid)] italic mt-0.5">{subtitle}</p>
        </div>
        <Link
          href="/races"
          className="text-[0.73rem] font-semibold no-underline tracking-[0.07em] uppercase hover:underline shrink-0"
          style={{ color: 'var(--color-primary)' }}
        >
          {t('viewAll')}
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {races.map((race) =>
          view === 'mag'
            ? <RaceCard key={race.id} race={race} locale={locale} />
            : <RaceCardExp key={race.id} race={race} locale={locale} />
        )}
      </div>
    </section>
  );
}

export default function HomeSections({ upcoming, openEntry, soonOpening, locale }: Props) {
  const t = useTranslations('home.sections');
  const [view, setView] = useState<'mag' | 'exp'>('mag');

  const hasAny = upcoming.length > 0 || openEntry.length > 0 || soonOpening.length > 0;

  return (
    <div>
      {/* Toolbar */}
      <div className="max-w-[1120px] mx-auto px-9 pt-10 flex justify-end">
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
      </div>

      {hasAny ? (
        <>
          <RaceSection
            title={t('upcoming')}
            subtitle={t('upcomingSub')}
            races={upcoming}
            locale={locale}
            view={view}
          />
          <RaceSection
            title={t('openEntry')}
            subtitle={t('openEntrySub')}
            races={openEntry}
            locale={locale}
            view={view}
            accentColor="#2e7d32"
          />
          <RaceSection
            title={t('soonOpening')}
            subtitle={t('soonOpeningSub')}
            races={soonOpening}
            locale={locale}
            view={view}
            accentColor="#1565c0"
          />
        </>
      ) : (
        <div className="max-w-[1120px] mx-auto px-9 py-14 text-center text-[var(--color-mid)]">
          {locale === 'en' ? 'No races found.' : '大会情報が見つかりません。'}
        </div>
      )}
    </div>
  );
}
