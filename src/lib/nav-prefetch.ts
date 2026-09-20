/**
 * ナビゲーションリンクの先読み（prefetch）制御。
 *
 * Next.js の `<Link>` は既定で画面内のリンクを先読みする。ヘッダー・フッターのリンクは
 * 全ページに常設されているため、ユーザーが1ページ開くだけでナビゲーション先すべてが
 * サーバーサイドでレンダリングされる（本番ログの実測で1ページビューあたり約13回）。
 *
 * 下記2ページは `getRaces()` で全レースとその子テーブルを取得するため1回あたりが重く、
 * 実測で1ページビューあたり約3,400行のD1読み取りを、誰も開いていないのに発生させていた。
 * ユーザーが実際にクリックしたときに読めば十分なので、先読みの対象から外す。
 *
 * それ以外のページ（静的ページ、お知らせ、マイページ等）はD1をほとんど使わないため、
 * 体感速度を優先して既定の先読みを残す。
 */
export const NO_PREFETCH_PATHS: ReadonlySet<string> = new Set(['/races', '/calendar']);

/**
 * `<Link prefetch={...}>` に渡す値を返す。
 * 重いページは `false`（先読みしない）、それ以外は `undefined`（Next.js の既定に任せる）。
 */
export function linkPrefetch(href: string): false | undefined {
  return NO_PREFETCH_PATHS.has(href) ? false : undefined;
}
