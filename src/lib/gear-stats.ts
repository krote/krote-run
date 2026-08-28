import type { GearCategory, PerformanceBucketId } from './types';
import { derivePerformanceBucket } from './performance';

/** 個人特定防止のためのデフォルトしきい値。運用側で GEAR_STATS_MIN_USERS 環境変数により上書き可能 */
export const DEFAULT_MIN_USERS_PER_BUCKET = 3;
const MAX_PRODUCTS_PER_CATEGORY = 5;

/** 走力帯集計における「未分類」バケットのID（結果未記録・タイム無し） */
export const UNCLASSIFIED_BUCKET = 'unclassified' as const;
export type GearStatsBucketId = PerformanceBucketId | typeof UNCLASSIFIED_BUCKET;

export interface GearStatsRow {
  userRaceId: string;
  bucket: PerformanceBucketId | null;
  gearId: string;
  category: GearCategory;
  brand: string;
  name: string;
  asin: string | null;
  used: boolean | null;
}

export interface GearStatsProduct {
  key: string;
  asin: string | null;
  brand: string;
  name: string;
  packedCount: number;
  usedCount: number;
}

export interface GearStatsCategoryGroup {
  category: GearCategory;
  products: GearStatsProduct[];
}

export interface GearStatsBucketResult {
  bucket: GearStatsBucketId;
  userCount: number;
  categories: GearStatsCategoryGroup[];
}

export interface RaceResultLike {
  status: string; // RaceResultStatus。DB上は素のtext列のため緩めた型で受ける
  finish_time_sec: number | null;
  category_id: number | null;
}

export interface RaceCategoryLike {
  id: number;
  distance_type: string;
  distance_km: number;
}

/** category_id未指定時の代表カテゴリ選択（フルマラソン優先、なければ最長距離） */
function pickMainCategory(categories: RaceCategoryLike[]): RaceCategoryLike | null {
  if (categories.length === 0) return null;
  const full = categories.find((c) => c.distance_type === 'full');
  if (full) return full;
  return categories.reduce((max, c) => (c.distance_km > max.distance_km ? c : max), categories[0]);
}

/**
 * レース結果から走力帯を導出する。結果が無い/未完走/タイム無しの場合は null（未分類）。
 */
export function deriveResultBucket(
  result: RaceResultLike | null,
  categories: RaceCategoryLike[],
): PerformanceBucketId | null {
  if (!result || result.status !== 'finished' || result.finish_time_sec == null) return null;
  const category = categories.find((c) => c.id === result.category_id) ?? pickMainCategory(categories);
  if (!category) return null;
  return derivePerformanceBucket(category.distance_type, result.finish_time_sec);
}

/**
 * ASINがあればASINを、無ければ brand+name を正規化した文字列を集計キーとして返す。
 * 正規化: 小文字化 + 前後トリム + 連続空白を1個に圧縮。
 */
export function normalizeGearKey(asin: string | null, brand: string, name: string): string {
  if (asin) return asin;
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
  return `${norm(brand)}|${norm(name)}`;
}

/**
 * レース装備の公開データから、走力帯 × カテゴリ × 製品の匿名集計を組み立てる。
 * 公開ユーザー数が minUsersPerBucket 未満の走力帯は個人特定防止のため結果から除外する。
 */
export function buildGearStats(
  rows: GearStatsRow[],
  minUsersPerBucket: number = DEFAULT_MIN_USERS_PER_BUCKET,
): GearStatsBucketResult[] {
  const bucketOf = (r: GearStatsRow): GearStatsBucketId => r.bucket ?? UNCLASSIFIED_BUCKET;

  const bucketIds = [...new Set(rows.map(bucketOf))];

  const results: GearStatsBucketResult[] = [];

  for (const bucket of bucketIds) {
    const bucketRows = rows.filter((r) => bucketOf(r) === bucket);
    const userCount = new Set(bucketRows.map((r) => r.userRaceId)).size;
    if (userCount < minUsersPerBucket) continue;

    const categoryMap = new Map<GearCategory, Map<string, GearStatsProduct>>();

    for (const r of bucketRows) {
      const key = normalizeGearKey(r.asin, r.brand, r.name);
      if (!categoryMap.has(r.category)) categoryMap.set(r.category, new Map());
      const productMap = categoryMap.get(r.category)!;

      if (!productMap.has(key)) {
        productMap.set(key, {
          key,
          asin: r.asin,
          brand: r.brand,
          name: r.name,
          packedCount: 0,
          usedCount: 0,
        });
      }
      const product = productMap.get(key)!;
      product.packedCount += 1;
      if (r.used === true) product.usedCount += 1;
    }

    const categories: GearStatsCategoryGroup[] = [...categoryMap.entries()].map(([category, productMap]) => ({
      category,
      products: [...productMap.values()]
        .sort((a, b) => b.usedCount - a.usedCount || b.packedCount - a.packedCount)
        .slice(0, MAX_PRODUCTS_PER_CATEGORY),
    }));

    results.push({ bucket, userCount, categories });
  }

  return results;
}
