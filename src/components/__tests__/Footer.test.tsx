// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../layout/Footer';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      tagline: 'マラソンポータル',
      findRace: '大会を探す',
      byRegion: '地域から',
      byDistance: '距離から',
      bySeason: '季節から',
      info: '情報',
      news: 'お知らせ',
      guide: 'ガイド',
      about: 'このサイトについて',
      privacy: 'プライバシー',
      terms: '利用規約',
      sitemap: 'サイトマップ',
      madeFor: 'ランナーのために',
      amazonAssociateDisclosure: 'Amazonのアソシエイトとして、当サイトは適格販売により収入を得ています。',
    };
    return map[key] ?? key;
  },
}));

// prefetch は Next.js の Link のプロパティでDOMには現れないため、
// テストから検証できるよう data-prefetch として書き出す
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, prefetch }: { href: string; children: React.ReactNode; prefetch?: boolean }) => (
    <a href={href} data-prefetch={prefetch === false ? 'false' : 'auto'}>{children}</a>
  ),
}));

describe('Footer — Amazonアソシエイト表記', () => {
  const originalTag = process.env.AMAZON_PARTNER_TAG;

  beforeEach(() => vi.clearAllMocks());
  afterEach(() => {
    if (originalTag === undefined) delete process.env.AMAZON_PARTNER_TAG;
    else process.env.AMAZON_PARTNER_TAG = originalTag;
  });

  it('AMAZON_PARTNER_TAG が設定されている場合は表記を表示する', () => {
    process.env.AMAZON_PARTNER_TAG = 'hashiru-22';
    render(<Footer />);
    expect(screen.getByText(/Amazonのアソシエイトとして/)).toBeInTheDocument();
  });

  it('AMAZON_PARTNER_TAG が未設定の場合は表記を表示しない', () => {
    delete process.env.AMAZON_PARTNER_TAG;
    render(<Footer />);
    expect(screen.queryByText(/Amazonのアソシエイトとして/)).not.toBeInTheDocument();
  });
});

// ── リンクの先読み制御 ─────────────────────────────────────────────
describe('Footer - リンクの先読み制御', () => {
  it('大会一覧・カレンダーへのリンクはすべて先読みしない', () => {
    render(<Footer />);

    const heavy = screen.getAllByRole('link').filter((a) => {
      const href = a.getAttribute('href');
      return href === '/races' || href === '/calendar';
    });

    expect(heavy.length, '対象のリンクが見つからない').toBeGreaterThan(0);
    for (const link of heavy) {
      expect(link, `${link.getAttribute('href')} が先読みされたままになっている`).toHaveAttribute('data-prefetch', 'false');
    }
  });

  it('軽いページの先読みは止めない', () => {
    render(<Footer />);

    const light = screen.getAllByRole('link').filter((a) => ['/news', '/guide', '/about', '/terms'].includes(a.getAttribute('href') ?? ''));

    expect(light.length).toBeGreaterThan(0);
    for (const link of light) {
      expect(link).toHaveAttribute('data-prefetch', 'auto');
    }
  });
});
