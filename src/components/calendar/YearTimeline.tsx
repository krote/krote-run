'use client';

import type { Race, Locale } from '@/lib/types';
import { Link } from '@/i18n/navigation';

interface YearTimelineProps {
  races: Race[];
  year: number;
  locale: Locale;
  today: string;
}

const MONTH_LABELS_JA = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
const MONTH_LABELS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function dayOfYear(dateStr: string): number {
  const d = new Date(dateStr + 'T00:00:00');
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function daysInYear(year: number): number {
  return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 366 : 365;
}

function monthStartDay(year: number, month: number): number {
  const d = new Date(year, month, 1);
  const start = new Date(year, 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

export default function YearTimeline({ races, year, locale, today }: YearTimelineProps) {
  const isJa = locale === 'ja';
  const monthLabels = isJa ? MONTH_LABELS_JA : MONTH_LABELS_EN;
  const totalDays = daysInYear(year);

  // 対象年の大会のみ
  const yearRaces = races.filter((r) => r.date.startsWith(String(year)));
  const raceName = (race: Race) => isJa ? race.name_ja : (race.name_en ?? race.name_ja);

  const ROW_H = 28;
  const LABEL_W = 160;
  const CHART_W = 600;
  const HEADER_H = 32;
  const svgHeight = HEADER_H + yearRaces.length * ROW_H + 16;

  const xForDay = (day: number) => LABEL_W + (day / totalDays) * CHART_W;

  const todayDay = today.startsWith(String(year)) ? dayOfYear(today) : null;

  return (
    <div className="overflow-x-auto">
      <svg
        width={LABEL_W + CHART_W}
        height={svgHeight}
        style={{ fontFamily: 'var(--font-dm-sans, sans-serif)', fontSize: 12 }}
      >
        {/* Month grid lines & labels */}
        {Array.from({ length: 12 }, (_, m) => {
          const x = xForDay(monthStartDay(year, m));
          return (
            <g key={m}>
              <line x1={x} y1={HEADER_H} x2={x} y2={svgHeight} stroke="var(--color-border)" strokeWidth={1} />
              <text x={x + 4} y={HEADER_H - 6} fill="var(--color-mid)" fontSize={10}>
                {monthLabels[m]}
              </text>
            </g>
          );
        })}

        {/* Today line */}
        {todayDay !== null && (
          <line
            x1={xForDay(todayDay)}
            y1={HEADER_H}
            x2={xForDay(todayDay)}
            y2={svgHeight}
            stroke="var(--color-primary)"
            strokeWidth={1.5}
            strokeDasharray="4,3"
          />
        )}

        {/* Race rows */}
        {yearRaces.map((race, i) => {
          const y = HEADER_H + i * ROW_H;
          const raceDay = dayOfYear(race.date);
          const cx = xForDay(raceDay);
          const name = raceName(race);

          return (
            <g key={race.id}>
              {/* Entry period band */}
              {race.entry_start_date && race.entry_end_date &&
                race.entry_start_date.startsWith(String(year)) && (
                <rect
                  x={xForDay(dayOfYear(race.entry_start_date))}
                  y={y + 10}
                  width={Math.max(
                    2,
                    xForDay(dayOfYear(race.entry_end_date)) - xForDay(dayOfYear(race.entry_start_date))
                  )}
                  height={8}
                  fill="#d1fae5"
                  rx={2}
                />
              )}

              {/* Race dot */}
              <circle cx={cx} cy={y + 14} r={5} fill="var(--color-primary)" />

              {/* Race name label */}
              <Link href={`/races/${race.id}?from=calendar`}>
                <text
                  x={4}
                  y={y + 18}
                  fill="var(--color-ink)"
                  fontSize={11}
                  style={{ cursor: 'pointer' }}
                >
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
