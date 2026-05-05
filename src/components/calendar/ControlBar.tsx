'use client';

export type StatusFilter = 'all' | 'open' | 'soon' | 'closed';

interface ControlBarProps {
  status: StatusFilter;
  region: string;
  onStatusChange: (status: StatusFilter) => void;
  onRegionChange: (region: string) => void;
  regions: string[];
  locale: string;
}

const STATUS_OPTIONS: { value: StatusFilter; ja: string; en: string }[] = [
  { value: 'all', ja: 'すべて', en: 'All' },
  { value: 'open', ja: '受付中', en: 'Open' },
  { value: 'soon', ja: 'まもなく', en: 'Coming Soon' },
  { value: 'closed', ja: '終了', en: 'Closed' },
];

export default function ControlBar({
  status,
  region,
  onStatusChange,
  onRegionChange,
  regions,
  locale,
}: ControlBarProps) {
  const isJa = locale === 'ja';

  return (
    <div className="flex flex-col gap-3 mb-4">
      {/* Status filter */}
      <div className="flex flex-wrap gap-1.5">
        {STATUS_OPTIONS.map((opt) => {
          const isActive = status === opt.value;
          return (
            <button
              key={opt.value}
              data-active={isActive ? 'true' : undefined}
              onClick={() => onStatusChange(opt.value)}
              className="px-3 py-1 text-xs font-semibold rounded-[3px] transition-colors"
              style={{
                background: isActive ? 'var(--color-primary)' : 'var(--color-cream)',
                color: isActive ? 'white' : 'var(--color-ink)',
                border: `1px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
              }}
            >
              {isJa ? opt.ja : opt.en}
            </button>
          );
        })}
      </div>

      {/* Region filter */}
      <div className="flex flex-wrap gap-1.5">
        <button
          data-active={region === 'all' ? 'true' : undefined}
          onClick={() => onRegionChange('all')}
          className="px-3 py-1 text-xs font-semibold rounded-[3px] transition-colors"
          style={{
            background: region === 'all' ? 'var(--color-ink)' : 'var(--color-cream)',
            color: region === 'all' ? 'white' : 'var(--color-ink)',
            border: `1px solid ${region === 'all' ? 'var(--color-ink)' : 'var(--color-border)'}`,
          }}
        >
          {isJa ? 'すべて' : 'All'}
        </button>
        {regions.map((r) => {
          const isActive = region === r;
          return (
            <button
              key={r}
              data-active={isActive ? 'true' : undefined}
              onClick={() => onRegionChange(r)}
              className="px-3 py-1 text-xs font-semibold rounded-[3px] transition-colors"
              style={{
                background: isActive ? 'var(--color-ink)' : 'var(--color-cream)',
                color: isActive ? 'white' : 'var(--color-ink)',
                border: `1px solid ${isActive ? 'var(--color-ink)' : 'var(--color-border)'}`,
              }}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
}
