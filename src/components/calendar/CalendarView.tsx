'use client';

import { useState } from 'react';
import type { Race, Locale } from '@/lib/types';
import ControlBar, { type StatusFilter } from './ControlBar';
import MonthGrid from './MonthGrid';
import YearTimeline from './YearTimeline';
import HoverCard from './HoverCard';
type ViewMode = 'month' | 'timeline';

interface CalendarViewProps {
  races: Race[];
  year: number;
  month: number; // 0-indexed
  locale: Locale;
  today: string;
  regions: string[];
  prefToRegion: Record<string, string>;
}

function getRaceStatus(race: Race, today: string): 'open' | 'soon' | 'closed' | 'past' {
  if (race.date < today) return 'past';
  if (race.entry_closed) return 'closed';

  const activePeriod = race.entry_periods.find(
    (p) => today >= p.start_date && today <= p.end_date,
  ) ?? (race.entry_start_date && race.entry_end_date &&
    today >= race.entry_start_date && today <= race.entry_end_date
      ? { start_date: race.entry_start_date, end_date: race.entry_end_date }
      : null);

  if (activePeriod) return 'open';

  const futurePeriod = race.entry_periods.find((p) => p.start_date > today)
    ?? (race.entry_start_date && race.entry_start_date > today ? {} : null);
  if (futurePeriod) return 'soon';

  return 'closed';
}

export default function CalendarView({
  races,
  year,
  month,
  locale,
  today,
  regions,
  prefToRegion,
}: CalendarViewProps) {
  const [view, setView] = useState<ViewMode>('month');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [region, setRegion] = useState<string>('all');
  const [hoverRace, setHoverRace] = useState<Race | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const isJa = locale === 'ja';

  // フィルタリング
  const filteredRaces = races.filter((race) => {
    if (region !== 'all') {
      const raceRegion = prefToRegion[race.prefecture];
      if (raceRegion !== region) return false;
    }
    if (status !== 'all') {
      const rStatus = getRaceStatus(race, today);
      if (status === 'open' && rStatus !== 'open') return false;
      if (status === 'soon' && rStatus !== 'soon') return false;
      if (status === 'closed' && rStatus !== 'closed' && rStatus !== 'past') return false;
    }
    return true;
  });

  const handleHover = (race: Race | null, pos: { x: number; y: number }) => {
    setHoverRace(race);
    setHoverPos(pos);
  };

  return (
    <div>
      {/* View toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setView('month')}
          className="px-3 py-1 text-xs font-semibold rounded-[3px] transition-colors"
          style={{
            background: view === 'month' ? 'var(--color-ink)' : 'var(--color-cream)',
            color: view === 'month' ? 'white' : 'var(--color-ink)',
            border: `1px solid ${view === 'month' ? 'var(--color-ink)' : 'var(--color-border)'}`,
          }}
        >
          {isJa ? '月' : 'Month'}
        </button>
        <button
          onClick={() => setView('timeline')}
          className="px-3 py-1 text-xs font-semibold rounded-[3px] transition-colors"
          style={{
            background: view === 'timeline' ? 'var(--color-ink)' : 'var(--color-cream)',
            color: view === 'timeline' ? 'white' : 'var(--color-ink)',
            border: `1px solid ${view === 'timeline' ? 'var(--color-ink)' : 'var(--color-border)'}`,
          }}
        >
          {isJa ? '年間' : 'Year'}
        </button>
      </div>

      <ControlBar
        status={status}
        region={region}
        onStatusChange={setStatus}
        onRegionChange={setRegion}
        regions={regions}
        locale={locale}
      />

      {view === 'month' ? (
        <MonthGrid
          races={filteredRaces}
          year={year}
          month={month}
          locale={locale}
          today={today}
          onHover={handleHover}
        />
      ) : (
        <YearTimeline
          races={filteredRaces}
          year={year}
          locale={locale}
          today={today}
        />
      )}

      <HoverCard race={hoverRace} locale={locale} position={hoverPos} />
    </div>
  );
}
