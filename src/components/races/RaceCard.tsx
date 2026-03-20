import type { Race, Locale } from '@/lib/types';
import { formatDate, getMainCategory, getRaceName, getRaceCity, getRaceDescription } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface RaceCardProps {
  race: Race;
  locale: Locale;
}

function timeLimitLabel(minutes: number, locale: Locale): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (locale === 'en') return m === 0 ? `${h}h 00m` : `${h}h ${m}m`;
  return m === 0 ? `${h}時間` : `${h}時間${m}分`;
}

export default function RaceCard({ race, locale }: RaceCardProps) {
  const t = useTranslations('home.card');
  const mainCategory = getMainCategory(race.categories);
  const today = new Date().toISOString().split('T')[0];
  const isPast = race.date < today;
  const isEntryOpen =
    race.entry_start_date !== null &&
    race.entry_end_date !== null &&
    today >= race.entry_start_date &&
    today <= race.entry_end_date;

  const desc = getRaceDescription(race, locale);
  const tagline = desc.length > 88 ? desc.slice(0, 88).trimEnd() + '…' : desc;

  const locationLabel = locale === 'en'
    ? `${getRaceCity(race, locale)}`
    : `${getRaceCity(race, locale)}`;

  return (
    <article className="bg-white rounded-[2px] overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow">
      {/* Gradient image placeholder */}
      <div className="h-[150px] flex items-center justify-center text-5xl relative overflow-hidden bg-gradient-to-br from-[#1a3a2a] to-[#2d6a4f]">
        <div className="absolute inset-0 flex items-end justify-between p-3.5 pb-2.5"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)' }}>
          <span className="text-[0.64rem] font-semibold tracking-[0.1em] uppercase text-white/80">
            {locationLabel}
          </span>
          {!isPast && isEntryOpen && (
            <span className="text-[0.62rem] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-[2px] bg-[var(--color-primary)] text-white">
              {t('entryOpen')}
            </span>
          )}
          {isPast && (
            <span className="text-[0.62rem] font-bold tracking-[0.06em] uppercase px-2 py-0.5 rounded-[2px] bg-white/20 text-white/85">
              {t('closed')}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-[18px] pb-5">
        <div className="text-[0.72rem] text-[var(--color-light)] mb-1.5 tracking-[0.04em]">
          {formatDate(race.date, locale)}
        </div>
        <h3 className="font-serif text-[1.05rem] font-bold text-[var(--color-ink)] leading-[1.3] mb-2">
          {getRaceName(race, locale)}
        </h3>
        <p className="text-[0.78rem] text-[var(--color-mid)] leading-[1.65] mb-3.5 italic">
          &ldquo;{tagline}&rdquo;
        </p>

        {/* Stats */}
        {mainCategory && (
          <div className="flex gap-4 py-3 border-t border-b border-[var(--color-border)] mb-3.5">
            <div className="flex flex-col gap-px">
              <span className="text-[0.88rem] font-semibold text-[var(--color-ink)]">{mainCategory.distance_km}km</span>
              <span className="text-[0.63rem] text-[var(--color-light)] tracking-[0.05em] uppercase">{t('distance')}</span>
            </div>
            {mainCategory.time_limit_minutes > 0 && (
              <div className="flex flex-col gap-px">
                <span className="text-[0.88rem] font-semibold text-[var(--color-ink)]">{timeLimitLabel(mainCategory.time_limit_minutes, locale)}</span>
                <span className="text-[0.63rem] text-[var(--color-light)] tracking-[0.05em] uppercase">{t('timeLimit')}</span>
              </div>
            )}
            {race.entry_capacity > 0 && (
              <div className="flex flex-col gap-px">
                <span className="text-[0.88rem] font-semibold text-[var(--color-ink)]">{race.entry_capacity.toLocaleString()}</span>
                <span className="text-[0.63rem] text-[var(--color-light)] tracking-[0.05em] uppercase">{t('runners')}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/races/${race.id}`}
            className="flex-1 text-center py-[9px] text-[0.78rem] font-semibold text-[var(--color-ink)] border border-[var(--color-border)] hover:border-[var(--color-ink)] transition-colors no-underline tracking-[0.04em]"
          >
            {t('viewDetails')}
          </Link>
          {isEntryOpen && !isPast && race.official_url && (
            <a
              href={race.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-[9px] text-[0.78rem] font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors no-underline tracking-[0.04em]"
            >
              {t('enter')}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
