import type { OpenNextConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";

/**
 * インクリメンタルキャッシュ（`unstable_cache` の保存先）。
 *
 * D1の無料枠（rows_read 5,000,000/日）に到達したため "dummy"（無効）から切り替えた。
 * これが無効だと `src/lib/data.ts` の `unstable_cache` が素通しになり、全リクエストがD1に到達する。
 *
 * - 実体は R2 バケット（バインディング名 `NEXT_INC_CACHE_R2_BUCKET` は OpenNext 側の固定値）
 * - `withRegionalCache` は各データセンターの Cache API を前段に挟むラッパー。
 *   `short-lived` は取得後最大1分の再利用で、R2へのアクセス回数を抑えつつ陳腐化リスクを最小にする
 *
 * ページ単位のISRは使っていない（Cloudflareバインディングがビルド時に利用できず、
 * `revalidate` を付けるとビルド時プリレンダリングで `getCloudflareContext()` が失敗するため）。
 * そのため `tagCache` / `queue` は "dummy" のままでよい。
 */
const incrementalCache = withRegionalCache(r2IncrementalCache, { mode: "short-lived" });

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: () => incrementalCache,
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  edgeExternals: ["node:crypto"],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
