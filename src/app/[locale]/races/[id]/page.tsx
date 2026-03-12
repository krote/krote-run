import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getRaceById, getGiftCategories } from '@/lib/data';
import { formatDate, formatCurrency, getMainCategory, getRaceName, getRaceDescription, getRaceCity } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const race = await getRaceById(id);
  if (!race) return {};
  return { title: race.name_ja };
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

  const mainCategory = getMainCategory(race.categories);
  const giftCategoryMap = new Map(giftCategories.map((c) => [c.id, c]));
  const raceName = getRaceName(race, locale);
  const raceDesc = getRaceDescription(race, locale);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">ホーム</Link>
        {' / '}
        <Link href="/races" className="hover:text-primary">{locale === 'ja' ? '大会一覧' : 'Races'}</Link>
        {' / '}
        <span className="text-gray-900">{raceName}</span>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{raceName}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <span>📅 {formatDate(race.date, locale)}</span>
          <span>📍 {getRaceCity(race, locale)}</span>
          {mainCategory && (
            <span>🏃 {mainCategory.distance_km}km</span>
          )}
        </div>
      </div>

      {/* Description */}
      {raceDesc && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">{t('overview')}</h2>
          <p className="text-gray-700 leading-relaxed">{raceDesc}</p>
        </section>
      )}

      {/* Categories table */}
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
              {race.categories.map((cat, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-200">
                    {locale === 'ja' ? (cat.name_ja ?? cat.distance_type) : (cat.name_en ?? cat.distance_type)}
                  </td>
                  <td className="p-3 border border-gray-200 text-right">{cat.distance_km}km</td>
                  <td className="p-3 border border-gray-200 text-right">
                    {cat.time_limit_minutes > 0 ? `${Math.floor(cat.time_limit_minutes / 60)}:${String(cat.time_limit_minutes % 60).padStart(2, '0')}` : '—'}
                  </td>
                  <td className="p-3 border border-gray-200 text-right">
                    {cat.entry_fee ? formatCurrency(cat.entry_fee) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Course info */}
      {(race.course_info.max_elevation_m > 0 || race.course_info.highlights_ja) && (
        <section className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-bold mb-3">コース情報</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
            <div>
              <p className="text-gray-500 text-xs mb-1">最高標高</p>
              <p className="font-semibold">{race.course_info.max_elevation_m}m</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">最低標高</p>
              <p className="font-semibold">{race.course_info.min_elevation_m}m</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">高低差</p>
              <p className="font-semibold">{race.course_info.elevation_diff_m}m</p>
            </div>
          </div>
          {(locale === 'ja' ? race.course_info.highlights_ja : race.course_info.highlights_en) && (
            <p className="text-gray-700 text-sm">
              {locale === 'ja' ? race.course_info.highlights_ja : race.course_info.highlights_en}
            </p>
          )}
        </section>
      )}

      {/* Application period */}
      <section className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-bold mb-2">{t('applicationPeriod')}</h2>
        <p className="text-gray-700">
          {formatDate(race.entry_start_date, locale)}
          {' 〜 '}
          {formatDate(race.entry_end_date, locale)}
        </p>
        {race.official_url && (
          <a
            href={race.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            {t('website')} →
          </a>
        )}
      </section>

      {/* Access */}
      {race.access_points.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t('access')}</h2>
          <div className="space-y-3">
            {race.access_points.map((ap, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-sm">
                <span className="text-lg">🚉</span>
                <div>
                  <p className="font-medium text-gray-900">
                    {locale === 'ja' ? ap.station_name_ja : ap.station_name_en}
                  </p>
                  <p className="text-gray-600 mt-0.5">
                    {locale === 'ja' ? ap.transport_to_venue_ja : ap.transport_to_venue_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Participation gifts */}
      {race.participation_gifts.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t('gift')}</h2>
          {race.participation_gifts.map((gift, i) => (
            <div key={i} className="mb-4">
              <div className="flex flex-wrap gap-3 mb-2">
                {gift.gift_categories.map((catId) => {
                  const cat = giftCategoryMap.get(catId);
                  if (!cat) return null;
                  return (
                    <div key={catId} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                      <span>{cat.icon}</span>
                      <span className="text-sm font-medium">
                        {locale === 'ja' ? cat.name_ja : cat.name_en}
                      </span>
                    </div>
                  );
                })}
              </div>
              {(locale === 'ja' ? gift.description_ja : gift.description_en) && (
                <p className="text-sm text-gray-600">
                  {locale === 'ja' ? gift.description_ja : gift.description_en}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
