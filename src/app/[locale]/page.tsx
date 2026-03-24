import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getUpcomingRaces } from '@/lib/data';
import HomeRaceSection from '@/components/home/HomeRaceSection';
import type { Locale } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'common' });
  return { title: t('siteName') };
}

// ─── Hero ───────────────────────────────────────────────────────
function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section
      className="relative flex items-center justify-center min-h-[560px] md:min-h-[640px] overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0c1510 0%, #1a1714 45%, #0e1520 100%)',
      }}
    >
      {/* Ambient light overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 60% 50% at 20% 90%, rgba(192,57,43,0.12) 0%, transparent 70%),' +
            'radial-gradient(ellipse 50% 60% at 80% 10%, rgba(30,60,40,0.25) 0%, transparent 70%)',
        }}
      />
      {/* Thin horizontal rule accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[680px] mx-auto px-6 py-16">
        <p className="inline-flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-[var(--color-primary)] mb-6">
          <span className="inline-block w-6 h-px bg-[var(--color-primary)]" />
          {t('eyebrow')}
          <span className="inline-block w-6 h-px bg-[var(--color-primary)]" />
        </p>
        <h1 className="font-serif text-[2.8rem] md:text-[3.8rem] font-bold text-white leading-[1.1] tracking-[-0.015em] mb-5">
          {t('titleLine1')}<br />
          <em className="not-italic" style={{ color: '#f0c4bb' }}>{t('titleEm')}</em>
        </h1>
        <p className="text-[0.9rem] text-white/45 leading-[1.9] mb-10 max-w-[440px] mx-auto">
          {t('subtitle')}
        </p>

        {/* Search bar */}
        <div
          className="flex max-w-[480px] mx-auto rounded-[4px] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
          style={{ border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="flex-1 border-none outline-none text-[0.88rem] px-5 py-3.5 placeholder:text-[#888]"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'white' }}
          />
          <button
            className="text-white text-[0.82rem] font-semibold tracking-[0.08em] px-6 py-3.5 transition-colors whitespace-nowrap"
            style={{ background: 'var(--color-primary)' }}
          >
            {t('searchButton')}
          </button>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-8 mt-10 text-white/30 text-[0.7rem] tracking-[0.12em] uppercase">
          <span><strong className="text-white/60 font-semibold" style={{ fontFamily: 'var(--font-number)' }}>52</strong> RACES</span>
          <span className="w-px bg-white/10" />
          <span><strong className="text-white/60 font-semibold" style={{ fontFamily: 'var(--font-number)' }}>47</strong> PREFECTURES</span>
          <span className="w-px bg-white/10" />
          <span><strong className="text-white/60 font-semibold" style={{ fontFamily: 'var(--font-number)' }}>42.195</strong> KM</span>
        </div>
      </div>
    </section>
  );
}

// ─── Meta bar ───────────────────────────────────────────────────
function MetaBar() {
  const t = useTranslations('home.meta');
  return (
    <div className="bg-[var(--color-primary)] px-9 py-[10px] flex flex-wrap gap-x-10 gap-y-1">
      <span className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/75">
        <strong className="text-white font-bold">52</strong> {t('racesLabel')}
      </span>
      <span className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/75">
        <strong className="text-white font-bold">47</strong> {t('prefLabel')}
      </span>
      <span className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/75">
        <strong className="text-white font-bold">12</strong> {t('entryLabel')}
      </span>
      <span className="text-[0.72rem] font-medium tracking-[0.1em] uppercase text-white/75">
        <strong className="text-white font-bold">{t('seasonRange')}</strong> {t('seasonLabel')}
      </span>
    </div>
  );
}

// ─── Why Japan ──────────────────────────────────────────────────
function WhySection() {
  const t = useTranslations('home.why');
  const items = [
    { icon: '🌸', titleKey: 'item1Title', descKey: 'item1Desc' },
    { icon: '🍙', titleKey: 'item2Title', descKey: 'item2Desc' },
    { icon: '📣', titleKey: 'item3Title', descKey: 'item3Desc' },
    { icon: '🏅', titleKey: 'item4Title', descKey: 'item4Desc' },
  ] as const;

  return (
    <section className="bg-[var(--color-ink)] px-9 py-16">
      <div className="max-w-[1120px] mx-auto">
        <p className="flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)] mb-4">
          <span className="inline-block w-6 h-px bg-[var(--color-primary)]" />
          {t('eyebrow')}
        </p>
        <h2 className="font-serif text-[2rem] font-bold text-white leading-[1.25] mb-10">
          {t('title')}<br />
          <em className="not-italic text-[#f5c6c0]">{t('titleEm')}</em>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {items.map(({ icon, titleKey, descKey }, i) => (
            <div
              key={i}
              className={`pr-7 mr-7 ${i < items.length - 1 ? 'border-r border-white/8' : ''}`}
            >
              <div className="text-[1.8rem] mb-3.5">{icon}</div>
              <div className="text-[0.92rem] font-semibold text-white mb-2">{t(titleKey)}</div>
              <div className="text-[0.78rem] text-white/40 leading-[1.75]">{t(descKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const upcomingRaces = await getUpcomingRaces(6);

  return (
    <>
      <HeroSection />
      <MetaBar />
      <HomeRaceSection races={upcomingRaces} locale={locale as Locale} />
      <WhySection />
    </>
  );
}
