import { describe, it, expect } from 'vitest';
import { linkPrefetch, NO_PREFETCH_PATHS } from '../nav-prefetch';

describe('linkPrefetch', () => {
  it('大会一覧は先読みしない（getRaces で全レースを取得するため重い）', () => {
    expect(linkPrefetch('/races')).toBe(false);
  });

  it('カレンダーは先読みしない（同上）', () => {
    expect(linkPrefetch('/calendar')).toBe(false);
  });

  it('軽いページは既定の挙動（undefined）のままにする', () => {
    for (const href of ['/', '/news', '/guide', '/about', '/terms', '/privacy', '/contact', '/sitemap', '/mypage']) {
      expect(linkPrefetch(href), `${href} の先読みまで止めている`).toBeUndefined();
    }
  });

  it('レース詳細など個別ページは既定のままにする', () => {
    expect(linkPrefetch('/races/tokyo-marathon-2027')).toBeUndefined();
  });

  it('対象パスは大会一覧とカレンダーの2つだけ', () => {
    expect([...NO_PREFETCH_PATHS].sort()).toEqual(['/calendar', '/races']);
  });
});
