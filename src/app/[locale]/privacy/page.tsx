import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale !== 'en';
  return {
    title: isJa ? 'プライバシーポリシー' : 'Privacy Policy',
    alternates: {
      canonical: `https://hashiru.run/${locale}/privacy`,
      languages: {
        ja: 'https://hashiru.run/ja/privacy',
        en: 'https://hashiru.run/en/privacy',
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

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const isJa = rawLocale !== 'en';

  if (!isJa) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--color-primary)' }}>
            Legal
          </p>
          <h1 className="font-serif text-4xl font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-mid)' }}>Last updated: March 2026</p>
        </div>
        <div className="space-y-8">
          <Section title="Analytics">
            <p>This site uses Google Analytics 4 to collect anonymous usage data such as page views and traffic sources. This data is used solely to improve the site. Google Analytics uses cookies; you may opt out via your browser settings or Google&apos;s opt-out tool.</p>
          </Section>
          <Section title="Affiliate Links">
            <p>This site participates in affiliate programs including Amazon Associates and Rakuten Affiliate. When you click an affiliate link and make a purchase, we may earn a commission at no extra cost to you. Affiliate links are used to support the operation of this site.</p>
          </Section>
          <Section title="Third-Party Links">
            <p>This site contains links to external websites. We are not responsible for the privacy practices or content of those sites.</p>
          </Section>
          <Section title="Contact">
            <p>For questions about this privacy policy, please contact us via the official race listing pages.</p>
          </Section>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          Legal
        </p>
        <h1
          className="font-serif text-4xl font-bold mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          プライバシーポリシー
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
          最終更新日：2026年3月
        </p>
      </div>

      <div className="space-y-8">
        <Section title="基本方針">
          <p>
            HASHIRU（hashiru.run、以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報の保護に努めます。
            本ポリシーは、当サイトにおける情報の収集・利用方法について説明するものです。
          </p>
        </Section>

        <Section title="収集する情報">
          <p>当サイトは以下の情報を収集することがあります。</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>アクセスログ（IPアドレス、ブラウザ情報、参照元URLなど）</li>
            <li>Cookieを通じた匿名の利用状況データ</li>
          </ul>
        </Section>

        <Section title="Google Analytics">
          <p>
            当サイトはアクセス解析のためにGoogle Analytics 4を使用しています。
            Google Analyticsはトラフィックデータの収集のためにCookieを使用します。
            収集されるデータは匿名であり、個人を特定するものではありません。
            データはサイトの改善目的にのみ使用されます。
          </p>
          <p className="mt-2">
            Google Analyticsのオプトアウトを希望する場合は、
            Google Analytics オプトアウト アドオンをご利用いただくか、ブラウザのCookie設定を変更してください。
          </p>
        </Section>

        <Section title="アフィリエイトプログラムについて">
          <p>
            当サイトは、以下のアフィリエイトプログラムに参加しています。
            記事内のリンクを経由して商品・サービスを購入された場合、
            当サイトに紹介料が支払われることがあります。
            これは読者の方の購入金額には影響しません。
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Amazonアソシエイト・プログラム</li>
            <li>楽天アフィリエイト</li>
            <li>その他アフィリエイトサービス</li>
          </ul>
          <p className="mt-2">
            アフィリエイト収益は当サイトの運営・維持のために使用されます。
          </p>
        </Section>

        <Section title="第三者へのデータ提供">
          <p>
            当サイトは、法令に基づく場合を除き、収集した情報を第三者に提供・開示することはありません。
            ただし、Google Analytics等の解析ツールにおいては、各サービスのプライバシーポリシーに従い、
            データが処理されます。
          </p>
        </Section>

        <Section title="外部リンクについて">
          <p>
            当サイトには外部サイトへのリンクが含まれています。
            リンク先のサイトにおける情報の収集・取り扱いについては、
            各サイトのプライバシーポリシーをご確認ください。
            当サイトは外部サイトの内容・プライバシー慣行について責任を負いません。
          </p>
        </Section>

        <Section title="プライバシーポリシーの変更">
          <p>
            当サイトは、必要に応じて本ポリシーを改定することがあります。
            重要な変更がある場合はサイト上でお知らせします。
          </p>
        </Section>
      </div>
    </div>
  );
}
