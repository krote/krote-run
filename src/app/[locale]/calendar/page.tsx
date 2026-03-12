import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRaces } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

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

  // Group races by date
  const racesByDate = new Map<string, typeof races>();
  races.forEach((race) => {
    const key = race.date.split('T')[0];
    if (!racesByDate.has(key)) racesByDate.set(key, []);
    racesByDate.get(key)!.push(race);
  });

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
  const nextMonth = month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };

  const monthNames = t.raw('months') as string[];
  const weekdayNames = t.raw('weekdays') as string[];
  const monthLabel = `${year}年${monthNames[month]}`;

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
            const dayRaces = racesByDate.get(dateStr) ?? [];
            const isToday =
              day === now.getDate() && month === now.getMonth() && year === now.getFullYear();
            const dayOfWeek = (firstDay + i) % 7;

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
                  {dayRaces.slice(0, 2).map((race) => (
                    <Link
                      key={race.id}
                      href={`/races/${race.id}`}
                      className="block text-xs bg-primary text-white rounded px-1.5 py-0.5 truncate hover:bg-primary-dark transition-colors"
                    >
                      {race.name_ja}
                    </Link>
                  ))}
                  {dayRaces.length > 2 && (
                    <span className="text-xs text-gray-500">+{dayRaces.length - 2}件</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
