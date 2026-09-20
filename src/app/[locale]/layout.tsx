import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter, Noto_Sans_JP, Noto_Serif_JP, DM_Sans, Montserrat } from 'next/font/google';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsentBanner from '@/components/analytics/CookieConsentBanner';
import PageViewTracker from '@/components/analytics/PageViewTracker';
import { CONSENT_INIT_SCRIPT, GA_MEASUREMENT_ID, getCloudflareBeaconToken } from '@/lib/analytics';
import '../globals.css';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const notoSansJP = Noto_Sans_JP({ variable: '--font-noto-sans-jp', subsets: ['latin'], display: 'swap', preload: false });
const notoSerifJP = Noto_Serif_JP({ variable: '--font-noto-serif-jp', subsets: ['latin'], display: 'swap', preload: false });
const dmSans = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'], display: 'swap' });
const montserrat = Montserrat({ variable: '--font-montserrat', subsets: ['latin'], display: 'swap' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return {
    metadataBase: new URL('https://hashiru.run'),
    title: { default: t('siteName'), template: `%s | ${t('siteName')}` },
    description: t('siteDescription'),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages();
  const beaconToken = getCloudflareBeaconToken();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${notoSansJP.variable} ${notoSerifJP.variable} ${dmSans.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans antialiased">
        <Script id="consent-init" strategy="beforeInteractive">{CONSENT_INIT_SCRIPT}</Script>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        {/* page_view は PageViewTracker から送る。App Router のクライアント遷移では
            config が再実行されず、自動送信だと着地した1ページしか計測されないため。 */}
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}</Script>
        {/* Cloudflare Web Analytics: Cookieを使わないため同意バナーの制約を受けず、
            全訪問者の素のアクセス数を把握できる。トークン未設定の環境では出力しない。 */}
        {beaconToken && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: beaconToken })}
            strategy="afterInteractive"
          />
        )}
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsentBanner />
          <PageViewTracker />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
