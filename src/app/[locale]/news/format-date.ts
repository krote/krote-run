import type { Locale } from '@/lib/types';

export function formatDate(date: string, locale: Locale): string {
  return new Date(`${date}T00:00:00+09:00`).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo',
  });
}
