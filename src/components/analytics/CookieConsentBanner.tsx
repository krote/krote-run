'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieConsentBanner() {
  const t = useTranslations('cookieConsent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (!stored) {
      setVisible(true);
    } else if (stored === 'accepted') {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t px-4 py-4 sm:px-6"
      style={{
        background: 'var(--color-cream)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-sm flex-1" style={{ color: 'var(--color-mid)' }}>
          {t('message')}{' '}
          <Link
            href="/cookie-policy"
            className="underline underline-offset-2"
            style={{ color: 'var(--color-primary)' }}
          >
            {t('learnMore')}
          </Link>
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-sm px-4 py-2 rounded border"
            style={{
              color: 'var(--color-mid)',
              borderColor: 'var(--color-border)',
            }}
          >
            {t('decline')}
          </button>
          <button
            onClick={accept}
            className="text-sm px-4 py-2 rounded font-semibold"
            style={{
              background: 'var(--color-primary)',
              color: '#fff',
            }}
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
