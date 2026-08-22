'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { derivePerformanceBucket, getPerformanceBucketMessageKey } from '@/lib/performance';
import type { RaceResultStatus } from '@/lib/types';

// ─── 型 ────────────────────────────────────────────────────────────────────

interface Category {
  id: number;
  name_ja: string;
  distance_km: number;
  distance_type: string;
}

interface ResultRow {
  id: string;
  user_race_id: string;
  category_id: number | null;
  status: RaceResultStatus;
  finish_time_sec: number | null;
  note: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  raceId: string;
  raceDate: string; // YYYY-MM-DD
  categories: Category[];
}

// ─── ユーティリティ ─────────────────────────────────────────────────────────

/** "h:mm:ss" または "m:ss" → 秒。不正な場合は null */
export function parseTimeToSec(input: string): number | null {
  const parts = input.trim().split(':').map(Number);
  if (parts.some(isNaN)) return null;
  if (parts.length === 3) {
    const [h, m, s] = parts;
    if (m >= 60 || s >= 60) return null;
    return h * 3600 + m * 60 + s;
  }
  if (parts.length === 2) {
    const [m, s] = parts;
    if (s >= 60) return null;
    return m * 60 + s;
  }
  return null;
}

/** 秒 → "h:mm:ss" */
export function secToTimeStr(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function RaceResultSection({ raceId, raceDate, categories }: Props) {
  const t = useTranslations('gear');

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());

  // 大会前は非表示
  if (raceDate >= today) return null;

  return <RaceResultContent raceId={raceId} categories={categories} t={t} />;
}

