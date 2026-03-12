import type { Race, Prefecture, GiftCategory } from './types';

// ==================
// Race data
// ==================

export async function getRaces(): Promise<Race[]> {
  try {
    const { default: races } = await import('../data/races/index.json');
    return races as Race[];
  } catch {
    return [];
  }
}

export async function getRaceById(id: string): Promise<Race | null> {
  try {
    const { default: race } = await import(`../data/races/${id}.json`);
    return race as Race;
  } catch {
    // Fall back to scanning all races
    const races = await getRaces();
    return races.find((r) => r.id === id) ?? null;
  }
}

export async function getRacesByPrefecture(prefecture: string): Promise<Race[]> {
  const races = await getRaces();
  return races.filter((r) => r.prefecture === prefecture);
}

export async function getUpcomingRaces(limit = 6): Promise<Race[]> {
  const races = await getRaces();
  const today = new Date().toISOString().split('T')[0];
  return races
    .filter((r) => r.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

// ==================
// Prefecture data
// ==================

export async function getPrefectures(): Promise<Prefecture[]> {
  const { default: prefectures } = await import('../data/prefectures.json');
  return prefectures as Prefecture[];
}

export async function getPrefectureByCode(code: string): Promise<Prefecture | null> {
  const prefectures = await getPrefectures();
  return prefectures.find((p) => p.code === code) ?? null;
}

// ==================
// Gift category data
// ==================

export async function getGiftCategories(): Promise<GiftCategory[]> {
  const { default: categories } = await import('../data/gift-categories.json');
  return categories as GiftCategory[];
}

export async function getGiftCategoryById(id: string): Promise<GiftCategory | null> {
  const categories = await getGiftCategories();
  return categories.find((c) => c.id === id) ?? null;
}
