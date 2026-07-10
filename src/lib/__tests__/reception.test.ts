import { describe, it, expect } from 'vitest';
import { canReceiveOnRaceDay, getRaceDayReceptionClose, getArrivalDeadline } from '../reception';
import { makeRace, makeReceptionSession, makeCategory } from './fixtures';

// ── canReceiveOnRaceDay ──────────────────────────────────────────────

describe('canReceiveOnRaceDay', () => {
  describe('reception_type フォールバック（sessions なし）', () => {
    it('pre_day → false', () => {
      expect(canReceiveOnRaceDay(makeRace({ reception_type: 'pre_day', reception_sessions: [] }))).toBe(false);
    });

    it('pre_mail → false', () => {
      expect(canReceiveOnRaceDay(makeRace({ reception_type: 'pre_mail', reception_sessions: [] }))).toBe(false);
    });

    it('none → false', () => {
      expect(canReceiveOnRaceDay(makeRace({ reception_type: 'none', reception_sessions: [] }))).toBe(false);
    });

    it('both → true', () => {
      expect(canReceiveOnRaceDay(makeRace({ reception_type: 'both', reception_sessions: [] }))).toBe(true);
    });

    it('race_day → true', () => {
      expect(canReceiveOnRaceDay(makeRace({ reception_type: 'race_day', reception_sessions: [] }))).toBe(true);
    });
  });

  describe('sessions 優先判定', () => {
    it('大会当日と同じ日付の session がある → true', () => {
      const race = makeRace({
        date: '2026-10-01',
        reception_type: 'pre_day',
        reception_sessions: [makeReceptionSession({ date: '2026-10-01' })],
      });
      expect(canReceiveOnRaceDay(race)).toBe(true);
    });

    it('前日の session のみ（大会当日なし）→ false', () => {
      const race = makeRace({
        date: '2026-10-01',
        reception_type: 'pre_day',
        reception_sessions: [makeReceptionSession({ date: '2026-09-30' })],
      });
      expect(canReceiveOnRaceDay(race)).toBe(false);
    });

    it('複数 sessions のうち 1 件が大会当日 → true', () => {
      const race = makeRace({
        date: '2026-10-01',
        reception_type: 'both',
        reception_sessions: [
          makeReceptionSession({ id: 1, date: '2026-09-30' }),
          makeReceptionSession({ id: 2, date: '2026-10-01' }),
        ],
      });
      expect(canReceiveOnRaceDay(race)).toBe(true);
    });
  });
});

// ── getRaceDayReceptionClose ─────────────────────────────────────────

describe('getRaceDayReceptionClose', () => {
  it('大会当日 session に close_time がある → その時刻を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [makeReceptionSession({ date: '2026-10-01', close_time: '08:30' })],
    });
    expect(getRaceDayReceptionClose(race)).toBe('08:30');
  });

  it('大会当日 session の close_time が null → null', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [makeReceptionSession({ date: '2026-10-01', close_time: null })],
    });
    expect(getRaceDayReceptionClose(race)).toBeNull();
  });

  it('前日 session のみ → null', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [makeReceptionSession({ date: '2026-09-30', close_time: '18:00' })],
    });
    expect(getRaceDayReceptionClose(race)).toBeNull();
  });

  it('sessions 空 → null', () => {
    const race = makeRace({ date: '2026-10-01', reception_sessions: [] });
    expect(getRaceDayReceptionClose(race)).toBeNull();
  });

  it('複数 sessions から大会当日分を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [
        makeReceptionSession({ id: 1, date: '2026-09-30', close_time: '18:00' }),
        makeReceptionSession({ id: 2, date: '2026-10-01', close_time: '07:30' }),
      ],
    });
    expect(getRaceDayReceptionClose(race)).toBe('07:30');
  });
});

// ── getArrivalDeadline ───────────────────────────────────────────────

describe('getArrivalDeadline', () => {
  it('start_time あり・当日受付締切なし → start_time - 30分', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    expect(getArrivalDeadline(race)).toBe('08:30');
  });

  it('当日受付締切が start_time - 30分より早い → 受付締切を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [makeReceptionSession({ date: '2026-10-01', close_time: '08:00' })],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    // min(09:00-30min=08:30, 08:00) = 08:00
    expect(getArrivalDeadline(race)).toBe('08:00');
  });

  it('当日受付締切が start_time - 30分より遅い → start_time - 30分を返す', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [makeReceptionSession({ date: '2026-10-01', close_time: '09:00' })],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    // min(09:00-30min=08:30, 09:00) = 08:30
    expect(getArrivalDeadline(race)).toBe('08:30');
  });

  it('categories が空 → null', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [],
      categories: [],
    });
    expect(getArrivalDeadline(race)).toBeNull();
  });

  it('start_time が空文字 → null', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '' })],
    });
    expect(getArrivalDeadline(race)).toBeNull();
  });

  it('複数 categories の最早 start_time を使う', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [],
      categories: [
        makeCategory({ id: 1, start_time: '09:00' }),
        makeCategory({ id: 2, start_time: '08:00' }),
        makeCategory({ id: 3, start_time: '10:00' }),
      ],
    });
    // 最早=08:00、08:00-30分=07:30
    expect(getArrivalDeadline(race)).toBe('07:30');
  });

  it('pre_mail（受付なし）でも start_time 基準で計算される', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'pre_mail',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '10:00' })],
    });
    expect(getArrivalDeadline(race)).toBe('09:30');
  });

  it('当日受付締切の close_time が null の場合は start_time 基準', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [makeReceptionSession({ date: '2026-10-01', close_time: null })],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    expect(getArrivalDeadline(race)).toBe('08:30');
  });

  it('start_time が 00:20 の場合、deadline は前日時刻（23:50）', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '00:20' })],
    });
    // 00:20 - 30分 = -10分 → 23:50（翌日の前日）
    expect(getArrivalDeadline(race)).toBe('23:50');
  });
});
