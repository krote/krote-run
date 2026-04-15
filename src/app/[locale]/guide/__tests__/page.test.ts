import { describe, it, expect, vi } from 'vitest';

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => ({ href, children }),
}));

import { generateMetadata } from '../page';

const makeParams = (locale: string) => ({
  params: Promise.resolve({ locale }),
});

describe('guide/page generateMetadata', () => {
  it('ja: title が「初めての方へ」を含む', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(String(meta.title)).toContain('初めての方へ');
  });

  it('en: title が "Getting Started" を含む', async () => {
    const meta = await generateMetadata(makeParams('en'));
    expect(String(meta.title)).toContain('Getting Started');
  });

  it('canonical URL が正しい（ja）', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(meta.alternates?.canonical).toBe('https://hashiru.run/ja/guide');
  });

  it('canonical URL が正しい（en）', async () => {
    const meta = await generateMetadata(makeParams('en'));
    expect(meta.alternates?.canonical).toBe('https://hashiru.run/en/guide');
  });
});
