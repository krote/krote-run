import { describe, it, expect } from 'vitest';
import { sortAnnouncements, getAnnouncements } from '../announcements';
import type { Announcement } from '../types';

function makeAnnouncement(overrides: Partial<Announcement> = {}): Announcement {
  return {
    slug: 'sample',
    date: '2026-01-01',
    title_ja: 'サンプル',
    title_en: 'Sample',
    body_ja: '本文',
    body_en: 'Body',
    link_href: null,
    link_label_ja: null,
    link_label_en: null,
    ...overrides,
  };
}

describe('sortAnnouncements', () => {
  it('日付降順（新しい順）に並び替える', () => {
    const list = [
      makeAnnouncement({ slug: 'old', date: '2026-01-01' }),
      makeAnnouncement({ slug: 'new', date: '2026-03-01' }),
      makeAnnouncement({ slug: 'mid', date: '2026-02-01' }),
    ];
    const sorted = sortAnnouncements(list);
    expect(sorted.map((a) => a.slug)).toEqual(['new', 'mid', 'old']);
  });

  it('元の配列を破壊しない', () => {
    const list = [
      makeAnnouncement({ slug: 'a', date: '2026-01-01' }),
      makeAnnouncement({ slug: 'b', date: '2026-02-01' }),
    ];
    sortAnnouncements(list);
    expect(list.map((a) => a.slug)).toEqual(['a', 'b']);
  });

  it('空配列を渡すと空配列を返す', () => {
    expect(sortAnnouncements([])).toEqual([]);
  });
});

describe('getAnnouncements', () => {
  it('日付降順で少なくとも1件のお知らせを返す', () => {
    const list = getAnnouncements();
    expect(list.length).toBeGreaterThan(0);
    const dates = list.map((a) => a.date);
    const sortedDates = [...dates].sort().reverse();
    expect(dates).toEqual(sortedDates);
  });

  it('各エントリーが必須フィールドを持つ', () => {
    const list = getAnnouncements();
    for (const a of list) {
      expect(a.slug).toBeTruthy();
      expect(a.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(a.title_ja).toBeTruthy();
      expect(a.title_en).toBeTruthy();
      expect(a.body_ja).toBeTruthy();
      expect(a.body_en).toBeTruthy();
    }
  });

  it('slugに重複が無い', () => {
    const list = getAnnouncements();
    const slugs = list.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
