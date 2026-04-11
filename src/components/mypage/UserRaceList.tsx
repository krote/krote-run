'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { Link } from '@/i18n/navigation';

interface UserRaceRow {
  id: string;
  race_id: string;
  is_planning: boolean;
  planning_category_id: number | null;
  entry_reminder_period_ids: string; // JSON
  gcal_race_event_id: string | null;
  gcal_entry_event_ids: string; // JSON
  created_at: string;
}

interface CategoryInfo {
  id: number;
  name_ja: string | null;
  distance_km: number;
  distance_type: string;
}

interface RaceInfo {
  id: string;
  name_ja: string;
  full_name_ja: string | null;
  date: string;
  categories: CategoryInfo[];
}

function getCatLabel(cat: CategoryInfo): string {
  return cat.name_ja ?? `${cat.distance_km}km`;
}

export default function UserRaceList() {
  const { data: session } = useSession();
  const [rows, setRows] = useState<UserRaceRow[]>([]);
  const [raceMap, setRaceMap] = useState<Map<string, RaceInfo>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    setLoading(true);
    const load = async () => {
      try {
        const [userRacesRes, racesIndexRes] = await Promise.all([
          fetch('/api/user/races'),
          fetch('/api/races/index'),
        ]);
        const data: UserRaceRow[] = await userRacesRes.json();
        setRows(data);
        if (racesIndexRes.ok) {
          const races: RaceInfo[] = await racesIndexRes.json();
          setRaceMap(new Map(races.map((r) => [r.id, r])));
        }
      } catch {
        // 無視
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [session]);

  if (!session) return null;
  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="h-14 bg-gray-100 rounded" />
        ))}
      </div>
    );
  }

  const planning = rows.filter((r) => r.is_planning);
  const reminders = rows.filter((r) => {
    const ids: number[] = (() => { try { return JSON.parse(r.entry_reminder_period_ids ?? '[]'); } catch { return []; } })();
    return ids.length > 0 && !r.is_planning;
  });

  if (rows.length === 0) {
    return (
      <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
        登録している大会はありません。
      </p>
    );
  }

  function RaceItem({ row, badge }: { row: UserRaceRow; badge?: React.ReactNode }) {
    const race = raceMap.get(row.race_id);
    const name = race ? (race.full_name_ja ?? race.name_ja) : row.race_id;

    // 参加予定カテゴリ
    const cat = race?.categories?.find((c) => c.id === row.planning_category_id);

    // リマインド設定済み期間数
    const reminderIds: number[] = (() => { try { return JSON.parse(row.entry_reminder_period_ids ?? '[]'); } catch { return []; } })();

    return (
      <div className="flex items-center justify-between py-3 border-b border-[var(--color-border)] last:border-0">
        <div className="flex-1 min-w-0">
          <Link
            href={`/races/${row.race_id}`}
            className="text-sm font-medium no-underline hover:underline"
            style={{ color: 'var(--color-ink)' }}
          >
            {name}
          </Link>
          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            {race && (
              <span className="text-xs" style={{ color: 'var(--color-mid)' }}>
                {race.date}
              </span>
            )}
            {cat && row.is_planning && (
              <span
                className="text-xs px-2 py-0.5 rounded-[3px] font-medium"
                style={{ background: 'var(--color-cream)', color: 'var(--color-ink2)', border: '1px solid var(--color-border)' }}
              >
                {getCatLabel(cat)} · {cat.distance_km}km
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          {badge}
          {reminderIds.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-[3px]"
              style={{ background: '#fef3c7', color: '#92400e' }}>
              🔔 リマインド{reminderIds.length > 1 ? `×${reminderIds.length}` : ''}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {planning.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-mid)' }}>
            参加予定
          </p>
          <div>
            {planning.map((row) => (
              <RaceItem key={row.id} row={row} />
            ))}
          </div>
        </div>
      )}

      {reminders.length > 0 && (
        <div>
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-mid)' }}>
            受付開始リマインドのみ
          </p>
          <div>
            {reminders.map((row) => (
              <RaceItem key={row.id} row={row} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
