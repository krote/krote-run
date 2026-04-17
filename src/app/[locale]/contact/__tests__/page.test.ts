import { describe, it, expect, vi } from 'vitest';

vi.mock('@/components/contact/ContactFormWrapper', () => ({
  default: () => null,
}));

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async ({ locale }: { locale: string }) => {
    const messages: Record<string, Record<string, string>> = {
      ja: { title: 'お問い合わせ', subtitle: '' },
      en: { title: 'Contact Us', subtitle: '' },
    };
    return (key: string) => messages[locale]?.[key] ?? key;
  }),
}));

import { generateMetadata } from '../page';

const makeParams = (locale: string) => ({
  params: Promise.resolve({ locale }),
});

describe('contact/page generateMetadata', () => {
  it('ja: title が「お問い合わせ」を含む', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(String(meta.title)).toContain('お問い合わせ');
  });

  it('en: title が "Contact" を含む', async () => {
    const meta = await generateMetadata(makeParams('en'));
    expect(String(meta.title)).toContain('Contact');
  });
});
