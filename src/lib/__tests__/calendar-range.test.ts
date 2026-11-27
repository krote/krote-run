import { describe, it, expect } from 'vitest';
import { resolveCalendarMonth } from '../calendar-range';

// 基準日: 2026-11-28（JST）→ 表示可能範囲は 2025年1月〜2027年12月
const TODAY = '2026-11-28';

describe('resolveCalendarMonth()', () => {
  it('クエリなしなら今月を返す（month は 0始まり）', () => {
    const r = resolveCalendarMonth({}, TODAY);
    expect(r).toMatchObject({ year: 2026, month: 10, isCurrent: true });
    expect(r?.today).toEqual({ year: 2026, month: 10 });
  });

  it('範囲内の年月は前月・翌月リンクを持つ', () => {
    const r = resolveCalendarMonth({ year: '2026', month: '0' }, TODAY);
    expect(r).toMatchObject({ year: 2026, month: 0, isCurrent: false });
    expect(r?.prev).toEqual({ year: 2025, month: 11 });
    expect(r?.next).toEqual({ year: 2026, month: 1 });
  });

  it('範囲の先頭（前年1月）では前月リンクを出さない', () => {
    const r = resolveCalendarMonth({ year: '2025', month: '0' }, TODAY);
    expect(r?.prev).toBeNull();
    expect(r?.next).toEqual({ year: 2025, month: 1 });
  });

  it('範囲の末尾（翌年12月）では翌月リンクを出さない', () => {
    const r = resolveCalendarMonth({ year: '2027', month: '11' }, TODAY);
    expect(r?.next).toBeNull();
    expect(r?.prev).toEqual({ year: 2027, month: 10 });
  });

  it('範囲外の年は null（404 扱い）', () => {
    expect(resolveCalendarMonth({ year: '2024', month: '11' }, TODAY)).toBeNull();
    expect(resolveCalendarMonth({ year: '2028', month: '0' }, TODAY)).toBeNull();
    expect(resolveCalendarMonth({ year: '2112', month: '8' }, TODAY)).toBeNull();
  });

  it('不正な値は null（404 扱い）', () => {
    expect(resolveCalendarMonth({ year: 'abc', month: '1' }, TODAY)).toBeNull();
    expect(resolveCalendarMonth({ year: '2026', month: '12' }, TODAY)).toBeNull();
    expect(resolveCalendarMonth({ year: '2026', month: '-1' }, TODAY)).toBeNull();
    expect(resolveCalendarMonth({ year: '2026', month: '1.5' }, TODAY)).toBeNull();
    expect(resolveCalendarMonth({ year: '2026abc', month: '1' }, TODAY)).toBeNull();
  });

  it('片方だけ指定された場合は残りを今月で補う', () => {
    expect(resolveCalendarMonth({ month: '3' }, TODAY)).toMatchObject({ year: 2026, month: 3 });
    expect(resolveCalendarMonth({ year: '2027' }, TODAY)).toMatchObject({ year: 2027, month: 10 });
  });

  it('年をまたぐ前月・翌月を正しく計算する', () => {
    const r = resolveCalendarMonth({ year: '2026', month: '11' }, TODAY);
    expect(r?.next).toEqual({ year: 2027, month: 0 });
    expect(r?.prev).toEqual({ year: 2026, month: 10 });
  });
});
