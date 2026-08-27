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

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Footer — Amazonアソシエイト表記', () => {
  const originalTag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;

  beforeEach(() => vi.clearAllMocks());
  afterEach(() => {
    if (originalTag === undefined) delete process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
    else process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG = originalTag;
  });

  it('NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG が設定されている場合は表記を表示する', () => {
    process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG = 'hashiru-22';
    render(<Footer />);
    expect(screen.getByText(/Amazonのアソシエイトとして/)).toBeInTheDocument();
  });

  it('NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG が未設定の場合は表記を表示しない', () => {
    delete process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG;
    render(<Footer />);
    expect(screen.queryByText(/Amazonのアソシエイトとして/)).not.toBeInTheDocument();
  });
});
