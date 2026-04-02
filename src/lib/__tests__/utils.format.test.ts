import { describe, it, expect } from 'vitest';
import {
  formatDate,
  formatDateShort,
  formatDateRange,
  formatDistanceKm,
  formatTimeLimitMinutes,
  formatCurrency,
  getDistanceLabel,
  cn,
} from '../utils';

describe('formatDate', () => {
  it('ja ロケールで年月日形式を返す', () => {
    const result = formatDate('2026-06-15', 'ja');
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/6/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/年/);
  });

  it('en ロケールで英語形式を返す', () => {
    const result = formatDate('2026-06-15', 'en');
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/June|Jun/);
  });

  it('異なる月でも正しくフォーマットされる', () => {
    const result = formatDate('2026-12-01', 'ja');
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/12/);
  });
});

describe('formatDateShort', () => {
  it('ja ロケールで月日形式を返す（年なし）', () => {
    const result = formatDateShort('2026-06-15', 'ja');
    expect(result).toMatch(/6/);
    expect(result).toMatch(/15/);
    expect(result).toMatch(/月/);
    expect(result).not.toMatch(/2026/);
  });

  it('en ロケールで短縮英語形式を返す（年なし）', () => {
    const result = formatDateShort('2026-06-15', 'en');
    expect(result).toMatch(/Jun/);
    expect(result).not.toMatch(/2026/);
  });
});

describe('formatDateRange', () => {
  it('同一日付は単一日付として返す', () => {
    const result = formatDateRange('2026-06-15', '2026-06-15', 'ja');
    expect(result).toMatch(/2026/);
    expect(result).not.toContain(' - ');
  });

  it('endDate なしは開始日のみ返す', () => {
    const result = formatDateRange('2026-06-15', undefined, 'ja');
    expect(result).not.toContain(' - ');
  });

  it('異なる日付は範囲形式で返す', () => {
    const result = formatDateRange('2026-06-01', '2026-06-30', 'ja');
    expect(result).toContain(' - ');
  });
});

describe('formatDistanceKm', () => {
  it('フルマラソンは "Full (42.195km)" を返す', () => {
    expect(formatDistanceKm(42.195)).toBe('Full (42.195km)');
  });

  it('ハーフマラソンは "Half (21.0975km)" を返す', () => {
    expect(formatDistanceKm(21.0975)).toBe('Half (21.0975km)');
  });

  it('その他の距離は "{n}km" を返す', () => {
    expect(formatDistanceKm(10)).toBe('10km');
    expect(formatDistanceKm(5)).toBe('5km');
    expect(formatDistanceKm(100)).toBe('100km');
  });
});

describe('formatTimeLimitMinutes', () => {
  it('ちょうど1時間は "1時間" を返す', () => {
    expect(formatTimeLimitMinutes(60)).toBe('1時間');
  });

  it('1時間30分は "1時間30分" を返す', () => {
    expect(formatTimeLimitMinutes(90)).toBe('1時間30分');
  });

  it('6時間は "6時間" を返す', () => {
    expect(formatTimeLimitMinutes(360)).toBe('6時間');
  });

  it('7時間30分は "7時間30分" を返す', () => {
    expect(formatTimeLimitMinutes(450)).toBe('7時間30分');
  });

  it('端数がゼロの場合は分表記を省略する', () => {
    expect(formatTimeLimitMinutes(120)).toBe('2時間');
    expect(formatTimeLimitMinutes(480)).toBe('8時間');
  });
});

describe('formatCurrency', () => {
  it('¥記号付きの金額を返す', () => {
    expect(formatCurrency(5000)).toBe('¥5,000');
    expect(formatCurrency(10000)).toBe('¥10,000');
    expect(formatCurrency(500)).toBe('¥500');
  });
});

describe('getDistanceLabel', () => {
  it('ja ロケールで日本語ラベルを返す', () => {
    expect(getDistanceLabel('full', 'ja')).toBe('フルマラソン');
    expect(getDistanceLabel('half', 'ja')).toBe('ハーフマラソン');
    expect(getDistanceLabel('ultra', 'ja')).toBe('ウルトラマラソン');
  });

  it('en ロケールで英語ラベルを返す', () => {
    expect(getDistanceLabel('full', 'en')).toBe('Full Marathon');
    expect(getDistanceLabel('half', 'en')).toBe('Half Marathon');
    expect(getDistanceLabel('ultra', 'en')).toBe('Ultra Marathon');
  });
});

describe('cn', () => {
  it('クラス名を結合する', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c');
  });

  it('falsy 値はスキップする', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('空の場合は空文字を返す', () => {
    expect(cn(false, null, undefined)).toBe('');
  });
});
