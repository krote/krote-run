import type { Race, Locale } from '@/lib/types';
import { formatDate, getMainDistance } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

interface RaceCardProps {
  race: Race;
  locale: Locale;
}

const TERRAIN_ICONS: Record<string, string> = {
  road: '🛣️',
  trail: '🌲',
  track: '🏟️',
  mixed: '🗺️',
};

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
};

const LEVEL_LABELS: Record<string, { ja: string; en: string }> = {
  beginner: { ja: '初心者', en: 'Beginner' },
  intermediate: { ja: '中級', en: 'Intermediate' },
  advanced: { ja: '上級', en: 'Advanced' },
};

export default function RaceCard({ race, locale }: RaceCardProps) {
  const mainDistance = getMainDistance(race.distances);
  const today = new Date().toISOString().split('T')[0];
  const isPast = race.date < today;
  const isApplicationOpen =
    race.applicationPeriod &&
    today >= race.applicationPeriod.start &&
    today <= race.applicationPeriod.end;

  return (
    <article className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow ${isPast ? 'opacity-70' : ''}`}>
      {/* Card header accent */}
      <div className="h-1.5 bg-gradient-to-r from-primary to-primary-light" />

      <div className="p-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[race.level]}`}>
            {LEVEL_LABELS[race.level]?.[locale]}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {TERRAIN_ICONS[race.terrain]} {race.terrain}
          </span>
          {isPast && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">終了</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 line-clamp-2">
          {race.name}
        </h3>

        {/* Info */}
        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base">📅</span>
            <span>{formatDate(race.date, locale)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">📍</span>
            <span>{race.prefecture} {race.city}</span>
          </div>
          {mainDistance && (
            <div className="flex items-center gap-2">
              <span className="text-base">🏃</span>
              <span>
                {locale === 'ja' ? mainDistance.category : mainDistance.categoryEn}
                {' '}({mainDistance.distanceKm}km)
              </span>
            </div>
          )}
          {race.capacity && (
            <div className="flex items-center gap-2">
              <span className="text-base">👥</span>
              <span>{race.capacity.toLocaleString()}人</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {race.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {race.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 bg-primary-50 text-primary rounded">
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
          {race.website && isApplicationOpen && (
            <a
              href={race.website}
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
