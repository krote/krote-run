import type { Race, Locale, RaceStatus } from '../types';
import { getTodayJST } from './date';

export function getRaceName(race: Race, locale: Locale): string {
  return locale === 'en' ? race.name_en : race.name_ja;
}

export function getRaceCity(race: Race, locale: Locale): string {
  return locale === 'en' ? race.city_en : race.city_ja;
}

export function getRaceDescription(race: Race, locale: Locale): string {
  return locale === 'en' ? race.description_en : race.description_ja;
}

export function getRaceStatus(race: Race): RaceStatus {
  const today = getTodayJST();
  if (race.date < today) return 'past';
  if (race.entry_closed) return 'entry_closed';
  const periods = race.entry_periods ?? [];
  if (periods.some((p) => p.start_date <= today && (p.end_date === null || p.end_date >= today))) return 'open_entry';
  if (periods.some((p) => p.start_date > today)) return 'entry_not_open';
  // Phase 2 で削除予定: 旧フィールドへのフォールバック
  const { entry_start_date: es, entry_end_date: ee } = race;
  if (es && ee && es <= today && ee >= today) return 'open_entry';
  if (es && es > today) return 'entry_not_open';
  return 'entry_closed';
}
