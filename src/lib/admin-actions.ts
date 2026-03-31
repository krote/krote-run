'use server';

import { redirect } from 'next/navigation';
import { getDatabase } from '@/lib/db/client';
import { races, race_categories, race_series, race_entry_periods } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export type ActionState = { error: string } | null;

// ==================
// 大会追加
// ==================

export async function createRace(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const locale = (formData.get('locale') as string) || 'ja';
  const seriesType = formData.get('series_type') as string; // 'new' | 'existing'
  const seriesId = (formData.get('series_id') as string)?.trim();

  if (!seriesId || !/^[a-z0-9-]+$/.test(seriesId)) {
    return { error: 'シリーズIDは英小文字・数字・ハイフンのみ使用できます' };
  }

  const db = getDatabase();

  if (seriesType === 'new') {
    const seriesNameJa = (formData.get('series_name_ja') as string)?.trim();
    const seriesNameEn = (formData.get('series_name_en') as string)?.trim();
    if (!seriesNameJa || !seriesNameEn) {
      return { error: 'シリーズ名（日本語・英語）は必須です' };
    }
    const existing = await db.select({ id: race_series.id }).from(race_series).where(eq(race_series.id, seriesId));
    if (existing.length > 0) {
      return { error: `シリーズID "${seriesId}" は既に存在します` };
    }
    await db.insert(race_series).values({
      id: seriesId,
      name_ja: seriesNameJa,
      name_en: seriesNameEn,
      first_held_year: null,
      website_url: null,
    });
  }

  const date = (formData.get('date') as string)?.trim();
  const year = date?.match(/^(\d{4})-/)?.[1];
  if (!date || !year) {
    return { error: '開催日は必須です（YYYY-MM-DD）' };
  }

  const raceId = `${seriesId}-${year}`;
  const existingRace = await db.select({ id: races.id }).from(races).where(eq(races.id, raceId));
  if (existingRace.length > 0) {
    return { error: `大会ID "${raceId}" は既に存在します` };
  }

  const nameJa = (formData.get('name_ja') as string)?.trim();
  const nameEn = (formData.get('name_en') as string)?.trim();
  const prefecture = (formData.get('prefecture') as string)?.trim();
  const cityJa = (formData.get('city_ja') as string)?.trim();
  const cityEn = (formData.get('city_en') as string)?.trim();

  if (!nameJa || !nameEn || !prefecture || !cityJa || !cityEn) {
    return { error: '必須項目（大会名・都道府県・開催地）をすべて入力してください' };
  }

  const now = new Date().toISOString();

  await db.insert(races).values({
    id: raceId,
    name_ja: nameJa,
    name_en: nameEn,
    full_name_ja: (formData.get('full_name_ja') as string) || null,
    full_name_en: (formData.get('full_name_en') as string) || null,
    edition: formData.get('edition') ? parseInt(formData.get('edition') as string) : null,
    date,
    prefecture,
    city_ja: cityJa,
    city_en: cityEn,
    description_ja: (formData.get('description_ja') as string) || '',
    description_en: (formData.get('description_en') as string) || '',
    official_url: (formData.get('official_url') as string) || '',
    entry_fee: formData.get('entry_fee') ? parseInt(formData.get('entry_fee') as string) : null,
    entry_fee_by_category: false,
    entry_capacity: parseInt((formData.get('entry_capacity') as string) || '0'),
    entry_start_date: null,
    entry_end_date: null,
    reception_type: (formData.get('reception_type') as string) || 'race_day',
    reception_note_ja: '',
    reception_note_en: '',
    tags: '[]',
    course_surface: (formData.get('course_surface') as string) || 'road',
    course_certification: '[]',
    course_max_elevation_m: 0,
    course_min_elevation_m: 0,
    course_elevation_diff_m: 0,
    course_highlights_ja: '',
    course_highlights_en: '',
    created_at: now,
    updated_at: now,
  });

  // カテゴリを追加
  const categoryCount = parseInt((formData.get('category_count') as string) || '0');
  for (let i = 0; i < categoryCount; i++) {
    const distanceType = formData.get(`cat_${i}_distance_type`) as string;
    const distanceKm = parseFloat((formData.get(`cat_${i}_distance_km`) as string) || '0');
    if (!distanceType || distanceKm <= 0) continue;

    await db.insert(race_categories).values({
      race_id: raceId,
      distance_type: distanceType,
      distance_km: distanceKm,
      time_limit_minutes: parseInt((formData.get(`cat_${i}_time_limit`) as string) || '0'),
      start_time: (formData.get(`cat_${i}_start_time`) as string) || '',
      capacity: parseInt((formData.get(`cat_${i}_capacity`) as string) || '0'),
      entry_fee: formData.get(`cat_${i}_entry_fee`)
        ? parseInt(formData.get(`cat_${i}_entry_fee`) as string)
        : null,
      entry_fee_u25: null,
      name_ja: (formData.get(`cat_${i}_name_ja`) as string) || null,
      name_en: (formData.get(`cat_${i}_name_en`) as string) || null,
      description_ja: null,
      description_en: null,
      waves: '[]',
      sort_order: i,
    });
  }

  // エントリー期間を追加
  const entryPeriodCount = parseInt((formData.get('entry_period_count') as string) || '0');
  for (let i = 0; i < entryPeriodCount; i++) {
    const startDate = (formData.get(`entry_period_${i}_start_date`) as string) || '';
    const endDate = (formData.get(`entry_period_${i}_end_date`) as string) || '';
    if (!startDate || !endDate) continue;

    await db.insert(race_entry_periods).values({
      race_id: raceId,
      category_id: null,
      label_ja: (formData.get(`entry_period_${i}_label_ja`) as string) || '一般エントリー',
      label_en: (formData.get(`entry_period_${i}_label_en`) as string) || 'General Entry',
      start_date: startDate,
      end_date: endDate,
      entry_fee: formData.get(`entry_period_${i}_entry_fee`)
        ? parseInt(formData.get(`entry_period_${i}_entry_fee`) as string)
        : null,
      sort_order: i,
    });
  }

  redirect(`/${locale}/admin`);
}

// ==================
// 大会削除
// ==================

export async function deleteRace(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = (formData.get('race_id') as string)?.trim();
  if (!id) return { error: '大会IDが指定されていません' };

  const locale = (formData.get('locale') as string) || 'ja';
  const db = getDatabase();
  await db.delete(races).where(eq(races.id, id));

  redirect(`/${locale}/admin`);
}
