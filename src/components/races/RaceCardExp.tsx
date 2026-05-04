import type { Race, Locale } from '@/lib/types';
import { formatDate, getMainCategory, getRaceName, getRaceCity, getRaceDescription } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface RaceCardExpProps {
  race: Race;
  locale: Locale;
  from?: string;
}

export default function RaceCardExp({ race, locale, from }: RaceCardExpProps) {
  const t = useTranslations('home.card');
  const mainCategory = getMainCategory(race.categories);
  const today = new Date().toISOString().split('T')[0];
  const isPast = race.date < today;
  const periods = race.entry_periods ?? [];
  const isEntryOpen = periods.length > 0
    ? periods.some((p) => p.start_date <= today && p.end_date >= today)
    : (race.entry_start_date !== null &&
       race.entry_end_date !== null &&
       today >= race.entry_start_date &&
       today <= race.entry_end_date);

  const highlights: string[] = [];
  const ci = race.course_info;

  const hlRaw = locale === 'en' ? ci.highlights_en : ci.highlights_ja;
  if (hlRaw) {
    const firstHl = hlRaw.split(/[、,]/)[0].trim();
    if (firstHl) highlights.push(firstHl);
  }

  if (ci.certification.length > 0) {
    highlights.push(ci.certification.join(' & ') + (locale === 'en' ? ' certified' : ' 公認'));
  }

  if (isEntryOpen && !isPast) {
    highlights.push(locale === 'en' ? 'Entry open now' : 'エントリー受付中');
  } else if (!isPast && periods.length === 0 && !race.entry_start_date && !race.entry_end_date) {
    highlights.push(locale === 'en' ? 'TBA' : '未発表');
  } else if (race.entry_capacity > 0) {
    highlights.push(
      locale === 'en'
        ? `${race.entry_capacity.toLocaleString()} runners`
        : `定員 ${race.entry_capacity.toLocaleString()}人`
    );
  }

  if (highlights.length < 2 && race.tags.length > 0) {
    highlights.push(race.tags[0]);
  }

  const cityLabel = getRaceCity(race, locale);

  const desc = getRaceDescription(race, locale);
  const overlayText = desc.length > 72 ? desc.slice(0, 72).trimEnd() + '…' : desc;

  return (
    <article
      className="overflow-hidden hover:-translate-y-0.5 transition-all duration-200"
      style={{
        background: '#fff',
        border: '1px solid var(--color-border-soft)',
        borderRadius: 2,
        boxShadow: '0 1px 4px rgba(22,36,58,0.04)',
      }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 140,
          background: 'var(--color-primary)',
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(22,36,58,0.65) 100%)' }}
        />
        <p
          className="absolute bottom-3 left-3 right-3 z-10"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.71rem',
            color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.5,
          }}
        >
          {overlayText}
        </p>
      </div>

      {/* Body */}
      <div className="px-4 pt-3.5 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.14em',
              color: 'var(--color-primary)',
              textTransform: 'uppercase',
            }}
          >
            {formatDate(race.date, locale)}
          </span>
          {mainCategory && (
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                fontWeight: 600,
                padding: '2px 8px',
                background: 'var(--color-paper-warm)',
                color: 'var(--color-primary)',
                border: '1px solid var(--color-border-soft)',
                letterSpacing: '0.08em',
              }}
            >
              {mainCategory.distance_km} km
            </span>
          )}
        </div>

        <h3
          className="font-serif font-bold"
          style={{ fontSize: '0.97rem', color: 'var(--color-ink)', lineHeight: 1.3, marginBottom: 4 }}
        >
          {getRaceName(race, locale)}
        </h3>
        <p
          style={{
            fontSize: '0.72rem',
            color: 'var(--color-mid)',
            marginBottom: 12,
            fontStyle: 'italic',
            fontFamily: 'var(--font-serif)',
          }}
        >
          {cityLabel}
        </p>

        {highlights.length > 0 && (
          <ul className="space-y-[5px] mb-3.5">
            {highlights.slice(0, 3).map((hl, i) => (
              <li
                key={i}
                className="flex items-baseline gap-[7px]"
                style={{ fontSize: '0.76rem', color: 'var(--color-ink)' }}
              >
                <span
                  style={{
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {hl}
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-2">
          <Link
            href={from ? `/races/${race.id}?from=${from}` : `/races/${race.id}`}
            className="flex-1 text-center no-underline transition-colors"
            style={{
              padding: '8px 0',
              borderRadius: 2,
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--color-ink)',
              border: '1px solid var(--color-border)',
            }}
          >
            {t('viewRace')}
          </Link>
          {isEntryOpen && !isPast && race.official_url && (
            <a
              href={race.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline transition-colors"
              style={{
                padding: '8px 14px',
                borderRadius: 2,
                fontSize: '0.78rem',
                fontWeight: 600,
                background: 'var(--color-primary)',
                color: '#fff',
              }}
            >
              {t('enter')}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
