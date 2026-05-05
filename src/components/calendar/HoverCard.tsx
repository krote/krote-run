'use client';

import type { Race, Locale } from '@/lib/types';
import { formatDate, getMainCategory } from '@/lib/utils';

interface HoverCardProps {
  race: Race | null;
  locale: Locale;
  position: { x: number; y: number };
}

export default function HoverCard({ race, locale, position }: HoverCardProps) {
  if (!race) return null;

  const isJa = locale === 'ja';
  const name = isJa ? race.name_ja : (race.name_en ?? race.name_ja);
  const city = isJa ? race.city_ja : race.city_en;
  const mainCategory = getMainCategory(race.categories);

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: position.x + 12,
        top: position.y + 12,
        minWidth: 200,
        maxWidth: 280,
      }}
    >
      <div
        className="rounded-[4px] p-3 shadow-lg"
        style={{
          background: 'white',
          border: '1px solid var(--color-border)',
        }}
      >
        <p className="font-semibold text-sm leading-snug mb-1" style={{ color: 'var(--color-ink)' }}>
          {name}
        </p>
        <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
          📅 {formatDate(race.date, locale)}
        </p>
        <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
          📍 {city}
        </p>
        {mainCategory && (
          <p className="text-xs" style={{ color: 'var(--color-mid)' }}>
            🏃 {mainCategory.distance_km}km
          </p>
        )}
      </div>
    </div>
  );
}
