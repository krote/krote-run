import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAnnouncements } from '@/lib/announcements';
import type { Locale } from '@/lib/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news' });
  const isJa = locale !== 'en';
  const description = isJa
    ? 'HASHIRUの新機能・アップデートのお知らせ一覧です。'
    : 'Announcements about new features and updates on HASHIRU.';
  const url = `https://hashiru.run/${locale}/news`;

  return {
    title: t('title'),
    description,
    alternates: {
      canonical: url,
      languages: {
        ja: 'https://hashiru.run/ja/news',
        en: 'https://hashiru.run/en/news',
      },
    },
    openGraph: {
      type: 'website',
      title: t('title'),
      description,
      url,
      siteName: 'HASHIRU',
    },
  };
}

function formatDate(date: string, locale: Locale): string {
  return new Date(`${date}T00:00:00+09:00`).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: 'news' });
  const announcements = getAnnouncements();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          {t('eyebrow')}
        </p>
        <h1 className="font-serif text-4xl font-bold" style={{ color: 'var(--color-ink)' }}>
          {t('title')}
        </h1>
      </div>

      {announcements.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
          {t('empty')}
        </p>
      ) : (
        <ol className="space-y-10">
          {announcements.map((a) => (
            <li
              key={a.slug}
              className="pb-10 border-b last:border-0 last:pb-0"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <time
                dateTime={a.date}
                className="block text-xs font-mono tracking-wider mb-2"
                style={{ color: 'var(--color-mid)' }}
              >
                {formatDate(a.date, locale)}
              </time>
              <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
                {locale === 'ja' ? a.title_ja : a.title_en}
              </h2>
              <p className="text-sm leading-8 whitespace-pre-line" style={{ color: 'var(--color-ink2)' }}>
                {locale === 'ja' ? a.body_ja : a.body_en}
              </p>
              {a.link_href && (
                <Link
                  href={a.link_href}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-semibold hover:underline"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {(locale === 'ja' ? a.link_label_ja : a.link_label_en) ?? a.link_href} →
                </Link>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
