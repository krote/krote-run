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
    title: isJa ? '初めての方へ' : 'Getting Started',
    description: isJa
      ? 'HASHIRUの使い方・特徴を紹介します。大会の探し方からログインのメリットまで、はじめてご利用の方へ。'
      : 'Learn how to use HASHIRU — find races, track entries, and get reminders. A guide for first-time visitors.',
    alternates: {
      canonical: `https://hashiru.run/${locale}/guide`,
      languages: {
        ja: 'https://hashiru.run/ja/guide',
        en: 'https://hashiru.run/en/guide',
      },
    },
  };
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="p-5 rounded-xl border"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-cream)' }}
    >
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--color-ink)' }}>
        {title}
      </h3>
      <p className="text-xs leading-6" style={{ color: 'var(--color-mid)' }}>
        {description}
      </p>
    </div>
  );
}

export default async function GuidePage({
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
            Guide
          </p>
          <h1 className="font-serif text-4xl font-bold mb-4" style={{ color: 'var(--color-ink)' }}>
            Getting Started with HASHIRU
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--color-mid)' }}>
            HASHIRU is a portal for marathon and road races in Japan. Here&apos;s how to make the most of it.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="font-serif text-xl font-bold mb-6" style={{ color: 'var(--color-ink)' }}>
              What you can do
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard icon="🔍" title="Find races" description="Search over 50 races by region, distance, season, or features. Filter by entry status to find races still accepting applications." />
              <FeatureCard icon="📅" title="Entry calendar" description="View entry periods on a monthly calendar. Never miss an opening date again." />
              <FeatureCard icon="🗺️" title="Course details" description="Explore elevation profiles, aid stations, checkpoints, and access info before race day." />
              <FeatureCard icon="🎁" title="Participation gifts" description="Check what finisher gifts and local products each race offers." />
            </div>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
              Why create an account?
            </h2>
            <p className="text-sm leading-8 mb-6" style={{ color: 'var(--color-mid)' }}>
              Sign in with Google to unlock features that help you plan your race season.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard icon="📌" title="Track your races" description='Mark races as "planning to enter" to build your personal race list.' />
              <FeatureCard icon="🔔" title="Entry reminders" description="Get notified when entry opens for races you're watching, or the day before it closes." />
              <FeatureCard icon="📆" title="Google Calendar sync" description="Add race dates and entry deadlines directly to your Google Calendar with one click." />
              <FeatureCard icon="👤" title="Personalized mypage" description="See all your upcoming races and entry status at a glance." />
            </div>
          </section>

          <section className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/races"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: 'var(--color-ink)' }}
            >
              Browse races →
            </Link>
            <Link
              href="/mypage"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border transition-opacity hover:opacity-85"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
            >
              Sign in / My page →
            </Link>
          </section>
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
          Guide
        </p>
        <h1
          className="font-serif text-4xl font-bold mb-4"
          style={{ color: 'var(--color-ink)' }}
        >
          初めての方へ
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-mid)' }}>
          HASHIRUは、日本全国のマラソン・ロードレース大会情報を集めたポータルサイトです。
          大会選びから当日の準備まで、ランナーをサポートします。
        </p>
      </div>

      <div className="space-y-12">
        {/* できること */}
        <section>
          <h2 className="font-serif text-xl font-bold mb-6" style={{ color: 'var(--color-ink)' }}>
            HASHIRUでできること
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon="🔍"
              title="大会を探す"
              description="地域・距離・季節・特徴などで絞り込んで全国50以上の大会を検索できます。エントリー受付中の大会だけに絞ることも可能です。"
            />
            <FeatureCard
              icon="📅"
              title="エントリーカレンダー"
              description="月別カレンダーでエントリー期間を一覧表示。受付開始・締切日を見逃しません。"
            />
            <FeatureCard
              icon="🗺️"
              title="コース詳細"
              description="高低差プロファイル・エイドステーション・関門・アクセス情報を大会ごとに確認できます。"
            />
            <FeatureCard
              icon="🎁"
              title="参加賞・特典"
              description="完走メダル・地元産品・Tシャツなど、各大会の参加賞情報をチェックできます。"
            />
          </div>
        </section>

        {/* ログインのメリット */}
        <section>
          <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
            ログインするともっと便利に
          </h2>
          <p className="text-sm leading-8 mb-6" style={{ color: 'var(--color-mid)' }}>
            Googleアカウントでログインすると、レースシーズンの計画に役立つ機能が使えます。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FeatureCard
              icon="📌"
              title="参加予定の登録"
              description="気になる大会を「参加予定」として登録し、マイページでまとめて管理できます。"
            />
            <FeatureCard
              icon="🔔"
              title="エントリーリマインダー"
              description="エントリー開始日・締切前日にリマインドを受け取れます。受付開始を見逃す心配がありません。"
            />
            <FeatureCard
              icon="📆"
              title="Googleカレンダー連携"
              description="大会日程やエントリー締切をワンクリックでGoogleカレンダーに追加できます。"
            />
            <FeatureCard
              icon="👤"
              title="マイページ"
              description="参加予定の大会一覧・エントリー状況をまとめて確認できる専用ページが使えます。"
            />
          </div>
        </section>

        {/* CTA */}
        <section className="pt-2 flex flex-wrap gap-4">
          <Link
            href="/races"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: 'var(--color-ink)' }}
          >
            大会を探す →
          </Link>
          <Link
            href="/mypage"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold border transition-opacity hover:opacity-85"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)' }}
          >
            ログイン / マイページ →
          </Link>
        </section>
      </div>
    </div>
  );
}
