import type { Race, Locale } from '@/lib/types';

interface OverviewSectionProps {
  race: Race;
  locale: Locale;
}

export default function OverviewSection({ race, locale }: OverviewSectionProps) {
  const description =
    locale === 'en' ? (race.description_en || race.description_ja) : race.description_ja;

  if (!description && race.tags.length === 0) return null;

  return (
    <section id="overview">
      {race.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {race.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded-[3px]"
              style={{
                background: 'var(--color-cream)',
                color: 'var(--color-ink2)',
                border: '1px solid var(--color-border)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {description && (
        <p
          className="text-base leading-relaxed whitespace-pre-line"
          style={{ color: 'var(--color-ink2)' }}
        >
          {description}
        </p>
      )}
    </section>
  );
}
