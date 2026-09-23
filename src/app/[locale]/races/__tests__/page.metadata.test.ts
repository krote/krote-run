import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async ({ locale }: { locale: string }) => {
    const messages: Record<string, Record<string, string>> = {
      ja: { title: '大会一覧' },
      en: { title: 'Races' },
    };
    return (key: string) => messages[locale]?.[key] ?? key;
  }),
}));

vi.mock('@/lib/data', () => ({
  getRaces: vi.fn(),
  getPrefectures: vi.fn(),
  getGiftCategories: vi.fn(),
}));

vi.mock('@/components/races/RaceList', () => ({ default: () => null }));

import { generateMetadata } from '../page';
import { OG_IMAGE } from '@/lib/seo';

const makeParams = (locale: string) => ({ params: Promise.resolve({ locale }) });

describe('races/page generateMetadata', () => {
  it('og:image にサイト共通画像を出す', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(meta.openGraph?.images).toEqual([OG_IMAGE]);
  });

  it('twitter にも画像を出す（summary_large_image）', async () => {
    const meta = await generateMetadata(makeParams('ja'));
    expect(meta.twitter?.images).toEqual([OG_IMAGE]);
    expect((meta.twitter as { card?: string }).card).toBe('summary_large_image');
  });
});
