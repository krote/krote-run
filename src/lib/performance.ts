import type { PerformanceBucketId } from './types';

// 境界値テーブル（秒）: 「この秒数より小さければこのバケット」を上から順に評価
// ちょうど境界値は次のバケット（例: 3:00:00 = 10800s は sub3 ではなく sub330）
const FULL_THRESHOLDS: [number, PerformanceBucketId][] = [
  [10800, 'sub3'],    // < 3:00:00
  [12600, 'sub330'],  // < 3:30:00
  [14400, 'sub4'],    // < 4:00:00
  [16200, 'sub430'],  // < 4:30:00
  [18000, 'sub5'],    // < 5:00:00
];

const HALF_THRESHOLDS: [number, PerformanceBucketId][] = [
  [5400,  'sub130'],  // < 1:30:00
  [6300,  'sub145'],  // < 1:45:00
  [7200,  'sub2'],    // < 2:00:00
];

const ULTRA_THRESHOLDS: [number, PerformanceBucketId][] = [
  [36000, 'sub10'],   // < 10:00:00
  [39600, 'sub11'],   // < 11:00:00
  [43200, 'sub12'],   // < 12:00:00
  [46800, 'sub13'],   // < 13:00:00
];

function applyThresholds(
  sec: number,
  thresholds: [number, PerformanceBucketId][],
  fallback: PerformanceBucketId,
): PerformanceBucketId {
  for (const [limit, bucket] of thresholds) {
    if (sec < limit) return bucket;
  }
  return fallback;
}

/**
 * フィニッシュタイム（秒）と距離種別から走力帯を導出する。
 * 0 以下・未知の distance_type は null を返す。
 */
export function derivePerformanceBucket(
  distanceType: string,
  finishTimeSec: number,
): PerformanceBucketId | null {
  if (finishTimeSec <= 0) return null;

  switch (distanceType) {
    case 'full':
      return applyThresholds(finishTimeSec, FULL_THRESHOLDS, 'over5');
    case 'half':
      return applyThresholds(finishTimeSec, HALF_THRESHOLDS, 'over2');
    case 'ultra':
      return applyThresholds(finishTimeSec, ULTRA_THRESHOLDS, 'over13');
    case '10k':
    case '5k':
    case 'other':
      return 'all';
    default:
      return null;
  }
}

/**
 * 走力帯 ID から i18n メッセージキーを返す（例: 'performance.sub3'）。
 */
export function getPerformanceBucketMessageKey(bucket: PerformanceBucketId): string {
  return `performance.${bucket}`;
}
