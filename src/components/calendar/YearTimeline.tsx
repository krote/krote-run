'use client';

import type { Race, Locale } from '@/lib/types';
import { Link } from '@/i18n/navigation';

interface YearTimelineProps {
  races: Race[];
  year: number;
  month: number; // 0-indexed
  locale: Locale;
  today: string;
}

const MONTH_LABELS_JA = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const MONTH_LABELS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 絶対月番号 (year*12 + month0indexed) */
function absMonth(y: number, m: number) { return y * 12 + m; }

/** 絶対月番号 → { year, month } */
function fromAbsMonth(abs: number) { return { year: Math.floor(abs / 12), month: abs % 12 }; }

/** 月の日数 */
function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }

export default function YearTimeline({ races, year, month, locale, today }: YearTimelineProps) {
  const isJa = locale === 'ja';
  const monthLabels = isJa ? MONTH_LABELS_JA : MONTH_LABELS_EN;

  // 表示ウィンドウ: 選択月-2 から 12ヶ月
  const windowStart = absMonth(year, month) - 2;
  const windowEnd   = windowStart + 11; // inclusive

  // ウィンドウ内の全大会（年をまたぐ場合も含む）
  const windowRaces = races.filter((r) => {
    const ry = parseInt(r.date.slice(0, 4));
    const rm = parseInt(r.date.slice(5, 7)) - 1;
    const abs = absMonth(ry, rm);
    return abs >= windowStart && abs <= windowEnd;
  }).sort((a, b) => a.date.localeCompare(b.date));

  const raceName = (race: Race) => isJa ? race.name_ja : (race.name_en ?? race.name_ja);

  const ROW_H = 28;
  const LABEL_W = 160;
  const CHART_W = 600;
  const MONTH_W = CHART_W / 12;
  const HEADER_H = 32;
  const svgHeight = HEADER_H + windowRaces.length * ROW_H + 16;

  /** 日付文字列 → SVG x 座標 */
  function xForDate(dateStr: string): number {
    const dy = parseInt(dateStr.slice(0, 4));
    const dm = parseInt(dateStr.slice(5, 7)) - 1;
    const dd = parseInt(dateStr.slice(8, 10));
    const slotIdx = absMonth(dy, dm) - windowStart;
    const fracInMonth = (dd - 1) / daysInMonth(dy, dm);
    return LABEL_W + (slotIdx + fracInMonth) * MONTH_W;
  }

  // 今日線
  const todayInWindow = (() => {
    const ty = parseInt(today.slice(0, 4));
    const tm = parseInt(today.slice(5, 7)) - 1;
    const abs = absMonth(ty, tm);
    if (abs < windowStart || abs > windowEnd) return null;
    return xForDate(today);
  })();

  return (
    <div>
      <svg
        width={LABEL_W + CHART_W}
        height={svgHeight}
        style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 12 }}
      >
        {/* 月グリッド線・ラベル */}
        {Array.from({ length: 12 }, (_, i) => {
          const { year: my, month: mm } = fromAbsMonth(windowStart + i);
          const x = LABEL_W + i * MONTH_W;
          const label = monthLabels[mm];
          // 年をまたぐ場合は年を付記
          const showYear = i === 0 || mm === 0;
          return (
            <g key={i}>
              <line x1={x} y1={HEADER_H} x2={x} y2={svgHeight} stroke="var(--color-border)" strokeWidth={1} />
              <text x={x + 3} y={HEADER_H - 14} fill="var(--color-light)" fontSize={9}>
                {showYear ? String(my) : ''}
              </text>
              <text x={x + 3} y={HEADER_H - 4} fill="var(--color-mid)" fontSize={10}>
                {label}
              </text>
            </g>
          );
        })}

        {/* 今日線 */}
        {todayInWindow !== null && (
          <line
            x1={todayInWindow}
            y1={HEADER_H}
            x2={todayInWindow}
            y2={svgHeight}
            stroke="var(--color-primary)"
            strokeWidth={1.5}
            strokeDasharray="4,3"
          />
        )}

        {/* 大会行 */}
        {windowRaces.map((race, i) => {
          const y = HEADER_H + i * ROW_H;
          const cx = xForDate(race.date);
          const name = raceName(race);

          return (
            <g key={race.id}>
              {/* エントリー期間帯 */}
              {race.entry_start_date && race.entry_end_date && (() => {
                const ey = parseInt(race.entry_start_date.slice(0, 4));
                const em = parseInt(race.entry_start_date.slice(5, 7)) - 1;
                const eAbs = absMonth(ey, em);
                if (eAbs < windowStart || eAbs > windowEnd) return null;
                const x1 = xForDate(race.entry_start_date);
                const x2 = xForDate(race.entry_end_date);
                return (
                  <rect x={x1} y={y + 10} width={Math.max(2, x2 - x1)} height={8} fill="#d1fae5" rx={2} />
                );
              })()}

              {/* ドット */}
              <circle cx={cx} cy={y + 14} r={5} fill="var(--color-primary)" />

              {/* 大会名 */}
              <Link href={`/races/${race.id}?from=calendar`}>
                <text x={4} y={y + 18} fill="var(--color-ink)" fontSize={11} style={{ cursor: 'pointer' }}>
                  {name.length > 20 ? name.slice(0, 19) + '…' : name}
                </text>
              </Link>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
