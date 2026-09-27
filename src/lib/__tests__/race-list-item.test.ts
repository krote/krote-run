import { describe, it, expect } from 'vitest';
import { toRaceListItem, SUMMARY_MAX_LENGTH } from '../race-list-item';
import { makeRace, makeCategory, makeEntryPeriod, makeParticipationGift, makeCompletionGift, makeReceptionSession, makeRaceTravelTime } from './fixtures';

/**
 * 一覧・カレンダーは `Race` をまるごとクライアントへ直列化していたため、
 * HTML の 64%（590KB）が大会データだった。表示・絞り込みに使う分だけに射影する。
 */
describe('toRaceListItem', () => {
  it('一覧で使わない子テーブルは持たない', () => {
    const item = toRaceListItem(makeRace(), 'ja');
    expect(item).not.toHaveProperty('aid_stations');
    expect(item).not.toHaveProperty('checkpoints');
    expect(item).not.toHaveProperty('nearby_spots');
    expect(item).not.toHaveProperty('weather_history');
    expect(item).not.toHaveProperty('access_points');
    expect(item).not.toHaveProperty('gallery');
    expect(item).not.toHaveProperty('voices');
    expect(item).not.toHaveProperty('time_buckets');
    expect(item).not.toHaveProperty('result');
    expect(item).not.toHaveProperty('course_info');
  });

  it('表示しない言語のテキストは持たない', () => {
    const item = toRaceListItem(makeRace(), 'ja');
    expect(item).not.toHaveProperty('city_en');
    expect(item).not.toHaveProperty('description_ja');
    expect(item).not.toHaveProperty('description_en');
  });

  it('検索は日英どちらの大会名にも当たるため両方の名前を残す', () => {
    const item = toRaceListItem(makeRace(), 'ja');
    expect(item.name_ja).toBe('テスト大会2026');
    expect(item.name_en).toBe('Test Race 2026');
  });

  it('市区町村はロケールに応じて解決する', () => {
    expect(toRaceListItem(makeRace(), 'ja').city).toBe('東京都');
    expect(toRaceListItem(makeRace(), 'en').city).toBe('Tokyo');
  });

  describe('summary（カード表示用の説明文）', () => {
    it('ロケールに応じた説明文を使う', () => {
      expect(toRaceListItem(makeRace(), 'ja').summary).toBe('テスト用の大会です');
      expect(toRaceListItem(makeRace(), 'en').summary).toBe('A test race');
    });

    it('カードの表示長を超える分は切り詰める', () => {
      const long = 'あ'.repeat(SUMMARY_MAX_LENGTH + 50);
      const item = toRaceListItem(makeRace({ description_ja: long }), 'ja');
      expect(item.summary.length).toBeLessThanOrEqual(SUMMARY_MAX_LENGTH);
    });
  });

  describe('categories', () => {
    it('カードと絞り込みが使う項目だけを残す', () => {
      const race = makeRace({ categories: [makeCategory({ name_ja: 'フル', eligibility_ja: '18歳以上' })] });
      const [cat] = toRaceListItem(race, 'ja').categories;
      expect(cat).toEqual({
        distance_type: 'full',
        distance_km: 42.195,
        time_limit_minutes: 360,
        start_time: '09:00',
        entry_fee: null,
        name_ja: 'フル',
        name_en: null,
      });
    });
  });

  describe('参加賞', () => {
    it('絞り込みに使う参加賞カテゴリIDだけを残す', () => {
      const race = makeRace({
        participation_gifts: [makeParticipationGift({ gift_categories: ['tshirt'] })],
        completion_gifts: [makeCompletionGift({ gift_categories: ['medal', 'tshirt'] })],
      });
      const item = toRaceListItem(race, 'ja');
      expect([...item.gift_category_ids].sort()).toEqual(['medal', 'tshirt']);
      expect(item).not.toHaveProperty('participation_gifts');
      expect(item).not.toHaveProperty('completion_gifts');
    });
  });

  describe('日帰り判定に必要なデータ', () => {
    it('受付方式・当日受付の締切・移動時間を残す', () => {
      const race = makeRace({
        reception_type: 'both',
        reception_sessions: [makeReceptionSession({ date: '2026-10-01', close_time: '08:00' })],
        travel_times: [makeRaceTravelTime({ hub_id: 'tokyo', duration_minutes: 90 })],
      });
      const item = toRaceListItem(race, 'ja');
      expect(item.reception_type).toBe('both');
      expect(item.reception_sessions).toEqual([{ date: '2026-10-01', close_time: '08:00' }]);
      expect(item.travel_times).toEqual([{ hub_id: 'tokyo', duration_minutes: 90 }]);
    });
  });

  describe('エントリー期間', () => {
    it('ステータス判定に使う日付だけを残す', () => {
      const race = makeRace({ entry_periods: [makeEntryPeriod({ start_date: '2026-03-01', end_date: '2026-06-30' })] });
      expect(toRaceListItem(race, 'ja').entry_periods).toEqual([{ start_date: '2026-03-01', end_date: '2026-06-30' }]);
    });
  });

  describe('コース情報', () => {
    it('カードが出す見どころと認定だけをロケール解決して残す', () => {
      const race = makeRace({
        course_info: { ...makeRace().course_info, highlights_ja: '海沿いのコース、絶景', highlights_en: 'Seaside course', certification: ['JAAF'] },
      });
      expect(toRaceListItem(race, 'ja').course).toEqual({ highlight: '海沿いのコース、絶景', certification: ['JAAF'] });
      expect(toRaceListItem(race, 'en').course).toEqual({ highlight: 'Seaside course', certification: ['JAAF'] });
    });
  });

  it('射影後のサイズが元の半分以下になる', () => {
    const race = makeRace({
      categories: [makeCategory()],
      entry_periods: [makeEntryPeriod()],
      participation_gifts: [makeParticipationGift()],
      reception_sessions: [makeReceptionSession()],
      travel_times: [makeRaceTravelTime()],
    });
    const before = JSON.stringify(race).length;
    const after = JSON.stringify(toRaceListItem(race, 'ja')).length;
    expect(after).toBeLessThan(before / 2);
  });
});
