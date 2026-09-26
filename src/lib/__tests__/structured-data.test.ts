import { describe, it, expect } from 'vitest';
import { buildRaceJsonLd, DEFAULT_OG_IMAGE } from '../structured-data';
import { makeRace, makeCategory, makeEntryLink, makeGallery } from './fixtures';

const TODAY = '2026-09-23';

describe('buildRaceJsonLd', () => {
  it('SportsEvent の基本項目を出力する', () => {
    const ld = buildRaceJsonLd(makeRace(), 'ja', TODAY);
    expect(ld['@context']).toBe('https://schema.org');
    expect(ld['@type']).toBe('SportsEvent');
    expect(ld.name).toBe('テスト大会2026');
    expect(ld.description).toBe('テスト用の大会です');
    expect(ld.eventAttendanceMode).toBe('https://schema.org/OfflineEventAttendanceMode');
  });

  it('説明が空なら既存データから組み立てた説明を出す', () => {
    const ld = buildRaceJsonLd(makeRace({ description_ja: '', categories: [makeCategory()] }), 'ja', TODAY);
    expect(ld.description).toContain('2026年10月1日');
    expect(ld.description).toContain('東京都');
  });

  it('正式名称があれば name に使う', () => {
    const ld = buildRaceJsonLd(makeRace({ full_name_en: '1st Test Race 2026' }), 'en', TODAY);
    expect(ld.name).toBe('1st Test Race 2026');
  });

  it('url は公式サイトではなく自サイトの詳細ページ', () => {
    const ld = buildRaceJsonLd(makeRace(), 'en', TODAY);
    expect(ld.url).toBe('https://hashiru.run/en/races/test-race-2026');
  });

  describe('eventStatus', () => {
    it('開催済みでも EventPostponed にしない', () => {
      const ld = buildRaceJsonLd(makeRace({ date: '2026-03-01' }), 'ja', TODAY);
      expect(ld.eventStatus).toBe('https://schema.org/EventScheduled');
    });
  });

  describe('startDate / endDate', () => {
    it('カテゴリがなければ日付のみで endDate = startDate', () => {
      const ld = buildRaceJsonLd(makeRace(), 'ja', TODAY);
      expect(ld.startDate).toBe('2026-10-01');
      expect(ld.endDate).toBe('2026-10-01');
    });

    it('最も早いスタート時刻と最も遅い制限時間終了を JST で出す', () => {
      const race = makeRace({
        categories: [
          makeCategory({ id: 1, start_time: '09:00', time_limit_minutes: 360 }),
          makeCategory({ id: 2, distance_type: '10k', distance_km: 10, start_time: '08:30', time_limit_minutes: 90 }),
        ],
      });
      const ld = buildRaceJsonLd(race, 'ja', TODAY);
      expect(ld.startDate).toBe('2026-10-01T08:30:00+09:00');
      expect(ld.endDate).toBe('2026-10-01T15:00:00+09:00');
    });

    it('制限時間が日付をまたぐ場合は翌日になる', () => {
      const race = makeRace({
        categories: [makeCategory({ distance_type: 'ultra', distance_km: 100, start_time: '05:00', time_limit_minutes: 24 * 60 })],
      });
      const ld = buildRaceJsonLd(race, 'ja', TODAY);
      expect(ld.endDate).toBe('2026-10-02T05:00:00+09:00');
    });

    it('start_time が不正な値のカテゴリは無視する', () => {
      const race = makeRace({ categories: [makeCategory({ start_time: '' })] });
      const ld = buildRaceJsonLd(race, 'ja', TODAY);
      expect(ld.startDate).toBe('2026-10-01');
      expect(ld.endDate).toBe('2026-10-01');
    });
  });

  describe('image', () => {
    it('画像がなければデフォルト画像を使う', () => {
      const ld = buildRaceJsonLd(makeRace(), 'ja', TODAY);
      expect(ld.image).toEqual([DEFAULT_OG_IMAGE]);
    });

    it('ヒーロー画像・ギャラリー画像を絶対URLで並べる', () => {
      const race = makeRace({
        hero_image_url: 'https://cdn.example.com/hero.jpg',
        gallery: [makeGallery({ src: '/images/g1.jpg' })],
      });
      const ld = buildRaceJsonLd(race, 'ja', TODAY);
      expect(ld.image).toEqual(['https://cdn.example.com/hero.jpg', 'https://hashiru.run/images/g1.jpg']);
    });
  });

  describe('location', () => {
    it('会場名・住所・都道府県・座標を出す', () => {
      const race = makeRace({
        venue_name_ja: '国立競技場',
        venue_address: '東京都新宿区霞ヶ丘町10-1',
        start_lat: 35.678,
        start_lng: 139.714,
      });
      const ld = buildRaceJsonLd(race, 'ja', TODAY);
      expect(ld.location).toEqual({
        '@type': 'Place',
        name: '国立競技場',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '東京都新宿区霞ヶ丘町10-1',
          addressLocality: '東京都',
          addressRegion: '東京都',
          addressCountry: 'JP',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 35.678, longitude: 139.714 },
      });
    });

    it('会場情報がなければ市区町村名で代替し geo を出さない', () => {
      const ld = buildRaceJsonLd(makeRace(), 'en', TODAY);
      expect(ld.location).toEqual({
        '@type': 'Place',
        name: 'Tokyo',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Tokyo',
          addressRegion: 'Tokyo',
          addressCountry: 'JP',
        },
      });
    });
  });

  it('organizer は大会名と公式サイト', () => {
    const ld = buildRaceJsonLd(makeRace(), 'ja', TODAY);
    expect(ld.organizer).toEqual({
      '@type': 'Organization',
      name: 'テスト大会2026',
      url: 'https://example.com',
    });
  });

  describe('offers', () => {
    it('カテゴリごとに Offer を出し、カテゴリ料金がなければ共通料金を使う', () => {
      const race = makeRace({
        entry_fee: 5000,
        entry_start_date: '2026-06-01',
        entry_end_date: '2026-09-30',
        categories: [
          makeCategory({ id: 1, entry_fee: 12000 }),
          makeCategory({ id: 2, distance_type: '10k', distance_km: 10, entry_fee: null }),
        ],
      });
      const ld = buildRaceJsonLd(race, 'ja', TODAY);
      expect(ld.offers).toEqual([
        {
          '@type': 'Offer',
          name: 'フルマラソン',
          price: 12000,
          priceCurrency: 'JPY',
          url: 'https://example.com',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-06-01',
        },
        {
          '@type': 'Offer',
          name: '10km',
          price: 5000,
          priceCurrency: 'JPY',
          url: 'https://example.com',
          availability: 'https://schema.org/InStock',
          validFrom: '2026-06-01',
        },
      ]);
    });

    it('エントリーリンクがあれば Offer の url に使う', () => {
      const race = makeRace({
        categories: [makeCategory()],
        entry_links: [makeEntryLink({ url: 'https://runnet.jp/entry/1' })],
      });
      const ld = buildRaceJsonLd(race, 'ja', TODAY);
      expect(ld.offers[0].url).toBe('https://runnet.jp/entry/1');
    });

    it('カテゴリがなければ共通料金で1件出す', () => {
      const ld = buildRaceJsonLd(makeRace({ entry_fee: 3000 }), 'ja', TODAY);
      expect(ld.offers).toHaveLength(1);
      expect(ld.offers[0]).toMatchObject({ name: 'テスト大会2026', price: 3000, priceCurrency: 'JPY' });
    });

    it('料金不明でも url と availability だけの Offer を出す', () => {
      const race = makeRace({ entry_fee: null, entry_fee_by_category: true, categories: [makeCategory()] });
      const ld = buildRaceJsonLd(race, 'ja', TODAY);
      expect(ld.offers).toHaveLength(1);
      expect(ld.offers[0]).not.toHaveProperty('price');
      expect(ld.offers[0].url).toBe('https://example.com');
    });

    it('validFrom は開始日不明なら出さない', () => {
      const ld = buildRaceJsonLd(makeRace(), 'ja', TODAY);
      expect(ld.offers[0]).not.toHaveProperty('validFrom');
    });

    it.each([
      ['受付締切フラグ', { entry_closed: true }, 'https://schema.org/SoldOut'],
      ['受付終了日を過ぎた', { entry_start_date: '2026-06-01', entry_end_date: '2026-09-01' }, 'https://schema.org/SoldOut'],
      ['開催済み', { date: '2026-09-01' }, 'https://schema.org/SoldOut'],
      ['受付開始前', { entry_start_date: '2026-10-01', entry_end_date: '2026-11-01', date: '2027-01-01' }, 'https://schema.org/PreOrder'],
      ['受付中', { entry_start_date: '2026-09-01', entry_end_date: '2026-09-30' }, 'https://schema.org/InStock'],
    ] as const)('availability: %s', (_label, overrides, expected) => {
      const ld = buildRaceJsonLd(makeRace(overrides), 'ja', TODAY);
      expect(ld.offers[0].availability).toBe(expected);
    });
  });
});
