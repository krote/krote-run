import { describe, it, expect, vi } from 'vitest';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => ({ href, children }),
}));

import { generateMetadata } from '../page';

const makeParams = (locale: string) => ({
  params: Promise.resolve({ locale }),
});

describe('cookie-policy/page generateMetadata', () => {
  it('ja: title が「Cookieポリシー」を含む', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(String(meta.title)).toContain('Cookie');
  });

  it('en: title が "Cookie Policy" を含む', async () => {
    const meta = await generateMetadata(makeParams('en'));
    expect(String(meta.title)).toContain('Cookie Policy');
  });

  it('canonical URL が正しい（ja）', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(meta.alternates?.canonical).toBe('https://hashiru.run/ja/cookie-policy');
  });

  it('canonical URL が正しい（en）', async () => {
    const meta = await generateMetadata(makeParams('en'));
    expect(meta.alternates?.canonical).toBe('https://hashiru.run/en/cookie-policy');
  });
});
