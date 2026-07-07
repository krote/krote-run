'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useState } from 'react';
import { useSession, signOut } from '@/lib/auth-client';
import UserRaceList from '@/components/mypage/UserRaceList';
import { useTravelSettings } from '@/lib/hooks/useTravelSettings';
import { HUBS } from '@/lib/hubs';
import type { HubId } from '@/lib/hubs';

export default function MyPage() {
  const t = useTranslations('settings');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  const [saved, setSaved] = useState(false);
  const { settings: travelSettings, updateSettings: updateTravelSettings } = useTravelSettings();
  const [gcalAutoOpen, setGcalAutoOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    try { return localStorage.getItem('hashiru_gcal_auto_open') !== 'false'; } catch { return true; }
  });

  function handleGcalToggle(value: boolean) {
    setGcalAutoOpen(value);
    localStorage.setItem('hashiru_gcal_auto_open', String(value));
  }

  function handleLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale as (typeof routing.locales)[number] });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-ink)' }}>
        {tNav('mypage')}
      </h1>

      {/* Account section */}
      <section className="p-6 bg-white border border-[var(--color-border)] rounded-xl mb-6">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-mid)' }}>
          アカウント
        </h2>
        {isPending ? (
          <div className="animate-pulse flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-3 bg-gray-200 rounded w-48" />
            </div>
          </div>
        ) : session ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {session.user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={session.user.image}
                  alt={session.user.name ?? ''}
                  className="w-12 h-12 rounded-full border border-[var(--color-border)]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[var(--color-ink)] text-white text-lg font-bold flex items-center justify-center">
                  {(session.user.name ?? session.user.email ?? '?')[0].toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--color-ink)' }}>
                  {session.user.name ?? '（名前なし）'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
                  {session.user.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="text-xs px-3 py-1.5 rounded-[3px] transition-colors hover:bg-[var(--color-cream)]"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink2)' }}
            >
              {tNav('logout')}
            </button>
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
            ログインすると参加予定の登録などができます。
          </p>
        )}
      </section>

      {/* Race registrations */}
      {session && (
        <section className="p-6 bg-white border border-[var(--color-border)] rounded-xl mb-6">
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-mid)' }}>
            登録中の大会
          </h2>
          <UserRaceList />
        </section>
      )}

      {/* Travel settings */}
      <section className="p-6 bg-white border border-[var(--color-border)] rounded-xl mb-6">
        <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-mid)' }}>
          {locale === 'ja' ? '日帰り判定の設定' : 'Day-trip Settings'}
        </h2>
        <p className="text-xs mb-4" style={{ color: 'var(--color-mid)' }}>
          {locale === 'ja'
            ? '出発地を設定すると、大会一覧で「日帰り可能」フィルターが使えます。'
            : 'Set your departure hub to use the day-trip filter on the race list.'}
        </p>

        {/* Hub */}
        <div className="mb-4">
          <label className="block text-xs font-semibold mb-2" style={{ color: 'var(--color-ink2)' }}>
            {locale === 'ja' ? '出発地（最寄りの主要駅）' : 'Departure Hub'}
          </label>
          <div className="flex flex-wrap gap-2">
            {(Object.values(HUBS) as typeof HUBS[HubId][]).map((hub) => {
              const isActive = travelSettings?.hubId === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() =>
                    updateTravelSettings({
                      hubId: hub.id,
                      nearestStation: travelSettings?.nearestStation ?? '',
                      offsetMinutes: travelSettings?.offsetMinutes ?? 10,
                      firstTrainTime: travelSettings?.firstTrainTime ?? '05:00',
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
            {travelSettings && (
              <button
                onClick={() => updateTravelSettings(null)}
                className="px-3.5 py-2 rounded-lg text-sm transition-colors"
                style={{ background: '#f5f5f5', color: 'var(--color-mid)' }}
              >
                {locale === 'ja' ? 'クリア' : 'Clear'}
              </button>
            )}
          </div>
        </div>

        {travelSettings && (
          <div className="grid grid-cols-2 gap-3 mt-3">
            {/* Offset minutes */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-ink2)' }}>
                {locale === 'ja' ? '余裕時間（分）' : 'Buffer (min)'}
              </label>
              <input
                type="number"
                min={0}
                max={120}
                value={travelSettings.offsetMinutes}
                onChange={(e) =>
                  updateTravelSettings({ ...travelSettings, offsetMinutes: Number(e.target.value) })
                }
                className="w-full px-3 py-2 text-sm rounded-[3px]"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
              />
            </div>
            {/* First train */}
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-ink2)' }}>
                {locale === 'ja' ? '始発時刻' : 'First Train'}
              </label>
              <input
                type="time"
                value={travelSettings.firstTrainTime}
                onChange={(e) =>
                  updateTravelSettings({ ...travelSettings, firstTrainTime: e.target.value })
                }
                className="w-full px-3 py-2 text-sm rounded-[3px]"
                style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
              />
            </div>
          </div>
        )}
      </section>

      {/* Language */}
      <section className="p-6 bg-white border border-[var(--color-border)] rounded-xl mb-6">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-mid)' }}>
          {t('language')}
        </h2>
        <div className="flex gap-3">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                locale === loc
                  ? 'bg-[var(--color-ink)] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {loc === 'ja' ? t('languageJa') : t('languageEn')}
            </button>
          ))}
        </div>
      </section>

      {/* Theme */}
      <section className="p-6 bg-white border border-[var(--color-border)] rounded-xl mb-6">
        <h2 className="text-sm font-semibold mb-4" style={{ color: 'var(--color-mid)' }}>
          {t('theme')}
        </h2>
        <div className="flex flex-wrap gap-3">
          {(['light', 'dark', 'system'] as const).map((theme) => {
            const label =
              theme === 'light' ? t('themeLight') :
              theme === 'dark' ? t('themeDark') :
              t('themeSystem');
            return (
              <button
                key={theme}
                className="px-5 py-2.5 rounded-lg font-medium text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Google Calendar */}
      <section className="p-6 bg-white border border-[var(--color-border)] rounded-xl mb-6">
        <h2 className="text-sm font-semibold mb-1" style={{ color: 'var(--color-mid)' }}>
          カレンダー連携
        </h2>
        <p className="text-xs mb-4" style={{ color: 'var(--color-mid)' }}>
          参加予定・エントリーリマインドを登録したとき、Googleカレンダーの追加画面を自動で開きます。
        </p>
        <label className="flex items-center gap-3 cursor-pointer w-fit">
          <button
            role="switch"
            aria-checked={gcalAutoOpen}
            onClick={() => handleGcalToggle(!gcalAutoOpen)}
            className="relative w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ background: gcalAutoOpen ? 'var(--color-primary)' : 'var(--color-border)' }}
          >
            <span
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
              style={{ transform: gcalAutoOpen ? 'translateX(20px)' : 'translateX(0)' }}
            />
          </button>
          <span className="text-sm" style={{ color: 'var(--color-ink)' }}>
            Googleカレンダーに自動で追加する
          </span>
        </label>
      </section>

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-[3px] font-semibold text-sm transition-colors text-white"
          style={{ background: 'var(--color-ink)' }}
        >
          {t('save')}
        </button>
        {saved && (
          <span className="text-green-600 font-medium text-sm">{t('saved')}</span>
        )}
      </div>
    </div>
  );
}
