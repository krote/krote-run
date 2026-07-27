import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── モック定義 ────────────────────────────────────────────────────────────
const { mockGetSession, mockGetProductByAsin, MockAmazonUpstreamError } = vi.hoisted(() => {
  class MockAmazonUpstreamError extends Error {
    status: number;
    constructor(status: number, message: string) {
      super(message);
      this.name = 'AmazonUpstreamError';
      this.status = status;
    }
  }
  return {
    mockGetSession: vi.fn(),
    mockGetProductByAsin: vi.fn(),
    MockAmazonUpstreamError,
  };
});

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: vi.fn(() => ({
    env: {
      DB: {},
      AMAZON_CLIENT_ID: 'test-id',
      AMAZON_CLIENT_SECRET: 'test-secret',
      AMAZON_PARTNER_TAG: 'test-tag-22',
    },
  })),
}));

vi.mock('@/lib/auth', () => ({
  createAuth: vi.fn(() => ({
    api: { getSession: mockGetSession },
  })),
}));

vi.mock('@/lib/amazon-creators', () => ({
  getProductByAsin: mockGetProductByAsin,
  AmazonUpstreamError: MockAmazonUpstreamError,
}));

import { GET } from '../route';

// ─── ヘルパー ──────────────────────────────────────────────────────────────
const MOCK_USER = { id: 'user-1', name: 'テスト', email: 'test@example.com' };

function makeRequest(asin?: string): Request {
  const url = asin
    ? `http://localhost/api/amazon/product?asin=${asin}`
    : 'http://localhost/api/amazon/product';
  return new Request(url);
}

// ─── テスト ────────────────────────────────────────────────────────────────
describe('GET /api/amazon/product', () => {
  beforeEach(() => vi.clearAllMocks());

  it('未認証: 401 を返す', async () => {
    mockGetSession.mockResolvedValue(null);
    const res = await GET(makeRequest('B0XXXXXXXX'));
    expect(res.status).toBe(401);
  });

  it('asin パラメータなし: 400 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const res = await GET(makeRequest());
    expect(res.status).toBe(400);
  });

  it('asin が不正形式: 400 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    const res = await GET(makeRequest('invalid'));
    expect(res.status).toBe(400);
  });

  it('商品が見つかった: 200 + product を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockGetProductByAsin.mockResolvedValue({ title: 'テストシューズ', brand: 'Nike' });

    const res = await GET(makeRequest('B0XXXXXXXX'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ title: 'テストシューズ', brand: 'Nike' });
  });

  it('商品が見つからない（null）: 404 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockGetProductByAsin.mockResolvedValue(null);

    const res = await GET(makeRequest('B0XXXXXXXX'));
    expect(res.status).toBe(404);
  });

  it('上流エラー（AmazonUpstreamError）: 502 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockGetProductByAsin.mockRejectedValue(new MockAmazonUpstreamError(503, 'Service unavailable'));

    const res = await GET(makeRequest('B0XXXXXXXX'));
    expect(res.status).toBe(502);
  });

  it('予期しない例外: 500 を返す', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockGetProductByAsin.mockRejectedValue(new Error('Unexpected error'));

    const res = await GET(makeRequest('B0XXXXXXXX'));
    expect(res.status).toBe(500);
  });

  it('正常系: getProductByAsin に正しい ASIN と env が渡される', async () => {
    mockGetSession.mockResolvedValue({ user: MOCK_USER });
    mockGetProductByAsin.mockResolvedValue({ title: '商品', brand: '' });

    await GET(makeRequest('B0YYYYYYYY'));
    expect(mockGetProductByAsin).toHaveBeenCalledWith(
      'B0YYYYYYYY',
      expect.objectContaining({ AMAZON_CLIENT_ID: 'test-id' }),
    );
  });
});
