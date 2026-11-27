import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRaces, getPrefectures } from '@/lib/data';
import { toRaceListItem } from '@/lib/race-list-item';
import { getTodayJST } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/types';
import CalendarView from '@/components/calendar/CalendarView';
import { notFound } from 'next/navigation';
import { resolveCalendarMonth } from '@/lib/calendar-range';

const monthNavClass = 'px-4 py-1.5 text-sm font-medium rounded-[3px] transition-colors no-underline';
const monthNavStyle = { background: 'var(--color-cream)', color: 'var(--color-ink)', border: '1px solid var(--color-border)' };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'calendar' });
  return { title: t('title') };
}

export default async function CalendarPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const sp = await searchParams;
  const todayJST = getTodayJST();
  // 表示範囲外・不正な年月は 404（無限に辿れるとクローラーの巡回で CPU 制限を超えるため）
  const resolved = resolveCalendarMonth(sp, todayJST);
  if (!resolved) notFound();
  const { year, month, prev: prevMonth, next: nextMonth, today, isCurrent } = resolved;

  const t = await getTranslations({ locale, namespace: 'calendar' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const isJa = locale === 'ja';

  const [races, prefectures] = await Promise.all([getRaces(), getPrefectures()]);
  // Client Component に渡す分は一覧で使う項目だけに絞る（RSCペイロード削減）
  const raceItems = races.map((race) => toRaceListItem(race, locale));

  // prefecture コード → 地方名のマップ
  const prefToRegion = Object.fromEntries(
    prefectures.map((p) => [p.code, isJa ? p.region : p.regionEn])
  );

  // 地方名一覧（重複排除・順序保持）
  const regions = [...new Set(prefectures.map((p) => isJa ? p.region : p.regionEn))];

  const monthNames = t.raw('months') as string[];
  const monthLabel = isJa ? `${year}年${monthNames[month]}` : `${monthNames[month]} ${year}`;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8" style={{ color: 'var(--color-ink)' }}>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-4" style={{ color: 'var(--color-mid)' }} aria-label="breadcrumb">
        <Link href="/" className="hover:underline">{tNav('home')}</Link>
        <span aria-hidden="true">›</span>
        <span style={{ color: 'var(--color-ink)' }}>{tNav('calendar')}</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold mb-6" style={{ color: 'var(--color-ink)' }}>
        {t('title')}
      </h1>

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        {prevMonth ? (
          <Link
            href={`?year=${prevMonth.year}&month=${prevMonth.month}`}
            rel="nofollow"
            className={monthNavClass}
            style={monthNavStyle}
          >
            ← {t('prev')}
          </Link>
        ) : (
          <span className={monthNavClass} style={{ ...monthNavStyle, opacity: 0.4 }} aria-disabled="true">
            ← {t('prev')}
          </span>
        )}
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold">{monthLabel}</h2>
          {!isCurrent && (
            <Link
              href={`?year=${today.year}&month=${today.month}`}
              rel="nofollow"
              className="px-3 py-1 text-xs font-medium rounded-[3px] transition-colors no-underline"
              style={{ background: 'var(--color-primary)', color: 'white' }}
            >
              {isJa ? '今月' : 'Today'}
            </Link>
          )}
        </div>
        {nextMonth ? (
          <Link
            href={`?year=${nextMonth.year}&month=${nextMonth.month}`}
            rel="nofollow"
            className={monthNavClass}
            style={monthNavStyle}
          >
            {t('next')} →
          </Link>
        ) : (
          <span className={monthNavClass} style={{ ...monthNavStyle, opacity: 0.4 }} aria-disabled="true">
            {t('next')} →
          </span>
        )}
      </div>

      <CalendarView
        races={raceItems}
        year={year}
        month={month}
        locale={locale}
        today={todayJST}
        regions={regions}
        prefToRegion={prefToRegion}
      />

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs" style={{ color: 'var(--color-mid)' }}>
        <span className="font-medium">{t('legend')}:</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: 'var(--color-primary)' }} />
          {t('raceDay')}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-8 h-3 rounded-full" style={{ background: '#d1fae5' }} />
          {t('entryPeriod')}
        </span>
      </div>
    </div>
  );
}
