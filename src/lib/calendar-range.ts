/**
 * カレンダーページの表示年月を解決する。
 *
 * 前月・翌月リンクを無制限に辿れるとクローラーが `?year=2112` のような URL まで巡回し、
 * 1ページごとの SSR が Workers の CPU 制限超過を招く（2026-11 調査）。
 * そのため表示範囲を「前年1月〜翌年12月」に制限し、範囲外・不正値は null（呼び出し側で 404）とする。
 */

export type YearMonth = { year: number; month: number }; // month は 0始まり

export type CalendarMonth = YearMonth & {
  prev: YearMonth | null;
  next: YearMonth | null;
  today: YearMonth;
  isCurrent: boolean;
};

const YEAR_PATTERN = /^\d{4}$/;
const MONTH_PATTERN = /^(?:\d|1[01])$/;

/** 前年・翌年まで表示可能（今年を中心に前後1年） */
const YEARS_BEFORE = 1;
const YEARS_AFTER = 1;

const toIndex = ({ year, month }: YearMonth) => year * 12 + month;
const fromIndex = (i: number): YearMonth => ({ year: Math.floor(i / 12), month: i % 12 });

export function resolveCalendarMonth(
  params: { year?: string; month?: string },
  todayJST: string,
): CalendarMonth | null {
  const [todayYear, todayMonth1] = todayJST.split('-').map(Number);
  const today: YearMonth = { year: todayYear, month: todayMonth1 - 1 };

  if (params.year !== undefined && !YEAR_PATTERN.test(params.year)) return null;
  if (params.month !== undefined && !MONTH_PATTERN.test(params.month)) return null;

  const target: YearMonth = {
    year: params.year !== undefined ? Number(params.year) : today.year,
    month: params.month !== undefined ? Number(params.month) : today.month,
  };

  const min = toIndex({ year: today.year - YEARS_BEFORE, month: 0 });
  const max = toIndex({ year: today.year + YEARS_AFTER, month: 11 });
  const idx = toIndex(target);
  if (idx < min || idx > max) return null;

  return {
    ...target,
    prev: idx > min ? fromIndex(idx - 1) : null,
    next: idx < max ? fromIndex(idx + 1) : null,
    today,
    isCurrent: idx === toIndex(today),
  };
}
