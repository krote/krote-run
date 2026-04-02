import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { vi } from 'vitest';
import { getRaceStatus } from '../utils';
import { makeRace, makeEntryPeriod } from './fixtures';

// 現在日時を固定して再現性を確保する
const TODAY = '2026-04-02';
const TODAY_ISO = `${TODAY}T12:00:00.000Z`;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(TODAY_ISO));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getRaceStatus - 開催済み', () => {
  it('race.date が今日より前なら "past" を返す', () => {
    const race = makeRace({ date: '2026-04-01' });
    expect(getRaceStatus(race)).toBe('past');
  });

  it('race.date が今日と同じ日は "past" にならない', () => {
    const race = makeRace({ date: TODAY });
    expect(getRaceStatus(race)).not.toBe('past');
  });
});

describe('getRaceStatus - entry_periods を使用した判定', () => {
  it('今日が期間内なら "open_entry" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })],
    });
    expect(getRaceStatus(race)).toBe('open_entry');
  });

  it('今日が期間の初日なら "open_entry" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: TODAY, end_date: '2026-06-30' })],
    });
    expect(getRaceStatus(race)).toBe('open_entry');
  });

  it('今日が期間の最終日なら "open_entry" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: TODAY })],
    });
    expect(getRaceStatus(race)).toBe('open_entry');
  });

  it('複数期間のうち1つが今日を含む場合 "open_entry" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [
        makeEntryPeriod({ id: 1, start_date: '2026-01-01', end_date: '2026-02-28' }),
        makeEntryPeriod({ id: 2, start_date: '2026-03-01', end_date: '2026-06-30' }),
      ],
    });
    expect(getRaceStatus(race)).toBe('open_entry');
  });

  it('全期間が未来なら "entry_not_open" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-05-01', end_date: '2026-07-31' })],
    });
    expect(getRaceStatus(race)).toBe('entry_not_open');
  });

  it('全期間が過去でかつ大会が未来なら "entry_closed" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-01-01', end_date: '2026-03-31' })],
    });
    expect(getRaceStatus(race)).toBe('entry_closed');
  });
});

describe('getRaceStatus - 旧フィールド（entry_start_date / entry_end_date）へのフォールバック', () => {
  it('entry_periods が空で旧フィールドが期間内なら "open_entry" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [],
      entry_start_date: '2026-03-01',
      entry_end_date: '2026-06-30',
    });
    expect(getRaceStatus(race)).toBe('open_entry');
  });

  it('entry_periods が空で旧フィールドが未来なら "entry_not_open" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [],
      entry_start_date: '2026-05-01',
      entry_end_date: '2026-07-31',
    });
    expect(getRaceStatus(race)).toBe('entry_not_open');
  });

  it('entry_periods が空で旧フィールドも null なら "entry_closed" を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [],
      entry_start_date: null,
      entry_end_date: null,
    });
    expect(getRaceStatus(race)).toBe('entry_closed');
  });

  it('entry_periods がある場合は旧フィールドより優先される', () => {
    // 旧フィールドは期間内だが entry_periods は全て未来
    const race = makeRace({
      date: '2026-10-01',
      entry_periods: [makeEntryPeriod({ start_date: '2026-06-01', end_date: '2026-08-31' })],
      entry_start_date: '2026-03-01',
      entry_end_date: '2026-06-30',
    });
    expect(getRaceStatus(race)).toBe('entry_not_open');
  });
});
