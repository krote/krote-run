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
    title: isJa ? 'HASHIRUについて' : 'About HASHIRU',
    description: isJa
      ? 'HASHIRUは日本全国のマラソン大会情報を網羅したポータルサイトです。大会選びから当日の準備まで、ランナーをサポートします。'
      : 'HASHIRU is a comprehensive portal for marathon races across Japan, helping runners find and prepare for their next race.',
    alternates: {
      canonical: `https://hashiru.run/${locale}/about`,
      languages: {
        ja: 'https://hashiru.run/ja/about',
        en: 'https://hashiru.run/en/about',
      },
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const isJa = rawLocale !== 'en';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <p
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--color-primary)' }}
        >
          {isJa ? 'このサイトについて' : 'About'}
        </p>
        <h1
          className="font-serif text-4xl font-bold mb-4"
          style={{ color: 'var(--color-ink)' }}
        >
          HASHIRU
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-mid)' }}>
          {isJa
            ? '日本全国のマラソン大会情報を網羅したポータルサイトです。'
            : 'A comprehensive portal for marathon races across Japan.'}
        </p>
      </div>

      <div className="space-y-10" style={{ color: 'var(--color-ink)' }}>
        {/* サイトの目的 */}
        <section>
          <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
            {isJa ? 'サイトの目的' : 'Our Mission'}
          </h2>
          <p className="text-sm leading-8" style={{ color: 'var(--color-mid)' }}>
            {isJa
              ? 'HASHIRUは「走ることをもっと楽しく」をコンセプトに、日本全国で開催されるマラソン・ロードレース大会の情報を一箇所にまとめたポータルサイトです。大会のエントリー情報・コースの特徴・参加賞・アクセス・周辺スポットまで、レース選びに必要な情報を丁寧に整理しています。'
              : 'HASHIRU brings together information on marathons and road races held across Japan, making it easy to find and prepare for your next race. From entry details and course features to access and nearby spots, we cover everything a runner needs.'}
          </p>
        </section>

        {/* 掲載大会について */}
        <section>
          <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
            {isJa ? '掲載大会について' : 'Race Listings'}
          </h2>
          <p className="text-sm leading-8" style={{ color: 'var(--color-mid)' }}>
            {isJa
              ? '現在、2026年開催予定の国内主要マラソン大会を中心に掲載しています。掲載情報は各大会の公式発表をもとに作成していますが、変更になる場合があります。最新・正確な情報は必ず各大会の公式サイトをご確認ください。'
              : 'We currently list major marathon races scheduled in Japan for 2026. While we strive for accuracy, race details may change. Always verify the latest information on each race\'s official website.'}
          </p>
        </section>

        {/* 運営について */}
        <section>
          <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
            {isJa ? '運営について' : 'About This Site'}
          </h2>
          <p className="text-sm leading-8" style={{ color: 'var(--color-mid)' }}>
            {isJa
              ? '当サイトは、個人が公開情報をもとに収集・作成・運営しています。特定の大会主催者・スポーツ団体・企業とは一切関係なく、公式サイトでも代理店でもありません。掲載内容はすべて個人の調査によるものであり、各大会の公式情報とは独立しています。'
              : 'HASHIRU is an independently operated site, created and maintained by an individual based on publicly available information. It has no affiliation with any race organizer, sports association, or company. All content reflects personal research and is independent of any official source.'}
          </p>
        </section>

        {/* 免責事項 */}
        <section>
          <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
            {isJa ? '免責事項' : 'Disclaimer'}
          </h2>
          <p className="text-sm leading-8" style={{ color: 'var(--color-mid)' }}>
            {isJa
              ? '当サイトに掲載している情報の正確性・完全性については万全を期しておりますが、その内容を保証するものではありません。大会の日程・エントリー情報・定員等は予告なく変更される場合があります。掲載情報に基づいて被ったいかなる損害についても、当サイトは責任を負いかねます。エントリーや参加の判断は必ず各大会の公式サイトでご確認ください。'
              : 'While we make every effort to ensure the accuracy of the information on this site, we cannot guarantee its completeness or accuracy. Race dates, entry details, and capacities are subject to change without notice. We are not responsible for any damages arising from the use of information on this site. Always confirm details on each race\'s official website before registering.'}
          </p>
        </section>

        {/* リンク */}
        <section className="pt-4 flex flex-wrap gap-6 text-sm">
          <Link
            href="/privacy"
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            {isJa ? 'プライバシーポリシー →' : 'Privacy Policy →'}
          </Link>
          <Link
            href="/races"
            className="font-semibold hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            {isJa ? '大会一覧を見る →' : 'Browse Races →'}
          </Link>
        </section>
      </div>
    </div>
  );
}
