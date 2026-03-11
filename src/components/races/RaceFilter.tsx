'use client';

import { useTranslations } from 'next-intl';
import type { Prefecture, RaceFilter as RaceFilterType } from '@/lib/types';

interface RaceFilterProps {
  filter: RaceFilterType;
  prefectures: Prefecture[];
  onChange: (filter: RaceFilterType) => void;
}

const DISTANCES = ['full', 'half', '10k', '5k', 'ultra'];
const LEVELS = ['beginner', 'intermediate', 'advanced'];
const TERRAINS = ['road', 'trail', 'track', 'mixed'];

export default function RaceFilter({ filter, prefectures, onChange }: RaceFilterProps) {
  const t = useTranslations('races.filter');
  const tDist = useTranslations('races.distance');
  const tLevel = useTranslations('races.level');
  const tTerrain = useTranslations('races.terrain');

  function update(key: keyof RaceFilterType, value: string) {
    onChange({ ...filter, [key]: value || undefined });
  }

  function handleClear() {
    onChange({});
  }

  const hasFilter = Object.values(filter).some(Boolean);

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
            value={filter.searchQuery ?? ''}
            onChange={(e) => update('searchQuery', e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Distance */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t('distance')}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => update('distance', '')}
              className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                !filter.distance
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {t('all')}
            </button>
            {DISTANCES.map((d) => (
              <button
                key={d}
                onClick={() => update('distance', d === filter.distance ? '' : d)}
                className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                  filter.distance === d
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {tDist(d as Parameters<typeof tDist>[0])}
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
            value={filter.prefectureCode ?? ''}
            onChange={(e) => update('prefectureCode', e.target.value)}
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

        {/* Level */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t('level')}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => update('level', '')}
              className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                !filter.level
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {t('all')}
            </button>
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => update('level', l === filter.level ? '' : l)}
                className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                  filter.level === l
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {tLevel(l as Parameters<typeof tLevel>[0])}
              </button>
            ))}
          </div>
        </div>

        {/* Terrain */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t('terrain')}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => update('terrain', '')}
              className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                !filter.terrain
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {t('all')}
            </button>
            {TERRAINS.map((ter) => (
              <button
                key={ter}
                onClick={() => update('terrain', ter === filter.terrain ? '' : ter)}
                className={`px-3 py-1.5 text-xs rounded-full border font-medium transition-colors ${
                  filter.terrain === ter
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {tTerrain(ter as Parameters<typeof tTerrain>[0])}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
