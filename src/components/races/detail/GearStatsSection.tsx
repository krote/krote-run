import type { Locale } from '@/lib/types';
import { PERFORMANCE_BUCKETS_FULL, PERFORMANCE_BUCKETS_HALF, PERFORMANCE_BUCKETS_ULTRA, PERFORMANCE_BUCKET_ALL } from '@/lib/types';
import type { GearStatsBucketResult } from '@/lib/gear-stats';
import { UNCLASSIFIED_BUCKET } from '@/lib/gear-stats';
import { buildAmazonUrl } from '@/lib/amazon';
import { getPerformanceBucketMessageKey } from '@/lib/performance';
import GearStatsTabs, { type GearStatsViewBucket } from './GearStatsTabs';

interface Props {
  stats: GearStatsBucketResult[];
  locale: Locale;
  tGear: (key: string) => string;
  tPerf: (key: string) => string;
}

const BUCKET_ORDER = [
  ...PERFORMANCE_BUCKETS_FULL,
  ...PERFORMANCE_BUCKETS_HALF,
  ...PERFORMANCE_BUCKETS_ULTRA,
  ...PERFORMANCE_BUCKET_ALL,
  UNCLASSIFIED_BUCKET,
];

function categoryLabelKey(category: string): string {
  return `category${category.charAt(0).toUpperCase()}${category.slice(1)}`;
}

export default function GearStatsSection({ stats, locale, tGear, tPerf }: Props) {
  const sorted = [...stats].sort(
    (a, b) => BUCKET_ORDER.indexOf(a.bucket as (typeof BUCKET_ORDER)[number]) - BUCKET_ORDER.indexOf(b.bucket as (typeof BUCKET_ORDER)[number]),
  );

  const buckets: GearStatsViewBucket[] = sorted.map((b) => ({
    bucketId: b.bucket,
    bucketLabel: b.bucket === UNCLASSIFIED_BUCKET
      ? (locale === 'ja' ? '未分類' : 'Unclassified')
      : tPerf(getPerformanceBucketMessageKey(b.bucket)),
    userCount: b.userCount,
    categories: b.categories.map((c) => ({
      category: c.category,
      categoryLabel: tGear(categoryLabelKey(c.category)),
      products: c.products.map((p) => ({
        key: p.key,
        label: p.brand ? `${p.brand} ${p.name}` : p.name,
        usedCount: p.usedCount,
        packedCount: p.packedCount,
        url: p.asin ? buildAmazonUrl(p.asin) : null,
      })),
    })),
  }));

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: 'var(--color-ink2)' }}>
        {locale === 'ja'
          ? '参加者が公開した装備を、走力帯（フィニッシュタイム）別に匿名集計しています。'
          : "Anonymous aggregation of gear shared by participants, grouped by finish-time bracket."}
      </p>

      {buckets.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--color-mid)' }}>
          {locale === 'ja'
            ? 'まだ装備データがありません。参加した方はマイページから装備を公開できます。'
            : 'No gear data yet. If you took part in this race, you can share your gear from your My Page.'}
        </p>
      ) : (
        <GearStatsTabs
          buckets={buckets}
          labels={{
            userCountSuffix: locale === 'ja' ? '人' : '',
            used: locale === 'ja' ? '使用' : 'Used',
            packed: locale === 'ja' ? '携行' : 'Packed',
          }}
        />
      )}
    </div>
  );
}
