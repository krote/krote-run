import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale !== 'en';
  return {
    title: isJa ? '利用規約' : 'Terms of Service',
    description: isJa
      ? 'HASHIRU（hashiru.run）の利用規約です。サービスをご利用になる前にご確認ください。'
      : 'Terms of Service for HASHIRU (hashiru.run). Please read before using the service.',
    alternates: {
      canonical: `https://hashiru.run/${locale}/terms`,
      languages: {
        ja: 'https://hashiru.run/ja/terms',
        en: 'https://hashiru.run/en/terms',
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

export default async function TermsPage({
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
            Terms of Service
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-mid)' }}>Last updated: April 2026</p>
        </div>
        <div className="space-y-8">
          <Section title="Acceptance of Terms">
            <p>By accessing or using HASHIRU (hashiru.run), you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.</p>
          </Section>
          <Section title="Use of the Site">
            <p>HASHIRU provides race information for personal, non-commercial use. You may not reproduce, redistribute, or use the content for commercial purposes without prior written consent.</p>
          </Section>
          <Section title="Accuracy of Information">
            <p>We strive to keep race information accurate and up to date, but we cannot guarantee its completeness or accuracy. Always verify details on each race&apos;s official website before registering.</p>
          </Section>
          <Section title="Prohibited Activities">
            <ul className="list-disc list-inside space-y-1">
              <li>Unauthorized scraping or automated data collection</li>
              <li>Attempting to disrupt or damage the site</li>
              <li>Using the site for any unlawful purpose</li>
            </ul>
          </Section>
          <Section title="Disclaimer">
            <p>HASHIRU is provided &quot;as is&quot; without warranties of any kind. We are not responsible for any damages arising from the use of this site or its content.</p>
          </Section>
          <Section title="Changes to Terms">
            <p>We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
          </Section>
          <Section title="Contact">
            <p>For questions about these terms, please use the <Link href="/contact" className="underline hover:opacity-70">contact form</Link>.</p>
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
        <h1
          className="font-serif text-4xl font-bold mb-2"
          style={{ color: 'var(--color-ink)' }}
        >
          利用規約
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
          最終更新日：2026年4月
        </p>
      </div>

      <div className="space-y-8">
        <Section title="はじめに">
          <p>
            HASHIRU（hashiru.run、以下「当サイト」）をご利用いただく前に、本利用規約をよくお読みください。
            当サイトにアクセスまたはご利用いただくことで、本規約に同意したものとみなします。
          </p>
        </Section>

        <Section title="サービスの内容">
          <p>
            当サイトは、日本全国のマラソン・ロードレース大会の情報を提供するポータルサイトです。
            大会のエントリー情報・コース・参加賞・アクセスなどの情報を掲載しています。
            掲載情報は各大会の公式情報をもとに作成していますが、変更になる場合があります。
            最新・正確な情報は必ず各大会の公式サイトをご確認ください。
          </p>
        </Section>

        <Section title="利用上の注意">
          <p>当サイトのコンテンツは、個人的・非商用目的での閲覧を目的としています。以下の行為を禁止します。</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>当サイトのコンテンツの無断転載・複製・商用利用</li>
            <li>自動化ツールによる大量アクセス・スクレイピング</li>
            <li>当サイトの運営を妨害する行為</li>
            <li>法令または公序良俗に反する目的での利用</li>
          </ul>
        </Section>

        <Section title="免責事項">
          <p>
            当サイトは、掲載情報の正確性・完全性・最新性について可能な限り努力しますが、
            その内容を保証するものではありません。
            当サイトの利用または掲載情報に基づいて生じたいかなる損害についても、
            当サイトは一切の責任を負いかねます。
          </p>
        </Section>

        <Section title="著作権">
          <p>
            当サイトに掲載されているコンテンツ（文章・画像・デザイン等）の著作権は、
            当サイトまたは各権利者に帰属します。
            無断転載・複製・改変等を禁止します。
          </p>
        </Section>

        <Section title="外部リンク">
          <p>
            当サイトには外部サイトへのリンクが含まれています。
            リンク先サイトの内容・プライバシー慣行について当サイトは責任を負いません。
          </p>
        </Section>

        <Section title="規約の変更">
          <p>
            当サイトは、必要に応じて本規約を改定することがあります。
            改定後も当サイトをご利用いただいた場合、新しい規約に同意したものとみなします。
          </p>
        </Section>

        <section className="pt-4 flex flex-wrap gap-6 text-sm">
          <Link
            href="/privacy"
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            プライバシーポリシー →
          </Link>
          <Link
            href="/contact"
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            お問い合わせ →
          </Link>
        </section>
      </div>
    </div>
  );
}
