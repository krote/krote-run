import type { Race, Locale } from '@/lib/types';
import { formatDate, getMainCategory, getCategoryLabel, getRaceName, getRaceCity } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface RaceCardProps {
  race: Race;
  locale: Locale;
}

export default function RaceCard({ race, locale }: RaceCardProps) {
  const mainCategory = getMainCategory(race.categories);
  const today = new Date().toISOString().split('T')[0];
  const isPast = race.date < today;
  const isEntryOpen = today >= race.entry_start_date && today <= race.entry_end_date;

  return (
    <article className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow ${isPast ? 'opacity-70' : ''}`}>
      {/* Card header accent */}
      <div className="h-1.5 bg-gradient-to-r from-primary to-primary-light" />

      <div className="p-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {mainCategory && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary font-medium">
              {getCategoryLabel(mainCategory, locale)}
            </span>
          )}
          {isPast && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">終了</span>
          )}
          {isEntryOpen && !isPast && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
              {locale === 'ja' ? 'エントリー受付中' : 'Entry Open'}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 line-clamp-2">
          {getRaceName(race, locale)}
        </h3>

        {/* Info */}
        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base">📅</span>
            <span>{formatDate(race.date, locale)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">📍</span>
            <span>{getRaceCity(race, locale)}</span>
          </div>
          {mainCategory && (
            <div className="flex items-center gap-2">
              <span className="text-base">🏃</span>
              <span>{mainCategory.distance_km}km</span>
            </div>
          )}
          {race.entry_capacity > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-base">👥</span>
              <span>{race.entry_capacity.toLocaleString()}人</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {race.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {race.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/races/${race.id}`}
            className="flex-1 text-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            {locale === 'ja' ? '詳細を見る' : 'View Details'}
          </Link>
          {race.official_url && isEntryOpen && (
            <a
              href={race.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
            >
              {locale === 'ja' ? 'エントリー' : 'Apply'}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
