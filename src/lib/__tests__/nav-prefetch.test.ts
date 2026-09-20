import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
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

// ── リポジトリ全体の不変条件 ─────────────────────────────────────
// 重いページへのリンクはヘッダー・フッター以外にも点在している（トップページの
// 「大会一覧へ」など）。1箇所直しても他が残っていると先読みは止まらないため、
// ソースを走査して漏れを検出する。

/** src/ 配下の .tsx を列挙する（vitest の cwd はプロジェクトルート） */
const SRC_ROOT = path.resolve(process.cwd(), 'src');

function tsxFiles(): string[] {
  const root = SRC_ROOT;
  return fs
    .readdirSync(root, { recursive: true, encoding: 'utf-8' })
    .filter((f) => f.endsWith('.tsx') && !f.includes('__tests__'))
    .map((f) => path.join(root, f));
}

/** ファイル内の <Link ...> 開始タグの属性部分を返す（アロー関数の => を退避してから走査する） */
function linkOpeningTags(source: string): string[] {
  return [...source.replace(/=>/g, '@@').matchAll(/<Link\b([^>]*)>/g)].map((m) => m[1]);
}

describe('重いページへのリンクは先読みを止めている（ソース走査）', () => {
  it('href="/races" / href="/calendar" の <Link> には必ず prefetch 指定がある', () => {
    const violations: string[] = [];
    const files = tsxFiles();

    // 走査対象が0件だとテストが素通りしてしまうため、件数自体も検証する
    expect(files.length, `src/ の .tsx を走査できていない（cwd=${process.cwd()}）`).toBeGreaterThan(10);

    for (const file of files) {
      const source = fs.readFileSync(file, 'utf-8');
      for (const attrs of linkOpeningTags(source)) {
        const href = attrs.match(/href="(\/races|\/calendar)"/);
        if (href && !/prefetch=/.test(attrs)) {
          violations.push(`${path.relative(SRC_ROOT, file)} → ${href[1]}`);
        }
      }
    }

    expect(violations, '先読みが止まっていないリンク: ' + violations.join(' / ')).toEqual([]);
  });
});
