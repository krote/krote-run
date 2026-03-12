'use client';

import { useTranslations } from 'next-intl';
import type { Prefecture, RaceFilter as RaceFilterType, DistanceType } from '@/lib/types';
import { emptyFilter, getDistanceLabel, isFilterEmpty } from '@/lib/utils';

interface RaceFilterProps {
  filter: RaceFilterType;
  prefectures: Prefecture[];
  onChange: (filter: RaceFilterType) => void;
}

const DISTANCE_TYPES: DistanceType[] = ['full', 'half', '10k', '5k', 'ultra'];

export default function RaceFilter({ filter, prefectures, onChange }: RaceFilterProps) {
  const t = useTranslations('races.filter');

  function handleClear() {
    onChange(emptyFilter());
  }

  const hasFilter = !isFilterEmpty(filter);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900">{t('title')}</h2>
        {hasFilter && (
          <button
            onClick={handleClear}
            className="text-xs text-primary hover:underline font-medium"
          >
            {t('clear')}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="大会名で検索..."
            value={filter.searchText}
            onChange={(e) => onChange({ ...filter, searchText: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Distance type */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t('distance')}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onChange({ ...filter, distanceType: null })}
              className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                filter.distanceType === null
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {t('all')}
            </button>
            {DISTANCE_TYPES.map((d) => (
              <button
                key={d}
                onClick={() => onChange({ ...filter, distanceType: filter.distanceType === d ? null : d })}
                className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                  filter.distanceType === d
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {getDistanceLabel(d, 'ja')}
              </button>
            ))}
          </div>
        </div>

        {/* Prefecture */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t('prefecture')}
          </label>
          <select
            value={filter.prefecture ?? ''}
            onChange={(e) => onChange({ ...filter, prefecture: e.target.value || null })}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
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
