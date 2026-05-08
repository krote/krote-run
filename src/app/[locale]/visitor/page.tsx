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
    title: isJa ? '訪日ランナーガイド' : "Visitor's Running Guide",
    description: isJa
      ? '海外から日本のマラソン大会に参加するための基本ガイド。エントリー・前日受付・アクセス・宿泊・当日の流れを解説します。'
      : 'A practical guide for overseas runners entering a Japanese marathon or trail race — entry, packet pickup, transport, accommodation, and race day.',
    alternates: {
      canonical: `https://hashiru.run/${locale}/visitor`,
      languages: {
        ja: 'https://hashiru.run/ja/visitor',
        en: 'https://hashiru.run/en/visitor',
      },
    },
  };
}

// ─── 共通コンポーネント ──────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-serif text-xl font-bold mb-5"
      style={{ color: 'var(--color-ink)', borderBottom: '1px solid var(--color-border-soft)', paddingBottom: '0.5rem' }}
    >
      {children}
    </h2>
  );
}

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-4 p-4 text-xs leading-7"
      style={{
        background: 'var(--color-cream)',
        border: '1px solid var(--color-border)',
        borderLeft: '3px solid var(--color-primary)',
        color: 'var(--color-mid)',
      }}
    >
      {children}
    </div>
  );
}

function PhraseRow({ jp, reading, en }: { jp: string; reading: string; en: string }) {
  return (
    <div
      className="grid gap-2 py-3"
      style={{
        gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid var(--color-border-soft)',
        fontSize: '0.82rem',
      }}
    >
      <span className="font-serif font-semibold" style={{ color: 'var(--color-ink)' }}>{jp}</span>
      <span style={{ color: 'var(--color-mid)', fontStyle: 'italic' }}>{reading}</span>
      <span style={{ color: 'var(--color-mid)' }}>{en}</span>
    </div>
  );
}

// ─── 英語版 ──────────────────────────────────────────

function EnPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'var(--color-mid)' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <span aria-hidden="true">›</span>
        <span style={{ color: 'var(--color-ink)' }}>{"Visitor's Guide"}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--color-primary)' }}>
          For Overseas Runners
        </p>
        <h1 className="font-serif text-4xl font-bold mb-5" style={{ color: 'var(--color-ink)' }}>
          {"Running in Japan:"}
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-primary)' }}>
            {"A Visitor's Guide"}
          </em>
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-mid)', maxWidth: 560 }}>
          Japan hosts hundreds of marathons and trail races each year — from city road races
          to mountain ultras. This guide covers the basics of entering and running a Japanese race
          as an overseas visitor.
        </p>
        <NoteBox>
          <strong style={{ color: 'var(--color-ink)' }}>Note:</strong> Rules, procedures, and deadlines
          vary by race. Always check the official race website for the most up-to-date information.
          Some races offer dedicated overseas entry categories or English-language entry portals —
          check the race detail page or official site before assuming the standard process applies.
        </NoteBox>
      </div>

      <div className="space-y-12">
        {/* Entry */}
        <section>
          <SectionHeading>1. Entry Process</SectionHeading>
          <p className="text-sm leading-8 mb-4" style={{ color: 'var(--color-mid)' }}>
            Most races use third-party entry platforms such as RUNNET, Sports Entry, or
            marathon-guide. Some larger races manage entries through their own websites.
            Entry typically opens several months before race day and closes weeks to months in advance
            — use the calendar on this site to track opening dates.
          </p>
          <ul className="space-y-2 text-sm leading-8" style={{ color: 'var(--color-mid)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
            <li>Entry forms are almost entirely in Japanese. Use your browser&apos;s built-in translation tool as a starting point.</li>
            <li>When entering your name, follow the form instructions — some forms require katakana (Japanese phonetic characters) for the name field.</li>
            <li>Overseas addresses may not be accepted by all platforms. Contact the race organiser if you encounter issues.</li>
            <li>Payment methods vary by platform. Major overseas credit cards are accepted on most large platforms, but this is not guaranteed — confirm before starting the entry process.</li>
          </ul>
          <NoteBox>
            Entry fees are generally non-refundable. If you are travelling internationally to run,
            consider purchasing travel insurance that covers race withdrawal or cancellation.
          </NoteBox>
        </section>

        {/* Packet Pickup */}
        <section>
          <SectionHeading>2. Day-Before Packet Pickup (前日受付)</SectionHeading>
          <p className="text-sm leading-8 mb-4" style={{ color: 'var(--color-mid)' }}>
            The vast majority of Japanese races require runners to collect their bib number
            (ゼッケン) and race materials in person the day before the race. This is called
            <em> zensho uketsuke</em> (前日受付). It is usually held at a sports hall, community
            centre, or convention venue near the start area.
          </p>
          <ul className="space-y-2 text-sm leading-8" style={{ color: 'var(--color-mid)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
            <li>Bring your entry confirmation email (printed or on your phone) and a photo ID.</li>
            <li>Allow enough time — popular races can have long queues.</li>
            <li>A race expo with gear, merchandise, and local products is usually held alongside packet pickup.</li>
          </ul>
          <NoteBox>
            Some races mail bibs in advance (郵送), but overseas shipping is typically not available.
            If advance shipping is the only option and overseas delivery is not offered, contact the
            race organiser directly.
          </NoteBox>
        </section>

        {/* Access & Accommodation */}
        <section>
          <SectionHeading>3. Getting There & Accommodation</SectionHeading>
          <p className="text-sm leading-8 mb-4" style={{ color: 'var(--color-mid)' }}>
            Race venues are spread across Japan — from central city locations accessible by bullet
            train to rural settings requiring local transport. Most races run shuttle buses from the
            nearest train station to the start line on race morning.
          </p>
          <ul className="space-y-2 text-sm leading-8" style={{ color: 'var(--color-mid)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
            <li>Shuttle bus schedules are published on the official race website, typically 2–4 weeks before the event.</li>
            <li>For rural or mountain races, a rental car may be the most practical option.</li>
            <li>Hotels near popular races sell out fast — sometimes 6 months or more in advance. Book as soon as the race date is confirmed.</li>
            <li>Race websites often list recommended accommodation partners with reserved blocks for runners.</li>
          </ul>
        </section>

        {/* Race Day */}
        <section>
          <SectionHeading>4. Race Day</SectionHeading>
          <p className="text-sm leading-8 mb-4" style={{ color: 'var(--color-mid)' }}>
            Japanese races are well-organised and runner-friendly, but knowing what to expect
            will help you have a smooth experience.
          </p>
          <ul className="space-y-2 text-sm leading-8" style={{ color: 'var(--color-mid)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
            <li>Arrive at least 60–90 minutes before your wave start. Bag drop (手荷物預かり) is usually available.</li>
            <li>Aid stations (エイドステーション) are typically every few kilometres, offering water, sports drink, and often local food.</li>
            <li>Cutoff times (制限時間) at checkpoints (関門) are strictly enforced — no exceptions are made.</li>
            <li>Official race announcements, weather updates, and course changes are communicated in Japanese. Having a translation app on your phone is strongly recommended.</li>
          </ul>
          <NoteBox>
            If the race is cancelled due to weather or other circumstances, refund policies are set by
            each race organiser. Cancellation and refund terms are usually stated on the official website.
          </NoteBox>
        </section>

        {/* Key Phrases */}
        <section>
          <SectionHeading>5. Key Japanese Terms</SectionHeading>
          <p className="text-sm leading-7 mb-4" style={{ color: 'var(--color-mid)' }}>
            You will encounter these words on signage, in announcements, and on the race website.
          </p>
          <div style={{ border: '1px solid var(--color-border-soft)' }}>
            <div className="grid gap-2 px-3 py-2" style={{ gridTemplateColumns: '1fr 1fr 1fr', fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-light)' }}>
              <span>Japanese</span><span>Reading</span><span>Meaning</span>
            </div>
            <div className="px-3">
              <PhraseRow jp="ゼッケン" reading="zekken" en="Bib number" />
              <PhraseRow jp="前日受付" reading="zensho uketsuke" en="Day-before packet pickup" />
              <PhraseRow jp="スタート" reading="sutāto" en="Start" />
              <PhraseRow jp="ゴール" reading="gōru" en="Finish" />
              <PhraseRow jp="エイドステーション" reading="eido stēshon" en="Aid station" />
              <PhraseRow jp="関門" reading="kanmon" en="Checkpoint / cutoff point" />
              <PhraseRow jp="制限時間" reading="seigen jikan" en="Time limit" />
              <PhraseRow jp="手荷物預かり" reading="tenimotsu azukari" en="Bag drop" />
              <PhraseRow jp="更衣室" reading="kōishitsu" en="Changing room" />
              <PhraseRow jp="トイレ" reading="toire" en="Toilet" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-2 flex flex-wrap gap-4">
          <Link
            href="/races"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-85"
            style={{ background: 'var(--color-ink)', borderRadius: 2 }}
          >
            Browse Races →
          </Link>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border no-underline transition-opacity hover:opacity-85"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)', borderRadius: 2 }}
          >
            Entry Calendar →
          </Link>
        </section>
      </div>
    </div>
  );
}

// ─── 日本語版 ─────────────────────────────────────────

function JaPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'var(--color-mid)' }}>
        <Link href="/" className="hover:underline">ホーム</Link>
        <span aria-hidden="true">›</span>
        <span style={{ color: 'var(--color-ink)' }}>訪日ランナーガイド</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--color-primary)' }}>
          For Overseas Runners
        </p>
        <h1 className="font-serif text-4xl font-bold mb-5" style={{ color: 'var(--color-ink)' }}>
          海外から日本のレースに<br />
          <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-primary)' }}>
            参加するための基本ガイド
          </em>
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--color-mid)', maxWidth: 560 }}>
          日本では年間を通じて多くのマラソン・トレイルランレースが開催されています。
          このページでは海外在住ランナーが日本のレースに参加する際の基本的な流れを解説します。
        </p>
        <NoteBox>
          <strong style={{ color: 'var(--color-ink)' }}>注意：</strong>
          手続きや締切は大会によって異なります。詳細は必ず各大会の公式サイトをご確認ください。
          大会によっては海外居住者向けの専用エントリー枠や英語対応のエントリーページを用意している場合があります。
          標準の手順が適用されると仮定せず、まず大会詳細ページまたは公式サイトをご確認ください。
        </NoteBox>
      </div>

      <div className="space-y-12">
        {/* Entry */}
        <section>
          <SectionHeading>1. エントリーの流れ</SectionHeading>
          <p className="text-sm leading-8 mb-4" style={{ color: 'var(--color-mid)' }}>
            多くの大会はRUNNET・スポーツエントリー・マラソンガイドなどの外部プラットフォームを通じてエントリーを受け付けています。
            一部の大会は独自サイトで受付を行っています。
            エントリー受付はレース当日の数か月前に開始し、数週間〜数か月前に締め切られます。
          </p>
          <ul className="space-y-2 text-sm leading-8" style={{ color: 'var(--color-mid)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
            <li>エントリーフォームはほぼ日本語のみです。ブラウザの翻訳機能を活用してください。</li>
            <li>氏名入力欄にカタカナが求められる場合があります。フォームの指示に従ってください。</li>
            <li>プラットフォームによっては海外住所に対応していないことがあります。入力できない場合は大会事務局に直接お問い合わせください。</li>
            <li>支払い方法はプラットフォームにより異なります。海外発行カードへの対応状況は事前に確認してください。</li>
          </ul>
          <NoteBox>
            参加費は原則として返金されません。海外から渡航して参加する場合は、大会の欠場やキャンセルに対応した旅行保険への加入を検討してください。
          </NoteBox>
        </section>

        {/* Packet Pickup */}
        <section>
          <SectionHeading>2. 前日受付（ゼッケン引換）</SectionHeading>
          <p className="text-sm leading-8 mb-4" style={{ color: 'var(--color-mid)' }}>
            ほとんどの大会では、レース前日にゼッケンや大会資料を直接受け取る「前日受付」が設けられています。
            会場はスタートエリア付近のスポーツ施設や公共施設であることが多いです。
          </p>
          <ul className="space-y-2 text-sm leading-8" style={{ color: 'var(--color-mid)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
            <li>エントリー確認メール（印刷またはスマートフォン表示）と写真付き身分証明書をご持参ください。</li>
            <li>人気大会では受付に時間がかかる場合があります。余裕を持って行動してください。</li>
            <li>前日受付と併せてレースEXPO（物販・地元産品の販売など）が開催されることが多いです。</li>
          </ul>
          <NoteBox>
            大会によっては事前にゼッケンを郵送する方式（郵送受付）をとる場合がありますが、海外への発送に対応していないケースがあります。
            郵送のみの場合は大会事務局に事前にご確認ください。
          </NoteBox>
        </section>

        {/* Access & Accommodation */}
        <section>
          <SectionHeading>3. アクセス・宿泊</SectionHeading>
          <p className="text-sm leading-8 mb-4" style={{ color: 'var(--color-mid)' }}>
            大会会場は都市部から山間地まで全国各地に点在しています。多くの大会では最寄り駅からスタート地点までのシャトルバスが運行されます。
          </p>
          <ul className="space-y-2 text-sm leading-8" style={{ color: 'var(--color-mid)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
            <li>シャトルバスの時刻表は大会の2〜4週間前に公式サイトに掲載されることが多いです。</li>
            <li>山岳・地方のレースでは公共交通機関が限られる場合があり、レンタカーが便利な場合があります。</li>
            <li>人気大会の会場周辺の宿は6か月以上前に満室になることがあります。大会日程が確定次第、早めに予約することをおすすめします。</li>
            <li>大会公式サイトにランナー向けの宿泊提携先が掲載されていることがあります。</li>
          </ul>
        </section>

        {/* Race Day */}
        <section>
          <SectionHeading>4. 当日の流れ</SectionHeading>
          <p className="text-sm leading-8 mb-4" style={{ color: 'var(--color-mid)' }}>
            日本のレースは運営が整備されており、初参加の方でも安心して臨めます。当日の基本的な流れを把握しておきましょう。
          </p>
          <ul className="space-y-2 text-sm leading-8" style={{ color: 'var(--color-mid)', listStyle: 'disc', paddingLeft: '1.25rem' }}>
            <li>スタート60〜90分前には会場に到着してください。荷物預かり（手荷物預かり）が設置されていることが多いです。</li>
            <li>数キロごとにエイドステーションがあり、水・スポーツドリンクに加え地元の食べ物が提供されることも多いです。</li>
            <li>関門（チェックポイント）での制限時間は厳格に運用されます。例外はありません。</li>
            <li>大会からのアナウンスやコース変更の通知は日本語で行われます。翻訳アプリをご用意ください。</li>
          </ul>
          <NoteBox>
            大会が中止となった場合の返金対応は各大会の規定によります。中止・返金ポリシーは公式サイトの参加規約をご確認ください。
          </NoteBox>
        </section>

        {/* Key Phrases */}
        <section>
          <SectionHeading>5. 当日に役立つキーワード</SectionHeading>
          <p className="text-sm leading-7 mb-4" style={{ color: 'var(--color-mid)' }}>
            看板・アナウンス・公式サイトで目にする主な用語をまとめました。
          </p>
          <div style={{ border: '1px solid var(--color-border-soft)' }}>
            <div className="grid gap-2 px-3 py-2" style={{ gridTemplateColumns: '1fr 1fr 1fr', fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-light)' }}>
              <span>日本語</span><span>読み</span><span>意味</span>
            </div>
            <div className="px-3">
              <PhraseRow jp="ゼッケン" reading="zekken" en="Bib number" />
              <PhraseRow jp="前日受付" reading="zenjitsu uketsuke" en="Day-before packet pickup" />
              <PhraseRow jp="スタート" reading="sutāto" en="Start" />
              <PhraseRow jp="ゴール" reading="gōru" en="Finish" />
              <PhraseRow jp="エイドステーション" reading="eido stēshon" en="Aid station" />
              <PhraseRow jp="関門" reading="kanmon" en="Checkpoint / cutoff point" />
              <PhraseRow jp="制限時間" reading="seigen jikan" en="Time limit" />
              <PhraseRow jp="手荷物預かり" reading="tenimotsu azukari" en="Bag drop" />
              <PhraseRow jp="更衣室" reading="kōishitsu" en="Changing room" />
              <PhraseRow jp="トイレ" reading="toire" en="Toilet" />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-2 flex flex-wrap gap-4">
          <Link
            href="/races"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-85"
            style={{ background: 'var(--color-ink)', borderRadius: 2 }}
          >
            大会を探す →
          </Link>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold border no-underline transition-opacity hover:opacity-85"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink)', borderRadius: 2 }}
          >
            エントリーカレンダー →
          </Link>
        </section>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────

export default async function VisitorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return locale === 'en' ? <EnPage /> : <JaPage />;
}
