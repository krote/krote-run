import type { Race, Locale } from '@/lib/types';

interface DetailHeaderProps {
  race: Race;
  locale: Locale;
  raceName: string;
}

export default function DetailHeader({ race, locale, raceName }: DetailHeaderProps) {
  const tagline = locale === 'en' ? race.tagline_en : race.tagline_ja;
  const bgColor = race.motif_color ?? 'var(--color-primary)';

  return (
    <div
      className="relative overflow-hidden"
      style={{ minHeight: 280, background: bgColor }}
    >
      {/* Diagonal stripe overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
        }}
      />

      {/* Hero image */}
      {race.hero_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={race.hero_image_url}
          alt={race.hero_caption_ja ?? ''}
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      )}

      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-10 flex flex-col gap-3">
        {/* Motif + edition row */}
        <div className="flex items-center gap-3">
          {race.motif && (
            <span
              className="font-mono text-white/50 tracking-[0.2em] text-xs uppercase"
            >
              {race.motif}
            </span>
          )}
          {race.edition && (
            <span className="text-white/60 text-sm font-mono">
              第{race.edition}回
            </span>
          )}
        </div>

        {/* Race name */}
        <h1
          className="text-white font-serif leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-noto-serif-jp)' }}
        >
          {raceName}
        </h1>

        {/* Tagline */}
        {tagline && (
          <p
            data-testid="tagline"
            className="text-white/75 text-base font-light tracking-wide"
          >
            {tagline}
          </p>
        )}
      </div>
    </div>
  );
}
