import type { Locale } from '../types';

/** 現在の日本時刻（JST）を YYYY-MM-DD 形式で返す。Cloudflare Workers の UTC 環境でも正しく動作する */
export function getTodayJST(): string {
  return new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Tokyo' });
}

export function formatDate(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateString: string, locale: Locale): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateRange(
  startDate: string,
  endDate: string | undefined,
  locale: Locale,
): string {
  if (!endDate || startDate === endDate) return formatDate(startDate, locale);
  return `${formatDate(startDate, locale)} - ${formatDate(endDate, locale)}`;
}
