import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getRaceById, getGiftCategories } from '@/lib/data';
import { formatDate, formatCurrency, getMainCategory, getRaceName, getRaceDescription, getRaceCity, getCategoryLabel } from '@/lib/utils';
import { toSeriesId, getSeriesById, getSeriesRaces } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import type { Locale, NearbySpotType } from '@/lib/types';
import CourseProfileSection from '@/components/course/CourseProfileSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const race = await getRaceById(id);
  if (!race) return {};

  const isJa = locale !== 'en';
  const name = isJa ? race.name_ja : (race.name_en ?? race.name_ja);
  const description = isJa ? race.description_ja : (race.description_en ?? race.description_ja);
  const url = `https://hashiru.run/${locale}/races/${id}`;

  return {
    title: name,
    description,
    alternates: {
      canonical: url,
      languages: {
        ja: `https://hashiru.run/ja/races/${id}`,
        en: `https://hashiru.run/en/races/${id}`,
      },
    },
    openGraph: {
      type: 'website',
      title: name,
      description,
      url,
      siteName: 'HASHIRU',
    },
    twitter: {
      card: 'summary',
      title: name,
      description,
    },
  };
}

const NEARBY_TYPE: Record<NearbySpotType, { en: string; icon: string }> = {
  '観光地': { en: 'Sightseeing', icon: '🏛️' },
  '温泉': { en: 'Hot Spring', icon: '♨️' },
  'グルメ': { en: 'Gourmet', icon: '🍜' },
  '宿泊': { en: 'Stay', icon: '🏨' },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[0.68rem] font-bold tracking-[0.16em] uppercase mb-1"
      style={{ color: 'var(--color-primary)' }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif text-2xl font-bold mb-5"
      style={{ color: 'var(--color-ink)' }}
    >
      {children}
    </h2>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[4px] p-5 ${className}`}
      style={{ background: 'white', border: '1px solid var(--color-border)' }}
    >
      {children}
    </div>
  );
}

export default async function RaceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale = rawLocale as Locale;
  const seriesId = toSeriesId(id);
  const [race, giftCategories, t, series, seriesRaces] = await Promise.all([
    getRaceById(id),
    getGiftCategories(),
    getTranslations({ locale, namespace: 'races.detail' }),
    getSeriesById(seriesId),
    getSeriesRaces(seriesId, id),
  ]);

  if (!race) notFound();

  const mainCategory = getMainCategory(race.categories);
  const giftCategoryMap = new Map(giftCategories.map((c) => [c.id, c]));
  const raceSeriesName = getRaceName(race, locale);
  const raceName = (locale === 'ja' ? race.full_name_ja : race.full_name_en) ?? raceSeriesName;
  const raceDesc = getRaceDescription(race, locale);
  const today = new Date().toISOString().split('T')[0];
  const isPast = race.date < today;
  const isEntryOpen =
    race.entry_start_date !== null &&
    race.entry_end_date !== null &&
    today >= race.entry_start_date &&
    today <= race.entry_end_date;
  const isNotYetOpen = race.entry_start_date !== null && today < race.entry_start_date;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: raceName,
    description: raceDesc,
    startDate: race.date,
    url: race.official_url ?? `https://hashiru.run/${locale}/races/${id}`,
    eventStatus: isPast
      ? 'https://schema.org/EventPostponed'
      : 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: getRaceCity(race, locale),
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'JP',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ── */}
      <div style={{ background: 'var(--color-ink)' }} className="text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--color-light)' }}>
            <Link href="/races" className="hover:text-white transition-colors">
              {t('backToRaces')}
            </Link>
          </nav>

          {/* Tags */}
          {race.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {race.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.68rem] font-semibold px-2.5 py-0.5 rounded-[3px]"
                  style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Race name */}
          <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight mb-2">
            {raceName}
          </h1>
          {/* シリーズ名（正式名称と異なる場合のみ表示） */}
          {raceName !== raceSeriesName && (
            <p className="text-sm mb-4" style={{ color: 'var(--color-light)' }}>
              {raceSeriesName}
            </p>
          )}

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm mb-5" style={{ color: 'var(--color-light)' }}>
            <span>📅 {formatDate(race.date, locale)}</span>
            <span>📍 {getRaceCity(race, locale)}</span>
            {mainCategory && <span>🏃 {mainCategory.distance_km}km</span>}
          </div>

          {/* Entry status + official site */}
          <div className="flex flex-wrap items-center gap-3">
            {!isPast && isEntryOpen && (
              <span
                className="text-xs font-bold px-3 py-1 rounded-[3px] tracking-[0.06em] uppercase"
                style={{ background: 'var(--color-primary)', color: 'white' }}
              >
                {t('entryOpen')}
              </span>
            )}
            {!isPast && isNotYetOpen && (
              <span
                className="text-xs font-semibold px-3 py-1 rounded-[3px]"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)' }}
              >
                {t('notYetOpen')}
              </span>
            )}
            {isPast && (
              <span
                className="text-xs font-semibold px-3 py-1 rounded-[3px]"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
              >
                {t('entryClosed')}
              </span>
            )}
            {race.official_url && (
              <a
                href={race.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold px-4 py-1.5 rounded-[3px] transition-colors no-underline"
                style={{ background: 'white', color: 'var(--color-ink)' }}
              >
                {t('website')} ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12"
        style={{ color: 'var(--color-ink)' }}
      >

        {/* Overview */}
        {raceDesc && (
          <section>
            <SectionLabel>{locale === 'ja' ? '概要' : 'Overview'}</SectionLabel>
            <SectionTitle>{t('overview')}</SectionTitle>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-ink2)' }}>
              {raceDesc}
            </p>
          </section>
        )}

        {/* Categories & Course */}
        <section>
          <SectionLabel>{locale === 'ja' ? 'コース' : 'Course'}</SectionLabel>
          <SectionTitle>{t('course')}</SectionTitle>

          {/* Categories table */}
          <Card className="mb-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                  <th className="text-left pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>{t('category')}</th>
                  <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>{t('distance')}</th>
                  <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>{t('cutoffTime')}</th>
                  <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>{t('startTime')}</th>
                  <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>{t('fee')}</th>
                </tr>
              </thead>
              <tbody>
                {race.categories.map((cat, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                    className="last:border-0"
                  >
                    <td className="py-3 font-medium">{getCategoryLabel(cat, locale)}</td>
                    <td className="py-3 text-right">{cat.distance_km}km</td>
                    <td className="py-3 text-right">
                      {cat.time_limit_minutes > 0
                        ? `${Math.floor(cat.time_limit_minutes / 60)}:${String(cat.time_limit_minutes % 60).padStart(2, '0')}`
                        : '—'}
                    </td>
                    <td className="py-3 text-right">{cat.start_time || '—'}</td>
                    <td className="py-3 text-right">
                      {cat.entry_fee
                        ? formatCurrency(cat.entry_fee)
                        : race.entry_fee
                          ? formatCurrency(race.entry_fee)
                          : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* コースプロフィール（地図 + 高低差チャート） */}
          {race.course_gpx_file && (
            <div className="mb-4">
              <CourseProfileSection raceId={id} locale={locale} />
            </div>
          )}

          {/* Course info */}
          {(race.course_info.max_elevation_m > 0 || race.course_info.highlights_ja) && (
            <Card>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xl font-bold">{race.course_info.max_elevation_m}m</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>{t('maxElev')}</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{race.course_info.min_elevation_m}m</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>{t('minElev')}</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">{race.course_info.elevation_diff_m}m</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>{t('diff')}</p>
                </div>
              </div>
              {race.course_info.certification.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {race.course_info.certification.map((cert) => (
                    <span
                      key={cert}
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-[3px]"
                      style={{ background: 'var(--color-cream)', color: 'var(--color-ink2)', border: '1px solid var(--color-border)' }}
                    >
                      ✓ {cert}
                    </span>
                  ))}
                </div>
              )}
              {(locale === 'ja' ? race.course_info.highlights_ja : race.course_info.highlights_en) && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink2)' }}>
                  {locale === 'ja' ? race.course_info.highlights_ja : race.course_info.highlights_en}
                </p>
              )}
              {(locale === 'ja' ? race.course_info.notes_ja : race.course_info.notes_en) && (
                <p
                  className="text-xs mt-3 p-3 rounded-[3px] leading-relaxed"
                  style={{ background: '#fff8f0', border: '1px solid #f0d9c0', color: '#7a4f1a' }}
                >
                  ⚠️ {locale === 'ja' ? race.course_info.notes_ja : race.course_info.notes_en}
                </p>
              )}
            </Card>
          )}
        </section>

        {/* Checkpoints */}
        {race.checkpoints.length > 0 && (
          <section>
            <SectionLabel>{locale === 'ja' ? '関門' : 'Cutoffs'}</SectionLabel>
            <SectionTitle>{t('checkpoints')}</SectionTitle>
            <Card className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <th className="text-left pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {t('distance')}
                    </th>
                    <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '関門閉鎖時刻' : 'Cutoff time'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {race.checkpoints.map((cp, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: '1px solid var(--color-border)' }}
                      className="last:border-0"
                    >
                      <td className="py-2.5 font-medium">{cp.distance_km}km</td>
                      <td className="py-2.5 text-right font-mono">{cp.closing_time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>
        )}

        {/* Aid Stations */}
        {race.aid_stations.length > 0 && (
          <section>
            <SectionLabel>{locale === 'ja' ? 'エイド' : 'Aid'}</SectionLabel>
            <SectionTitle>{t('aidStations')}</SectionTitle>
            <div className="space-y-2">
              {race.aid_stations.map((aid, i) => (
                <Card key={i}>
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-sm font-bold w-14 shrink-0"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {aid.distance_km}km
                    </span>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: 'var(--color-ink2)' }}>
                        {locale === 'ja' ? aid.offerings_ja : aid.offerings_en}
                      </p>
                      {aid.is_featured && (
                        <span
                          className="inline-block mt-1 text-[0.65rem] font-bold px-2 py-0.5 rounded-[2px]"
                          style={{ background: '#fff3e0', color: '#b25000' }}
                        >
                          ★ {t('featured')}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Entry / Registration */}
        <section>
          <SectionLabel>{locale === 'ja' ? 'エントリー' : 'Registration'}</SectionLabel>
          <SectionTitle>{t('applicationPeriod')}</SectionTitle>
          <Card>
            <div className="flex flex-wrap gap-6 mb-4">
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
                  {locale === 'ja' ? '受付期間' : 'Period'}
                </p>
                <p className="font-medium">
                  {race.entry_start_date ? formatDate(race.entry_start_date, locale) : '—'}
                  {' — '}
                  {race.entry_end_date ? formatDate(race.entry_end_date, locale) : '—'}
                </p>
              </div>
              {race.entry_capacity > 0 && (
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
                    {t('capacity')}
                  </p>
                  <p className="font-medium">{race.entry_capacity.toLocaleString()}{locale === 'ja' ? '人' : ' runners'}</p>
                </div>
              )}
              {!race.entry_fee_by_category && race.entry_fee && (
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
                    {t('fee')}
                  </p>
                  <p className="font-medium">{formatCurrency(race.entry_fee)}</p>
                </div>
              )}
            </div>
            {race.official_url && (
              <a
                href={race.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 text-sm font-semibold rounded-[3px] transition-colors no-underline"
                style={{ background: 'var(--color-primary)', color: 'white' }}
              >
                {t('website')} ↗
              </a>
            )}
          </Card>
        </section>

        {/* Access */}
        {race.access_points.length > 0 && (
          <section>
            <SectionLabel>{locale === 'ja' ? '交通' : 'Transport'}</SectionLabel>
            <SectionTitle>{t('access')}</SectionTitle>
            <div className="space-y-2">
              {race.access_points.map((ap, i) => (
                <Card key={i}>
                  <div className="flex gap-3">
                    <span className="text-xl mt-0.5">🚉</span>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">
                        {locale === 'ja' ? ap.station_name_ja : ap.station_name_en}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--color-ink2)' }}>
                        {locale === 'ja' ? ap.transport_to_venue_ja : ap.transport_to_venue_en}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Participation Gift */}
        {race.participation_gifts.length > 0 && (
          <section>
            <SectionLabel>{locale === 'ja' ? '参加賞' : 'Finisher'}</SectionLabel>
            <SectionTitle>{t('gift')}</SectionTitle>
            {race.participation_gifts.map((gift, i) => (
              <Card key={i}>
                <div className="flex flex-wrap gap-2 mb-3">
                  {gift.gift_categories.map((catId) => {
                    const cat = giftCategoryMap.get(catId);
                    if (!cat) return null;
                    return (
                      <span
                        key={catId}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-sm font-medium"
                        style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
                      >
                        <span>{cat.icon}</span>
                        <span>{locale === 'ja' ? cat.name_ja : cat.name_en}</span>
                      </span>
                    );
                  })}
                </div>
                {(locale === 'ja' ? gift.description_ja : gift.description_en) && (
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink2)' }}>
                    {locale === 'ja' ? gift.description_ja : gift.description_en}
                  </p>
                )}
              </Card>
            ))}
          </section>
        )}

        {/* Nearby Spots */}
        {race.nearby_spots.length > 0 && (
          <section>
            <SectionLabel>{locale === 'ja' ? '周辺' : 'Area'}</SectionLabel>
            <SectionTitle>{t('nearby')}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {race.nearby_spots.map((spot, i) => {
                const typeInfo = NEARBY_TYPE[spot.type];
                return (
                  <Card key={i}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{typeInfo?.icon ?? '📍'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-semibold text-sm">
                            {locale === 'ja' ? spot.name_ja : spot.name_en}
                          </p>
                          <span
                            className="text-[0.65rem] font-semibold px-1.5 py-0.5 rounded-[2px] shrink-0"
                            style={{ background: 'var(--color-cream)', color: 'var(--color-mid)', border: '1px solid var(--color-border)' }}
                          >
                            {locale === 'ja' ? spot.type : typeInfo?.en}
                          </span>
                        </div>
                        <p className="text-xs mb-1" style={{ color: 'var(--color-light)' }}>
                          {spot.distance_from_venue}
                        </p>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-ink2)' }}>
                          {locale === 'ja' ? spot.description_ja : spot.description_en}
                        </p>
                        {spot.url && (
                          <a
                            href={spot.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-1.5 text-xs font-semibold no-underline hover:underline"
                            style={{ color: 'var(--color-primary)' }}
                          >
                            {locale === 'ja' ? '詳細 →' : 'Learn more →'}
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* Race Result */}
        {race.result && (
          <section>
            <SectionLabel>{locale === 'ja' ? '開催実績' : 'Results'}</SectionLabel>
            <SectionTitle>{locale === 'ja' ? 'レース実績' : 'Race Results'}</SectionTitle>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {race.result.participants_count !== null && (
                <Card className="text-center">
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
                    {race.result.participants_count.toLocaleString()}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
                    {locale === 'ja' ? '参加者数' : 'Participants'}
                  </p>
                </Card>
              )}
              {race.result.finishers_count !== null && (
                <Card className="text-center">
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
                    {race.result.finishers_count.toLocaleString()}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
                    {locale === 'ja' ? '完走者数' : 'Finishers'}
                  </p>
                </Card>
              )}
              {race.result.finisher_rate_pct !== null && (
                <Card className="text-center">
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
                    {race.result.finisher_rate_pct.toFixed(1)}%
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
                    {locale === 'ja' ? '完走率' : 'Finish Rate'}
                  </p>
                </Card>
              )}
              {race.result.temperature_c !== null && (
                <Card className="text-center">
                  <p className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
                    {race.result.temperature_c}°C
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
                    {locale === 'ja' ? '当日気温' : 'Temperature'}
                  </p>
                </Card>
              )}
            </div>
            {/* Weather details */}
            {race.result.weather_condition_ja && (
              <Card>
                <div className="flex flex-wrap gap-5 text-sm">
                  <div>
                    <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '天気' : 'Weather'}
                    </p>
                    <p className="font-medium">
                      {locale === 'ja' ? race.result.weather_condition_ja : race.result.weather_condition_en}
                    </p>
                  </div>
                  {race.result.max_temp_c !== null && (
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>{locale === 'ja' ? '最高気温' : 'Max'}</p>
                      <p className="font-medium" style={{ color: '#c0392b' }}>{race.result.max_temp_c}°C</p>
                    </div>
                  )}
                  {race.result.min_temp_c !== null && (
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>{locale === 'ja' ? '最低気温' : 'Min'}</p>
                      <p className="font-medium" style={{ color: '#2980b9' }}>{race.result.min_temp_c}°C</p>
                    </div>
                  )}
                  {race.result.wind_speed_ms !== null && (
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>{locale === 'ja' ? '風速' : 'Wind'}</p>
                      <p className="font-medium">{race.result.wind_speed_ms} m/s</p>
                    </div>
                  )}
                  {race.result.humidity_pct !== null && (
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>{locale === 'ja' ? '湿度' : 'Humidity'}</p>
                      <p className="font-medium">{race.result.humidity_pct}%</p>
                    </div>
                  )}
                </div>
                {race.result.notes_ja && (
                  <p className="text-sm mt-3 pt-3 leading-relaxed" style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-ink2)' }}>
                    {locale === 'ja' ? race.result.notes_ja : race.result.notes_en}
                  </p>
                )}
              </Card>
            )}
          </section>
        )}

        {/* Past Editions */}
        {(seriesRaces.length > 0 || series) && (
          <section>
            <SectionLabel>{locale === 'ja' ? 'シリーズ' : 'Series'}</SectionLabel>
            <SectionTitle>
              {series
                ? (locale === 'ja' ? series.name_ja : series.name_en)
                : (locale === 'ja' ? '過去の大会' : 'Past Editions')}
            </SectionTitle>
            {seriesRaces.length === 0 ? (
              <Card>
                <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
                  {locale === 'ja'
                    ? '他の年の大会データはまだ登録されていません。'
                    : 'No other editions are registered yet.'}
                </p>
              </Card>
            ) : (
              <div className="space-y-2">
                {seriesRaces.map((r) => {
                  const rMainCat = getMainCategory(r.categories);
                  const rYear = r.date.slice(0, 4);
                  const isPastRace = r.date < new Date().toISOString().split('T')[0];
                  return (
                    <Link
                      key={r.id}
                      href={`/races/${r.id}`}
                      className="block no-underline"
                    >
                      <Card className="hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span
                              className="text-lg font-bold font-serif w-12 shrink-0"
                              style={{ color: 'var(--color-primary)' }}
                            >
                              {rYear}
                            </span>
                            <div>
                              <p className="font-medium text-sm" style={{ color: 'var(--color-ink)' }}>
                                {getRaceName(r, locale)}
                              </p>
                              <p className="text-xs" style={{ color: 'var(--color-mid)' }}>
                                {formatDate(r.date, locale)}
                                {rMainCat && ` · ${rMainCat.distance_km}km`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            {/* Result stats if available */}
                            {r.result?.participants_count !== null && r.result?.participants_count !== undefined && (
                              <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                                  {r.result.participants_count.toLocaleString()}
                                </p>
                                <p className="text-xs" style={{ color: 'var(--color-light)' }}>
                                  {locale === 'ja' ? '参加者' : 'runners'}
                                </p>
                              </div>
                            )}
                            {r.result?.weather_condition_ja && (
                              <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>
                                  {r.result.temperature_c !== null ? `${r.result.temperature_c}°C` : '—'}
                                </p>
                                <p className="text-xs" style={{ color: 'var(--color-light)' }}>
                                  {locale === 'ja' ? r.result.weather_condition_ja : r.result.weather_condition_en}
                                </p>
                              </div>
                            )}
                            <span className="text-xs" style={{ color: isPastRace ? 'var(--color-mid)' : 'var(--color-primary)' }}>
                              {isPastRace
                                ? (locale === 'ja' ? '終了' : 'Ended')
                                : (locale === 'ja' ? '開催予定' : 'Upcoming')}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Weather History */}
        {race.weather_history.length > 0 && (
          <section>
            <SectionLabel>{locale === 'ja' ? '気象' : 'Weather'}</SectionLabel>
            <SectionTitle>{t('weather')}</SectionTitle>
            <Card className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <th className="text-left pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '年' : 'Year'}
                    </th>
                    <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '平均気温' : 'Avg °C'}
                    </th>
                    <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '最高' : 'Max °C'}
                    </th>
                    <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '最低' : 'Min °C'}
                    </th>
                    <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '湿度' : 'Hum.'}
                    </th>
                    <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '降水' : 'Rain'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {race.weather_history.map((w, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: '1px solid var(--color-border)' }}
                      className="last:border-0"
                    >
                      <td className="py-2.5 font-medium">{w.year}</td>
                      <td className="py-2.5 text-right">{w.avg_temp}°</td>
                      <td className="py-2.5 text-right" style={{ color: '#c0392b' }}>{w.max_temp}°</td>
                      <td className="py-2.5 text-right" style={{ color: '#2980b9' }}>{w.min_temp}°</td>
                      <td className="py-2.5 text-right">{w.humidity_pct}%</td>
                      <td className="py-2.5 text-right">{w.precipitation_mm}mm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </section>
        )}
      </div>
    </>
  );
}
