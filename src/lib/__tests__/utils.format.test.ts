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
  getCategoryLabel,
  getRaceName,
  getRaceCity,
  getRaceDescription,
  filterToSearchParams,
  searchParamsToFilter,
  emptyFilter,
  getContrastColor,
} from '../utils';
import { makeRace, makeCategory } from './fixtures';

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

describe('getCategoryLabel', () => {
  it('ja ロケールで name_ja がある場合はその名前を返す', () => {
    const cat = makeCategory({ name_ja: 'チャレンジの部', name_en: 'Challenge' });
    expect(getCategoryLabel(cat, 'ja')).toBe('チャレンジの部');
  });

  it('en ロケールで name_en がある場合はそちらを返す', () => {
    const cat = makeCategory({ name_ja: 'チャレンジの部', name_en: 'Challenge' });
    expect(getCategoryLabel(cat, 'en')).toBe('Challenge');
  });

  it('name_ja がない場合は getDistanceLabel にフォールバック', () => {
    const cat = makeCategory({ name_ja: null, name_en: null, distance_type: 'full' });
    expect(getCategoryLabel(cat, 'ja')).toBe('フルマラソン');
  });

  it('en ロケールで name_en が null の場合は getDistanceLabel にフォールバック', () => {
    const cat = makeCategory({ name_ja: null, name_en: null, distance_type: 'half' });
    expect(getCategoryLabel(cat, 'en')).toBe('Half Marathon');
  });
});

describe('getRaceName', () => {
  it('ja ロケールで name_ja を返す', () => {
    const race = makeRace({ name_ja: '東京マラソン', name_en: 'Tokyo Marathon' });
    expect(getRaceName(race, 'ja')).toBe('東京マラソン');
  });

  it('en ロケールで name_en を返す', () => {
    const race = makeRace({ name_ja: '東京マラソン', name_en: 'Tokyo Marathon' });
    expect(getRaceName(race, 'en')).toBe('Tokyo Marathon');
  });
});

describe('getRaceCity', () => {
  it('ja ロケールで city_ja を返す', () => {
    const race = makeRace({ city_ja: '東京都', city_en: 'Tokyo' });
    expect(getRaceCity(race, 'ja')).toBe('東京都');
  });

  it('en ロケールで city_en を返す', () => {
    const race = makeRace({ city_ja: '東京都', city_en: 'Tokyo' });
    expect(getRaceCity(race, 'en')).toBe('Tokyo');
  });
});

describe('getRaceDescription', () => {
  it('ja ロケールで description_ja を返す', () => {
    const race = makeRace({ description_ja: '日本語説明', description_en: 'English description' });
    expect(getRaceDescription(race, 'ja')).toBe('日本語説明');
  });

  it('en ロケールで description_en を返す', () => {
    const race = makeRace({ description_ja: '日本語説明', description_en: 'English description' });
    expect(getRaceDescription(race, 'en')).toBe('English description');
  });
});

describe('filterToSearchParams', () => {
  it('デフォルトフィルター（emptyFilter）は空の params を返す', () => {
    const params = filterToSearchParams(emptyFilter());
    expect(params.toString()).toBe('');
  });

  it('month が設定されると month パラメータが付く', () => {
    const params = filterToSearchParams({ ...emptyFilter(), month: 10 });
    expect(params.get('month')).toBe('10');
  });

  it('prefecture が設定されると pref パラメータが付く', () => {
    const params = filterToSearchParams({ ...emptyFilter(), prefecture: '13' });
    expect(params.get('pref')).toBe('13');
  });

  it('distanceType が設定されると dist パラメータが付く', () => {
    const params = filterToSearchParams({ ...emptyFilter(), distanceType: 'full' });
    expect(params.get('dist')).toBe('full');
  });

  it('giftCategories が設定されると gift パラメータにカンマ区切りで入る', () => {
    const params = filterToSearchParams({ ...emptyFilter(), giftCategories: ['medal', 'tshirt'] });
    expect(params.get('gift')).toBe('medal,tshirt');
  });

  it('sort が date_asc 以外の場合は sort パラメータが付く', () => {
    const params = filterToSearchParams({ ...emptyFilter(), sort: 'entry_closing_soon' });
    expect(params.get('sort')).toBe('entry_closing_soon');
  });

  it('sort が date_asc の場合は sort パラメータが付かない', () => {
    const params = filterToSearchParams({ ...emptyFilter(), sort: 'date_asc' });
    expect(params.get('sort')).toBeNull();
  });
});

describe('searchParamsToFilter', () => {
  it('空の URLSearchParams はデフォルト statuses を持つフィルターを返す', () => {
    const filter = searchParamsToFilter(new URLSearchParams());
    expect(filter.month).toBeNull();
    expect(filter.prefecture).toBeNull();
    expect(filter.statuses).toEqual(['open_entry', 'entry_not_open', 'entry_closed']);
  });

  it('month・pref・dist が正しく変換される', () => {
    const params = new URLSearchParams('month=10&pref=13&dist=half');
    const filter = searchParamsToFilter(params);
    expect(filter.month).toBe(10);
    expect(filter.prefecture).toBe('13');
    expect(filter.distanceType).toBe('half');
  });

  it('gift はカンマ区切りで配列に変換される', () => {
    const params = new URLSearchParams('gift=medal,tshirt');
    const filter = searchParamsToFilter(params);
    expect(filter.giftCategories).toEqual(['medal', 'tshirt']);
  });

  it('filterToSearchParams → searchParamsToFilter のラウンドトリップが一致する', () => {
    const original = {
      ...emptyFilter(),
      month: 6,
      prefecture: '27',
      distanceType: 'full' as const,
      giftCategories: ['medal'] as ['medal'],
      sort: 'entry_closing_soon' as const,
    };
    const params = filterToSearchParams(original);
    const restored = searchParamsToFilter(params);
    expect(restored.month).toBe(original.month);
    expect(restored.prefecture).toBe(original.prefecture);
    expect(restored.distanceType).toBe(original.distanceType);
    expect(restored.giftCategories).toEqual(original.giftCategories);
    expect(restored.sort).toBe(original.sort);
  });

  it('無効な dist 値は null に変換される', () => {
    const params = new URLSearchParams('dist=invalid');
    const filter = searchParamsToFilter(params);
    expect(filter.distanceType).toBeNull();
  });

  it('Record<string, string> 形式でも動作する', () => {
    const filter = searchParamsToFilter({ month: '4', pref: '01' });
    expect(filter.month).toBe(4);
    expect(filter.prefecture).toBe('01');
  });
});

describe('getContrastColor', () => {
  it('明るい背景（#F8F8FF）は暗色テキストを返す', () => {
    expect(getContrastColor('#F8F8FF')).toBe('#1a1a1a');
  });

  it('暗い背景（#1a1a1a）は白テキストを返す', () => {
    expect(getContrastColor('#1a1a1a')).toBe('#ffffff');
  });

  it('黒（#000000）は白テキストを返す', () => {
    expect(getContrastColor('#000000')).toBe('#ffffff');
  });

  it('白（#ffffff）は暗色テキストを返す', () => {
    expect(getContrastColor('#ffffff')).toBe('#1a1a1a');
  });

  it('中間色（#808080）は暗色テキストを返す', () => {
    expect(getContrastColor('#808080')).toBe('#1a1a1a');
  });

  it('3桁表記（#FFF）も正しく処理される', () => {
    expect(getContrastColor('#FFF')).toBe('#1a1a1a');
  });

  it('不正な値は白テキストにフォールバックする', () => {
    expect(getContrastColor('#ZZZZZZ')).toBe('#ffffff');
  });
});
