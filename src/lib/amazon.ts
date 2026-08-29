const ALLOWED_HOSTS = new Set(['amazon.co.jp', 'www.amazon.co.jp']);
const ASIN_RE = /^[A-Z0-9]{10}$/;

/**
 * Amazon URL から ASIN を抽出する。
 * 許可ドメイン以外・ASIN形式不一致・パース不能な場合は null を返す（例外なし）。
 */
export function extractAsin(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (!ALLOWED_HOSTS.has(parsed.hostname)) return null;

  const segments = parsed.pathname.split('/');
  for (let i = 0; i < segments.length - 1; i++) {
    if (segments[i] === 'dp' || (segments[i] === 'product' && segments[i - 1] === 'gp')) {
      const candidate = segments[i + 1];
      if (ASIN_RE.test(candidate)) return candidate;
    }
  }

  return null;
}

/**
 * ASIN から amazon.co.jp の購入 URL を生成する。
 * tag が指定されている場合は ?tag= を付与する（純粋関数。呼び出し側でタグを解決すること）。
 */
export function buildAmazonUrl(asin: string, tag?: string | null): string {
  const base = `https://www.amazon.co.jp/dp/${asin}`;
  return tag ? `${base}?tag=${tag}` : base;
}
