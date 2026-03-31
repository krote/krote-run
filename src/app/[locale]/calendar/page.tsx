import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRaces } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import type { Race, EntryPeriod } from '@/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calendar' });
  return { title: t('title') };
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

type EntryBand = {
  race: Race;
  period: EntryPeriod;
  isStart: boolean;    // actual period start_date
  isEnd: boolean;      // actual period end_date
  isRowStart: boolean; // Sunday continuation (not actual start)
};

export default async function CalendarPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const now = new Date();
  const year = parseInt(sp.year ?? String(now.getFullYear()));
  const month = parseInt(sp.month ?? String(now.getMonth())); // 0-indexed

  const t = await getTranslations({ locale, namespace: 'calendar' });
  const races = await getRaces();

  // Race day events
  const raceDaysByDate = new Map<string, Race[]>();
  races.forEach((race) => {
    const key = race.date.split('T')[0];
    if (!raceDaysByDate.has(key)) raceDaysByDate.set(key, []);
    raceDaysByDate.get(key)!.push(race);
  });

  // Entry period bands: expand each entry period into per-day entries
  const entryBandsByDate = new Map<string, EntryBand[]>();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  races.forEach((race) => {
    const periods = race.entry_periods ?? [];
    // Fallback to old fields if no entry_periods
    const effectivePeriods = periods.length > 0
      ? periods
      : (race.entry_start_date && race.entry_end_date
          ? [{ id: 0, race_id: race.id, category_id: null, label_ja: '一般エントリー', label_en: 'General Entry', start_date: race.entry_start_date.split('T')[0], end_date: race.entry_end_date.split('T')[0], entry_fee: null, sort_order: 0 }]
          : []);

    effectivePeriods.forEach((period) => {
      const periodStart = new Date(period.start_date + 'T00:00:00');
      const periodEnd = new Date(period.end_date + 'T00:00:00');

      // Skip if no overlap with current month
      if (periodStart > monthEnd || periodEnd < monthStart) return;

      const effectiveStart = periodStart < monthStart ? monthStart : periodStart;
      const effectiveEnd = periodEnd > monthEnd ? monthEnd : periodEnd;

      let cur = new Date(effectiveStart.getTime());
      while (cur <= effectiveEnd) {
        const d = cur.getDate();
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dow = cur.getDay();
        if (!entryBandsByDate.has(dateStr)) entryBandsByDate.set(dateStr, []);
        entryBandsByDate.get(dateStr)!.push({
          race,
          period,
          isStart: dateStr === period.start_date,
          isEnd: dateStr === period.end_date,
          isRowStart: dow === 0 && dateStr !== period.start_date,
        });
        cur = new Date(cur.getTime() + 86400000);
      }
    });
  });

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
  const nextMonth = month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };

  const monthNames = t.raw('months') as string[];
  const weekdayNames = t.raw('weekdays') as string[];
  const monthLabel = `${year}年${monthNames[month]}`;

  const raceName = (race: Race) =>
    locale === 'en' ? (race.name_en ?? race.name_ja) : race.name_ja;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={`?year=${prevMonth.year}&month=${prevMonth.month}`}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary border border-gray-200 rounded-lg hover:border-primary transition-colors"
        >
          ← {t('prev')}
        </Link>
        <h2 className="text-xl font-bold text-gray-900">{monthLabel}</h2>
        <Link
          href={`?year=${nextMonth.year}&month=${nextMonth.month}`}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary border border-gray-200 rounded-lg hover:border-primary transition-colors"
        >
          {t('next')} →
        </Link>
      </div>

      {/* Calendar grid */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {weekdayNames.map((day, i) => (
            <div
              key={day}
              className={`p-3 text-center text-sm font-semibold ${
                i === 0 ? 'text-accent' : i === 6 ? 'text-primary' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days — cells have no horizontal padding; bands handle their own margins */}
        <div className="grid grid-cols-7">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-28 border-b border-r border-gray-100 bg-gray-50" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayRaces = raceDaysByDate.get(dateStr) ?? [];
            const entryBands = entryBandsByDate.get(dateStr) ?? [];
            const isToday =
              day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
            const dayOfWeek = (firstDay + i) % 7;

            // Overflow count across bands and race badges
            const MAX_BANDS = 2;
            const MAX_RACES = 1;
            const visibleBands = entryBands.slice(0, MAX_BANDS);
            const visibleRaces = dayRaces.slice(0, MAX_RACES);
            const overflow =
              (entryBands.length - visibleBands.length) +
              (dayRaces.length - visibleRaces.length);

            return (
              <div
                key={day}
                className={`min-h-28 border-b border-r border-gray-100 ${isToday ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                {/* Date number */}
                <div className="px-2 pt-2 pb-1">
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium ${
                      isToday
                        ? 'bg-primary text-white'
                        : dayOfWeek === 0
                        ? 'text-accent'
                        : dayOfWeek === 6
                        ? 'text-primary'
                        : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </span>
                </div>

                {/* Entry period bands */}
                <div className="space-y-px">
                  {visibleBands.map((band) => {
                    const name = raceName(band.race);
                    const periodLabel = locale === 'en' ? band.period.label_en : band.period.label_ja;
                    let label = '';
                    if (band.isStart) label = `${t('entryStart')} ${name}${periodLabel !== '一般エントリー' && periodLabel !== 'General Entry' ? ` (${periodLabel})` : ''}`;
                    else if (band.isEnd) label = `${t('entryEnd')} ${name}`;
                    else if (band.isRowStart) label = name;

                    // Determine margin/rounding based on position within period
                    let cx =
                      'flex items-center h-5 text-xs overflow-hidden text-green-900 bg-green-100 transition-colors hover:bg-green-200 ';
                    if (band.isStart && band.isEnd) {
                      // Single-day pill
                      cx += 'mx-2 rounded-full px-2';
                    } else if (band.isStart) {
                      // Left-rounded, extends to right border
                      cx += 'ml-2 rounded-l-full pl-2 pr-1';
                    } else if (band.isEnd) {
                      // Right-rounded, extends from left border
                      cx += 'mr-2 rounded-r-full pl-1 pr-2';
                    } else {
                      // Middle strip — full cell width (no horizontal margin or padding)
                      cx += '';
                    }

                    return (
                      <Link key={`${band.race.id}-${band.period.id ?? band.period.start_date}`} href={`/races/${band.race.id}`} className={cx}>
                        {label && <span className="truncate">{label}</span>}
                      </Link>
                    );
                  })}
                </div>

                {/* Race day badges */}
                <div className="px-2 mt-1 space-y-1">
                  {visibleRaces.map((race) => (
                    <Link
                      key={race.id}
                      href={`/races/${race.id}`}
                      className="block text-xs bg-primary text-white rounded px-1.5 py-0.5 truncate hover:bg-primary/80 transition-colors"
                    >
                      {raceName(race)}
                    </Link>
                  ))}
                  {overflow > 0 && (
                    <span className="text-xs text-gray-500">+{overflow}件</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-600">
        <span className="font-medium">{t('legend')}:</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-primary" />
          {t('raceDay')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-3 bg-green-100 rounded-full" />
          {t('entryPeriod')}
        </span>
      </div>
    </div>
  );
}
