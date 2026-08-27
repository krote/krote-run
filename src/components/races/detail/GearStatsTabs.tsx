'use client';

import { useState } from 'react';

export interface GearStatsViewProduct {
  key: string;
  label: string;
  usedCount: number;
  packedCount: number;
  url: string | null;
}

export interface GearStatsViewCategory {
  category: string;
  categoryLabel: string;
  products: GearStatsViewProduct[];
}

export interface GearStatsViewBucket {
  bucketId: string;
  bucketLabel: string;
  userCount: number;
  categories: GearStatsViewCategory[];
}

interface Props {
  buckets: GearStatsViewBucket[];
  labels: {
    userCountSuffix: string; // 例: "人が公開"
    used: string;
    packed: string;
  };
}

export default function GearStatsTabs({ buckets, labels }: Props) {
  const [activeBucket, setActiveBucket] = useState(buckets[0]?.bucketId ?? '');
  const active = buckets.find((b) => b.bucketId === activeBucket) ?? buckets[0];

  if (!active) return null;

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-5">
        {buckets.map((b) => {
          const isActive = b.bucketId === active.bucketId;
          return (
            <button
              key={b.bucketId}
              onClick={() => setActiveBucket(b.bucketId)}
              className="text-xs px-3 py-1.5 rounded-[3px] font-medium transition-colors"
              style={{
                background: isActive ? 'var(--color-primary)' : 'var(--color-cream)',
                color: isActive ? '#fff' : 'var(--color-ink2)',
                border: '1px solid var(--color-border)',
              }}
            >
              {b.bucketLabel}
              <span className="ml-1 opacity-80">
                ({b.userCount}{labels.userCountSuffix})
              </span>
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        {active.categories.map((cat) => (
          <div key={cat.category}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-mid)' }}>
              {cat.categoryLabel}
            </p>
            <ul className="space-y-2">
              {cat.products.map((p) => {
                const maxCount = cat.products[0]?.usedCount || 1;
                const content = (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                        {p.label}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-mid)' }}>
                        {labels.used} {p.usedCount} / {labels.packed} {p.packedCount}
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: 'var(--color-border)' }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.max(4, (p.usedCount / maxCount) * 100)}%`,
                          background: 'var(--color-primary)',
                        }}
                      />
                    </div>
                  </>
                );
                return (
                  <li key={p.key}>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="block no-underline hover:opacity-80 transition-opacity"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
