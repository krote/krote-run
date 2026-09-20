import { getCloudflareContext } from "@opennextjs/cloudflare";

/** GA4 測定ID */
export const GA_MEASUREMENT_ID = "G-9975BX8LXR";

/**
 * GA4 の初期化スクリプト。`<Script strategy="afterInteractive">` にインラインで埋め込む。
 *
 * beforeInteractive を使っていない理由: beforeInteractive はSSRのHTMLに <script> を
 * 出力するが、React 19 はコンポーネントが描画する <script> を許容しないため
 * （Encountered a script tag while rendering React component）、全ページで
 * ハイドレーションが失敗していた。afterInteractive はクライアント側で注入されるため
 * SSRのHTMLに現れず、この問題が起きない。
 *
 * 同意の既定値をこのスクリプトの先頭で localStorage から読むのがポイント。
 * 以前は React の useEffect で consent update していたため間に合わず、同意済みの
 * 再訪問者でも1本目の page_view だけ denied（gcs=G100）で送信されていた。
 *
 * 着地ページの page_view は config が送る。以降のクライアントサイド遷移は
 * PageViewTracker が送る（App Router では config が再実行されないため）。
 * 広告関連は常に denied（このサイトでは広告計測をしない）。
 */
export const GA_INIT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var granted = false;
try { granted = localStorage.getItem('cookie-consent') === 'accepted'; } catch (e) {}
gtag('consent', 'default', {
  analytics_storage: granted ? 'granted' : 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
`.trim();

/**
 * Cloudflare Web Analytics のビーコントークンを返す（未設定なら null）。
 *
 * Cookieを使わず個人を識別しないため同意バナーの制約を受けず、全訪問者を計測できる。
 * GA4（同意した人のイベント分析）との二本立てにして、素のアクセス数の把握に使う。
 *
 * トークンは公開情報（HTMLに出る）だがデプロイ環境ごとに変わるため環境変数で渡す。
 * getCloudflareContext().env はCloudflareバインディング用、process.env はローカルdevのフォールバック。
 */
export function getCloudflareBeaconToken(): string | null {
  let fromBinding: string | undefined;
  try {
    fromBinding = (getCloudflareContext().env as unknown as Record<string, string | undefined>).CF_BEACON_TOKEN;
  } catch {
    // ビルド時など Cloudflare コンテキストが無い場合は process.env にフォールバックする
  }
  const raw = fromBinding ?? process.env.CF_BEACON_TOKEN;
  const token = raw?.trim();
  return token ? token : null;
}
