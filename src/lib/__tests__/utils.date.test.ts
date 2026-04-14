import { describe, it, expect, vi, afterEach } from 'vitest';
import { getTodayJST } from '../utils';

describe('getTodayJST', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('YYYY-MM-DD 形式の文字列を返す', () => {
    const result = getTodayJST();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('UTC 2026-04-14T00:00:00Z → JST 2026-04-14 を返す（UTCの午前はJSTと同日）', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-14T00:00:00Z')); // JST 09:00
    expect(getTodayJST()).toBe('2026-04-14');
  });

  it('UTC 2026-04-13T15:00:00Z → JST 2026-04-14 を返す（UTC深夜はJSTで翌日）', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-13T15:00:00Z')); // JST 2026-04-14T00:00:00
    expect(getTodayJST()).toBe('2026-04-14');
  });

  it('UTC 2026-04-13T14:59:59Z → JST 2026-04-13 を返す（JST まだ前日）', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-13T14:59:59Z')); // JST 2026-04-13T23:59:59
    expect(getTodayJST()).toBe('2026-04-13');
  });

  it('年またぎ: UTC 2025-12-31T15:00:00Z → JST 2026-01-01 を返す', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-12-31T15:00:00Z')); // JST 2026-01-01T00:00:00
    expect(getTodayJST()).toBe('2026-01-01');
  });
});
