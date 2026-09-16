'use client';

import { useLocale } from 'next-intl';
import { useTravelSettings } from '@/lib/hooks/useTravelSettings';
import { HUBS } from '@/lib/hubs';
import type { HubId } from '@/lib/hubs';

export default function SettingsPage() {
  const locale = useLocale();
  const { settings, updateSettings } = useTravelSettings();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-ink)' }}>
        {locale === 'ja' ? '前泊判定の設定' : 'Day-trip Settings'}
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--color-mid)' }}>
        {locale === 'ja'
          ? '出発地を設定すると、大会一覧で「日帰り可能」フィルターや、各大会カード・詳細ページに前泊要否が表示されます。'
          : 'Set your departure hub to use the day-trip filter on the race list, and see overnight-stay guidance on each race.'}
      </p>

      <section className="p-6 bg-white border border-[var(--color-border)] rounded-xl mb-6">
        {/* Hub */}
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--color-ink2)' }}>
            {locale === 'ja' ? '出発地（最寄りの主要駅）' : 'Departure Hub'}
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.values(HUBS) as (typeof HUBS)[HubId][]).map((hub) => {
              const isActive = settings?.hubId === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() =>
                    updateSettings({
                      hubId: hub.id,
                      nearestStation: settings?.nearestStation ?? '',
                      offsetMinutes: settings?.offsetMinutes ?? 10,
                      firstTrainTime: settings?.firstTrainTime ?? '05:00',
                    })
                  }
                  className="px-3.5 py-2 rounded-lg font-medium text-sm transition-colors"
                  style={
                    isActive
                      ? { background: 'var(--color-ink)', color: 'white' }
                      : { background: '#f5f5f5', color: 'var(--color-ink2)' }
                  }
                >
                  {locale === 'ja' ? hub.name_ja : hub.name_en}
                </button>
              );
            })}
            {settings && (
              <button
                onClick={() => updateSettings(null)}
                className="px-3.5 py-2 rounded-lg text-sm transition-colors"
                style={{ background: '#f5f5f5', color: 'var(--color-mid)' }}
              >
                {locale === 'ja' ? 'クリア' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        {settings && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {/* Nearest station */}
            <div className="sm:col-span-2">
              <label
                htmlFor="nearestStation"
                className="block text-xs font-semibold mb-1"
                style={{ color: 'var(--color-ink2)' }}
              >
                {locale === 'ja' ? '最寄り駅' : 'Nearest Station'}
              </label>
              <input
                id="nearestStation"
                type="text"
                value={settings.nearestStation}
                onChange={(e) => updateSettings({ ...settings, nearestStation: e.target.value })}
                placeholder={locale === 'ja' ? '例: 新宿駅' : 'e.g. Shinjuku Station'}
                className="w-full px-3 py-2 text-sm rounded-[3px]"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
              />
            </div>

            {/* Offset minutes */}
            <div>
              <label
                htmlFor="offsetMinutes"
                className="block text-xs font-semibold mb-1"
                style={{ color: 'var(--color-ink2)' }}
              >
                {locale === 'ja' ? '余裕時間（分）' : 'Buffer (min)'}
              </label>
              <input
                id="offsetMinutes"
                type="number"
                min={0}
                max={120}
                value={settings.offsetMinutes}
                onChange={(e) =>
                  updateSettings({ ...settings, offsetMinutes: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-sm rounded-[3px]"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
              />
            </div>

            {/* First train */}
            <div>
              <label
                htmlFor="firstTrainTime"
                className="block text-xs font-semibold mb-1"
                style={{ color: 'var(--color-ink2)' }}
              >
                {locale === 'ja' ? '始発時刻' : 'First Train'}
              </label>
              <input
                id="firstTrainTime"
                type="time"
                value={settings.firstTrainTime}
                onChange={(e) =>
                  updateSettings({ ...settings, firstTrainTime: e.target.value })
                }
                className="w-full px-3 py-2 text-sm rounded-[3px]"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
