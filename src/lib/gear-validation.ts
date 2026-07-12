import { GEAR_CATEGORIES, GEAR_USAGE_TAGS, type GearCategory, type GearUsageTag } from './types';
import { extractAsin } from './amazon';

export interface CreateGearData {
  category: GearCategory;
  name: string;
  brand: string;
  amazon_url: string | null;
  asin: string | null;
  usage_tag: GearUsageTag;
  memo: string;
}

export interface UpdateGearData {
  category?: GearCategory;
  name?: string;
  brand?: string;
  amazon_url?: string | null;
  asin?: string | null;
  usage_tag?: GearUsageTag;
  memo?: string;
  is_retired?: boolean;
}

type ValidationResult<T> = { data: T } | { error: string };

function parseAmazonUrl(url: unknown): { amazon_url: string | null; asin: string | null } | { error: string } {
  if (url === null || url === undefined || url === '') {
    return { amazon_url: null, asin: null };
  }
  if (typeof url !== 'string') return { error: 'amazon_url は文字列で指定してください' };

  const asin = extractAsin(url);
  if (asin === null) {
    return { error: '対応形式のAmazon商品URLのみ指定できます（amazon.co.jp または amazon.com の /dp/ または /gp/product/ 形式）' };
  }
  return { amazon_url: url, asin };
}

export function validateCreateBody(body: unknown): ValidationResult<CreateGearData> {
  if (body === null || typeof body !== 'object') {
    return { error: 'リクエストボディが不正です' };
  }

  const b = body as Record<string, unknown>;

  // category
  if (!GEAR_CATEGORIES.includes(b.category as GearCategory)) {
    return { error: `category は ${GEAR_CATEGORIES.join(', ')} のいずれかを指定してください` };
  }
  const category = b.category as GearCategory;

  // name
  if (typeof b.name !== 'string') return { error: 'name は必須です' };
  const name = b.name.trim();
  if (name.length === 0) return { error: 'name は1文字以上で指定してください' };
  if (name.length > 200) return { error: 'name は200文字以内で指定してください' };

  // brand
  const rawBrand = b.brand ?? '';
  if (typeof rawBrand !== 'string') return { error: 'brand は文字列で指定してください' };
  const brand = rawBrand.trim();
  if (brand.length > 200) return { error: 'brand は200文字以内で指定してください' };

  // memo
  const rawMemo = b.memo ?? '';
  if (typeof rawMemo !== 'string') return { error: 'memo は文字列で指定してください' };
  const memo = rawMemo.trim();
  if (memo.length > 1000) return { error: 'memo は1000文字以内で指定してください' };

  // usage_tag
  const rawUsageTag = b.usage_tag ?? 'both';
  if (!GEAR_USAGE_TAGS.includes(rawUsageTag as GearUsageTag)) {
    return { error: `usage_tag は ${GEAR_USAGE_TAGS.join(', ')} のいずれかを指定してください` };
  }
  const usage_tag = rawUsageTag as GearUsageTag;

  // amazon_url
  const amazonResult = parseAmazonUrl(b.amazon_url);
  if ('error' in amazonResult) return amazonResult;

  return {
    data: {
      category,
      name,
      brand,
      memo,
      usage_tag,
      amazon_url: amazonResult.amazon_url,
      asin: amazonResult.asin,
    },
  };
}

export function validateUpdateBody(body: unknown): ValidationResult<UpdateGearData> {
  if (body === null || typeof body !== 'object') {
    return { error: 'リクエストボディが不正です' };
  }

  const b = body as Record<string, unknown>;
  const data: UpdateGearData = {};

  // category
  if ('category' in b) {
    if (!GEAR_CATEGORIES.includes(b.category as GearCategory)) {
      return { error: `category は ${GEAR_CATEGORIES.join(', ')} のいずれかを指定してください` };
    }
    data.category = b.category as GearCategory;
  }

  // name
  if ('name' in b) {
    if (typeof b.name !== 'string') return { error: 'name は文字列で指定してください' };
    const name = b.name.trim();
    if (name.length === 0) return { error: 'name は1文字以上で指定してください' };
    if (name.length > 200) return { error: 'name は200文字以内で指定してください' };
    data.name = name;
  }

  // brand
  if ('brand' in b) {
    if (typeof b.brand !== 'string') return { error: 'brand は文字列で指定してください' };
    const brand = b.brand.trim();
    if (brand.length > 200) return { error: 'brand は200文字以内で指定してください' };
    data.brand = brand;
  }

  // memo
  if ('memo' in b) {
    if (typeof b.memo !== 'string') return { error: 'memo は文字列で指定してください' };
    const memo = b.memo.trim();
    if (memo.length > 1000) return { error: 'memo は1000文字以内で指定してください' };
    data.memo = memo;
  }

  // usage_tag
  if ('usage_tag' in b) {
    if (!GEAR_USAGE_TAGS.includes(b.usage_tag as GearUsageTag)) {
      return { error: `usage_tag は ${GEAR_USAGE_TAGS.join(', ')} のいずれかを指定してください` };
    }
    data.usage_tag = b.usage_tag as GearUsageTag;
  }

  // amazon_url
  if ('amazon_url' in b) {
    const amazonResult = parseAmazonUrl(b.amazon_url);
    if ('error' in amazonResult) return amazonResult;
    data.amazon_url = amazonResult.amazon_url;
    data.asin = amazonResult.asin;
  }

  // is_retired
  if ('is_retired' in b) {
    if (typeof b.is_retired !== 'boolean') return { error: 'is_retired は boolean で指定してください' };
    data.is_retired = b.is_retired;
  }

  return { data };
}
