import type { DayTripStatus } from '@/lib/travel';

interface DayTripBadgeProps {
  status: DayTripStatus | null;
  locale: string;
  className?: string;
}

const REASON_LABEL: Record<string, { ja: string; en: string }> = {
  pre_day_only: { ja: '前日受付のみ', en: 'Reception on race-eve only' },
  travel_time: { ja: '移動時間による判定', en: 'Based on travel time' },
};

/**
 * 大会カード・詳細ページ共通の前泊ステータスバッジ。
 * status が null、または unknown/no_start_time（判定不能）のときは何も表示しない。
 */
export default function DayTripBadge({ status, locale, className }: DayTripBadgeProps) {
  if (!status) return null;
  if (status.status === 'unknown' && status.reason === 'no_start_time') return null;

  const base = `inline-block text-[0.6rem] font-semibold px-2 py-0.5 rounded-[2px] ${className ?? ''}`;

  if (status.status === 'overnight_required') {
    const reason = REASON_LABEL[status.reason];
    return (
      <span
        className={base}
        style={{ background: '#fef3c7', color: '#92400e' }}
        title={locale === 'ja' ? reason.ja : reason.en}
      >
        {locale === 'ja' ? '前泊必須' : 'Overnight Required'}
      </span>
    );
  }

  if (status.status === 'overnight_recommended') {
    const reason = REASON_LABEL[status.reason];
    return (
      <span
        className={base}
        style={{ background: '#fef9c3', color: '#713f12' }}
        title={locale === 'ja' ? reason.ja : reason.en}
      >
        {locale === 'ja'
          ? `前泊推奨（${status.departureNeeded}発が必要）`
          : `Overnight Rec. (departs ${status.departureNeeded})`}
      </span>
    );
  }

  if (status.status === 'day_trip') {
    return (
      <span className={base} style={{ background: '#dcfce7', color: '#166534' }}>
        {locale === 'ja'
          ? `日帰り可 ${status.departureNeeded}発`
          : `Day trip · departs ${status.departureNeeded}`}
      </span>
    );
  }

  // unknown / no_travel_time
  return (
    <span className={base} style={{ background: '#f1f5f9', color: '#475569' }}>
      {locale === 'ja' ? '移動時間不明' : 'Travel time unknown'}
    </span>
  );
}
