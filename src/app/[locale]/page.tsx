import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { getUpcomingRaces } from '@/lib/data';
import RaceCard from '@/components/races/RaceCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return { title: t('siteName') };
}

function HeroSection() {
  const t = useTranslations('home.hero');
  return (
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
        <p className="text-lg md:text-xl mb-8 text-blue-100">{t('subtitle')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-base outline-none focus:ring-2 focus:ring-white"
          />
          <Link
            href="/races"
            className="px-6 py-3 bg-accent hover:bg-accent-dark text-white rounded-lg font-semibold transition-colors"
          >
            {t('searchButton')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home.sections' });
  const upcomingRaces = await getUpcomingRaces(6);

  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Upcoming races */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{t('upcoming')}</h2>
            <Link
              href="/races"
              className="text-primary hover:text-primary-dark font-medium text-sm"
            >
              すべて見る →
            </Link>
          </div>
          {upcomingRaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingRaces.map((race) => (
                <RaceCard key={race.id} race={race} locale={locale as import('@/lib/types').Locale} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">
              現在登録されている大会はありません
            </p>
          )}
        </section>
      </div>
    </>
  );
}
