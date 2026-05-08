import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRaces, getPrefectures } from '@/lib/data';
import { getTodayJST } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/types';
import CalendarView from '@/components/calendar/CalendarView';

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
  const [todayYear, todayMonth0] = todayJST.split('-').map(Number);
  const year = parseInt(sp.year ?? String(todayYear));
  const month = parseInt(sp.month ?? String(todayMonth0 - 1)); // 0-indexed

  const t = await getTranslations({ locale, namespace: 'calendar' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const isJa = locale === 'ja';

  const [races, prefectures] = await Promise.all([getRaces(), getPrefectures()]);

  // prefecture コード → 地方名のマップ
  const prefToRegion = Object.fromEntries(
    prefectures.map((p) => [p.code, isJa ? p.region : p.regionEn])
  );

  // 地方名一覧（重複排除・順序保持）
  const regions = [...new Set(prefectures.map((p) => isJa ? p.region : p.regionEn))];

  const prevMonth = month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 };
  const nextMonth = month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };

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
        <Link
          href={`?year=${prevMonth.year}&month=${prevMonth.month}`}
          className="px-4 py-1.5 text-sm font-medium rounded-[3px] transition-colors no-underline"
          style={{ background: 'var(--color-cream)', color: 'var(--color-ink)', border: '1px solid var(--color-border)' }}
        >
          ← {t('prev')}
        </Link>
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold">{monthLabel}</h2>
          {(year !== todayYear || month !== todayMonth0 - 1) && (
            <Link
              href={`?year=${todayYear}&month=${todayMonth0 - 1}`}
              className="px-3 py-1 text-xs font-medium rounded-[3px] transition-colors no-underline"
              style={{ background: 'var(--color-primary)', color: 'white' }}
            >
              {isJa ? '今月' : 'Today'}
            </Link>
          )}
        </div>
        <Link
          href={`?year=${nextMonth.year}&month=${nextMonth.month}`}
          className="px-4 py-1.5 text-sm font-medium rounded-[3px] transition-colors no-underline"
          style={{ background: 'var(--color-cream)', color: 'var(--color-ink)', border: '1px solid var(--color-border)' }}
        >
          {t('next')} →
        </Link>
      </div>

      <CalendarView
        races={races}
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
