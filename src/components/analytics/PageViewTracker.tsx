'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * クライアントサイド遷移のページビューをGA4に送る。
 *
 * App Router では `gtag('config')` が初回しか実行されないため、何もしないと
 * 「最初に着地した1ページ」しか計測されない（本番の実測で確認済み）。
 *
 * 着地ページの page_view は config が送るので、ここでは**2ページ目以降だけ**を送る。
 * 初回も送ると二重計上になる。
 *
 * ロケールを含む実URLを送りたいので、パスは next-intl ではなく next/navigation から取る。
 */
export default function PageViewTracker() {
  const pathname = usePathname();
  const landedOn = useRef<string | null>(null);

  useEffect(() => {
    if (landedOn.current === null) {
      landedOn.current = pathname;
      return;
    }
    if (landedOn.current === pathname) return;
    landedOn.current = pathname;

    window.gtag?.('event', 'page_view', {
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
