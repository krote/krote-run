import { describe, it, expect } from 'vitest';
import { getRaceDescriptionOrFallback } from '../race-description';
import { makeRace, makeCategory } from './fixtures';

/**
 * 説明文が未入力の大会（ja 10件・en 13件）では JSON-LD の description が出せず、
 * Search Console で「項目 description がありません」と指摘される。
 * 持っているデータ（開催地・距離・開催日・コース情報）から事実だけの文を組み立てる。
 */
describe('getRaceDescriptionOrFallback', () => {
  it('説明文があればそのまま返す', () => {
    const race = makeRace({ description_ja: '歴史ある市民マラソン大会。' });
    expect(getRaceDescriptionOrFallback(race, 'ja')).toBe('歴史ある市民マラソン大会。');
  });

  it('空白だけの説明文は未入力として扱う', () => {
    const race = makeRace({ description_ja: '   ', categories: [makeCategory()] });
    expect(getRaceDescriptionOrFallback(race, 'ja')).not.toBe('   ');
    expect(getRaceDescriptionOrFallback(race, 'ja').length).toBeGreaterThan(0);
  });

  describe('日本語のフォールバック', () => {
    it('開催日・開催地・距離種別を含む', () => {
      const race = makeRace({
        description_ja: '',
        date: '2026-10-18',
        city_ja: '新宿区',
        prefecture: '13',
        categories: [makeCategory({ distance_type: 'half', distance_km: 21.0975 })],
      });
      const desc = getRaceDescriptionOrFallback(race, 'ja');
      expect(desc).toContain('2026年10月18日');
      expect(desc).toContain('東京都');
      expect(desc).toContain('新宿区');
      expect(desc).toContain('ハーフマラソン');
      expect(desc).toContain('テスト大会2026');
    });

    it('市区町村名が都道府県名と同じ場合は重ねて書かない', () => {
      const race = makeRace({ description_ja: '', city_ja: '東京都', prefecture: '13', categories: [makeCategory()] });
      expect(getRaceDescriptionOrFallback(race, 'ja').match(/東京都/g)).toHaveLength(1);
    });

    it('複数カテゴリがあれば併記する', () => {
      const race = makeRace({
        description_ja: '',
        categories: [
          makeCategory({ id: 1, distance_type: 'full', distance_km: 42.195 }),
          makeCategory({ id: 2, distance_type: '10k', distance_km: 10 }),
        ],
      });
      const desc = getRaceDescriptionOrFallback(race, 'ja');
      expect(desc).toContain('フルマラソン');
      expect(desc).toContain('10km');
    });

    it('コース認定があれば記載する', () => {
      const race = makeRace({
        description_ja: '',
        categories: [makeCategory()],
        course_info: { ...makeRace().course_info, certification: ['JAAF', 'AIMS'] },
      });
      const desc = getRaceDescriptionOrFallback(race, 'ja');
      expect(desc).toContain('JAAF');
      expect(desc).toContain('AIMS');
    });

    it('カテゴリがなくても開催日と開催地だけで文になる', () => {
      const race = makeRace({ description_ja: '', categories: [] });
      const desc = getRaceDescriptionOrFallback(race, 'ja');
      expect(desc).toContain('2026年10月1日');
      expect(desc).toContain('東京都');
      expect(desc.endsWith('。')).toBe(true);
    });
  });

  describe('英語のフォールバック', () => {
    it('英語ロケールでは英語で組み立てる', () => {
      const race = makeRace({
        description_en: '',
        date: '2026-10-18',
        city_en: 'Shinjuku',
        prefecture: '13',
        categories: [makeCategory({ distance_type: 'half', distance_km: 21.0975 })],
      });
      const desc = getRaceDescriptionOrFallback(race, 'en');
      expect(desc).toContain('October 18, 2026');
      expect(desc).toContain('Shinjuku');
      expect(desc).toContain('Tokyo');
      expect(desc).toContain('Half Marathon');
      expect(desc).not.toMatch(/[ぁ-んァ-ン一-龠]/);
    });

    it('英語が空でも日本語の説明文は流用しない', () => {
      const race = makeRace({ description_ja: '日本語の説明', description_en: '', categories: [makeCategory()] });
      expect(getRaceDescriptionOrFallback(race, 'en')).not.toContain('日本語の説明');
    });
  });

  describe('データの揺れへの対応', () => {
    it('市区町村名が都道府県名で始まる場合は重複を取り除く', () => {
      const race = makeRace({ description_ja: '', city_ja: '北海道網走市', prefecture: '01', categories: [makeCategory()] });
      const desc = getRaceDescriptionOrFallback(race, 'ja');
      expect(desc).toContain('北海道網走市');
      expect(desc).not.toContain('北海道北海道');
    });

    it('距離種別が「その他」だけのときは距離に触れない', () => {
      const race = makeRace({
        description_ja: '',
        categories: [makeCategory({ distance_type: 'other', distance_km: 21 })],
      });
      const desc = getRaceDescriptionOrFallback(race, 'ja');
      expect(desc).not.toContain('その他');
      expect(desc).toContain('大会');
    });

    it('「その他」は併記から除外し、残りの距離だけ書く', () => {
      const race = makeRace({
        description_ja: '',
        categories: [
          makeCategory({ id: 1, distance_type: 'full', distance_km: 42.195 }),
          makeCategory({ id: 2, distance_type: 'other', distance_km: 3 }),
        ],
      });
      const desc = getRaceDescriptionOrFallback(race, 'ja');
      expect(desc).toContain('フルマラソン');
      expect(desc).not.toContain('その他');
    });

    it('大会名や地名の余分な空白で二重スペースにならない', () => {
      const race = makeRace({ description_en: '', name_en: 'Tokyo Legacy Half ', city_en: ' Shinjuku ', categories: [makeCategory()] });
      const desc = getRaceDescriptionOrFallback(race, 'en');
      expect(desc).not.toContain('  ');
    });
  });
});
