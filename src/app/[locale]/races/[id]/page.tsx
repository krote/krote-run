import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getRaceById, getGiftCategories } from '@/lib/data';
import { formatDate, formatDateRange, formatCurrency, getMainDistance } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/types';
import CourseMap from '@/components/course/CourseMapLoader';
import ElevationChart from '@/components/course/ElevationChartLoader';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const race = await getRaceById(id);
  if (!race) return {};
  return { title: race.name };
}

export default async function RaceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale = rawLocale as Locale;
  const [race, giftCategories, t] = await Promise.all([
    getRaceById(id),
    getGiftCategories(),
    getTranslations({ locale, namespace: 'races.detail' }),
  ]);

  if (!race) notFound();

  const mainDistance = getMainDistance(race.distances);
  const giftCategoryMap = new Map(giftCategories.map((c) => [c.id, c]));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">ホーム</Link>
        {' / '}
        <Link href="/races" className="hover:text-primary">{locale === 'ja' ? '大会一覧' : 'Races'}</Link>
        {' / '}
        <span className="text-gray-900">{race.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {race.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{race.name}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <span>📅 {formatDateRange(race.date, race.endDate, locale)}</span>
          <span>📍 {race.prefecture} {race.city}</span>
          {mainDistance && (
            <span>🏃 {mainDistance.distanceKm}km</span>
          )}
        </div>
      </div>

      {/* Description */}
      {(locale === 'ja' ? race.description : race.descriptionEn ?? race.description) && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">{t('overview')}</h2>
          <p className="text-gray-700 leading-relaxed">
            {locale === 'ja' ? race.description : (race.descriptionEn ?? race.description)}
          </p>
        </section>
      )}

      {/* Distances table */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">{t('course')}</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border border-gray-200">カテゴリー</th>
                <th className="text-right p-3 border border-gray-200">距離</th>
                <th className="text-right p-3 border border-gray-200">{t('cutoffTime')}</th>
                <th className="text-right p-3 border border-gray-200">{t('fee')}</th>
              </tr>
            </thead>
            <tbody>
              {race.distances.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-200">{locale === 'ja' ? d.category : d.categoryEn}</td>
                  <td className="p-3 border border-gray-200 text-right">{d.distanceKm}km</td>
                  <td className="p-3 border border-gray-200 text-right">{d.cutoffTime ?? '—'}</td>
                  <td className="p-3 border border-gray-200 text-right">
                    {d.fee ? formatCurrency(d.fee) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Course Map */}
      {race.courseMap && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">コースマップ</h2>
          <CourseMap courseMap={race.courseMap} />
          {race.courseMap.elevationProfile && race.courseMap.elevationProfile.length > 0 && (
            <div className="mt-4">
              <h3 className="text-base font-semibold mb-2">高低差</h3>
              <ElevationChart data={race.courseMap.elevationProfile} />
            </div>
          )}
        </section>
      )}

      {/* Application period */}
      {race.applicationPeriod && (
        <section className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-bold mb-2">{t('applicationPeriod')}</h2>
          <p className="text-gray-700">
            {formatDate(race.applicationPeriod.start, locale)}
            {' 〜 '}
            {formatDate(race.applicationPeriod.end, locale)}
          </p>
          {race.website && (
            <a
              href={race.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              {t('website')} →
            </a>
          )}
        </section>
      )}

      {/* Access */}
      {race.access && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t('access')}</h2>
          <div className="space-y-2 text-gray-700">
            {race.access.nearestStation && (
              <p>🚉 最寄り駅: {race.access.nearestStation}
                {race.access.walkingMinutes && ` (徒歩${race.access.walkingMinutes}分)`}
              </p>
            )}
            {race.access.busInfo && <p>🚌 {race.access.busInfo}</p>}
            {race.access.shuttleInfo && <p>🚐 {race.access.shuttleInfo}</p>}
            {race.access.parkingAvailable && (
              <p>🅿️ 駐車場あり
                {race.access.parkingCapacity && ` (${race.access.parkingCapacity}台)`}
                {race.access.parkingFee && ` / ${formatCurrency(race.access.parkingFee)}`}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Gift */}
      {race.gift && race.gift.categories.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t('gift')}</h2>
          <div className="flex flex-wrap gap-3">
            {race.gift.categories.map((catId) => {
              const cat = giftCategoryMap.get(catId);
              if (!cat) return null;
              return (
                <div key={catId} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <span>{cat.icon}</span>
                  <span className="text-sm font-medium">{locale === 'ja' ? cat.name : cat.nameEn}</span>
                </div>
              );
            })}
          </div>
          {race.gift.notes && <p className="mt-3 text-sm text-gray-600">{race.gift.notes}</p>}
        </section>
      )}
    </div>
  );
}
