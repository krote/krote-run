import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/seo';

/**
 * robots.txt
 *
 * - カレンダーの `?year=&month=` は前月・翌月リンクで無限に辿れるため、クローラーに禁止させる。
 *   SSR 1回ごとに Workers の CPU を消費し、無料プランの CPU 制限超過の原因になっていた（2026-11 調査）。
 * - 動的データに依存しないので静的生成され、リクエストごとの SSR は発生しない。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*/calendar?'],
      },
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
  };
}
