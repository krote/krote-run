import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getRaces } from '@/lib/data';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale !== 'en';
  return {
    title: isJa ? 'サイトマップ' : 'Sitemap',
    description: isJa
      ? 'HASHIRUの全ページ一覧です。'
      : 'A complete list of all pages on HASHIRU.',
    alternates: {
      canonical: `https://hashiru.run/${locale}/sitemap`,
      languages: {
        ja: 'https://hashiru.run/ja/sitemap',
        en: 'https://hashiru.run/en/sitemap',
      },
    },
  };
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as 'ja' | 'en';
  const isJa = locale !== 'en';
  const t = await getTranslations({ locale, namespace: 'sitemap' });

  const races = await getRaces();

  const mainPages = [
    { href: '/',         label: isJa ? 'ホーム' : 'Home' },
    { href: '/races',    label: isJa ? '大会一覧' : 'Race List' },
    { href: '/calendar', label: isJa ? '大会カレンダー' : 'Calendar' },
  ];

  const infoPages = [
    { href: '/guide',         label: isJa ? '初めての方へ' : 'Getting Started' },
    { href: '/about',         label: isJa ? 'HASHIRUについて' : 'About HASHIRU' },
    { href: '/contact',       label: isJa ? 'お問い合わせ' : 'Contact' },
    { href: '/terms',         label: isJa ? '利用規約' : 'Terms of Service' },
    { href: '/privacy',       label: isJa ? 'プライバシーポリシー' : 'Privacy Policy' },
    { href: '/cookie-policy', label: isJa ? 'Cookieポリシー' : 'Cookie Policy' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          Navigation
        </p>
        <h1
          className="font-serif text-4xl font-bold mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          {t('title')}
        </h1>
      </div>

      <div className="space-y-10">
        {/* メインページ */}
        <section>
          <h2
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ color: 'var(--color-mid)' }}
          >
            {t('sectionMain')}
          </h2>
          <ul className="space-y-2 border-l-2 pl-4" style={{ borderColor: 'var(--color-border)' }}>
            {mainPages.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm hover:underline"
                  style={{ color: 'var(--color-ink2)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* サービス情報 */}
        <section>
          <h2
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ color: 'var(--color-mid)' }}
          >
            {t('sectionInfo')}
          </h2>
          <ul className="space-y-2 border-l-2 pl-4" style={{ borderColor: 'var(--color-border)' }}>
            {infoPages.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm hover:underline"
                  style={{ color: 'var(--color-ink2)' }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 大会一覧 */}
        <section>
          <h2
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
            style={{ color: 'var(--color-mid)' }}
          >
            {t('sectionRaces')} ({races.length})
          </h2>
          <ul className="space-y-2 border-l-2 pl-4 columns-1 sm:columns-2" style={{ borderColor: 'var(--color-border)' }}>
            {races.map((race) => (
              <li key={race.id} className="break-inside-avoid">
                <Link
                  href={`/races/${race.id}`}
                  className="text-sm hover:underline"
                  style={{ color: 'var(--color-ink2)' }}
                >
                  {isJa ? race.name_ja : race.name_en}
                  <span className="ml-1.5 text-xs" style={{ color: 'var(--color-mid)' }}>
                    {race.date}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
