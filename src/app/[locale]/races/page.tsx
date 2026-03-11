import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRaces, getPrefectures } from '@/lib/data';
import RaceList from '@/components/races/RaceList';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'races' });
  return { title: t('title') };
}

export default async function RacesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: 'races' });
  const [races, prefectures] = await Promise.all([getRaces(), getPrefectures()]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>
      <RaceList races={races} prefectures={prefectures} locale={locale} />
    </div>
  );
}
