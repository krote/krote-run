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
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] bg-[var(--color-ink)]">
      {/* Left: copy */}
      <div className="flex flex-col justify-center px-12 py-18">
        <p className="flex items-center gap-3 text-[0.68rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-primary)] mb-[22px]">
          <span className="inline-block w-7 h-px bg-[var(--color-primary)]" />
          {t('eyebrow')}
        </p>
        <h1 className="font-serif text-[3rem] lg:text-[3.4rem] font-bold text-white leading-[1.12] tracking-[-0.01em] mb-[22px]">
          {t('titleLine1')}<br />
          <em className="not-italic text-[#f5c6c0]">{t('titleEm')}</em>
        </h1>
        <p className="text-[0.92rem] text-white/50 leading-[1.85] mb-9 max-w-[340px]">
          {t('subtitle')}
        </p>
        <div className="flex max-w-[380px] border border-white/18 rounded-[3px] overflow-hidden">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="flex-1 bg-white/7 border-none outline-none text-white text-[0.88rem] px-4 py-3 placeholder:text-white/28"
          />
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-[0.82rem] font-semibold tracking-[0.06em] px-[22px] py-3 transition-colors whitespace-nowrap">
            {t('searchButton')}
          </button>
        </div>
      </div>

      {/* Right: photo collage (gradient placeholders) */}
      <div className="hidden lg:grid grid-cols-2 grid-rows-[2fr_1fr] gap-px">
        {/* Top full-width */}
        <div className="col-span-2 flex items-end bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40">🌸</div>
          <div className="relative z-10 w-full flex justify-between items-end px-4 pb-3"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
            <span className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-white/80">
              Tokyo — Asakusa, km 14
            </span>
          </div>
        </div>
        {/* Bottom left */}
        <div className="flex items-end bg-gradient-to-br from-[#1e1a2e] to-[#312870] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-40">🏯</div>
          <div className="relative z-10 w-full px-3 pb-2.5"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
            <span className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-white/80">Kyoto Marathon</span>
          </div>
        </div>
        {/* Bottom right */}
        <div className="flex items-end bg-gradient-to-br from-[#0a2a3a] to-[#0d4060] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-40">🌊</div>
          <div className="relative z-10 w-full flex justify-between items-end px-3 pb-2.5"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
            <span className="text-[0.65rem] font-semibold tracking-[0.1em] uppercase text-white/80">Hokkaido Marathon</span>
            <span className="text-[0.62rem] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-[2px] bg-[var(--color-primary)] text-white">
              Entry Open
            </span>
          </div>
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
