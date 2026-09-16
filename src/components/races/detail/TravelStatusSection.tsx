'use client';

import type { Race, Locale } from '@/lib/types';
import { calcDayTripStatus } from '@/lib/travel';
import { getArrivalDeadline } from '@/lib/reception';
import { useTravelSettings } from '@/lib/hooks/useTravelSettings';
import { HUBS } from '@/lib/hubs';
import DayTripBadge from '../DayTripBadge';

interface TravelStatusSectionProps {
  race: Race;
  locale: Locale;
}

/** JST の日付+時刻文字列から Unix 秒（Google Maps の arrival_time パラメータ用）を計算する */
function toArrivalTimestamp(dateStr: string, timeStr: string): number | null {
  const d = new Date(`${dateStr}T${timeStr}:00+09:00`);
  const ms = d.getTime();
  return Number.isNaN(ms) ? null : Math.floor(ms / 1000);
}

/** Google Maps 経路ディープリンク（API不使用）を組み立てる */
function buildGoogleMapsUrl(race: Race, hubId: string, nearestStation: string, locale: Locale): string | null {
  const destination = race.venue_address
    ?? (race.start_lat != null && race.start_lng != null ? `${race.start_lat},${race.start_lng}` : null);
  if (!destination) return null;

  const hub = HUBS[hubId as keyof typeof HUBS];
  const origin = nearestStation.trim() || (hub ? (locale === 'ja' ? hub.name_ja : hub.name_en) : '');
  if (!origin) return null;

  const params = new URLSearchParams({
    api: '1',
    origin,
    destination,
    travelmode: 'transit',
  });

  const deadline = getArrivalDeadline(race);
  if (deadline) {
    const ts = toArrivalTimestamp(race.date, deadline);
    if (ts !== null) params.set('arrival_time', String(ts));
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/**
 * 大会詳細ページ用の前泊ステータス表示。
 * travelSettings（localStorage）が未設定のユーザーには何も表示しない。
 */
export default function TravelStatusSection({ race, locale }: TravelStatusSectionProps) {
  const { settings } = useTravelSettings();

  if (!settings) return null;

  const travelMinutes = race.travel_times?.find((t) => t.hub_id === settings.hubId)?.duration_minutes ?? null;
  const status = calcDayTripStatus(race, travelMinutes, settings);

  if (status.status === 'unknown' && status.reason === 'no_start_time') return null;

  const mapsUrl = buildGoogleMapsUrl(race, settings.hubId, settings.nearestStation, locale);

  return (
    <div
      className="p-4 rounded-[4px] flex flex-col gap-2"
      style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
    >
      <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-mid)' }}>
        {locale === 'ja' ? '前泊判定' : 'Overnight Stay Check'}
      </p>
      <DayTripBadge status={status} locale={locale} />
      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold underline w-fit"
          style={{ color: 'var(--color-primary)' }}
        >
          {locale === 'ja' ? 'Googleマップで経路を見る' : 'View route on Google Maps'}
        </a>
      )}
    </div>
  );
}
