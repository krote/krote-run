import { getTranslations } from 'next-intl/server';
import { type Locale } from '@/i18n/routing';
import ContactFormWrapper from '@/components/contact/ContactFormWrapper';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title') };
}

export default async function ContactPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <main className="min-h-screen py-16 px-4" style={{ background: 'var(--color-cream)' }}>
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="mb-10">
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
            style={{ color: 'var(--color-primary)' }}
          >
            {tNav('contact')}
          </p>
          <h1
            className="font-serif text-3xl sm:text-4xl mb-4"
            style={{ color: 'var(--color-ink)' }}
          >
            {t('title')}
          </h1>
          <p className="text-sm leading-7" style={{ color: '#555' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* フォーム */}
        <div
          className="rounded-2xl p-8 sm:p-10"
          style={{ background: 'white', border: '1px solid var(--color-border)' }}
        >
          <ContactFormWrapper />
        </div>
      </div>
    </main>
  );
}
