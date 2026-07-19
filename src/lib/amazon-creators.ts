/**
 * Amazon Creators API クライアント
 * https://affiliate.amazon.co.jp/creatorsapi/docs/en-us/introduction
 */

const TOKEN_ENDPOINT = 'https://creatorsapi.auth.us-west-2.amazoncognito.com/oauth2/token';
const GETITEMS_ENDPOINT = 'https://creatorsapi.amazon/catalog/v1/getItems';
const MARKETPLACE = 'www.amazon.co.jp';

// アイソレート内トークンキャッシュ（Cloudflare Workers の同一アイソレート内で再利用）
let tokenCache: { token: string; expiresAt: number } | null = null;

/** テスト用: キャッシュをリセットする */
export function _resetTokenCache() { tokenCache = null; }

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.AMAZON_CLIENT_ID ?? '',
    client_secret: process.env.AMAZON_CLIENT_SECRET ?? '',
    scope: 'creatorsapi/default',
  });

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) throw new Error(`Token fetch failed: ${res.status}`);

  const data = await res.json() as { access_token: string; expires_in: number };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return tokenCache.token;
}

// ─── 型定義 ────────────────────────────────────────────────────────────────

interface GetItemsResponse {
  itemResults?: {
    items?: Array<{
      asin: string;
      itemInfo?: {
        title?: { displayValue: string };
        byLineInfo?: {
          brand?: { displayValue: string };
          manufacturer?: { displayValue: string };
        };
      };
    }>;
  };
  errors?: Array<{ code: string; message: string }>;
}

// ─── パブリックAPI ─────────────────────────────────────────────────────────

export interface AmazonProductInfo {
  title: string;
  brand: string;
}

export async function getProductByAsin(asin: string): Promise<AmazonProductInfo | null> {
  try {
    const token = await getAccessToken();

    const res = await fetch(GETITEMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-marketplace': MARKETPLACE,
      },
      body: JSON.stringify({
        itemIds: [asin],
        itemIdType: 'ASIN',
        marketplace: MARKETPLACE,
        partnerTag: process.env.AMAZON_PARTNER_TAG ?? '',
        resources: ['itemInfo.title', 'itemInfo.byLineInfo'],
      }),
    });

    if (!res.ok) return null;

    const data = await res.json() as GetItemsResponse;
    const item = data.itemResults?.items?.[0];
    if (!item) return null;

    const title = item.itemInfo?.title?.displayValue ?? '';
    const brand =
      item.itemInfo?.byLineInfo?.brand?.displayValue ??
      item.itemInfo?.byLineInfo?.manufacturer?.displayValue ??
      '';

    return { title, brand };
  } catch {
    return null;
  }
}
