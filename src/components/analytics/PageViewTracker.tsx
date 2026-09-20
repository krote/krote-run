'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ページビューをGA4に送る。
 *
 * App Router のクライアントサイド遷移では `gtag('config')` が再実行されないため、
 * 何もしないと「最初に着地した1ページ」しか計測されない（実測で確認済み）。
 * `send_page_view: false` と組み合わせ、初回もSPA遷移もここから送る。
 *
 * ロケールを含む実URLを送りたいので、パスは next-intl ではなく next/navigation から取る。
 */
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
