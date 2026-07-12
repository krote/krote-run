import { describe, it, expect, vi, afterEach } from 'vitest';
import { extractAsin, buildAmazonUrl } from '../amazon';

// ── extractAsin ───────────────────────────────────────────────

describe('extractAsin - 正常系', () => {
  it('/dp/ パスから ASIN を抽出する（amazon.co.jp）', () => {
    expect(extractAsin('https://www.amazon.co.jp/dp/B0CXX12345')).toBe('B0CXX12345');
  });

  it('/dp/ パスから ASIN を抽出する（www.なし）', () => {
    expect(extractAsin('https://amazon.co.jp/dp/B0CXX12345')).toBe('B0CXX12345');
  });

  it('amazon.com でも抽出できる', () => {
    expect(extractAsin('https://www.amazon.com/dp/B0CXX12345')).toBe('B0CXX12345');
  });

  it('/gp/product/ パスから ASIN を抽出する', () => {
    expect(extractAsin('https://www.amazon.co.jp/gp/product/B0CXX12345')).toBe('B0CXX12345');
  });

  it('前後に他のパスセグメントがあっても抽出できる', () => {
    expect(extractAsin('https://www.amazon.co.jp/商品名/dp/B0CXX12345/ref=sr_1_1')).toBe('B0CXX12345');
  });

  it('クエリパラメータに他人の tag が含まれても ASIN のみ返す', () => {
    expect(extractAsin('https://www.amazon.co.jp/dp/B0CXX12345?tag=other-22&ref=pd')).toBe('B0CXX12345');
  });

  it('数字のみの ASIN も抽出できる', () => {
    expect(extractAsin('https://www.amazon.co.jp/dp/0123456789')).toBe('0123456789');
  });
});

describe('extractAsin - 異常系', () => {
  it('amzn.to 短縮 URL は null', () => {
    expect(extractAsin('https://amzn.to/3XxxxxX')).toBeNull();
  });

  it('amzn.asia 短縮 URL は null', () => {
    expect(extractAsin('https://amzn.asia/d/XXXXXXX')).toBeNull();
  });

  it('他ドメインは null', () => {
    expect(extractAsin('https://example.com/dp/B0CXX12345')).toBeNull();
  });

  it('ASIN が9桁（短すぎ）は null', () => {
    expect(extractAsin('https://www.amazon.co.jp/dp/B0CXX1234')).toBeNull();
  });

  it('ASIN が11桁（長すぎ）は null', () => {
    expect(extractAsin('https://www.amazon.co.jp/dp/B0CXX123456')).toBeNull();
  });

  it('小文字混じりの ASIN は null', () => {
    expect(extractAsin('https://www.amazon.co.jp/dp/b0cxx12345')).toBeNull();
  });

  it('空文字は null', () => {
    expect(extractAsin('')).toBeNull();
  });

  it('非 URL 文字列は null（例外なし）', () => {
    expect(extractAsin('B0CXX12345')).toBeNull();
  });

  it('/dp/ も /gp/product/ もないパスは null', () => {
    expect(extractAsin('https://www.amazon.co.jp/s?k=running+shoes')).toBeNull();
  });
});

// ── buildAmazonUrl ────────────────────────────────────────────

describe('buildAmazonUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('タグ未設定の場合はタグなし URL を返す', () => {
    vi.stubEnv('NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG', '');
    expect(buildAmazonUrl('B0CXX12345')).toBe('https://www.amazon.co.jp/dp/B0CXX12345');
  });

  it('タグが設定されている場合は ?tag= を付与する', () => {
    vi.stubEnv('NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG', 'hashiru-22');
    expect(buildAmazonUrl('B0CXX12345')).toBe('https://www.amazon.co.jp/dp/B0CXX12345?tag=hashiru-22');
  });

  it('環境変数が undefined の場合もタグなし URL を返す', () => {
    vi.stubEnv('NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG', undefined as unknown as string);
    expect(buildAmazonUrl('B0CXX12345')).toBe('https://www.amazon.co.jp/dp/B0CXX12345');
  });
});
