import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRaces, getPrefectures, getGiftCategories } from '@/lib/data';
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
  const [races, prefectures, giftCategories] = await Promise.all([getRaces(), getPrefectures(), getGiftCategories()]);

  return (
    <>
      {/* Editorial header */}
      <div style={{ background: 'var(--color-ink)' }} className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
            style={{ color: 'var(--color-primary)' }}
          >
            {t('eyebrow')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-3 leading-tight">
            {t('title')}
          </h1>
          <p style={{ color: 'var(--color-light)' }} className="text-sm">
            {locale === 'ja'
              ? `${races.length}${t('subtitle')}`
              : `${races.length} ${t('subtitle')}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <RaceList races={races} prefectures={prefectures} giftCategories={giftCategories} locale={locale} />
      </div>
    </>
  );
}
