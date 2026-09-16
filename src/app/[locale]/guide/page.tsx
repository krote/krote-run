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

function TimelineStep({
  label,
  detail,
  emphasis,
}: {
  label: string;
  detail: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className="flex-1 min-w-[128px] p-3.5 rounded-lg border text-center"
      style={
        emphasis
          ? { borderColor: 'var(--color-primary)', background: 'var(--color-primary)10' }
          : { borderColor: 'var(--color-border)', background: 'white' }
      }
    >
      <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>
        {label}
      </p>
      <p className="text-[0.68rem] leading-5" style={{ color: 'var(--color-mid)' }}>
        {detail}
      </p>
    </div>
  );
}

function TimelineArrow() {
  return (
    <div className="flex items-center justify-center text-lg shrink-0" style={{ color: 'var(--color-border)' }}>
      <span className="sm:hidden">↓</span>
      <span className="hidden sm:inline">→</span>
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

          <section>
            <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
              How day-trip judgment works
            </h2>
            <p className="text-sm leading-8 mb-6" style={{ color: 'var(--color-mid)' }}>
              Set your departure point (nearest station and hub) on My Page, and each race card and detail page will automatically show whether you can day-trip or need to stay overnight. Here&apos;s how it&apos;s calculated:
            </p>

            <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
              <TimelineStep label="① Nearest station" detail="The station closest to home" />
              <TimelineArrow />
              <TimelineStep label="② Time to hub + buffer" detail="Enter minutes on My Page" emphasis />
              <TimelineArrow />
              <TimelineStep label="③ Hub station" detail="One of 8 major hubs you select" />
              <TimelineArrow />
              <TimelineStep label="④ Travel time to venue" detail="Precomputed per hub" emphasis />
              <TimelineArrow />
              <TimelineStep label="⑤ Arrival deadline" detail="30 min before start, or same-day reception close" />
              <TimelineArrow />
              <TimelineStep label="⑥ Start" detail="Per-category start time" />
            </div>

            <div
              className="p-4 rounded-lg text-xs leading-6 mb-4"
              style={{ background: 'var(--color-cream)', color: 'var(--color-ink2)' }}
            >
              <p className="font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>Required departure time</p>
              <p>
                Departure time (from hub) = Arrival deadline − (④ hub-to-venue travel time + ② nearest-station-to-hub travel time and buffer)
              </p>
              <p className="mt-2">
                If this required departure time is earlier than the first train time you set in ①, we recommend an overnight stay. Otherwise, a day trip works.
              </p>
            </div>

            <div
              className="p-4 rounded-lg text-xs leading-6"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-mid)' }}
            >
              <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>Exception: </span>
              Races that only accept race-day-before registration always require an overnight stay, regardless of travel time.
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

        {/* 前泊要否の判定方法 */}
        <section>
          <h2 className="font-serif text-xl font-bold mb-3" style={{ color: 'var(--color-ink)' }}>
            前泊要否の判定方法
          </h2>
          <p className="text-sm leading-8 mb-6" style={{ color: 'var(--color-mid)' }}>
            マイページで出発地（最寄り駅・ハブ駅）を設定すると、大会一覧のカードや大会詳細ページに「日帰り可能」か「前泊が必要」かが自動で表示されます。以下の流れで判定しています。
          </p>

          <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-4">
            <TimelineStep label="① 最寄り駅" detail="ご自宅から近い駅" />
            <TimelineArrow />
            <TimelineStep label="② ハブ駅までの時間＋余裕時間" detail="マイページで分数を入力" emphasis />
            <TimelineArrow />
            <TimelineStep label="③ ハブ駅" detail="出発地として選択した主要8駅" />
            <TimelineArrow />
            <TimelineStep label="④ 会場までの移動時間" detail="ハブ駅ごとに事前計算済み" emphasis />
            <TimelineArrow />
            <TimelineStep label="⑤ 到着期限" detail="スタート30分前 or 当日受付締切" />
            <TimelineArrow />
            <TimelineStep label="⑥ スタート" detail="種目別スタート時刻" />
          </div>

          <div
            className="p-4 rounded-lg text-xs leading-6 mb-4"
            style={{ background: 'var(--color-cream)', color: 'var(--color-ink2)' }}
          >
            <p className="font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>必要出発時刻の計算式</p>
            <p>
              必要出発時刻（ハブ駅発）＝ 到着期限 −（④ハブ駅→会場の移動時間 ＋ ②最寄り駅→ハブ駅の移動時間・余裕時間）
            </p>
            <p className="mt-2">
              この必要出発時刻が①で設定した始発時刻より前になる場合は「前泊推奨」、始発時刻以降で間に合う場合は「前泊不要（日帰り可能）」と判定されます。
            </p>
          </div>

          <div
            className="p-4 rounded-lg text-xs leading-6"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-mid)' }}
          >
            <span className="font-semibold" style={{ color: 'var(--color-ink)' }}>例外: </span>
            大会当日に受付できない大会（前日受付のみ）は、移動時間の計算をするまでもなく「前泊必須」と判定されます。
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
