import type { Race, Locale } from '@/lib/types';
import { formatDate, getMainCategory, getRaceName, getRaceCity, getRaceDescription } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface RaceCardExpProps {
  race: Race;
  locale: Locale;
}

export default function RaceCardExp({ race, locale }: RaceCardExpProps) {
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

  // Build experience highlights from available data
  const highlights: string[] = [];
  const ci = race.course_info;

  // First highlight: course highlights (first segment)
  const hlRaw = locale === 'en' ? ci.highlights_en : ci.highlights_ja;
  if (hlRaw) {
    const firstHl = hlRaw.split(/[、,]/)[0].trim();
    if (firstHl) highlights.push(firstHl);
  }

  // Second highlight: certification
  if (ci.certification.length > 0) {
    highlights.push(ci.certification.join(' & ') + (locale === 'en' ? ' certified' : ' 公認'));
  }

  // Third highlight: capacity or entry status
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

  // Fallback: use first tag
  if (highlights.length < 2 && race.tags.length > 0) {
    highlights.push(race.tags[0]);
  }

  const cityLabel = locale === 'en'
    ? `📍 ${getRaceCity(race, locale)}`
    : `📍 ${getRaceCity(race, locale)}`;

  // Short description for image overlay
  const desc = getRaceDescription(race, locale);
  const overlayText = desc.length > 72 ? desc.slice(0, 72).trimEnd() + '…' : desc;

  return (
    <article className="bg-white border border-[var(--color-border)] rounded-[10px] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all">
      {/* Image area with experience overlay */}
      <div className="h-[140px] flex items-center justify-center text-5xl relative overflow-hidden bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f]">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.6) 100%)' }} />
        <p className="absolute bottom-2.5 left-3 right-3 text-[0.71rem] font-medium text-white/92 leading-[1.45] z-10">
          {overlayText}
        </p>
      </div>

      {/* Body */}
      <div className="px-4 pt-3.5 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[0.72rem] text-[var(--color-light)]">{formatDate(race.date, locale)}</span>
          {mainCategory && (
            <span className="text-[0.68rem] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-cream)] text-[var(--color-mid)] border border-[var(--color-border)] tracking-[0.03em]">
              {mainCategory.distance_km} km
            </span>
          )}
        </div>

        <h3 className="text-[0.97rem] font-bold text-[var(--color-ink)] leading-[1.3] mb-1.5">
          {getRaceName(race, locale)}
        </h3>
        <p className="text-[0.75rem] text-[var(--color-mid)] mb-3">{cityLabel}</p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <ul className="space-y-[5px] mb-3.5">
            {highlights.slice(0, 3).map((hl, i) => (
              <li key={i} className="text-[0.76rem] text-[var(--color-ink2)] flex items-baseline gap-[7px]">
                <span className="text-[var(--color-primary)] font-bold text-[0.7rem] shrink-0">✓</span>
                {hl}
              </li>
            ))}
          </ul>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/races/${race.id}`}
            className="flex-1 text-center py-2 rounded-[6px] text-[0.78rem] font-semibold text-[var(--color-ink2)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors no-underline"
          >
            {t('viewRace')}
          </Link>
          {isEntryOpen && !isPast && race.official_url && (
            <a
              href={race.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-[6px] text-[0.78rem] font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors no-underline"
            >
              {t('enter')}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
