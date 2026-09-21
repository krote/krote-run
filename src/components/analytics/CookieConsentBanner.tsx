'use client';

import { useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** useSyncExternalStore 用: 購読先が無いので解除関数だけ返す */
const subscribeNothing = () => () => {};

/** 同意/拒否の選択がすでに保存されているか。localStorage が使えない環境では出さない（true 扱い） */
function hasDecidedConsent(): boolean {
  try {
    return localStorage.getItem('cookie-consent') !== null;
  } catch {
    return true;
  }
}

export default function CookieConsentBanner() {
  const t = useTranslations('cookieConsent');
  // localStorage はサーバーでは読めない。useState の初期化関数で読むと
  // サーバー（非表示）とクライアント（表示）で初期描画が食い違い、全ページで
  // ハイドレーションが失敗していた（React error #418）。
  // useSyncExternalStore はサーバー用スナップショットを別に渡せるため、
  // 不一致を起こさずにハイドレーション後の値へ切り替えられる。
  const decided = useSyncExternalStore(subscribeNothing, hasDecidedConsent, () => true);
  const [dismissed, setDismissed] = useState(false);
  const visible = !decided && !dismissed;

  // 再訪問時の同意状態の復元は src/lib/analytics.ts の GA_INIT_SCRIPT が担う。
  // useEffect で復元すると gtag.js の初回 page_view に間に合わず、同意済みの再訪問者でも
  // 最初の1本だけ denied（gcs=G100）で送信されてしまうため、ここでは行わない。

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    window.gtag?.('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    setDismissed(true);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setDismissed(true);
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
