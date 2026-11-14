import type { Race, Locale, RaceStatus, RaceStatusInput, EntryPeriodStatusInput } from '../types';
import { getTodayJST } from './date';

export function getRaceName(race: Pick<Race, 'name_ja' | 'name_en'>, locale: Locale): string {
  return locale === 'en' ? race.name_en : race.name_ja;
}

export function getRaceCity(race: Race, locale: Locale): string {
  return locale === 'en' ? race.city_en : race.city_ja;
}

export function getRaceDescription(race: Race, locale: Locale): string {
  return locale === 'en' ? race.description_en : race.description_ja;
}

/**
 * エントリー期間が今日受付中か。
 * 締切日前に受付を終えた期間（closed_early）は、期間内でも受付中として扱わない。
 */
export function isPeriodActive(period: EntryPeriodStatusInput, today: string): boolean {
  if (period.closed_early) return false;
  return period.start_date <= today && (period.end_date === null || period.end_date >= today);
}

export function getRaceStatus(race: RaceStatusInput): RaceStatus {
  const today = getTodayJST();
  if (race.date < today) return 'past';
  if (race.entry_closed) return 'entry_closed';
  const periods = race.entry_periods ?? [];
  if (periods.some((p) => isPeriodActive(p, today))) return 'open_entry';
  if (periods.some((p) => p.start_date > today)) return 'entry_not_open';
  // entry_periods がある大会はそれを正とする（途中終了した期間を旧フィールドで受付中と判定しないため）
  if (periods.length > 0) return 'entry_closed';
  // Phase 2 で削除予定: 旧フィールドへのフォールバック
  const { entry_start_date: es, entry_end_date: ee } = race;
  if (es && ee && es <= today && ee >= today) return 'open_entry';
  if (es && es > today) return 'entry_not_open';
  return 'entry_closed';
}
