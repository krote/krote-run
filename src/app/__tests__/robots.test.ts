import { describe, it, expect } from 'vitest';
import robots from '../robots';

describe('robots()', () => {
  const result = robots();
  const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
  const allRule = rules.find((r) => r.userAgent === '*');
  const disallow = [allRule?.disallow ?? []].flat();

  it('全クローラー向けのルールがあり、サイト全体のクロールは許可する', () => {
    expect(allRule).toBeDefined();
    expect(allRule?.allow).toBe('/');
  });

  it('カレンダーの年月クエリ付きURLを禁止する（無限に辿れるクローラートラップ対策）', () => {
    expect(disallow).toContain('/*/calendar?');
  });

  it('APIルートを禁止する', () => {
    expect(disallow).toContain('/api/');
  });

  it('カレンダー本体（クエリなし）は禁止しない', () => {
    expect(disallow).not.toContain('/*/calendar');
    expect(disallow).not.toContain('/ja/calendar');
  });

  it('本番ドメインのサイトマップを示す', () => {
    expect(result.sitemap).toBe('https://hashiru.run/sitemap.xml');
  });
});
