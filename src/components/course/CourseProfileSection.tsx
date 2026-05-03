'use client';

import { useEffect, useState } from 'react';
import type { CourseProfile } from '@/lib/types';
import CourseMapLoader from './CourseMapLoader';
import ElevationChartLoader from './ElevationChartLoader';

interface Props {
  /** GPXファイル名（例: "nagano-marathon-2026-full.gpx"）またはレースID（拡張子なし）を渡す。拡張子は自動除去 */
  profileKey: string;
  locale: string;
}

export default function CourseProfileSection({ profileKey, locale }: Props) {
  const [profile, setProfile] = useState<CourseProfile | null>(null);
  const [error, setError] = useState(false);

  // 拡張子を除去してプロフィールJSONのキーを導出
  const stem = profileKey.replace(/\.[^.]+$/, '');

  useEffect(() => {
    let ignore = false;

    fetch(`/course-profiles/${stem}.json`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json() as Promise<CourseProfile>;
      })
      .then((data) => { if (!ignore) setProfile(data); })
      .catch(() => { if (!ignore) setError(true); });

    return () => { ignore = true; };
  }, [stem]);

  if (error) return null;

  if (!profile) {
    return (
      <div className="space-y-3">
        <div className="h-64 rounded-[4px] animate-pulse" style={{ background: 'var(--color-border)' }} />
        <div className="h-48 rounded-[4px] animate-pulse" style={{ background: 'var(--color-border)' }} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* 地図 */}
      <CourseMapLoader courseProfile={profile} />

      {/* 高低差チャート */}
      <ElevationChartLoader data={profile.points} />

      {/* サマリー */}
      <div className="flex flex-wrap gap-4 text-sm pt-1">
        <div>
          <span style={{ color: 'var(--color-mid)' }}>
            {locale === 'ja' ? '獲得標高' : 'Elevation gain'}
          </span>
          <span className="ml-2 font-semibold">+{profile.total_elevation_gain_m}m</span>
        </div>
        <div>
          <span style={{ color: 'var(--color-mid)' }}>
            {locale === 'ja' ? '損失標高' : 'Elevation loss'}
          </span>
          <span className="ml-2 font-semibold">-{profile.total_elevation_loss_m}m</span>
        </div>
        {profile.distance_km > 0 && (
          <div>
            <span style={{ color: 'var(--color-mid)' }}>
              {locale === 'ja' ? 'GPX距離' : 'GPS distance'}
            </span>
            <span className="ml-2 font-semibold">{profile.distance_km}km</span>
          </div>
        )}
      </div>
    </div>
  );
}
