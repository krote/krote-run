import { describe, it, expect } from 'vitest';
import { calcDayTripStatus, type TravelSettings } from '../travel';
import { HUBS } from '../hubs';
import { makeRace, makeCategory, makeReceptionSession } from './fixtures';

// ── HUBS 定数 ────────────────────────────────────────────────────────

describe('HUBS', () => {
  it('8 ハブが定義されている', () => {
    const ids = Object.keys(HUBS);
    expect(ids).toHaveLength(8);
    expect(ids).toContain('tokyo');
    expect(ids).toContain('osaka');
    expect(ids).toContain('fukuoka');
    expect(ids).toContain('sapporo');
  });

  it('各ハブに id / name_ja / name_en / lat / lng がある', () => {
    for (const hub of Object.values(HUBS)) {
      expect(hub.id).toBeTruthy();
      expect(hub.name_ja).toBeTruthy();
      expect(hub.name_en).toBeTruthy();
      expect(typeof hub.lat).toBe('number');
      expect(typeof hub.lng).toBe('number');
    }
  });
});

// ── calcDayTripStatus ────────────────────────────────────────────────

const baseSettings: TravelSettings = {
  hubId: 'tokyo',
  nearestStation: '東京駅',
  offsetMinutes: 0,
  firstTrainTime: '05:00',
};

describe('calcDayTripStatus - 前日受付のみ（overnight_required）', () => {
  it('reception_type=pre_day → overnight_required / reason=pre_day_only', () => {
    const race = makeRace({
      reception_type: 'pre_day',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, 120, baseSettings);
    expect(result.status).toBe('overnight_required');
    expect(result.reason).toBe('pre_day_only');
  });

  it('sessions が pre_day のみ（大会当日なし）→ overnight_required', () => {
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'pre_day',
      reception_sessions: [makeReceptionSession({ date: '2026-09-30' })],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, 60, baseSettings);
    expect(result.status).toBe('overnight_required');
  });
});

describe('calcDayTripStatus - start_time なし（unknown）', () => {
  it('categories が空 → unknown / reason=no_start_time', () => {
    const race = makeRace({
      reception_type: 'race_day',
      reception_sessions: [],
      categories: [],
    });
    const result = calcDayTripStatus(race, 120, baseSettings);
    expect(result.status).toBe('unknown');
    expect(result.reason).toBe('no_start_time');
  });

  it('start_time が空文字 → unknown / reason=no_start_time', () => {
    const race = makeRace({
      reception_type: 'both',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '' })],
    });
    const result = calcDayTripStatus(race, 60, baseSettings);
    expect(result.status).toBe('unknown');
    expect(result.reason).toBe('no_start_time');
  });
});

describe('calcDayTripStatus - travel_times なし（unknown）', () => {
  it('travelMinutes=null → unknown / reason=no_travel_time', () => {
    const race = makeRace({
      reception_type: 'race_day',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, null, baseSettings);
    expect(result.status).toBe('unknown');
    expect(result.reason).toBe('no_travel_time');
  });
});

describe('calcDayTripStatus - 日帰り可能（day_trip）', () => {
  it('出発時刻が始発より遅い → day_trip', () => {
    // 到着期限 = 09:00 - 30min = 08:30
    // 移動 60分、オフセット 0分 → 出発 07:30
    // 始発 05:00 より遅い → day_trip
    const race = makeRace({
      reception_type: 'race_day',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, 60, baseSettings);
    expect(result.status).toBe('day_trip');
    expect(result.departureNeeded).toBe('07:30');
  });

  it('受付締切が start_time より早い場合でも day_trip になりうる', () => {
    // 当日受付締切 08:00、移動 60分 → 出発 07:00
    // 始発 05:00 より遅い → day_trip
    const race = makeRace({
      date: '2026-10-01',
      reception_type: 'both',
      reception_sessions: [makeReceptionSession({ date: '2026-10-01', close_time: '08:00' })],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, 60, baseSettings);
    expect(result.status).toBe('day_trip');
    expect(result.departureNeeded).toBe('07:00');
  });

  it('offsetMinutes が加算される', () => {
    // 到着期限 08:30、移動 60分、オフセット 30分 → 出発 07:00
    const race = makeRace({
      reception_type: 'race_day',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const settings: TravelSettings = { ...baseSettings, offsetMinutes: 30 };
    const result = calcDayTripStatus(race, 60, settings);
    expect(result.status).toBe('day_trip');
    expect(result.departureNeeded).toBe('07:00');
  });
});

describe('calcDayTripStatus - 前泊推奨（overnight_recommended）', () => {
  it('出発時刻が始発より早い → overnight_recommended', () => {
    // 到着期限 08:30、移動 240分 → 出発 04:30
    // 始発 05:00 より早い → overnight_recommended
    const race = makeRace({
      reception_type: 'race_day',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, 240, baseSettings);
    expect(result.status).toBe('overnight_recommended');
    expect(result.reason).toBe('travel_time');
    expect(result.departureNeeded).toBe('04:30');
  });

  it('firstTrainTime を変更した場合に影響する', () => {
    // 到着期限 08:30、移動 60分 → 出発 07:30
    // 始発 08:00 より早い → overnight_recommended
    const race = makeRace({
      reception_type: 'race_day',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const settings: TravelSettings = { ...baseSettings, firstTrainTime: '08:00' };
    const result = calcDayTripStatus(race, 60, settings);
    expect(result.status).toBe('overnight_recommended');
  });

  it('北海道マラソン × 東京ハブ（遠距離）→ overnight_recommended', () => {
    // 到着期限 07:00 (スタート 07:30 - 30min), 移動 360分 → 出発 01:00
    const race = makeRace({
      reception_type: 'race_day',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '07:30' })],
    });
    const result = calcDayTripStatus(race, 360, baseSettings);
    expect(result.status).toBe('overnight_recommended');
    expect(result.departureNeeded).toBe('01:00');
  });
});

describe('calcDayTripStatus - 板橋City × 東京ハブ（近距離）', () => {
  it('近隣大会 → day_trip + departureNeeded', () => {
    // 到着期限 09:00 - 30min = 08:30、移動 30分 → 出発 08:00
    const race = makeRace({
      reception_type: 'race_day',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, 30, baseSettings);
    expect(result.status).toBe('day_trip');
    expect(result.departureNeeded).toBe('08:00');
  });
});

describe('calcDayTripStatus - pre_mail（受付なし）', () => {
  it('pre_mail → 受付制約なし、スタート時刻基準で当日移動計算', () => {
    // pre_mail は受付なし → overnight_required にならない
    // 到着期限 08:30、移動 60分 → 出発 07:30 → day_trip
    const race = makeRace({
      reception_type: 'pre_mail',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, 60, baseSettings);
    expect(result.status).toBe('day_trip');
    expect(result.departureNeeded).toBe('07:30');
  });

  it('none → 受付制約なし、スタート時刻基準で当日移動計算', () => {
    const race = makeRace({
      reception_type: 'none',
      reception_sessions: [],
      categories: [makeCategory({ start_time: '09:00' })],
    });
    const result = calcDayTripStatus(race, 60, baseSettings);
    expect(result.status).toBe('day_trip');
  });
});
