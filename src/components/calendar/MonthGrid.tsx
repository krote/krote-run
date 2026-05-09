'use client';

import type { Race, EntryPeriod, Locale } from '@/lib/types';
import { Link } from '@/i18n/navigation';

interface MonthGridProps {
  races: Race[];
  year: number;
  month: number; // 0-indexed
  locale: Locale;
  today: string;
  onHover: (race: Race | null, pos: { x: number; y: number }) => void;
}

type EntryBand = {
  race: Race;
  period: EntryPeriod;
  isStart: boolean;
  isEnd: boolean;
  isRowStart: boolean;
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export default function MonthGrid({ races, year, month, locale, today, onHover }: MonthGridProps) {
  const isJa = locale === 'ja';
  const raceName = (race: Race) => isJa ? race.name_ja : (race.name_en ?? race.name_ja);

  // Race day map
  const raceDaysByDate = new Map<string, Race[]>();
  races.forEach((race) => {
    const key = race.date.split('T')[0];
    if (!raceDaysByDate.has(key)) raceDaysByDate.set(key, []);
    raceDaysByDate.get(key)!.push(race);
  });

  // Entry period bands with lane assignment
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  interface PeriodEntry {
    race: Race;
    period: EntryPeriod;
    effectiveStart: string;
    effectiveEnd: string;
    key: string;
  }
  const allPeriods: PeriodEntry[] = [];

  races.forEach((race) => {
    const periods = race.entry_periods ?? [];
    const effectivePeriods = periods.length > 0
      ? periods
      : (race.entry_start_date && race.entry_end_date
          ? [{ id: 0, race_id: race.id, category_id: null, label_ja: '一般エントリー', label_en: 'General Entry', start_date: race.entry_start_date.split('T')[0], end_date: race.entry_end_date.split('T')[0], entry_fee: null, sort_order: 0 }]
          : []);

    effectivePeriods.forEach((period) => {
      const periodStart = new Date(period.start_date + 'T00:00:00');
      const periodEnd = new Date(period.end_date + 'T00:00:00');
      if (periodStart > monthEnd || periodEnd < monthStart) return;

      const effectiveStart = periodStart < monthStart ? monthStart : periodStart;
      const effectiveEnd = periodEnd > monthEnd ? monthEnd : periodEnd;
      const pad = (n: number) => String(n).padStart(2, '0');
      const effStartStr = `${year}-${pad(effectiveStart.getMonth() + 1)}-${pad(effectiveStart.getDate())}`;
      const effEndStr = `${year}-${pad(effectiveEnd.getMonth() + 1)}-${pad(effectiveEnd.getDate())}`;

      allPeriods.push({ race, period, effectiveStart: effStartStr, effectiveEnd: effEndStr, key: `${race.id}__${period.id ?? period.start_date}` });
    });
  });

  allPeriods.sort((a, b) =>
    a.effectiveStart !== b.effectiveStart
      ? a.effectiveStart.localeCompare(b.effectiveStart)
      : a.race.name_ja.localeCompare(b.race.name_ja),
  );

  const laneMap = new Map<string, number>();
  const laneLastEnd: string[] = [];
  for (const pe of allPeriods) {
    let lane = laneLastEnd.findIndex((end) => end < pe.effectiveStart);
    if (lane === -1) lane = laneLastEnd.length;
    laneLastEnd[lane] = pe.effectiveEnd;
    laneMap.set(pe.key, lane);
  }
  const totalLanes = laneLastEnd.length;

  const entryBandsByDate = new Map<string, EntryBand[]>();
  races.forEach((race) => {
    const periods = race.entry_periods ?? [];
    const effectivePeriods = periods.length > 0
      ? periods
      : (race.entry_start_date && race.entry_end_date
          ? [{ id: 0, race_id: race.id, category_id: null, label_ja: '一般エントリー', label_en: 'General Entry', start_date: race.entry_start_date.split('T')[0], end_date: race.entry_end_date.split('T')[0], entry_fee: null, sort_order: 0 }]
          : []);

    effectivePeriods.forEach((period) => {
      const periodStart = new Date(period.start_date + 'T00:00:00');
      const periodEnd = new Date(period.end_date + 'T00:00:00');
      if (periodStart > monthEnd || periodEnd < monthStart) return;

      const effectiveStart = periodStart < monthStart ? monthStart : periodStart;
      const effectiveEnd = periodEnd > monthEnd ? monthEnd : periodEnd;

      let cur = new Date(effectiveStart.getTime());
      while (cur <= effectiveEnd) {
        const d = cur.getDate();
        const pad = (n: number) => String(n).padStart(2, '0');
        const dateStr = `${year}-${pad(month + 1)}-${pad(d)}`;
        const dow = cur.getDay();
        if (!entryBandsByDate.has(dateStr)) entryBandsByDate.set(dateStr, []);
        entryBandsByDate.get(dateStr)!.push({
          race,
          period,
          isStart: dateStr === period.start_date,
          isEnd: dateStr === period.end_date,
          isRowStart: (dow === 0 || d === 1) && dateStr !== period.start_date,
        });
        cur = new Date(cur.getTime() + 86400000);
      }
    });
  });

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const weekdayNames = isJa
    ? ['日', '月', '火', '水', '木', '金', '土']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 4, overflow: 'hidden' }}>
      {/* Weekday headers */}
      <div className="grid grid-cols-7" style={{ background: 'var(--color-cream)', borderBottom: '1px solid var(--color-border)' }}>
        {weekdayNames.map((day, i) => (
          <div
            key={day}
            className="p-3 text-center text-xs font-semibold"
            style={{
              color: i === 0 ? '#c0392b' : i === 6 ? 'var(--color-primary)' : 'var(--color-mid)',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="min-h-28"
            style={{ borderBottom: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', background: 'var(--color-cream)' }}
          />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const pad = (n: number) => String(n).padStart(2, '0');
          const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;
          const dayRaces = raceDaysByDate.get(dateStr) ?? [];
          const entryBands = entryBandsByDate.get(dateStr) ?? [];
          const isToday = dateStr === today;
          const dayOfWeek = (firstDay + i) % 7;

          return (
            <div
              key={day}
              data-date={dateStr}
              data-today={isToday ? 'true' : undefined}
              className="min-h-28"
              style={{
                borderBottom: '1px solid var(--color-border)',
                borderRight: '1px solid var(--color-border)',
                background: isToday ? '#f0f4ff' : 'white',
              }}
            >
              {/* Date number */}
              <div className="px-2 pt-2 pb-1">
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium"
                  style={{
                    background: isToday ? 'var(--color-primary)' : 'transparent',
                    color: isToday ? 'white' : dayOfWeek === 0 ? '#c0392b' : dayOfWeek === 6 ? 'var(--color-primary)' : 'var(--color-ink)',
                  }}
                >
                  {day}
                </span>
              </div>

              {/* Entry bands */}
              <div className="space-y-px">
                {Array.from({ length: totalLanes }, (_, lane) => {
                  const band = entryBands.find(
                    (b) => laneMap.get(`${b.race.id}__${b.period.id ?? b.period.start_date}`) === lane,
                  );
                  if (!band) return <div key={lane} className="h-5" />;

                  const label = band.isStart
                    ? `受付 ${raceName(band.race)}`
                    : band.isRowStart ? raceName(band.race) : '';

                  const hasLabel = label !== '';
                  let cx = `flex items-center h-5 text-xs transition-colors ${hasLabel ? 'overflow-visible relative z-10' : 'overflow-hidden'} `;
                  if (band.isStart && band.isEnd) cx += 'mx-2 rounded-full px-2';
                  else if (band.isStart) cx += 'ml-2 rounded-l-full pl-2 pr-1';
                  else if (band.isEnd) cx += 'mr-2 rounded-r-full pl-1 pr-2';

                  return (
                    <Link
                      key={lane}
                      href={`/races/${band.race.id}?from=calendar`}
                      className={cx}
                      style={{ background: '#d1fae5', color: '#065f46' }}
                    >
                      {label && <span className="whitespace-nowrap">{label}</span>}
                    </Link>
                  );
                })}
              </div>

              {/* Race day badges */}
              <div className="px-2 mt-1 space-y-1">
                {dayRaces.map((race) => (
                  <Link
                    key={race.id}
                    href={`/races/${race.id}?from=calendar`}
                    className="block text-xs rounded px-1.5 py-0.5 truncate transition-colors"
                    style={{ background: 'var(--color-primary)', color: 'white' }}
                    onMouseEnter={(e) => onHover(race, { x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => onHover(null, { x: 0, y: 0 })}
                  >
                    {raceName(race)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
