import { Fragment } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getRaceById, getGiftCategories } from '@/lib/data';
import { formatDate, formatCurrency, getMainCategory, getRaceName, getRaceDescription, getRaceCity, getCategoryLabel } from '@/lib/utils';
import { toSeriesId, getSeriesById, getSeriesRaces } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import type { Locale, NearbySpotType } from '@/lib/types';
import CourseProfileSection from '@/components/course/CourseProfileSection';
import RaceBreadcrumb from '@/components/races/RaceBreadcrumb';
import RaceRegistrationButtons from '@/components/races/RaceRegistrationButtons';
import DetailHeader from '@/components/races/detail/DetailHeader';
import AnchorBar from '@/components/races/detail/AnchorBar';
import OverviewSection from '@/components/races/detail/OverviewSection';
import EntrySection from '@/components/races/detail/EntrySection';
import LastEditionSection from '@/components/races/detail/LastEditionSection';
import GallerySection from '@/components/races/detail/GallerySection';

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

function SectionHeading({ num, title, subtitle }: { num: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-6">
      <span
        className="text-[0.65rem] font-mono tracking-wider shrink-0"
        style={{ color: 'var(--color-primary)' }}
      >
        {num}
      </span>
      <h2 className="text-xl font-bold" style={{ color: 'var(--color-ink)' }}>
        {title}
      </h2>
      {subtitle && (
        <span className="text-sm italic hidden sm:inline" style={{ color: 'var(--color-mid)' }}>
          — {subtitle}
        </span>
      )}
    </div>
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
  searchParams,
}: {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { locale: rawLocale, id } = await params;
  const sp = await searchParams;
  const from = sp.from ?? null;
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
    !race.entry_closed &&
    race.entry_start_date !== null &&
    race.entry_end_date !== null &&
    today >= race.entry_start_date &&
    today <= race.entry_end_date;
  const isNotYetOpen = !race.entry_closed && race.entry_start_date !== null && today < race.entry_start_date;

  // AnchorBar に表示するセクション
  const anchorItems = [
    ...(raceDesc || race.tags.length > 0 ? [{ id: 'overview', label: locale === 'ja' ? '概要' : 'Overview' }] : []),
    { id: 'course', label: locale === 'ja' ? 'コース' : 'Course' },
    { id: 'entry', label: locale === 'ja' ? 'エントリー' : 'Registration' },
    ...(race.access_points.length > 0 ? [{ id: 'access', label: locale === 'ja' ? 'アクセス' : 'Access' }] : []),
    ...(race.participation_gifts.length > 0 ? [{ id: 'gifts', label: locale === 'ja' ? '参加賞' : 'Gifts' }] : []),
    ...(race.nearby_spots.length > 0 ? [{ id: 'nearby', label: locale === 'ja' ? '近隣' : 'Nearby' }] : []),
    ...(race.time_buckets.length > 0 ? [{ id: 'result', label: locale === 'ja' ? 'リザルト' : 'Result' }] : []),
    ...(race.result ? [{ id: 'last-edition', label: locale === 'ja' ? '前回大会' : 'Last Edition' }] : []),
    ...(race.gallery.length > 0 || race.voices.length > 0 ? [{ id: 'gallery', label: locale === 'ja' ? 'ギャラリー' : 'Gallery' }] : []),
  ];

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

      {/* ── ブレッドクラム ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <RaceBreadcrumb
          raceName={raceName}
          from={from}
          labels={{
            home: t('breadcrumb.home'),
            races: t('breadcrumb.races'),
            calendar: t('breadcrumb.calendar'),
          }}
        />
      </div>

      {/* ── Hero ── */}
      <DetailHeader
        race={race}
        locale={locale}
        raceName={raceName}
        isEntryOpen={isEntryOpen}
        isNotYetOpen={isNotYetOpen}
        isPast={isPast}
        t={t}
      />

      {/* ── AnchorBar ── */}
      <AnchorBar items={anchorItems} />

      {/* ── 登録ボタン ── */}
      {!isPast && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
          <RaceRegistrationButtons
            raceId={race.id}
            raceName={raceName}
            raceDate={race.date}
            locale={locale}
            categories={race.categories.map((c) => ({
              id: c.id,
              name_ja: c.name_ja,
              name_en: c.name_en,
              distance_km: c.distance_km,
              distance_type: c.distance_type,
            }))}
            entryPeriods={race.entry_periods
              .filter((p) => p.start_date >= today)
              .map((p) => ({
                id: p.id,
                label_ja: p.label_ja,
                label_en: p.label_en,
                start_date: p.start_date,
              }))}
            today={today}
          />
        </div>
      )}

      {/* ── Content ── */}
      <div
        className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12"
        style={{ color: 'var(--color-ink)' }}
      >

        {/* ── Section 01: 概要・基本要項 ── */}
        <section id="overview" style={{ scrollMarginTop: '3.5rem' }}>
          <SectionHeading
            num="01"
            title={locale === 'ja' ? '概要・基本要項' : 'Overview'}
            subtitle={locale === 'ja' ? 'Overview' : '概要・基本要項'}
          />

          {/* スタットグリッド */}
          {mainCategory && (
            <Card className="mb-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6">
                {/* 距離 */}
                <div>
                  <p className="text-[0.58rem] tracking-[0.18em] uppercase font-semibold mb-1.5" style={{ color: 'var(--color-mid)' }}>
                    {locale === 'ja' ? 'Distance' : 'Distance'}
                  </p>
                  <p className="font-bold leading-none" style={{ fontSize: '1.9rem', color: 'var(--color-ink)' }}>
                    {mainCategory.distance_km}
                    <span className="text-sm font-medium ml-1" style={{ color: 'var(--color-ink2)' }}>km</span>
                  </p>
                </div>

                {/* 制限時間 */}
                {mainCategory.time_limit_minutes > 0 && (
                  <div>
                    <p className="text-[0.58rem] tracking-[0.18em] uppercase font-semibold mb-1.5" style={{ color: 'var(--color-mid)' }}>
                      Time Limit
                    </p>
                    <p className="font-bold leading-none" style={{ fontSize: '1.9rem', color: 'var(--color-ink)' }}>
                      {Math.floor(mainCategory.time_limit_minutes / 60)}
                      {mainCategory.time_limit_minutes % 60 > 0 && `:${String(mainCategory.time_limit_minutes % 60).padStart(2, '0')}`}
                      <span className="text-sm font-medium ml-1" style={{ color: 'var(--color-ink2)' }}>
                        {mainCategory.time_limit_minutes % 60 === 0 ? (locale === 'ja' ? '時間' : 'hrs') : ''}
                      </span>
                    </p>
                  </div>
                )}

                {/* 定員 */}
                {(mainCategory.capacity > 0 || race.entry_capacity > 0) && (
                  <div>
                    <p className="text-[0.58rem] tracking-[0.18em] uppercase font-semibold mb-1.5" style={{ color: 'var(--color-mid)' }}>
                      Capacity
                    </p>
                    <p className="font-bold leading-none" style={{ fontSize: '1.9rem', color: 'var(--color-ink)' }}>
                      {(mainCategory.capacity > 0 ? mainCategory.capacity : race.entry_capacity).toLocaleString()}
                      <span className="text-sm font-medium ml-1" style={{ color: 'var(--color-ink2)' }}>
                        {locale === 'ja' ? '人' : ''}
                      </span>
                    </p>
                  </div>
                )}

                {/* 参加費 */}
                {(race.entry_fee || mainCategory.entry_fee) && (
                  <div>
                    <p className="text-[0.58rem] tracking-[0.18em] uppercase font-semibold mb-1.5" style={{ color: 'var(--color-mid)' }}>
                      Entry Fee
                    </p>
                    <p className="font-bold leading-none" style={{ fontSize: '1.9rem', color: 'var(--color-ink)' }}>
                      {formatCurrency(mainCategory.entry_fee ?? race.entry_fee!)}
                    </p>
                  </div>
                )}

                {/* 高低差 */}
                {race.course_info.elevation_diff_m > 0 && (
                  <div>
                    <p className="text-[0.58rem] tracking-[0.18em] uppercase font-semibold mb-1.5" style={{ color: 'var(--color-mid)' }}>
                      Elevation
                    </p>
                    <p className="font-bold leading-none" style={{ fontSize: '1.9rem', color: 'var(--color-ink)' }}>
                      +{race.course_info.elevation_diff_m}
                      <span className="text-sm font-medium ml-1" style={{ color: 'var(--color-ink2)' }}>m</span>
                    </p>
                  </div>
                )}

              </div>
            </Card>
          )}

          <OverviewSection race={race} locale={locale} />
        </section>

        {/* ── Section 02: コース紹介 ── */}
        <section id="course" style={{ scrollMarginTop: '3.5rem' }}>
          <SectionHeading
            num="02"
            title={locale === 'ja' ? 'コース紹介' : 'Course'}
            subtitle={locale === 'ja' ? 'Course Map & Elevation' : 'コース紹介'}
          />

          {/* カテゴリテーブル（複数カテゴリの場合のみ） */}
          {race.categories.length > 1 && (
            <Card className="mb-5 overflow-x-auto">
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
                  {race.categories.map((cat, i) => {
                    const eligibility = locale === 'ja' ? cat.eligibility_ja : cat.eligibility_en;
                    const isLast = i === race.categories.length - 1;
                    return (
                      <Fragment key={i}>
                        <tr
                          style={!eligibility ? { borderBottom: isLast ? 'none' : '1px solid var(--color-border)' } : undefined}
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
                        {eligibility && (
                          <tr style={{ borderBottom: isLast ? 'none' : '1px solid var(--color-border)' }}>
                            <td colSpan={5} className="pb-3 text-xs whitespace-pre-line" style={{ color: 'var(--color-mid)' }}>
                              {locale === 'ja' ? '参加資格: ' : 'Eligibility: '}{eligibility}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          )}

          {/* コースプロフィール（地図+ハイライト横並び → 高低差チャート） */}
          {(() => {
            const highlightsSidebar = (cat: typeof race.categories[0] | null) => cat && cat.course_highlights.length > 0 ? (
              <div>
                <p className="text-[0.58rem] tracking-[0.18em] uppercase font-semibold mb-3" style={{ color: 'var(--color-mid)' }}>
                  Highlights
                </p>
                <ol className="space-y-3.5">
                  {cat.course_highlights.map((h) => (
                    <li key={h.id} className="flex gap-2.5">
                      {h.km != null && (
                        <span
                          className="font-mono text-[0.65rem] font-bold shrink-0 mt-0.5 w-10 text-right"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {h.km}km
                        </span>
                      )}
                      <div>
                        <p className="text-sm font-medium leading-snug" style={{ color: 'var(--color-ink)' }}>
                          {locale === 'ja' ? h.name_ja : (h.name_en ?? h.name_ja)}
                        </p>
                        {(locale === 'ja' ? h.note_ja : h.note_en) && (
                          <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--color-mid)' }}>
                            {locale === 'ja' ? h.note_ja : h.note_en}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : undefined;

            if (race.categories.some((c) => c.course_gpx_file)) {
              return race.categories.filter((c) => c.course_gpx_file).map((cat, i) => (
                <div key={i} className="mb-6">
                  {race.categories.filter((c) => c.course_gpx_file).length > 1 && (
                    <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-mid)' }}>
                      {getCategoryLabel(cat, locale)}
                    </p>
                  )}
                  <CourseProfileSection profileKey={cat.course_gpx_file!} locale={locale} sidebarContent={highlightsSidebar(cat)} />
                </div>
              ));
            }
            if (race.course_gpx_file) {
              return (
                <div className="mb-5">
                  <CourseProfileSection profileKey={id} locale={locale} sidebarContent={highlightsSidebar(race.categories[0] ?? null)} />
                </div>
              );
            }
            return null;
          })()}

          {/* コース情報（認定・メモ） */}
          {(race.course_info.certification.length > 0 || race.course_info.notes_ja) && (
            <Card>
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
              {(locale === 'ja' ? race.course_info.notes_ja : race.course_info.notes_en) && (
                <p
                  className="text-xs p-3 rounded-[3px] leading-relaxed"
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
            <SectionHeading num="02-a" title={locale === 'ja' ? '関門' : 'Cutoffs'} subtitle={locale === 'ja' ? 'Cutoffs' : '関門'} />
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
            <SectionHeading num="02-b" title={locale === 'ja' ? 'エイドステーション' : 'Aid Stations'} subtitle={locale === 'ja' ? 'Aid Stations' : 'エイドステーション'} />
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
        <section id="entry" style={{ scrollMarginTop: '3.5rem' }}>
          <SectionHeading num="03" title={locale === 'ja' ? 'エントリー情報' : 'Registration'} subtitle={locale === 'ja' ? 'Entry' : 'エントリー'} />
          <Card>
            <EntrySection race={race} locale={locale} today={today} />
          </Card>
        </section>

        {/* Access */}
        {race.access_points.length > 0 && (
          <section id="access" style={{ scrollMarginTop: '3.5rem' }}>
            <SectionHeading num="04" title={locale === 'ja' ? 'アクセス・宿泊' : 'Access & Stay'} subtitle={locale === 'ja' ? 'Access & Stay' : 'アクセス・宿泊'} />
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
          <section id="gifts" style={{ scrollMarginTop: '3.5rem' }}>
            <SectionHeading num="05" title={locale === 'ja' ? '参加賞' : 'Participation / Finisher Gift'}
              subtitle={locale === 'ja' ? 'Participation / Finisher Gift' : '参加賞'}
            />
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
                  <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-ink2)' }}>
                    {locale === 'ja' ? gift.description_ja : gift.description_en}
                  </p>
                )}
              </Card>
            ))}
          </section>
        )}

        {/* Nearby Spots */}
        {race.nearby_spots.length > 0 && (
          <section id="nearby" style={{ scrollMarginTop: '3.5rem' }}>
            <SectionHeading num="06" title={locale === 'ja' ? '近隣スポット' : 'Nearby Spots'} subtitle={locale === 'ja' ? 'Nearby Spots' : '近隣スポット'} />
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
                        <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-ink2)' }}>
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

        {/* Last Edition Result */}
        {race.result && (
          <section id="last-edition" style={{ scrollMarginTop: '3.5rem' }}>
            <SectionHeading num="07" title={locale === 'ja' ? '前回の様子' : 'Last Edition'} subtitle={locale === 'ja' ? 'Last Edition' : '前回の様子'} />
            <LastEditionSection race={race} locale={locale} />
          </section>
        )}

        {/* Result */}
        {race.time_buckets.length > 0 && (
          <section id="result" style={{ scrollMarginTop: '3.5rem' }}>
            <SectionHeading
              num="07"
              title={locale === 'ja' ? 'リザルト' : 'Result'}
              subtitle={locale === 'ja' ? 'Finish Time Distribution' : 'タイム分布'}
            />
            <Card>
              {(() => {
                const maxPct = Math.max(...race.time_buckets.map((b) => b.pct));
                return (
                  <div className="space-y-3">
                    {race.time_buckets.map((tb, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span
                          className="text-xs font-mono w-20 shrink-0 text-right"
                          style={{ color: 'var(--color-mid)' }}
                        >
                          {tb.bucket}
                        </span>
                        <div
                          className="flex-1 h-5 rounded-[2px] overflow-hidden"
                          style={{ background: 'var(--color-cream)' }}
                        >
                          <div
                            className="h-full rounded-[2px] transition-all"
                            style={{
                              width: `${(tb.pct / maxPct) * 100}%`,
                              background: 'var(--color-primary)',
                              opacity: 0.75,
                            }}
                          />
                        </div>
                        <span
                          className="text-xs font-semibold w-10 shrink-0 text-right"
                          style={{ color: 'var(--color-ink2)' }}
                        >
                          {tb.pct}%
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </Card>
          </section>
        )}

        {/* Gallery & Voices */}
        {(race.gallery.length > 0 || race.voices.length > 0) && (
          <section id="gallery" style={{ scrollMarginTop: '3.5rem' }}>
            <SectionHeading num="08" title={locale === 'ja' ? '写真・参加者の声' : 'Photos & Voices'} subtitle={locale === 'ja' ? 'Gallery' : 'ギャラリー'} />
            <GallerySection race={race} locale={locale} />
          </section>
        )}

        {/* Past Editions */}
        {(seriesRaces.length > 0 || series) && (
          <section>
            <SectionHeading
              num="09"
              title={series ? (locale === 'ja' ? series.name_ja : series.name_en) ?? (locale === 'ja' ? '過去の大会' : 'Past Editions') : (locale === 'ja' ? '過去の大会' : 'Past Editions')}
              subtitle={locale === 'ja' ? 'Series' : 'シリーズ'}
            />
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
            <SectionHeading num="10" title={locale === 'ja' ? '気象履歴' : 'Weather History'} subtitle={locale === 'ja' ? 'Weather' : '気象'} />
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
