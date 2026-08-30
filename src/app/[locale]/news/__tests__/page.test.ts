import { describe, it, expect, vi } from 'vitest';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => ({ href, children }),
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async ({ locale }: { locale: string }) => {
    const messages: Record<string, Record<string, string>> = {
      ja: { title: 'お知らせ', eyebrow: 'News', empty: 'お知らせはまだありません。' },
      en: { title: 'News', eyebrow: 'News', empty: 'No news yet.' },
    };
    return (key: string) => messages[locale]?.[key] ?? key;
  }),
}));

vi.mock('@/lib/announcements', () => ({
  getAnnouncements: () => [],
}));

import { generateMetadata } from '../page';

const makeParams = (locale: string) => ({
  params: Promise.resolve({ locale }),
});

describe('news/page generateMetadata', () => {
  it('ja: title が「お知らせ」を含む', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(String(meta.title)).toContain('お知らせ');
  });

  it('en: title が "News" を含む', async () => {
    const meta = await generateMetadata(makeParams('en'));
    expect(String(meta.title)).toContain('News');
  });

  it('canonical URL が正しい（ja）', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(meta.alternates?.canonical).toBe('https://hashiru.run/ja/news');
  });

  it('canonical URL が正しい（en）', async () => {
    const meta = await generateMetadata(makeParams('en'));
    expect(meta.alternates?.canonical).toBe('https://hashiru.run/en/news');
  });
});
