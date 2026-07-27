import { describe, it, expect, vi, beforeEach } from 'vitest';

// fetch をモック
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const { getProductByAsin, _resetTokenCache, AmazonUpstreamError } = await import('../amazon-creators');

// テスト用 env
const MOCK_ENV = {
  AMAZON_CLIENT_ID: 'test-client-id',
  AMAZON_CLIENT_SECRET: 'test-client-secret',
  AMAZON_PARTNER_TAG: 'test-tag-22',
};

// ─── ヘルパー ──────────────────────────────────────────────────────────────
function makeTokenResponse() {
  return {
    ok: true,
    json: async () => ({ access_token: 'test-token', expires_in: 3600 }),
  };
}

function makeItemsResponse(items: unknown[]) {
  return {
    ok: true,
    json: async () => ({ itemResults: { items } }),
  };
}

function makeFullItem(asin: string, title: string, brand?: string) {
  return {
    asin,
    itemInfo: {
      title: { displayValue: title, label: 'Title', locale: 'ja_JP' },
      ...(brand ? {
        byLineInfo: {
          brand: { displayValue: brand, label: 'Brand' },
        },
      } : {}),
    },
  };
}

// ─── テスト ────────────────────────────────────────────────────────────────
describe('getProductByAsin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    _resetTokenCache();
  });

  it('正常系: タイトルとブランドを返す', async () => {
    mockFetch
      .mockResolvedValueOnce(makeTokenResponse())
      .mockResolvedValueOnce(makeItemsResponse([
        makeFullItem('B0XXXXXXXX', 'テストシューズ Pro', 'Nike'),
      ]));

    const result = await getProductByAsin('B0XXXXXXXX', MOCK_ENV);
    expect(result).toEqual({ title: 'テストシューズ Pro', brand: 'Nike' });
  });

  it('ブランドなし: title のみ返しブランドは空文字', async () => {
    mockFetch
      .mockResolvedValueOnce(makeTokenResponse())
      .mockResolvedValueOnce(makeItemsResponse([
        makeFullItem('B0XXXXXXXX', 'タイトルのみ商品'),
      ]));

    const result = await getProductByAsin('B0XXXXXXXX', MOCK_ENV);
    expect(result).toEqual({ title: 'タイトルのみ商品', brand: '' });
  });

  it('manufacturer フォールバック: brand がなく manufacturer があればそれを返す', async () => {
    mockFetch
      .mockResolvedValueOnce(makeTokenResponse())
      .mockResolvedValueOnce(makeItemsResponse([{
        asin: 'B0XXXXXXXX',
        itemInfo: {
          title: { displayValue: '商品名', label: 'Title', locale: 'ja_JP' },
          byLineInfo: {
            manufacturer: { displayValue: 'Acme Corp', label: 'Manufacturer' },
          },
        },
      }]));

    const result = await getProductByAsin('B0XXXXXXXX', MOCK_ENV);
    expect(result?.brand).toBe('Acme Corp');
  });

  it('items 配列が空: null を返す', async () => {
    mockFetch
      .mockResolvedValueOnce(makeTokenResponse())
      .mockResolvedValueOnce(makeItemsResponse([]));

    const result = await getProductByAsin('B0XXXXXXXX', MOCK_ENV);
    expect(result).toBeNull();
  });

  it('errors のみ（アクセス不可ASIN）: null を返す', async () => {
    mockFetch
      .mockResolvedValueOnce(makeTokenResponse())
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          errors: [{ code: 'ItemNotAccessible', message: 'Not accessible' }],
          itemResults: { items: [] },
        }),
      });

    const result = await getProductByAsin('B0XXXXXXXX', MOCK_ENV);
    expect(result).toBeNull();
  });

  it('GetItems が 4xx/5xx: AmazonUpstreamError をスロー', async () => {
    mockFetch
      .mockResolvedValueOnce(makeTokenResponse())
      .mockResolvedValueOnce({ ok: false, status: 500 });

    await expect(getProductByAsin('B0XXXXXXXX', MOCK_ENV)).rejects.toThrow(AmazonUpstreamError);
  });

  it('トークン取得が失敗: AmazonUpstreamError をスロー', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 401 });

    await expect(getProductByAsin('B0XXXXXXXX', MOCK_ENV)).rejects.toThrow(AmazonUpstreamError);
  });

  it('fetch が例外を投げる: 例外が伝播する', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getProductByAsin('B0XXXXXXXX', MOCK_ENV)).rejects.toThrow('Network error');
  });

  it('トークンリクエストに正しいパラメータが渡される', async () => {
    mockFetch
      .mockResolvedValueOnce(makeTokenResponse())
      .mockResolvedValueOnce(makeItemsResponse([makeFullItem('B0XXXXXXXX', '商品')]));

    await getProductByAsin('B0XXXXXXXX', MOCK_ENV);

    const [tokenUrl, tokenOpts] = mockFetch.mock.calls[0];
    expect(tokenUrl).toBe('https://creatorsapi.auth.us-west-2.amazoncognito.com/oauth2/token');
    expect(tokenOpts.method).toBe('POST');
    expect(tokenOpts.headers['Content-Type']).toBe('application/x-www-form-urlencoded');
    const body = new URLSearchParams(tokenOpts.body as string);
    expect(body.get('grant_type')).toBe('client_credentials');
    expect(body.get('client_id')).toBe('test-client-id');
    expect(body.get('scope')).toBe('creatorsapi/default');
  });

  it('GetItems リクエストに正しいパラメータが渡される', async () => {
    mockFetch
      .mockResolvedValueOnce(makeTokenResponse())
      .mockResolvedValueOnce(makeItemsResponse([makeFullItem('B0XXXXXXXX', '商品')]));

    await getProductByAsin('B0XXXXXXXX', MOCK_ENV);

    const [itemsUrl, itemsOpts] = mockFetch.mock.calls[1];
    expect(itemsUrl).toBe('https://creatorsapi.amazon/catalog/v1/getItems');
    expect(itemsOpts.headers['Authorization']).toBe('Bearer test-token');
    expect(itemsOpts.headers['x-marketplace']).toBe('www.amazon.co.jp');
    const body = JSON.parse(itemsOpts.body as string);
    expect(body.itemIds).toEqual(['B0XXXXXXXX']);
    expect(body.partnerTag).toBe('test-tag-22');
    expect(body.resources).toContain('itemInfo.title');
    expect(body.resources).toContain('itemInfo.byLineInfo');
  });
});