function RaceResultContent({
  raceId,
  categories,
  t,
}: {
  raceId: string;
  categories: Category[];
  t: (key: string) => string;
}) {
  const tGlobal = useTranslations();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [result, setResult] = useState<ResultRow | null>(null);
  const [editing, setEditing] = useState(false);

  // フォーム状態
  const [status, setStatus] = useState<RaceResultStatus | ''>('');
  const [timeStr, setTimeStr] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [note, setNote] = useState('');
  const [timeError, setTimeError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/user/races/${raceId}/result`);
      const data: ResultRow | null = res.ok ? await res.json() : null;
      setResult(data);
      if (data) {
        setStatus(data.status);
        setTimeStr(data.finish_time_sec != null ? secToTimeStr(data.finish_time_sec) : '');
        setCategoryId(data.category_id ?? '');
        setNote(data.note);
      }
    } catch {
      // ignore
    } finally {
      setLoaded(true);
    }
  }, [raceId]);

  const handleToggle = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen && !loaded) void load();
    if (!nextOpen) setEditing(false);
  };

  const handleSave = async () => {
    setTimeError('');
    setSaveError('');

    let finish_time_sec: number | undefined;
    if (status === 'finished') {
      const sec = parseTimeToSec(timeStr);
      if (sec === null || sec < 1 || sec > 172800) {
        setTimeError(t('raceResultInvalidTime'));
        return;
      }
      finish_time_sec = sec;
    }

    setSaving(true);
    setSaved(false);
    try {
      const body: Record<string, unknown> = { status };
      if (finish_time_sec !== undefined) body.finish_time_sec = finish_time_sec;
      if (categoryId !== '') body.category_id = categoryId;
      if (note) body.note = note;

      const res = await fetch(`/api/user/races/${raceId}/result`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const updated: ResultRow = await res.json();
        setResult(updated);
        setEditing(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } else {
        setSaveError(t('raceResultSaveError'));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(t('raceResultDeleteConfirm'))) return;
    const res = await fetch(`/api/user/races/${raceId}/result`, { method: 'DELETE' });
    if (res.ok || res.status === 204) {
      setResult(null);
      setStatus('');
      setTimeStr('');
      setCategoryId('');
      setNote('');
      setEditing(false);
    }
  };

  const toggleButton = (
    <button
      onClick={handleToggle}
      className="text-xs px-2 py-0.5 rounded-[3px] font-medium transition-colors"
      style={{
        background: open ? 'var(--color-primary)' : 'var(--color-cream)',
        color: open ? '#fff' : 'var(--color-ink2)',
        border: '1px solid var(--color-border)',
      }}
    >
      {t('raceResultButton')}
    </button>
  );

  if (!open) return toggleButton;

  if (!loaded) {
    return (
      <div className="w-full">
        {toggleButton}
        <div className="mt-2 animate-pulse h-10 bg-gray-100 rounded" />
      </div>
    );
  }

  // 走力帯の計算
  const bucket = (() => {
    if (!result || result.status !== 'finished' || result.finish_time_sec == null) return null;
    const cat = categories.find((c) => c.id === result.category_id) ?? categories[0];
    if (!cat) return null;
    return derivePerformanceBucket(cat.distance_type, result.finish_time_sec);
  })();

  const showForm = !result || editing;

  return (
    <div className="w-full">
      {toggleButton}
      <div
        className="mt-2 rounded-lg p-3"
        style={{ border: '1px solid var(--color-border)', background: 'var(--color-cream)' }}
      >
        {/* 記録済み表示 */}
        {result && !editing && (
          <div className="mb-2">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-xs font-medium">
                {result.status === 'finished' && result.finish_time_sec != null
                  ? secToTimeStr(result.finish_time_sec)
                  : result.status.toUpperCase()}
              </span>
              {bucket && (
                <span
                  className="text-xs px-2 py-0.5 rounded-[3px] font-medium"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  {t('raceResultBucketLabel')}: {tGlobal(getPerformanceBucketMessageKey(bucket))}
                </span>
              )}
            </div>
            {result.note && (
              <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>{result.note}</p>
            )}
            <p className="text-xs mb-2" style={{ color: 'var(--color-mid)' }}>
              {t('raceResultBucketNote')}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { setEditing(true); setSaved(false); }}
                className="text-xs px-2 py-1 rounded border"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-ink2)', background: '#fff' }}
              >
                {t('raceResultEdit')}
              </button>
              <button
                onClick={handleDelete}
                className="text-xs px-2 py-1 rounded"
                style={{ color: 'var(--color-mid)' }}
              >
                {t('raceResultDelete')}
              </button>
            </div>
          </div>
        )}

        {/* 入力フォーム */}
        {showForm && (
          <div className="space-y-2">
            {/* ステータス選択 */}
            <div>
              <p className="text-xs font-semibold mb-1">{t('raceResultStatus')}</p>
              <div className="flex gap-2 flex-wrap">
                {(['finished', 'dnf', 'dns'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatus(s); setTimeError(''); }}
                    className="text-xs px-2 py-1 rounded-[3px] border"
                    style={{
                      background: status === s ? 'var(--color-primary)' : '#fff',
                      color: status === s ? '#fff' : 'var(--color-ink2)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    {t(`raceResult${s.charAt(0).toUpperCase() + s.slice(1)}` as Parameters<typeof t>[0])}
                  </button>
                ))}
              </div>
            </div>

            {/* タイム入力（完走時のみ） */}
            {status === 'finished' && (
              <div>
                <p className="text-xs font-semibold mb-1">{t('raceResultTime')}</p>
                <input
                  type="text"
                  value={timeStr}
                  onChange={(e) => { setTimeStr(e.target.value); setTimeError(''); }}
                  placeholder={t('raceResultTimePlaceholder')}
                  className="text-xs border rounded px-2 py-1 w-32"
                  style={{ borderColor: timeError ? 'var(--color-primary)' : 'var(--color-border)' }}
                />
                {timeError && (
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-primary)' }}>{timeError}</p>
                )}
              </div>
            )}

            {/* カテゴリ選択（複数カテゴリある場合） */}
            {categories.length > 1 && (
              <div>
                <p className="text-xs font-semibold mb-1">{t('raceResultCategory')}</p>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : '')}
                  className="text-xs border rounded px-1 py-0.5 w-full"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <option value="">—</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name_ja} ({c.distance_km}km)</option>
                  ))}
                </select>
              </div>
            )}

            {/* メモ */}
            <div>
              <p className="text-xs font-semibold mb-1">{t('raceResultNote')}</p>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="text-xs border rounded px-2 py-1 w-full"
                style={{ borderColor: 'var(--color-border)' }}
              />
            </div>

            {saveError && (
              <p className="text-xs" style={{ color: 'var(--color-primary)' }}>{saveError}</p>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving || !status}
                className="text-xs px-2 py-1 rounded font-medium"
                style={{ background: 'var(--color-primary)', color: '#fff' }}
              >
                {saving ? t('raceResultSaving') : saved ? t('raceResultSaved') : t('raceResultSave')}
              </button>
              {editing && (
                <button
                  onClick={() => setEditing(false)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ color: 'var(--color-mid)' }}
                >
                  {t('raceGearCancel')}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
