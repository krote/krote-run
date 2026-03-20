'use client';

import { useTranslations } from 'next-intl';
import type { Prefecture, GiftCategory, RaceFilter as RaceFilterType, DistanceType } from '@/lib/types';
import { emptyFilter, getDistanceLabel, isFilterEmpty } from '@/lib/utils';

interface RaceFilterProps {
  filter: RaceFilterType;
  prefectures: Prefecture[];
  giftCategories: GiftCategory[];
  locale: string;
  onChange: (filter: RaceFilterType) => void;
}

const DISTANCE_TYPES: DistanceType[] = ['full', 'half', '10k', '5k', 'ultra'];

const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTHS_JA = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

export default function RaceFilter({ filter, prefectures, giftCategories, locale, onChange }: RaceFilterProps) {
  const t = useTranslations('races.filter');
  const monthLabels = locale === 'ja' ? MONTHS_JA : MONTHS_EN;

  function handleClear() {
    onChange(emptyFilter());
  }

  const hasFilter = !isFilterEmpty(filter);

  return (
    <div
      className="rounded-[4px] p-5"
      style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-serif text-base font-bold" style={{ color: 'var(--color-ink)' }}>
          {t('title')}
        </h2>
        {hasFilter && (
          <button
            onClick={handleClear}
            className="text-xs font-semibold hover:underline"
            style={{ color: 'var(--color-primary)' }}
          >
            {t('clear')}
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder={locale === 'ja' ? '大会名で検索…' : 'Search by name…'}
            value={filter.searchText}
            onChange={(e) => onChange({ ...filter, searchText: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-[3px] focus:outline-none focus:ring-2"
            style={{
              background: 'white',
              border: '1px solid var(--color-border)',
              color: 'var(--color-ink)',
            }}
          />
        </div>

        {/* Distance type */}
        <div>
          <label
            className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase mb-2"
            style={{ color: 'var(--color-mid)' }}
          >
            {t('distance')}
          </label>
          <div className="flex flex-wrap gap-1.5">
            <FilterPill
              active={filter.distanceType === null}
              onClick={() => onChange({ ...filter, distanceType: null })}
            >
              {t('all')}
            </FilterPill>
            {DISTANCE_TYPES.map((d) => (
              <FilterPill
                key={d}
                active={filter.distanceType === d}
                onClick={() =>
                  onChange({ ...filter, distanceType: filter.distanceType === d ? null : d })
                }
              >
                {getDistanceLabel(d, locale as 'ja' | 'en')}
              </FilterPill>
            ))}
          </div>
        </div>

        {/* Month */}
        <div>
          <label
            className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase mb-2"
            style={{ color: 'var(--color-mid)' }}
          >
            {t('month')}
          </label>
          <div className="grid grid-cols-4 gap-1">
            {monthLabels.map((label, i) => {
              const month = i + 1;
              return (
                <button
                  key={month}
                  onClick={() =>
                    onChange({ ...filter, month: filter.month === month ? null : month })
                  }
                  className="py-1.5 text-[0.7rem] font-semibold rounded-[3px] text-center transition-colors"
                  style={
                    filter.month === month
                      ? { background: 'var(--color-ink)', color: 'white' }
                      : {
                          background: 'white',
                          color: 'var(--color-ink2)',
                          border: '1px solid var(--color-border)',
                        }
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gift category (OR multi-select) */}
        <div>
          <label
            className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase mb-2"
            style={{ color: 'var(--color-mid)' }}
          >
            {locale === 'ja' ? '参加賞・完走証' : 'Finisher Gift'}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {giftCategories.map((cat) => {
              const isActive = filter.giftCategories.includes(cat.id);
              return (
                <FilterPill
                  key={cat.id}
                  active={isActive}
                  onClick={() => {
                    const next = isActive
                      ? filter.giftCategories.filter((id) => id !== cat.id)
                      : [...filter.giftCategories, cat.id];
                    onChange({ ...filter, giftCategories: next });
                  }}
                >
                  {cat.icon} {locale === 'ja' ? cat.name_ja : cat.name_en}
                </FilterPill>
              );
            })}
          </div>
        </div>

        {/* Prefecture */}
        <div>
          <label
            className="block text-[0.68rem] font-bold tracking-[0.12em] uppercase mb-2"
            style={{ color: 'var(--color-mid)' }}
          >
            {t('prefecture')}
          </label>
          <select
            value={filter.prefecture ?? ''}
            onChange={(e) => onChange({ ...filter, prefecture: e.target.value || null })}
            className="w-full px-3 py-2 text-sm rounded-[3px] focus:outline-none focus:ring-2 appearance-none"
            style={{
              background: 'white',
              border: '1px solid var(--color-border)',
              color: filter.prefecture ? 'var(--color-ink)' : 'var(--color-mid)',
            }}
          >
            <option value="">{t('all')}</option>
            {prefectures.map((pref) => (
              <option key={pref.code} value={pref.code}>
                {pref.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 text-[0.7rem] font-semibold rounded-[3px] transition-colors"
      style={
        active
          ? { background: 'var(--color-ink)', color: 'white' }
          : {
              background: 'white',
              color: 'var(--color-ink2)',
              border: '1px solid var(--color-border)',
            }
      }
    >
      {children}
    </button>
  );
}
