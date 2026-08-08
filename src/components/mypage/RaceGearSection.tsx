'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { type UserGear } from '@/lib/types';

// ─── 型 ────────────────────────────────────────────────────────────────────

interface RaceGearRow {
  gear_id: string;
  quantity: number;
  used: boolean | null;
  used_quantity: number | null;
  note: string;
  sort_order: number;
  name: string;
  brand: string | null;
  category: string;
  asin: string | null;
  amazon_url: string | null;
}

interface Candidate {
  user_race_id: string;
  race_id: string;
  gear_count: number;
}

interface DraftItem {
  gear_id: string;
  quantity: number;
  sort_order: number;
}

// ─── Props ─────────────────────────────────────────────────────────────────

interface Props {
  raceId: string;
  raceDate: string; // YYYY-MM-DD
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function RaceGearSection({ raceId, raceDate }: Props) {
  const t = useTranslations('gear');

  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [raceGear, setRaceGear] = useState<RaceGearRow[]>([]);
  const [myGear, setMyGear] = useState<UserGear[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [showCopyPanel, setShowCopyPanel] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidateRaceId, setSelectedCandidateRaceId] = useState('');
  const [draft, setDraft] = useState<DraftItem[]>([]);
  const [addSelected, setAddSelected] = useState<Set<string>>(new Set());
  const [patchError, setPatchError] = useState<string | null>(null);

  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  const isPostRace = raceDate < today;

  // ─── Load ───────────────────────────────────────────────────────────────

  const load = useCallback(async () => {
    try {
      const [gearRes, raceGearRes] = await Promise.all([
        fetch('/api/user/gear'),
        fetch(`/api/user/races/${raceId}/gear`),
      ]);
      const myGearData: UserGear[] = gearRes.ok ? await gearRes.json() : [];
      const raceGearData: RaceGearRow[] = raceGearRes.ok ? await raceGearRes.json() : [];
      const active = myGearData.filter((g) => !g.is_retired);
      setMyGear(active);
      setRaceGear(raceGearData);
      setDraft(raceGearData.map((item, i) => ({
        gear_id: item.gear_id,
        quantity: item.quantity,
        sort_order: i,
      })));
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
  };

  // ─── Helpers ────────────────────────────────────────────────────────────

  function getDraftLabel(d: DraftItem): string {
    const fromGear = myGear.find((g) => g.id === d.gear_id);
    if (fromGear) {
      return fromGear.brand ? `${fromGear.brand} ${fromGear.name}` : fromGear.name;
    }
    const fromRace = raceGear.find((g) => g.gear_id === d.gear_id);
    if (fromRace) {
      return fromRace.brand ? `${fromRace.brand} ${fromRace.name}` : fromRace.name;
    }
    return d.gear_id;
  }

  function getRaceGearLabel(item: RaceGearRow): string {
    return item.brand ? `${item.brand} ${item.name}` : item.name;
  }

  // ─── PUT (save pre-race list) ───────────────────────────────────────────

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/user/races/${raceId}/gear`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: draft }),
      });
      if (res.ok) {
        const updated: RaceGearRow[] = await res.json();
        setRaceGear(updated);
        setDraft(updated.map((item, i) => ({
          gear_id: item.gear_id,
          quantity: item.quantity,
          sort_order: i,
        })));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  // ─── PATCH (post-race usage update) ────────────────────────────────────

  const handlePatch = async (
    gearId: string,
    patch: { used: boolean | null; used_quantity?: number; note?: string },
  ) => {
    try {
      setPatchError(null);
      const res = await fetch(`/api/user/races/${raceId}/gear`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gear_id: gearId, ...patch }),
      });
      if (!res.ok) {
        setPatchError(t('raceGearPatchError'));
        return;
      }
      const updated = (await res.json()) as Partial<RaceGearRow>;
      setRaceGear((prev) =>
        prev.map((item) =>
          item.gear_id === gearId ? { ...item, ...updated } : item,
        ),
      );
    } catch {
      setPatchError(t('raceGearPatchError'));
    }
  };

  // ─── Add from my gear ───────────────────────────────────────────────────

  const toggleAddSelect = (gearId: string) => {
    setAddSelected((prev) => {
      const next = new Set(prev);
      if (next.has(gearId)) next.delete(gearId);
      else next.add(gearId);
      return next;
    });
  };

  const confirmAdd = () => {
    const currentIds = new Set(draft.map((d) => d.gear_id));
    const toAdd = [...addSelected].filter((id) => !currentIds.has(id));
    setDraft((prev) => [
      ...prev,
      ...toAdd.map((id, i) => ({
        gear_id: id,
        quantity: 1,
        sort_order: prev.length + i,
      })),
    ]);
    setShowAddPanel(false);
    setAddSelected(new Set());
  };

  // ─── Copy from previous race ────────────────────────────────────────────

  const handleCopyOpen = async () => {
    const res = await fetch(`/api/user/races/${raceId}/gear?source=candidates`);
    const data: Candidate[] = res.ok ? await res.json() : [];
    setCandidates(data);
    setSelectedCandidateRaceId(data[0]?.race_id ?? '');
    setShowCopyPanel(true);
  };

  const confirmCopy = async () => {
    if (!selectedCandidateRaceId) return;
    const res = await fetch(`/api/user/races/${selectedCandidateRaceId}/gear`);
    if (res.ok) {
      const items: RaceGearRow[] = await res.json();
      setDraft(items.map((item, i) => ({
        gear_id: item.gear_id,
        quantity: item.quantity,
        sort_order: i,
      })));
      setShowCopyPanel(false);
    }
  };

  // ─── Draft helpers ──────────────────────────────────────────────────────

  const updateQty = (gearId: string, qty: number) => {
    setDraft((prev) =>
      prev.map((d) => (d.gear_id === gearId ? { ...d, quantity: qty } : d)),
    );
  };

  const removeFromDraft = (gearId: string) => {
    setDraft((prev) =>
      prev
        .filter((d) => d.gear_id !== gearId)
        .map((d, i) => ({ ...d, sort_order: i })),
    );
  };

  // ─── Toggle button ──────────────────────────────────────────────────────

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
      {t('raceGearButton')}
    </button>
  );

  // ─── Collapsed state ────────────────────────────────────────────────────

  if (!open) return toggleButton;

  // ─── Loading ────────────────────────────────────────────────────────────

  if (!loaded) {
    return (
      <div className="w-full">
        {toggleButton}
        <div className="mt-2 animate-pulse h-12 bg-gray-100 rounded" />
      </div>
    );
  }

  // ─── No gear registered ─────────────────────────────────────────────────

  if (myGear.length === 0) {
    return (
      <div className="w-full">
        {toggleButton}
        <div className="mt-2 text-xs" style={{ color: 'var(--color-mid)' }}>
          {t('raceGearNoGear')}{' '}
          <Link
            href="/mypage/gear"
            className="underline"
            style={{ color: 'var(--color-primary)' }}
          >
            {t('raceGearGoToGear')}
          </Link>
        </div>
      </div>
    );
  }

  // ─── Pre-race view ──────────────────────────────────────────────────────

  if (!isPostRace) {
    const availableToAdd = myGear.filter(
      (g) => !draft.some((d) => d.gear_id === g.id),
    );

    return (
      <div className="w-full">
        {toggleButton}
        <div
          className="mt-2 rounded-lg p-3"
          style={{
            border: '1px solid var(--color-border)',
            background: 'var(--color-cream)',
          }}
        >
          {draft.length === 0 ? (
            <p className="text-xs mb-2" style={{ color: 'var(--color-mid)' }}>
              {t('raceGearEmpty')}
            </p>
          ) : (
            <ul className="space-y-1 mb-2">
              {draft.map((d) => (
                <li key={d.gear_id} className="flex items-center gap-2 text-sm">
                  <span className="flex-1 min-w-0 truncate text-xs">
                    {getDraftLabel(d)}
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={d.quantity}
                    onChange={(e) =>
                      updateQty(d.gear_id, Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center border rounded px-1 py-0.5 text-xs"
                    style={{ borderColor: 'var(--color-border)' }}
                    aria-label={t('raceGearQuantity')}
                  />
                  <button
                    onClick={() => removeFromDraft(d.gear_id)}
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ color: 'var(--color-mid)' }}
                    aria-label={t('raceGearRemove')}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setAddSelected(new Set());
                setShowAddPanel(true);
              }}
              className="text-xs px-2 py-1 rounded border"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-ink2)',
                background: '#fff',
              }}
            >
              {t('raceGearAddFromGear')}
            </button>
            <button
              onClick={handleCopyOpen}
              className="text-xs px-2 py-1 rounded border"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-ink2)',
                background: '#fff',
              }}
            >
              {t('raceGearCopyFromPrev')}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-xs px-2 py-1 rounded font-medium"
              style={{ background: 'var(--color-primary)', color: '#fff' }}
            >
              {saving ? t('raceGearSaving') : saved ? t('raceGearSaved') : t('raceGearSave')}
            </button>
          </div>

          {/* マイギアから追加パネル */}
          {showAddPanel && (
            <div
              className="mt-3 rounded p-2"
              style={{ border: '1px solid var(--color-border)', background: '#fff' }}
            >
              <p className="text-xs font-semibold mb-2">{t('raceGearAddFromGear')}</p>
              {availableToAdd.length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--color-mid)' }}>
                  {t('raceGearEmpty')}
                </p>
              ) : (
                <ul className="space-y-1 max-h-48 overflow-y-auto mb-2">
                  {availableToAdd.map((g) => (
                    <li
                      key={g.id}
                      className="flex items-center gap-2 text-xs cursor-pointer py-0.5"
                      onClick={() => toggleAddSelect(g.id)}
                    >
                      <input
                        type="checkbox"
                        readOnly
                        checked={addSelected.has(g.id)}
                        className="pointer-events-none"
                      />
                      <span>
                        {g.brand ? `${g.brand} ` : ''}
                        {g.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex gap-2">
                <button
                  onClick={confirmAdd}
                  disabled={addSelected.size === 0}
                  className="text-xs px-2 py-1 rounded font-medium"
                  style={{ background: 'var(--color-primary)', color: '#fff' }}
                >
                  {t('raceGearAdd')}
                </button>
                <button
                  onClick={() => setShowAddPanel(false)}
                  className="text-xs px-2 py-1 rounded"
                  style={{ color: 'var(--color-mid)' }}
                >
                  {t('raceGearCancel')}
                </button>
              </div>
            </div>
          )}

          {/* 前回からコピーパネル */}
          {showCopyPanel && (
            <div
              className="mt-3 rounded p-2"
              style={{ border: '1px solid var(--color-border)', background: '#fff' }}
            >
              <p className="text-xs font-semibold mb-2">{t('raceGearCopySelect')}</p>
              {candidates.length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--color-mid)' }}>
                  {t('raceGearNoCandidates')}
                </p>
              ) : (
                <>
                  <select
                    value={selectedCandidateRaceId}
                    onChange={(e) => setSelectedCandidateRaceId(e.target.value)}
                    className="text-xs border rounded px-1 py-0.5 w-full mb-2"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    {candidates.map((c) => (
                      <option key={c.user_race_id} value={c.race_id}>
                        {c.race_id} ({c.gear_count})
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={confirmCopy}
                      className="text-xs px-2 py-1 rounded font-medium"
                      style={{ background: 'var(--color-primary)', color: '#fff' }}
                    >
                      {t('raceGearCopyConfirm')}
                    </button>
                    <button
                      onClick={() => setShowCopyPanel(false)}
                      className="text-xs px-2 py-1 rounded"
                      style={{ color: 'var(--color-mid)' }}
                    >
                      {t('raceGearCancel')}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Post-race view ─────────────────────────────────────────────────────

  return (
    <div className="w-full">
      {toggleButton}
      <div
        className="mt-2 rounded-lg p-3"
        style={{
          border: '1px solid var(--color-border)',
          background: 'var(--color-cream)',
        }}
      >
        {patchError && (
          <p className="text-xs mb-2" style={{ color: 'var(--color-primary)' }}>
            {patchError}
          </p>
        )}
        {raceGear.length === 0 ? (
          <p className="text-xs" style={{ color: 'var(--color-mid)' }}>
            {t('raceGearEmpty')}
          </p>
        ) : (
          <ul className="space-y-3">
            {raceGear.map((item) => (
              <li key={item.gear_id} className="text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="flex-1 font-medium">{getRaceGearLabel(item)}</span>
                  <span style={{ color: 'var(--color-mid)' }}>×{item.quantity}</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap mb-1">
                  {(
                    [
                      { key: 'used', value: true as boolean | null, label: t('raceGearUsed') },
                      { key: 'not_used', value: false as boolean | null, label: t('raceGearNotUsed') },
                      { key: 'unknown', value: null as boolean | null, label: t('raceGearUsedUnknown') },
                    ] as const
                  ).map(({ key, value, label }) => {
                    const isActive =
                      key === 'used'
                        ? item.used === true
                        : key === 'not_used'
                          ? item.used === false
                          : item.used === null;
                    return (
                      <button
                        key={key}
                        onClick={() => handlePatch(item.gear_id, { used: value })}
                        className="px-1.5 py-0.5 rounded-[3px]"
                        style={{
                          background: isActive
                            ? key === 'used'
                              ? 'var(--color-primary)'
                              : key === 'not_used'
                                ? '#6b7280'
                                : 'var(--color-border)'
                            : 'var(--color-cream)',
                          color:
                            isActive && key !== 'unknown' ? '#fff' : 'var(--color-ink2)',
                          border: '1px solid var(--color-border)',
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                  {item.used === true && (
                    <input
                      type="number"
                      min={0}
                      max={999}
                      defaultValue={item.used_quantity ?? ''}
                      onBlur={(e) =>
                        handlePatch(item.gear_id, {
                          used: true,
                          used_quantity: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder={t('raceGearUsedQuantity')}
                      className="w-16 border rounded px-1 py-0.5"
                      style={{ borderColor: 'var(--color-border)' }}
                    />
                  )}
                </div>
                <input
                  type="text"
                  defaultValue={item.note}
                  onBlur={(e) => {
                    if (e.target.value !== item.note) {
                      handlePatch(item.gear_id, { used: item.used, note: e.target.value });
                    }
                  }}
                  placeholder={t('raceGearNote')}
                  className="w-full border rounded px-2 py-1"
                  style={{ borderColor: 'var(--color-border)' }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
