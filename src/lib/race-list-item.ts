import type { Race, Locale, DistanceType, GiftCategoryId, ReceptionType } from './types';
import type { HubId } from './hubs';
import { getRaceCity, getRaceDescription } from './utils';

/**
 * 一覧・カレンダー用の軽量な大会データ。
 *
 * これらのページは Client Component に大会データを渡すため、`Race` をそのまま渡すと
 * 全フィールドが RSC ペイロードとして HTML に直列化される（実測で 1MB 中 590KB）。
 * 表示と絞り込みに使う項目だけに絞り、表示しない言語のテキストも落とす。
 *
 * 大会詳細ページは従来どおり `Race` を使う。
 */
export interface RaceListItem {
  id: string;
  /** 検索は日英どちらの名前にも当たるため両方持つ */
  name_ja: string;
  name_en: string;
  /** ロケール解決済みの市区町村名 */
  city: string;
  /** カード表示用に切り詰めた説明文（ロケール解決済み） */
  summary: string;
  date: string;
  prefecture: string;
  tags: string[];
  official_url: string;
  hero_image_url: string | null;
  entry_closed: boolean;
  entry_fee: number | null;
  entry_fee_by_category: boolean;
  entry_capacity: number;
  entry_start_date: string | null;
  entry_end_date: string | null;
  reception_type: ReceptionType;
  reception_sessions: { date: string; close_time: string | null }[];
  categories: RaceListItemCategory[];
  entry_periods: { start_date: string; end_date: string | null }[];
  /** 参加賞・完走賞をまとめたカテゴリID（絞り込み用） */
  gift_category_ids: GiftCategoryId[];
  travel_times: { hub_id: HubId; duration_minutes: number }[];
  course: { highlight: string; certification: string[] };
}

export interface RaceListItemCategory {
  distance_type: DistanceType;
  distance_km: number;
  time_limit_minutes: number;
  start_time: string;
  entry_fee: number | null;
  name_ja: string | null;
  name_en: string | null;
}

/** カードに出す説明文の最大長（RaceCardExp の表示は 72 文字で切られる） */
export const SUMMARY_MAX_LENGTH = 80;

function toSummary(race: Race, locale: Locale): string {
  const description = getRaceDescription(race, locale);
  if (description.length <= SUMMARY_MAX_LENGTH) return description;
  return `${description.slice(0, SUMMARY_MAX_LENGTH - 1).trimEnd()}…`;
}

export function toRaceListItem(race: Race, locale: Locale): RaceListItem {
  const giftCategoryIds = new Set<GiftCategoryId>();
  for (const gift of [...race.participation_gifts, ...(race.completion_gifts ?? [])]) {
    for (const category of gift.gift_categories) giftCategoryIds.add(category);
  }

  return {
    id: race.id,
    name_ja: race.name_ja,
    name_en: race.name_en,
    city: getRaceCity(race, locale),
    summary: toSummary(race, locale),
    date: race.date,
    prefecture: race.prefecture,
    tags: race.tags,
    official_url: race.official_url,
    hero_image_url: race.hero_image_url,
    entry_closed: race.entry_closed,
    entry_fee: race.entry_fee,
    entry_fee_by_category: race.entry_fee_by_category,
    entry_capacity: race.entry_capacity,
    entry_start_date: race.entry_start_date,
    entry_end_date: race.entry_end_date,
    reception_type: race.reception_type,
    reception_sessions: race.reception_sessions.map((s) => ({ date: s.date, close_time: s.close_time })),
    categories: race.categories.map((c) => ({
      distance_type: c.distance_type,
      distance_km: c.distance_km,
      time_limit_minutes: c.time_limit_minutes,
      start_time: c.start_time,
      entry_fee: c.entry_fee,
      name_ja: c.name_ja,
      name_en: c.name_en,
    })),
    entry_periods: race.entry_periods.map((p) => ({ start_date: p.start_date, end_date: p.end_date })),
    gift_category_ids: [...giftCategoryIds],
    travel_times: (race.travel_times ?? []).map((t) => ({ hub_id: t.hub_id as HubId, duration_minutes: t.duration_minutes })),
    course: {
      highlight: locale === 'en' ? race.course_info.highlights_en : race.course_info.highlights_ja,
      certification: race.course_info.certification,
    },
  };
}
