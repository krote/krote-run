'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import { useTranslations } from 'next-intl';
import { buildAmazonUrl, extractAsin } from '@/lib/amazon';
import { GEAR_CATEGORIES, GEAR_USAGE_TAGS, type GearCategory, type GearUsageTag, type UserGear } from '@/lib/types';

// カテゴリの表示順
const CATEGORY_ORDER: GearCategory[] = [
  'shoes', 'tops', 'bottoms', 'socks', 'cap', 'sunglasses',
  'watch', 'pack', 'light', 'poles', 'nutrition', 'other',
];

interface GearFormData {
  category: GearCategory;
  brand: string;
  name: string;
  amazon_url: string;
  usage_tag: GearUsageTag;
  memo: string;
}

const DEFAULT_FORM: GearFormData = {
  category: 'shoes',
  brand: '',
  name: '',
  amazon_url: '',
  usage_tag: 'both',
  memo: '',
};

export default function GearList() {
  const t = useTranslations('gear');
  const { data: session } = useSession();
  const [gears, setGears] = useState<UserGear[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRetired, setShowRetired] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingGear, setEditingGear] = useState<UserGear | null>(null);
  const [formData, setFormData] = useState<GearFormData>(DEFAULT_FORM);
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [lookingUp, setLookingUp] = useState(false);

  useEffect(() => {
    if (!session) return;
    setLoading(true);
    fetch('/api/user/gear')
      .then((r) => r.json())
      .then((data: UserGear[]) => setGears(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [session]);

  if (!session) return null;

  if (loading) {
    return (
      <div className="animate-pulse space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 bg-gray-100 rounded" />
        ))}
      </div>
    );
  }

  // ─── ヘルパー ──────────────────────────────────────────────────────────────

  function getCategoryLabel(cat: GearCategory): string {
    const key = `category${cat.charAt(0).toUpperCase()}${cat.slice(1)}` as Parameters<typeof t>[0];
    return t(key);
  }

  function getUsageLabel(tag: GearUsageTag): string {
    if (tag === 'race') return t('usageRace');
    if (tag === 'training') return t('usageTraining');
    return t('usageBoth');
  }

  // ─── データ分類 ────────────────────────────────────────────────────────────

  const activeGears = gears.filter((g) => !g.is_retired);
  const retiredGears = gears.filter((g) => g.is_retired);
  const visibleGears = showRetired ? gears : activeGears;

  // カテゴリ順でグルーピング
  const grouped = CATEGORY_ORDER
    .map((cat) => ({
      cat,
      items: visibleGears.filter((g) => g.category === cat),
    }))
    .filter(({ items }) => items.length > 0);

  // ─── API呼び出し ───────────────────────────────────────────────────────────

  async function handleAmazonUrlBlur() {
    const asin = extractAsin(formData.amazon_url);
    if (!asin) return;
    setLookingUp(true);
    try {
      const res = await fetch(`/api/amazon/product?asin=${asin}`);
      if (res.ok) {
        const product = await res.json() as { title: string; brand: string };
        setFormData((d) => ({
          ...d,
          name: d.name || product.title,
          brand: d.brand || product.brand,
        }));
      }
    } catch {}
    finally {
      setLookingUp(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError('');

    const isEdit = !!editingGear;
    const url = isEdit ? `/api/user/gear/${editingGear!.id}` : '/api/user/gear';
    const method = isEdit ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amazon_url: formData.amazon_url || null,
        }),
      });
      if (!res.ok) {
        const body = await res.json() as { error?: string };
        setFormError(body.error ?? 'エラーが発生しました');
        return;
      }
      const updated: UserGear = await res.json();
      if (isEdit) {
        setGears((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
      } else {
        setGears((prev) => [...prev, updated]);
      }
      setShowForm(false);
      setEditingGear(null);
      setFormData(DEFAULT_FORM);
    } catch {
      setFormError('エラーが発生しました');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRetireToggle(gear: UserGear) {
    try {
      const res = await fetch(`/api/user/gear/${gear.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_retired: !gear.is_retired }),
      });
      if (res.ok) {
        const updated: UserGear = await res.json();
        setGears((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
      }
    } catch {}
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/user/gear/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setGears((prev) => prev.filter((g) => g.id !== id));
      }
    } catch {}
    setConfirmDeleteId(null);
  }

  function openEdit(gear: UserGear) {
    setEditingGear(gear);
    setFormData({
      category: gear.category as GearCategory,
      brand: gear.brand,
      name: gear.name,
      amazon_url: gear.amazon_url ?? '',
      usage_tag: gear.usage_tag as GearUsageTag,
      memo: gear.memo,
    });
    setFormError('');
    setShowForm(true);
  }

  function openAdd() {
    setEditingGear(null);
    setFormData(DEFAULT_FORM);
    setFormError('');
    setShowForm(true);
  }

  // ─── 表示 ─────────────────────────────────────────────────────────────────

  return (
    <div>
      {/* ヘッダー行 */}
      <div className="flex items-center justify-between mb-3">
        <span /> {/* 右端にボタン */}
        <button
          onClick={openAdd}
          className="text-xs px-3 py-1.5 rounded-[3px] font-medium transition-colors text-white"
          style={{ background: 'var(--color-ink)' }}
        >
          {t('add')}
        </button>
      </div>

      {/* 空状態 */}
      {gears.length === 0 && (
        <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
          {t('empty')}
        </p>
      )}

      {/* ギア一覧（カテゴリ別） */}
      {grouped.map(({ cat, items }) => (
        <div key={cat} className="mb-4">
          <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-mid)' }}>
            {getCategoryLabel(cat)}
          </p>
          <div>
            {items.map((gear) => (
              <GearRow
                key={gear.id}
                gear={gear}
                t={t}
                getUsageLabel={getUsageLabel}
                onEdit={() => openEdit(gear)}
                onRetireToggle={() => handleRetireToggle(gear)}
                onDeleteRequest={() => setConfirmDeleteId(gear.id)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* 引退ギアトグル */}
      {retiredGears.length > 0 && (
        <button
          onClick={() => setShowRetired((v) => !v)}
          className="text-xs mt-2"
          style={{ color: 'var(--color-mid)' }}
        >
          {showRetired ? t('hideRetired') : t('showRetired')}
        </button>
      )}

      {/* 追加・編集フォーム（モーダル） */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowForm(false); setEditingGear(null); } }}
        >
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--color-ink)' }}>
              {editingGear ? t('formEditTitle') : t('formAddTitle')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* カテゴリ */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-mid)' }}>
                  {t('formCategory')}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((d) => ({ ...d, category: e.target.value as GearCategory }))}
                  className="w-full border border-[var(--color-border)] rounded-[3px] px-2 py-1.5 text-sm"
                  style={{ color: 'var(--color-ink)' }}
                >
                  {GEAR_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                  ))}
                </select>
              </div>

              {/* ブランド */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-mid)' }}>
                  {t('formBrand')}
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData((d) => ({ ...d, brand: e.target.value }))}
                  className="w-full border border-[var(--color-border)] rounded-[3px] px-2 py-1.5 text-sm"
                  style={{ color: 'var(--color-ink)' }}
                />
              </div>

              {/* 製品名 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-mid)' }}>
                  {t('formName')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  required
                  className="w-full border border-[var(--color-border)] rounded-[3px] px-2 py-1.5 text-sm"
                  style={{ color: 'var(--color-ink)' }}
                />
              </div>

              {/* Amazon URL */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-mid)' }}>
                  {t('formAmazonUrl')}
                  {lookingUp && (
                    <span className="ml-2 text-xs font-normal" style={{ color: 'var(--color-mid)' }}>
                      取得中…
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  value={formData.amazon_url}
                  onChange={(e) => setFormData((d) => ({ ...d, amazon_url: e.target.value }))}
                  onBlur={handleAmazonUrlBlur}
                  placeholder="https://www.amazon.co.jp/dp/..."
                  className="w-full border border-[var(--color-border)] rounded-[3px] px-2 py-1.5 text-sm"
                  style={{ color: 'var(--color-ink)' }}
                />
              </div>

              {/* 用途 */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--color-mid)' }}>
                  {t('formUsageTag')}
                </label>
                <div className="flex gap-2">
                  {GEAR_USAGE_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setFormData((d) => ({ ...d, usage_tag: tag }))}
                      className={`px-3 py-1 rounded-[3px] text-xs font-medium transition-colors ${
                        formData.usage_tag === tag
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      style={formData.usage_tag === tag ? { background: 'var(--color-ink)' } : {}}
                    >
                      {getUsageLabel(tag)}
                    </button>
                  ))}
                </div>
              </div>

              {/* エラー */}
              {formError && (
                <p className="text-xs text-red-600">{formError}</p>
              )}

              {/* ボタン */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingGear(null); }}
                  className="text-xs px-3 py-1.5 rounded-[3px] transition-colors"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink2)' }}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="text-xs px-3 py-1.5 rounded-[3px] font-medium text-white transition-colors"
                  style={{ background: 'var(--color-ink)' }}
                >
                  {t('save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 削除確認ダイアログ */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4 shadow-xl">
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-ink)' }}>
              {t('deleteConfirmTitle')}
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-mid)' }}>
              {t('deleteConfirmMessage')}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="text-xs px-3 py-1.5 rounded-[3px] transition-colors"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink2)' }}
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="text-xs px-3 py-1.5 rounded-[3px] font-medium text-white"
                style={{ background: '#dc2626' }}
              >
                {t('deleteConfirmButton')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GearRow ──────────────────────────────────────────────────────────────

interface GearRowProps {
  gear: UserGear;
  t: ReturnType<typeof useTranslations>;
  getUsageLabel: (tag: GearUsageTag) => string;
  onEdit: () => void;
  onRetireToggle: () => void;
  onDeleteRequest: () => void;
}

function GearRow({ gear, t, getUsageLabel, onEdit, onRetireToggle, onDeleteRequest }: GearRowProps) {
  const amazonUrl = gear.asin ? buildAmazonUrl(gear.asin) : null;

  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[var(--color-border)] last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {gear.brand && (
            <span className="text-xs" style={{ color: 'var(--color-mid)' }}>{gear.brand}</span>
          )}
          <span className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{gear.name}</span>
          {gear.is_retired && (
            <span
              className="text-xs px-1.5 py-0.5 rounded-[3px] font-medium"
              style={{ background: 'var(--color-cream)', color: 'var(--color-mid)', border: '1px solid var(--color-border)' }}
            >
              {t('retiredBadge')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span
            className="text-xs px-1.5 py-0.5 rounded-[3px]"
            style={{ background: 'var(--color-cream)', color: 'var(--color-ink2)', border: '1px solid var(--color-border)' }}
          >
            {getUsageLabel(gear.usage_tag as GearUsageTag)}
          </span>
          {amazonUrl && (
            <a
              href={amazonUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="text-xs underline"
              style={{ color: 'var(--color-primary)' }}
            >
              {t('amazonLink')}
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0 ml-3">
        <button
          onClick={onEdit}
          className="text-xs px-2 py-1 rounded-[3px] hover:bg-gray-100 transition-colors"
          style={{ color: 'var(--color-ink2)' }}
        >
          {t('edit')}
        </button>
        <button
          onClick={onRetireToggle}
          className="text-xs px-2 py-1 rounded-[3px] hover:bg-gray-100 transition-colors"
          style={{ color: 'var(--color-mid)' }}
        >
          {gear.is_retired ? t('unretire') : t('retire')}
        </button>
        <button
          onClick={onDeleteRequest}
          className="text-xs px-2 py-1 rounded-[3px] hover:bg-red-50 transition-colors"
          style={{ color: '#dc2626' }}
        >
          {t('delete')}
        </button>
      </div>
    </div>
  );
}
