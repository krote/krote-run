import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getUpcomingRaces, getOpenEntryRaces, getSoonOpeningEntryRaces } from '@/lib/data';
import HomeSections from '@/components/home/HomeSections';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return { title: t('siteName') };
}

// ─── キャプションバー ────────────────────────────────
function CaptionBar({ raceCount }: { raceCount: number }) {
  return (
    <div
      className="flex justify-between items-center px-10 py-3"
      style={{
        borderBottom: '1px solid var(--color-border-soft)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--color-mid)',
      }}
    >
      <span>HASHIRU &nbsp;/&nbsp; 走</span>
      <span>2026 Season &nbsp;·&nbsp; 全国 {raceCount.toLocaleString()} 大会</span>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────
function HeroSection({ raceCount }: { raceCount: number }) {
  const t = useTranslations('home.hero');

  const stats = [
    { num: raceCount.toLocaleString(), label: '掲載大会', sub: 'races' },
    { num: '47',  label: '都道府県', sub: 'pref.' },
  ];

  return (
    <section
      style={{
        background: 'var(--color-cream)',
        borderBottom: '1px solid var(--color-border-soft)',
      }}
    >
      <CaptionBar raceCount={raceCount} />

      <div
        className="max-w-[1120px] mx-auto px-10 py-16 grid items-center gap-10"
        style={{ gridTemplateColumns: '1fr auto 1fr' }}
      >
        {/* 左: 英文見出し + CTA */}
        <div>
          <p
            className="flex items-center gap-3 mb-5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
            }}
          >
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--color-primary)' }} />
            Marathons of Japan
          </p>
          <h1
            className="font-serif font-semibold leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: 'var(--color-ink)', letterSpacing: '-0.01em' }}
          >
            {t('titleLine1')}<br />
            <em style={{ fontStyle: 'italic', fontWeight: 500, color: 'var(--color-primary)' }}>
              {t('titleEm')}
            </em>
          </h1>
          <p
            className="mb-8 leading-[1.85]"
            style={{ fontSize: '0.88rem', color: 'var(--color-mid)', maxWidth: 380 }}
          >
            {t('subtitle')}
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link
              href="/races"
              className="no-underline inline-block px-5 py-3 text-sm font-semibold rounded-[2px] transition-colors"
              style={{ background: 'var(--color-ink)', color: '#fff', letterSpacing: '0.06em' }}
            >
              大会を探す　→
            </Link>
            <Link
              href="/guide"
              className="no-underline inline-block px-5 py-3 text-sm font-semibold rounded-[2px] transition-colors"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)', letterSpacing: '0.06em' }}
            >
              {t('guideLink')}
            </Link>
          </div>
        </div>

        {/* 中央: 「走」 */}
        <div className="flex flex-col items-center gap-3 px-2">
          <span
            className="font-serif font-bold leading-none select-none"
            style={{ fontSize: 'clamp(5rem, 9vw, 8rem)', color: 'var(--color-primary)' }}
          >
            走
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--color-light)',
            }}
          >
            HA · SHI · RU
          </span>
        </div>

        {/* 右: 和文 + 統計数値 */}
        <div className="flex flex-col items-end gap-8">
          <div
            className="flex flex-col items-end gap-1 pr-5"
            style={{ borderRight: '2px solid var(--color-primary)' }}
          >
            <span
              className="font-serif"
              style={{ fontSize: '0.82rem', letterSpacing: '0.25em', color: 'var(--color-primary)' }}
            >
              日本の、走る、すべて。
            </span>
          </div>

          <div className="flex flex-col items-end gap-3">
            {stats.map((s) => (
              <div key={s.sub} className="flex items-baseline gap-3">
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--color-light)',
                    minWidth: 56,
                    textAlign: 'right',
                  }}
                >
                  {s.sub}
                </span>
                <span
                  className="font-serif"
                  style={{ fontSize: '0.72rem', color: 'var(--color-mid)', minWidth: 56, textAlign: 'right' }}
                >
                  {s.label}
                </span>
                <span
                  className="font-serif font-semibold tabular-nums"
                  style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--color-ink)', lineHeight: 1, minWidth: 80, textAlign: 'right' }}
                >
                  {s.num}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Japan ──────────────────────────────────────
function WhySection() {
  const t = useTranslations('home.why');

  const items = [
    { kanji: '桜', en: 'SAKURA · SPRING',   titleKey: 'item1Title' as const, descKey: 'item1Desc' as const },
    { kanji: '声', en: 'CHEER · OMOTENASHI', titleKey: 'item2Title' as const, descKey: 'item2Desc' as const },
    { kanji: '路', en: 'COURSE · DIVERSITY', titleKey: 'item3Title' as const, descKey: 'item3Desc' as const },
    { kanji: '印', en: 'FINISH · TROPHY',    titleKey: 'item4Title' as const, descKey: 'item4Desc' as const },
  ];

  return (
    <section style={{ background: 'var(--color-ink)', color: '#fff', padding: '72px 40px' }}>
      <div
        className="max-w-[1120px] mx-auto grid gap-14 items-start"
        style={{ gridTemplateColumns: 'auto 1fr' }}
      >
        {/* 左: 見出し */}
        <div style={{ maxWidth: 340 }}>
          <p
            className="flex items-center gap-3 mb-5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-asagi)',
            }}
          >
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--color-asagi)' }} />
            {t('eyebrow')}
          </p>
          <h2
            className="font-serif font-semibold leading-[1.15] mb-5"
            style={{ fontSize: '2.25rem', color: '#fff' }}
          >
            {t('title')}<br />
            <em style={{ fontStyle: 'italic', fontWeight: 500, color: '#f0c4bb' }}>{t('titleEm')}</em>
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.85 }}>
            走ることが、その土地の文化に触れる入り口になる。<br />
            それが日本のマラソン。
          </p>
        </div>

        {/* 右: 2×2グリッド */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(2, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.10)',
          }}
        >
          {items.map((it, i) => (
            <div
              key={i}
              className="grid gap-4 p-7"
              style={{
                gridTemplateColumns: '64px 1fr',
                borderBottom: '1px solid rgba(255,255,255,0.10)',
                borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.10)' : 'none',
              }}
            >
              <div
                className="flex items-center justify-center font-serif font-bold"
                style={{
                  width: 56, height: 56,
                  border: '1px solid rgba(255,255,255,0.20)',
                  fontSize: '1.75rem',
                  color: '#f0c4bb',
                }}
              >
                {it.kanji}
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 4,
                  }}
                >
                  {`0${i + 1} · ${it.en}`}
                </p>
                <h3
                  className="font-serif font-semibold mb-2"
                  style={{ fontSize: '1.05rem', color: '#fff', lineHeight: 1.3 }}
                >
                  {t(it.titleKey)}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.60)', lineHeight: 1.85 }}>
                  {t(it.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [upcomingRaces, openEntryRaces, soonOpeningRaces] = await Promise.all([
    getUpcomingRaces(6),
    getOpenEntryRaces(8),
    getSoonOpeningEntryRaces(6),
  ]);

  const totalRaces = upcomingRaces.length + openEntryRaces.length + soonOpeningRaces.length;

  return (
    <>
      <HeroSection raceCount={totalRaces || 1247} />
      <HomeSections
        upcoming={upcomingRaces}
        openEntry={openEntryRaces}
        soonOpening={soonOpeningRaces}
        locale={locale as Locale}
      />
      <WhySection />
    </>
  );
}
