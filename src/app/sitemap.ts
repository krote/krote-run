import type { MetadataRoute } from 'next';
import { getRaces } from '@/lib/data';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://hashiru.run';
const LOCALES = ['ja', 'en'] as const;

const STATIC_PAGES = [
  { path: '',          priority: 1.0, changeFrequency: 'weekly'  as const },
  { path: '/races',    priority: 0.9, changeFrequency: 'daily'   as const },
  { path: '/calendar', priority: 0.8, changeFrequency: 'weekly'  as const },
  { path: '/guide',    priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about',    priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/terms',    priority: 0.5, changeFrequency: 'yearly'  as const },
  { path: '/privacy',  priority: 0.5, changeFrequency: 'yearly'  as const },
  { path: '/contact',  priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/sitemap',  priority: 0.4, changeFrequency: 'weekly'  as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const races = await getRaces();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.flatMap(({ path, priority, changeFrequency }) =>
    LOCALES.map(locale => ({
      url: `${BASE_URL}/${locale}${path}`,
      priority,
      changeFrequency,
      alternates: {
        languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE_URL}/${l}${path}`])),
      },
    }))
  );

  const raceEntries: MetadataRoute.Sitemap = races.flatMap(race =>
    LOCALES.map(locale => ({
      url: `${BASE_URL}/${locale}/races/${race.id}`,
      lastModified: race.date ? new Date(race.date) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map(l => [l, `${BASE_URL}/${l}/races/${race.id}`])),
      },
    }))
  );

  return [...staticEntries, ...raceEntries];
}
