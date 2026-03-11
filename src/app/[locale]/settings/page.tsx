'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useState } from 'react';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [saved, setSaved] = useState(false);

  function handleLocaleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale as (typeof routing.locales)[number] });
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('title')}</h1>

      <div className="space-y-8">
        {/* Language */}
        <section className="p-6 bg-white border border-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('language')}</h2>
          <div className="flex gap-3">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  locale === loc
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {loc === 'ja' ? t('languageJa') : t('languageEn')}
              </button>
            ))}
          </div>
        </section>

        {/* Theme */}
        <section className="p-6 bg-white border border-gray-200 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('theme')}</h2>
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

        {/* Save */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            {t('save')}
          </button>
          {saved && (
            <span className="text-green-600 font-medium text-sm">{t('saved')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
