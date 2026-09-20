import { getCloudflareContext } from "@opennextjs/cloudflare";

/** GA4 測定ID */
export const GA_MEASUREMENT_ID = "G-9975BX8LXR";

/**
 * 同意モードの初期化スクリプト。gtag.js より先に同期実行する必要があるため、
 * `<Script strategy="beforeInteractive">` に文字列としてそのまま埋め込む。
 *
 * 再訪問時に localStorage を**この時点で**読むのがポイント。
 * 以前は React の useEffect で `consent update` していたため、
 * 同意済みの再訪問者でも初回の page_view だけが denied 状態（gcs=G100）で
 * 送信されていた。同期的に既定値を決めることで最初の1本から granted になる。
 *
 * 広告関連は常に denied（このサイトでは広告計測をしない）。
 */
export const CONSENT_INIT_SCRIPT = `
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
