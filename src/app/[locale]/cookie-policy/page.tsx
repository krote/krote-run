import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale !== 'en';
  return {
    title: isJa ? 'Cookieポリシー' : 'Cookie Policy',
    alternates: {
      canonical: `https://hashiru.run/${locale}/cookie-policy`,
      languages: {
        ja: 'https://hashiru.run/ja/cookie-policy',
        en: 'https://hashiru.run/en/cookie-policy',
      },
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-lg font-bold" style={{ color: 'var(--color-ink)' }}>
        {title}
      </h2>
      <div className="text-sm leading-8" style={{ color: 'var(--color-mid)' }}>
        {children}
      </div>
    </section>
  );
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isJa = locale !== 'en';

  if (!isJa) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--color-primary)' }}>
            Legal
          </p>
          <h1 className="font-serif text-4xl font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
            Cookie Policy
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-mid)' }}>Last updated: April 2026</p>
        </div>
        <div className="space-y-8">
          <Section title="Cookies we use">
            <p>This site (hashiru.run) uses Google Analytics 4 (GA4) for traffic analysis. GA4 uses cookies to collect anonymous usage data such as page views and traffic sources. No personally identifiable information is collected. Data is used solely to improve the site.</p>
          </Section>
          <Section title="Managing your consent">
            <p>You can accept or decline cookie usage via the banner shown on your first visit. If you decline, Google Analytics will not collect any data.</p>
          </Section>
          <Section title="Changing your settings">
            <p>Your choice is saved in the browser&apos;s localStorage. To change your preference, delete the &ldquo;cookie-consent&rdquo; key from localStorage and reload the page.</p>
          </Section>
          <Section title="Google Analytics opt-out">
            <p>You can also disable Google Analytics data collection by installing the Google Analytics Opt-out Browser Add-on.</p>
          </Section>
          <Section title="Contact">
            <p>For questions about this policy, please contact us via the official race listing pages.</p>
          </Section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          Legal
        </p>
        <h1 className="font-serif text-4xl font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
          Cookieポリシー
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
          最終更新日：2026年4月
        </p>
      </div>

      <div className="space-y-8">
        <Section title="使用しているCookieについて">
          <p>
            当サイト（hashiru.run）はアクセス解析のためにGoogle Analytics 4（GA4）を使用しています。
            GA4はCookieを利用して、ページビューや流入元などの匿名の利用状況データを収集します。
            収集されたデータは個人を特定するものではなく、サイトの改善目的にのみ使用されます。
          </p>
        </Section>

        <Section title="同意の管理">
          <p>
            初回訪問時に表示されるバナーから、Cookieの使用に同意または拒否することができます。
            拒否した場合、Google Analyticsによるデータ収集は行われません。
          </p>
        </Section>

        <Section title="設定の変更">
          <p>
            一度行った選択は、ブラウザのlocalStorageに保存されます。
            設定を変更するには、ブラウザのlocalStorageから「cookie-consent」キーを削除してページを再読み込みしてください。
          </p>
        </Section>

        <Section title="Google Analyticsのオプトアウト">
          <p>
            ブラウザ拡張機能「Google Analytics オプトアウト アドオン」を使用することでも、
            GAによるデータ収集を無効にできます。
          </p>
        </Section>

        <Section title="お問い合わせ">
          <p>
            本ポリシーに関するご質問は、公式レース掲載ページよりお問い合わせください。
          </p>
        </Section>
      </div>
    </div>
  );
}
