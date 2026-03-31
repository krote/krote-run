'use client';

import { useState, useActionState } from 'react';
import { createRace } from '@/lib/admin-actions';
import type { RaceSeries, Prefecture } from '@/lib/types';

type Category = {
  distance_type: string;
  distance_km: string;
  start_time: string;
  time_limit: string;
  capacity: string;
  entry_fee: string;
  name_ja: string;
};

const defaultCategory: Category = {
  distance_type: 'full',
  distance_km: '42.195',
  start_time: '09:00',
  time_limit: '360',
  capacity: '0',
  entry_fee: '',
  name_ja: '',
};

const INPUT =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary';
const LABEL = 'block text-sm font-medium text-gray-700 mb-1';
const SELECT =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary';

export function RaceForm({
  series,
  prefectures,
  locale,
}: {
  series: RaceSeries[];
  prefectures: Prefecture[];
  locale: string;
}) {
  type EntryPeriodInput = {
    label_ja: string;
    label_en: string;
    start_date: string;
    end_date: string;
    entry_fee: string;
  };
  const defaultEntryPeriod: EntryPeriodInput = {
    label_ja: '一般エントリー',
    label_en: 'General Entry',
    start_date: '',
    end_date: '',
    entry_fee: '',
  };

  const [state, action, isPending] = useActionState(createRace, null);
  const [seriesType, setSeriesType] = useState<'existing' | 'new'>('existing');
  const [categories, setCategories] = useState<Category[]>([{ ...defaultCategory }]);
  const [entryPeriods, setEntryPeriods] = useState<EntryPeriodInput[]>([{ ...defaultEntryPeriod }]);

  const addCategory = () => setCategories((prev) => [...prev, { ...defaultCategory }]);
  const removeCategory = (i: number) => setCategories((prev) => prev.filter((_, idx) => idx !== i));
  const updateCategory = (i: number, field: keyof Category, value: string) => {
    setCategories((prev) => prev.map((cat, idx) => (idx === i ? { ...cat, [field]: value } : cat)));
  };

  const addEntryPeriod = () => setEntryPeriods((prev) => [...prev, { ...defaultEntryPeriod }]);
  const removeEntryPeriod = (i: number) => setEntryPeriods((prev) => prev.filter((_, idx) => idx !== i));
  const updateEntryPeriod = (i: number, field: keyof EntryPeriodInput, value: string) => {
    setEntryPeriods((prev) => prev.map((ep, idx) => (idx === i ? { ...ep, [field]: value } : ep)));
  };

  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="category_count" value={categories.length} />
      <input type="hidden" name="entry_period_count" value={entryPeriods.length} />

      {state?.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {state.error}
        </div>
      )}

      {/* ── シリーズ選択 ── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2">
          シリーズ
        </h2>

        <div className="flex gap-4">
          {(['existing', 'new'] as const).map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="series_type"
                value={type}
                checked={seriesType === type}
                onChange={() => setSeriesType(type)}
                className="accent-primary"
              />
              <span className="text-sm">
                {type === 'existing' ? '既存のシリーズに追加' : '新しいシリーズを作成'}
              </span>
            </label>
          ))}
        </div>

        {seriesType === 'existing' ? (
          <div>
            <label className={LABEL}>シリーズ</label>
            <select name="series_id" required className={SELECT}>
              <option value="">選択してください</option>
              {series.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name_ja}（{s.id}）
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <label className={LABEL}>
                シリーズID <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2 font-normal">
                  例: nagano-marathon（英小文字・数字・ハイフンのみ）
                </span>
              </label>
              <input
                type="text"
                name="series_id"
                required
                pattern="[a-z0-9-]+"
                placeholder="nagano-marathon"
                className={INPUT}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={LABEL}>
                  シリーズ名（日本語）<span className="text-red-500">*</span>
                </label>
                <input type="text" name="series_name_ja" required placeholder="長野マラソン" className={INPUT} />
              </div>
              <div>
                <label className={LABEL}>
                  シリーズ名（英語）<span className="text-red-500">*</span>
                </label>
                <input type="text" name="series_name_en" required placeholder="Nagano Marathon" className={INPUT} />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── 基本情報 ── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2">基本情報</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>
              大会名（日本語）<span className="text-red-500">*</span>
            </label>
            <input type="text" name="name_ja" required placeholder="第○回 長野マラソン" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>
              大会名（英語）<span className="text-red-500">*</span>
            </label>
            <input type="text" name="name_en" required placeholder="Nagano Marathon 2027" className={INPUT} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={LABEL}>
              開催日 <span className="text-red-500">*</span>
            </label>
            <input type="date" name="date" required className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>開催回次</label>
            <input type="number" name="edition" min="1" placeholder="28" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>
              都道府県 <span className="text-red-500">*</span>
            </label>
            <select name="prefecture" required className={SELECT}>
              <option value="">選択してください</option>
              {prefectures.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>
              開催地（日本語）<span className="text-red-500">*</span>
            </label>
            <input type="text" name="city_ja" required placeholder="長野市" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>
              開催地（英語）<span className="text-red-500">*</span>
            </label>
            <input type="text" name="city_en" required placeholder="Nagano City" className={INPUT} />
          </div>
        </div>

        <div>
          <label className={LABEL}>公式サイトURL</label>
          <input type="url" name="official_url" placeholder="https://..." className={INPUT} />
        </div>
      </section>

      {/* ── エントリー情報 ── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2">エントリー情報</h2>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={LABEL}>参加費（円・全種目共通）</label>
            <input type="number" name="entry_fee" min="0" placeholder="10000" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>定員（人）</label>
            <input type="number" name="entry_capacity" min="0" defaultValue="0" className={INPUT} />
          </div>
          <div>
            <label className={LABEL}>受付方式</label>
            <select name="reception_type" className={SELECT}>
              <option value="race_day">当日受付</option>
              <option value="pre_day">前日受付</option>
              <option value="both">前日・当日</option>
              <option value="pre_mail">事前郵送</option>
              <option value="none">なし</option>
            </select>
          </div>
        </div>

        {/* エントリー期間（複数対応） */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={LABEL + ' mb-0'}>エントリー期間</label>
            <button
              type="button"
              onClick={addEntryPeriod}
              className="text-xs px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:border-primary hover:text-primary transition-colors"
            >
              ＋ 期間を追加
            </button>
          </div>
          <div className="space-y-3">
            {entryPeriods.map((ep, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">期間 {i + 1}</span>
                  {entryPeriods.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEntryPeriod(i)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      削除
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">種別（日本語）</label>
                    <input
                      type="text"
                      name={`entry_period_${i}_label_ja`}
                      value={ep.label_ja}
                      onChange={(e) => updateEntryPeriod(i, 'label_ja', e.target.value)}
                      placeholder="一般エントリー"
                      className={INPUT}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">種別（英語）</label>
                    <input
                      type="text"
                      name={`entry_period_${i}_label_en`}
                      value={ep.label_en}
                      onChange={(e) => updateEntryPeriod(i, 'label_en', e.target.value)}
                      placeholder="General Entry"
                      className={INPUT}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">開始日</label>
                    <input
                      type="date"
                      name={`entry_period_${i}_start_date`}
                      value={ep.start_date}
                      onChange={(e) => updateEntryPeriod(i, 'start_date', e.target.value)}
                      className={INPUT}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">終了日</label>
                    <input
                      type="date"
                      name={`entry_period_${i}_end_date`}
                      value={ep.end_date}
                      onChange={(e) => updateEntryPeriod(i, 'end_date', e.target.value)}
                      className={INPUT}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">参加費（円）</label>
                    <input
                      type="number"
                      name={`entry_period_${i}_entry_fee`}
                      value={ep.entry_fee}
                      onChange={(e) => updateEntryPeriod(i, 'entry_fee', e.target.value)}
                      min="0"
                      placeholder="任意"
                      className={INPUT}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── コース ── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2">コース</h2>
        <div className="w-48">
          <label className={LABEL}>路面種別</label>
          <select name="course_surface" className={SELECT}>
            <option value="road">ロード</option>
            <option value="trail">トレイル</option>
            <option value="mixed">ミックス</option>
          </select>
        </div>
      </section>

      {/* ── 説明 ── */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-gray-800 border-b border-gray-200 pb-2">説明</h2>
        <div>
          <label className={LABEL}>説明（日本語）</label>
          <textarea name="description_ja" rows={3} className={INPUT} />
        </div>
        <div>
          <label className={LABEL}>説明（英語）</label>
          <textarea name="description_en" rows={3} className={INPUT} />
        </div>
      </section>

      {/* ── カテゴリ ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
          <h2 className="text-base font-semibold text-gray-800">カテゴリ</h2>
          <button
            type="button"
            onClick={addCategory}
            className="text-xs px-3 py-1.5 border border-gray-300 rounded text-gray-600 hover:border-primary hover:text-primary transition-colors"
          >
            ＋ カテゴリを追加
          </button>
        </div>

        {categories.map((cat, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">カテゴリ {i + 1}</span>
              {categories.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCategory(i)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  削除
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL}>種別</label>
                <select
                  name={`cat_${i}_distance_type`}
                  value={cat.distance_type}
                  onChange={(e) => updateCategory(i, 'distance_type', e.target.value)}
                  className={SELECT}
                >
                  <option value="full">フルマラソン</option>
                  <option value="half">ハーフマラソン</option>
                  <option value="10k">10km</option>
                  <option value="5k">5km</option>
                  <option value="ultra">ウルトラ</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div>
                <label className={LABEL}>距離（km）</label>
                <input
                  type="number"
                  name={`cat_${i}_distance_km`}
                  step="0.001"
                  min="0"
                  value={cat.distance_km}
                  onChange={(e) => updateCategory(i, 'distance_km', e.target.value)}
                  className={INPUT}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div>
                <label className={LABEL}>スタート時刻</label>
                <input
                  type="time"
                  name={`cat_${i}_start_time`}
                  value={cat.start_time}
                  onChange={(e) => updateCategory(i, 'start_time', e.target.value)}
                  className={INPUT}
                />
              </div>
              <div>
                <label className={LABEL}>制限時間（分）</label>
                <input
                  type="number"
                  name={`cat_${i}_time_limit`}
                  min="0"
                  value={cat.time_limit}
                  onChange={(e) => updateCategory(i, 'time_limit', e.target.value)}
                  className={INPUT}
                />
              </div>
              <div>
                <label className={LABEL}>定員（人）</label>
                <input
                  type="number"
                  name={`cat_${i}_capacity`}
                  min="0"
                  value={cat.capacity}
                  onChange={(e) => updateCategory(i, 'capacity', e.target.value)}
                  className={INPUT}
                />
              </div>
              <div>
                <label className={LABEL}>参加費（円）</label>
                <input
                  type="number"
                  name={`cat_${i}_entry_fee`}
                  min="0"
                  value={cat.entry_fee}
                  onChange={(e) => updateCategory(i, 'entry_fee', e.target.value)}
                  placeholder="共通費を使用"
                  className={INPUT}
                />
              </div>
            </div>

            <div>
              <label className={LABEL}>カテゴリ名（日本語・任意）</label>
              <input
                type="text"
                name={`cat_${i}_name_ja`}
                value={cat.name_ja}
                onChange={(e) => updateCategory(i, 'name_ja', e.target.value)}
                placeholder="例: ペアの部"
                className={INPUT}
              />
            </div>
          </div>
        ))}
      </section>

      {/* ── 送信 ── */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
        <a href={`/${locale}/admin`} className="text-sm text-gray-600 hover:text-gray-900">
          キャンセル
        </a>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50"
        >
          {isPending ? '保存中…' : '大会を追加'}
        </button>
      </div>
    </form>
  );
}
