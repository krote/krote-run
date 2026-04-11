'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from '@/lib/auth-client';

interface CategoryInfo {
  id: number;
  name_ja: string | null;
  name_en: string | null;
  distance_km: number;
  distance_type: string;
}

interface EntryPeriodInfo {
  id: number;
  label_ja: string;
  label_en: string;
  start_date: string; // "YYYY-MM-DD"
}

interface Props {
  raceId: string;
  raceName: string;
  raceDate: string;       // "YYYY-MM-DD"
  categories: CategoryInfo[];
  entryPeriods: EntryPeriodInfo[];
  today: string;          // "YYYY-MM-DD"
}

interface UserRaceState {
  is_planning: boolean;
  planning_category_id: number | null;
  entry_reminder_period_ids: string; // JSON
}

// ─── Google Calendar URL ────────────────────────────────────────────────────

function toGCalDate(isoDate: string): string {
  return isoDate.replace(/-/g, '');
}

function toGCalDateNext(isoDate: string): string {
  const d = new Date(isoDate + 'T00:00:00');
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

function buildGCalUrl(text: string, date: string, details?: string): string {
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', text);
  url.searchParams.set('dates', `${toGCalDate(date)}/${toGCalDateNext(date)}`);
  if (details) url.searchParams.set('details', details);
  return url.toString();
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getCatLabel(cat: CategoryInfo): string {
  return cat.name_ja ?? `${cat.distance_km}km`;
}

function parseReminderIds(json: string): number[] {
  try { return JSON.parse(json) as number[]; } catch { return []; }
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function RaceRegistrationButtons({
  raceId,
  raceName,
  raceDate,
  categories,
  entryPeriods,
}: Props) {
  const { data: session, isPending } = useSession();
  const [reg, setReg] = useState<UserRaceState | null>(null);
  const [loading, setLoading] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);
  const reminderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session) { setReg(null); return; }
    fetch(`/api/user/races/${raceId}`)
      .then((r) => r.json())
      .then((data) => setReg(data as UserRaceState | null))
      .catch(() => setReg(null));
  }, [session, raceId]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
      if (reminderRef.current && !reminderRef.current.contains(e.target as Node)) setReminderOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (isPending || !session) return null;

  const reminderPeriodIds = parseReminderIds(reg?.entry_reminder_period_ids ?? '[]');

  async function patch(updates: Partial<{ is_planning: boolean; planning_category_id: number | null; entry_reminder_period_ids: number[] }>) {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/races/${raceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updated: UserRaceState = await res.json();
      setReg(updated);
      return updated;
    } finally {
      setLoading(false);
    }
  }

  function isGcalAutoOpen(): boolean {
    try { return localStorage.getItem('hashiru_gcal_auto_open') !== 'false'; } catch { return true; }
  }

  async function handlePlanningSelect(categoryId: number | null) {
    setCatOpen(false);
    const isPlanning = categoryId !== null;
    await patch({ is_planning: isPlanning, planning_category_id: isPlanning ? categoryId : null });
    // 登録時のみGoogleカレンダーを開く（設定がONの場合）
    if (isPlanning && isGcalAutoOpen()) {
      window.open(
        buildGCalUrl(`🏃 ${raceName}`, raceDate, 'HASHIRUから登録した参加予定\n\n※ カレンダー上で「通知を追加」から前日リマインダーの設定をおすすめします'),
        '_blank',
        'noopener,noreferrer',
      );
    }
  }

  async function toggleReminder(periodId: number) {
    const isAdding = !reminderPeriodIds.includes(periodId);
    const next = isAdding
      ? [...reminderPeriodIds, periodId]
      : reminderPeriodIds.filter((id) => id !== periodId);
    await patch({ entry_reminder_period_ids: next });
    // 登録時のみGoogleカレンダーを開く（設定がONの場合）
    if (isAdding && isGcalAutoOpen()) {
      const period = entryPeriods.find((p) => p.id === periodId);
      if (period) {
        window.open(
          buildGCalUrl(
            `📋 ${raceName} エントリー開始（${period.label_ja}）`,
            period.start_date,
            'HASHIRUから登録したエントリーリマインダー\n\n※ カレンダー上で「通知を追加」から前日リマインダーの設定をおすすめします',
          ),
          '_blank',
          'noopener,noreferrer',
        );
      }
    }
  }

  const isPlanning = reg?.is_planning ?? false;
  const plannedCatId = reg?.planning_category_id ?? null;
  const plannedCat = categories.find((c) => c.id === plannedCatId);
  const hasReminders = reminderPeriodIds.length > 0;

  // ボタン共通スタイル（ダーク背景対応）
  const baseBtn = `flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-[3px] transition-colors disabled:opacity-40`;
  const inactiveStyle = {
    border: '1.5px solid rgba(255,255,255,0.4)',
    color: 'rgba(255,255,255,0.85)',
    background: 'rgba(255,255,255,0.06)',
  };
  const planActiveStyle = { border: '1.5px solid white', color: 'var(--color-ink)', background: 'white' };
  const reminderActiveStyle = { border: '1.5px solid var(--color-primary)', color: 'white', background: 'var(--color-primary)' };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-2">

        {/* ── 参加予定ボタン ── */}
        <div ref={catRef} className="relative">
          {categories.length <= 1 ? (
            <button
              onClick={() => handlePlanningSelect(isPlanning ? null : (categories[0]?.id ?? null))}
              disabled={loading}
              className={baseBtn}
              style={isPlanning ? planActiveStyle : inactiveStyle}
            >
              <span>{isPlanning ? '✓' : '+'}</span>
              <span>参加予定</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => { if (!isPlanning) { setCatOpen((v) => !v); } else { handlePlanningSelect(null); } }}
                disabled={loading}
                className={`${baseBtn} pr-3`}
                style={isPlanning ? planActiveStyle : inactiveStyle}
              >
                {isPlanning ? (
                  <>
                    <span>✓</span>
                    <span>{plannedCat ? getCatLabel(plannedCat) : '参加予定'}</span>
                    <span
                      className="ml-1 text-xs opacity-60 hover:opacity-100"
                      onClick={(e) => { e.stopPropagation(); setCatOpen((v) => !v); }}
                      role="button"
                      aria-label="カテゴリ変更"
                    >▾</span>
                  </>
                ) : (
                  <>
                    <span>+</span>
                    <span>参加予定</span>
                    <span className="ml-1 text-xs opacity-70">▾</span>
                  </>
                )}
              </button>
              {catOpen && (
                <div
                  className="absolute top-full left-0 mt-1 z-50 rounded-[4px] overflow-hidden shadow-lg min-w-[180px]"
                  style={{ background: 'white', border: '1px solid var(--color-border)' }}
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handlePlanningSelect(cat.id)}
                      className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-cream)]"
                      style={{
                        color: cat.id === plannedCatId ? 'var(--color-primary)' : 'var(--color-ink)',
                        fontWeight: cat.id === plannedCatId ? 600 : 400,
                      }}
                    >
                      {cat.id === plannedCatId && <span className="mr-1.5">✓</span>}
                      {getCatLabel(cat)}
                      <span className="ml-1.5 text-xs" style={{ color: 'var(--color-mid)' }}>
                        {cat.distance_km}km
                      </span>
                    </button>
                  ))}
                  {isPlanning && (
                    <>
                      <hr style={{ borderColor: 'var(--color-border)' }} />
                      <button
                        onClick={() => handlePlanningSelect(null)}
                        className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--color-cream)]"
                        style={{ color: 'var(--color-mid)' }}
                      >
                        登録を解除
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── 受付開始リマインドボタン ── */}
        {entryPeriods.length > 0 && (
          <div ref={reminderRef} className="relative">
            {entryPeriods.length === 1 ? (
              <button
                onClick={() => toggleReminder(entryPeriods[0].id)}
                disabled={loading}
                className={baseBtn}
                style={hasReminders ? reminderActiveStyle : inactiveStyle}
              >
                <span>🔔</span>
                <span>受付開始リマインド{hasReminders ? '済' : ''}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setReminderOpen((v) => !v)}
                  disabled={loading}
                  className={`${baseBtn} pr-3`}
                  style={hasReminders ? reminderActiveStyle : inactiveStyle}
                >
                  <span>🔔</span>
                  <span>受付開始リマインド</span>
                  {hasReminders && (
                    <span
                      className="ml-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,255,255,0.3)' }}
                    >
                      {reminderPeriodIds.length}
                    </span>
                  )}
                  <span className="ml-1 text-xs opacity-70">▾</span>
                </button>
                {reminderOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 z-50 rounded-[4px] overflow-hidden shadow-lg min-w-[220px]"
                    style={{ background: 'white', border: '1px solid var(--color-border)' }}
                  >
                    {entryPeriods.map((period) => {
                      const active = reminderPeriodIds.includes(period.id);
                      return (
                        <button
                          key={period.id}
                          onClick={() => toggleReminder(period.id)}
                          className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors hover:bg-[var(--color-cream)]"
                          style={{ color: 'var(--color-ink)' }}
                        >
                          <span
                            className="w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0 text-xs"
                            style={{
                              background: active ? 'var(--color-primary)' : 'transparent',
                              border: `1.5px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
                              color: 'white',
                            }}
                          >
                            {active && '✓'}
                          </span>
                          <span>{period.label_ja}</span>
                          <span className="ml-auto text-xs shrink-0" style={{ color: 'var(--color-mid)' }}>
                            {period.start_date.slice(5).replace('-', '/')}〜
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* 解除時の案内 */}
      {(isPlanning || hasReminders) && (
        <p className="mt-2 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Googleカレンダーへの追加はご自身で保存してください。解除してもカレンダーからは自動削除されません。
        </p>
      )}
    </div>
  );
}
