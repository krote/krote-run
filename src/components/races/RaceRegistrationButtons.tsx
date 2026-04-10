'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';

interface Props {
  raceId: string;
  raceName: string;
  raceDate: string;           // "YYYY-MM-DD"
  entryStartDate: string | null; // "YYYY-MM-DD" | null
  /** 今日の日付 "YYYY-MM-DD"（サーバー側で決定） */
  today: string;
}

interface UserRace {
  is_planning: boolean;
  entry_reminder: boolean;
}

export default function RaceRegistrationButtons({
  raceId,
  raceName,
  raceDate,
  entryStartDate,
  today,
}: Props) {
  const { data: session, isPending } = useSession();
  const [reg, setReg] = useState<UserRace | null>(null);
  const [loading, setLoading] = useState(false);

  // 受付開始前日リマインドは entry_start_date が今日以降の場合のみ有効
  const entryReminderAvailable =
    entryStartDate !== null && entryStartDate >= today;

  useEffect(() => {
    if (!session) { setReg(null); return; }
    fetch(`/api/user/races/${raceId}`)
      .then((r) => r.json())
      .then((data: UserRace | null) => setReg(data))
      .catch(() => setReg(null));
  }, [session, raceId]);

  if (isPending) return null;
  if (!session) return null;

  async function patch(updates: Partial<UserRace>) {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/races/${raceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updates,
          race_name: raceName,
          race_date: raceDate,
          entry_start_date: entryStartDate,
        }),
      });
      const updated: UserRace = await res.json();
      setReg(updated);
    } finally {
      setLoading(false);
    }
  }

  const isPlanning = reg?.is_planning ?? false;
  const hasEntryReminder = reg?.entry_reminder ?? false;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {/* 参加予定ボタン */}
      <button
        onClick={() => patch({ is_planning: !isPlanning })}
        disabled={loading}
        className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-[3px] transition-colors disabled:opacity-50 ${
          isPlanning
            ? 'text-white'
            : 'hover:bg-[var(--color-cream)]'
        }`}
        style={
          isPlanning
            ? { background: 'var(--color-ink)', border: '1px solid var(--color-ink)' }
            : { border: '1px solid var(--color-border)', color: 'var(--color-ink2)' }
        }
      >
        <span>{isPlanning ? '✓' : '+'}</span>
        参加予定
      </button>

      {/* 受付開始前日リマインドボタン */}
      {entryReminderAvailable && (
        <button
          onClick={() => patch({ entry_reminder: !hasEntryReminder })}
          disabled={loading}
          className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-[3px] transition-colors disabled:opacity-50 ${
            hasEntryReminder
              ? 'text-white'
              : 'hover:bg-[var(--color-cream)]'
          }`}
          style={
            hasEntryReminder
              ? { background: 'var(--color-primary)', border: '1px solid var(--color-primary)' }
              : { border: '1px solid var(--color-border)', color: 'var(--color-ink2)' }
          }
        >
          <span>🔔</span>
          受付開始リマインド{hasEntryReminder ? '済' : ''}
        </button>
      )}
    </div>
  );
}
