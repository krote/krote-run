import type { RaceCategory, Locale, DistanceType } from '../types';

const DISTANCE_LABELS: Record<DistanceType, { ja: string; en: string }> = {
  full: { ja: 'フルマラソン', en: 'Full Marathon' },
  half: { ja: 'ハーフマラソン', en: 'Half Marathon' },
  '10k': { ja: '10km', en: '10km' },
  '5k': { ja: '5km', en: '5km' },
  ultra: { ja: 'ウルトラマラソン', en: 'Ultra Marathon' },
  other: { ja: 'その他', en: 'Other' },
};

export function formatDistanceKm(km: number): string {
  if (km === 42.195) return 'Full (42.195km)';
  if (km === 21.0975) return 'Half (21.0975km)';
  return `${km}km`;
}

export function getDistanceLabel(key: DistanceType, locale: Locale): string {
  return DISTANCE_LABELS[key]?.[locale] ?? key;
}

export function getMainCategory(categories: RaceCategory[]): RaceCategory | null {
  if (categories.length === 0) return null;
  const full = categories.find((c) => c.distance_type === 'full');
  if (full) return full;
  return categories.reduce((max, c) => (c.distance_km > max.distance_km ? c : max), categories[0]);
}

export function getCategoryLabel(cat: RaceCategory, locale: Locale): string {
  if (locale === 'en' && cat.name_en) return cat.name_en;
  if (locale === 'ja' && cat.name_ja) return cat.name_ja;
  return getDistanceLabel(cat.distance_type, locale);
}

export function formatTimeLimitMinutes(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}時間` : `${h}時間${m}分`;
}

export function formatCurrency(amount: number): string {
  return `¥${amount.toLocaleString('ja-JP')}`;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * 16進数カラーコードに対して読みやすいテキスト色（白 or 暗色）を返す。
 * WCAG 2.1 相対輝度を使って判定する。
 * @param hex - "#RRGGBB" または "#RGB" 形式
 * @returns 背景が暗い → "#ffffff"、背景が明るい → "#1a1a1a"
 */
export function getContrastColor(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) return '#ffffff';

  // sRGB → 線形輝度（WCAG 2.1）
  const toLinear = (v: number) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  // 輝度 0.179 を閾値に（白との対比比率 ~4.5:1 相当）
  return L > 0.179 ? '#1a1a1a' : '#ffffff';
}
