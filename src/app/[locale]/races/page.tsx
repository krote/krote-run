import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getRaces, getPrefectures, getGiftCategories } from '@/lib/data';
import RaceList from '@/components/races/RaceList';
import type { Locale } from '@/lib/types';
import { searchParamsToFilter } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'races' });
  const isJa = locale !== 'en';
  const description = isJa
    ? '日本全国のマラソン大会を距離・月・都道府県・タグで検索できる大会情報ポータル。フルマラソン・ハーフマラソン・ウルトラマラソンまで網羅。'
    : 'Find Japan marathon races by distance, month, prefecture and tags. Full, half, ultra marathons and more.';
  const url = `https://hashiru.run/${locale}/races`;

  return {
    title: t('title'),
    description,
    alternates: {
      canonical: url,
      languages: {
        ja: 'https://hashiru.run/ja/races',
        en: 'https://hashiru.run/en/races',
      },
    },
    openGraph: {
      type: 'website',
      title: t('title'),
      description,
      url,
      siteName: 'HASHIRU',
    },
    twitter: {
      card: 'summary',
      title: t('title'),
      description,
    },
  };
}

export default async function RacesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const sp = await searchParams;
  const initialFilter = searchParamsToFilter(sp);

  const t = await getTranslations({ locale, namespace: 'races' });
  const [races, prefectures, giftCategories] = await Promise.all([getRaces(), getPrefectures(), getGiftCategories()]);

  return (
    <>
      {/* Page header */}
      <div
        style={{
          background: 'var(--color-cream)',
          borderBottom: '1px solid var(--color-border-soft)',
          padding: '48px 40px 36px',
        }}
      >
        <div className="max-w-[1120px] mx-auto">
          <p
            className="flex items-center gap-2 mb-3"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
            }}
          >
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--color-primary)' }} />
            {t('eyebrow')}
          </p>
          <h1
            className="font-serif font-semibold"
            style={{ fontSize: 'clamp(1.875rem, 3vw, 2.5rem)', color: 'var(--color-ink)', margin: 0, lineHeight: 1.15 }}
          >
            {t('title')}
          </h1>
          <p
            className="mt-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              color: 'var(--color-mid)',
            }}
          >
            {locale === 'ja'
              ? `${races.length}${t('subtitle')}`
              : `${races.length} ${t('subtitle')}`}
          </p>
        </div>
      </div>

      <div className="max-w-[1120px] mx-auto px-10 py-8">
        <RaceList
          races={races}
          prefectures={prefectures}
          giftCategories={giftCategories}
          locale={locale}
          initialFilter={initialFilter}
        />
      </div>
    </>
  );
}
