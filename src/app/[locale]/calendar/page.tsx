import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRaces } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import type { Race } from '@/lib/types';

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

type EventType = 'race' | 'entry_start' | 'entry_end';
type CalendarEvent = { type: EventType; race: Race };

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

  // Build events map: date string → list of CalendarEvent
  const eventsByDate = new Map<string, CalendarEvent[]>();

  function addEvent(dateStr: string | null | undefined, event: CalendarEvent) {
    if (!dateStr) return;
    const key = dateStr.split('T')[0];
    if (!eventsByDate.has(key)) eventsByDate.set(key, []);
    eventsByDate.get(key)!.push(event);
  }

  races.forEach((race) => {
    addEvent(race.date, { type: 'race', race });
    addEvent(race.entry_start_date, { type: 'entry_start', race });
    addEvent(race.entry_end_date, { type: 'entry_end', race });
  });

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
  const nextMonth = month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };

  const monthNames = t.raw('months') as string[];
  const weekdayNames = t.raw('weekdays') as string[];
  const monthLabel = `${year}年${monthNames[month]}`;

  // Badge styles per event type
  const badgeStyles: Record<EventType, string> = {
    race: 'bg-primary text-white hover:bg-primary/80',
    entry_start: 'bg-green-600 text-white hover:bg-green-700',
    entry_end: 'bg-amber-500 text-white hover:bg-amber-600',
  };

  const eventLabel = (event: CalendarEvent): string => {
    const name = locale === 'en' ? (event.race.name_en ?? event.race.name_ja) : event.race.name_ja;
    if (event.type === 'entry_start') return `${t('entryStart')} ${name}`;
    if (event.type === 'entry_end') return `${t('entryEnd')} ${name}`;
    return name;
  };

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

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-24 p-2 border-b border-r border-gray-100 bg-gray-50" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const events = eventsByDate.get(dateStr) ?? [];
            const isToday =
              day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
            const dayOfWeek = (firstDay + i) % 7;
            const visibleEvents = events.slice(0, 3);
            const overflow = events.length - visibleEvents.length;

            return (
              <div
                key={day}
                className={`min-h-24 p-2 border-b border-r border-gray-100 ${isToday ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium mb-1 ${
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
                <div className="space-y-1">
                  {visibleEvents.map((event, idx) => (
                    <Link
                      key={`${event.type}-${event.race.id}-${idx}`}
                      href={`/races/${event.race.id}`}
                      className={`block text-xs rounded px-1.5 py-0.5 truncate transition-colors ${badgeStyles[event.type]}`}
                    >
                      {eventLabel(event)}
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
          <span className="inline-block w-3 h-3 rounded-sm bg-green-600" />
          {t('entryStart')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-amber-500" />
          {t('entryEnd')}
        </span>
      </div>
    </div>
  );
}
