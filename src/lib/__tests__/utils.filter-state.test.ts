import { describe, it, expect } from 'vitest';
import { defaultFilter, emptyFilter, isDefaultFilter, isFilterEmpty, getMainCategory } from '../utils';
import { makeCategory } from './fixtures';

describe('defaultFilter', () => {
  it('開催済みを除く3ステータスを含む', () => {
    const f = defaultFilter();
    expect(f.statuses).toContain('open_entry');
    expect(f.statuses).toContain('entry_not_open');
    expect(f.statuses).toContain('entry_closed');
    expect(f.statuses).not.toContain('past');
  });

  it('その他のフィールドはすべて初期値', () => {
    const f = defaultFilter();
    expect(f.month).toBeNull();
    expect(f.prefecture).toBeNull();
    expect(f.distanceType).toBeNull();
    expect(f.giftCategories).toHaveLength(0);
    expect(f.timeLimitMin).toBeNull();
    expect(f.tags).toHaveLength(0);
    expect(f.searchText).toBe('');
  });
});

describe('emptyFilter', () => {
  it('statuses が空配列（すべて表示）', () => {
    expect(emptyFilter().statuses).toHaveLength(0);
  });

  it('その他のフィールドはすべて初期値', () => {
    const f = emptyFilter();
    expect(f.month).toBeNull();
    expect(f.prefecture).toBeNull();
    expect(f.distanceType).toBeNull();
    expect(f.giftCategories).toHaveLength(0);
    expect(f.timeLimitMin).toBeNull();
    expect(f.tags).toHaveLength(0);
    expect(f.searchText).toBe('');
  });
});

describe('isDefaultFilter', () => {
  it('defaultFilter() をそのまま渡すと true', () => {
    expect(isDefaultFilter(defaultFilter())).toBe(true);
  });

  it('emptyFilter() を渡すと false（statuses が異なる）', () => {
    expect(isDefaultFilter(emptyFilter())).toBe(false);
  });

  it('prefecture を変更すると false', () => {
    expect(isDefaultFilter({ ...defaultFilter(), prefecture: '13' })).toBe(false);
  });

  it('month を変更すると false', () => {
    expect(isDefaultFilter({ ...defaultFilter(), month: 3 })).toBe(false);
  });

  it('distanceType を変更すると false', () => {
    expect(isDefaultFilter({ ...defaultFilter(), distanceType: 'full' })).toBe(false);
  });

  it('searchText を変更すると false', () => {
    expect(isDefaultFilter({ ...defaultFilter(), searchText: '東京' })).toBe(false);
  });

  it('tags を変更すると false', () => {
    expect(isDefaultFilter({ ...defaultFilter(), tags: ['フラット'] })).toBe(false);
  });

  it('statuses の順序が違っても true（包含チェック）', () => {
    const f = { ...defaultFilter(), statuses: ['entry_closed', 'open_entry', 'entry_not_open'] as const };
    expect(isDefaultFilter({ ...f })).toBe(true);
  });
});

describe('isFilterEmpty', () => {
  it('emptyFilter() をそのまま渡すと true', () => {
    expect(isFilterEmpty(emptyFilter())).toBe(true);
  });

  it('defaultFilter() を渡すと false（statuses があるため）', () => {
    expect(isFilterEmpty(defaultFilter())).toBe(false);
  });

  it('何か値が設定されていると false', () => {
    expect(isFilterEmpty({ ...emptyFilter(), prefecture: '13' })).toBe(false);
  });
});

describe('getMainCategory', () => {
  it('空配列は null を返す', () => {
    expect(getMainCategory([])).toBeNull();
  });

  it('フルマラソンが優先される', () => {
    const cats = [
      makeCategory({ distance_type: 'half', distance_km: 21.0975 }),
      makeCategory({ distance_type: 'full', distance_km: 42.195 }),
      makeCategory({ distance_type: '10k', distance_km: 10 }),
    ];
    expect(getMainCategory(cats)?.distance_type).toBe('full');
  });

  it('フルがない場合は最長距離を返す', () => {
    const cats = [
      makeCategory({ distance_type: 'half', distance_km: 21.0975 }),
      makeCategory({ distance_type: '10k', distance_km: 10 }),
      makeCategory({ distance_type: 'ultra', distance_km: 100 }),
    ];
    const result = getMainCategory(cats);
    expect(result?.distance_km).toBe(100);
  });

  it('1件のみの場合はその1件を返す', () => {
    const cats = [makeCategory({ distance_type: 'half', distance_km: 21.0975 })];
    expect(getMainCategory(cats)?.distance_type).toBe('half');
  });
});
