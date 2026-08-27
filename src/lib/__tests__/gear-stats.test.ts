import { describe, it, expect } from 'vitest';
import { normalizeGearKey, buildGearStats, deriveResultBucket, type GearStatsRow } from '../gear-stats';

// ─── normalizeGearKey ───────────────────────────────────────────────────────

describe('normalizeGearKey', () => {
  it('ASINがあればASINをそのまま返す', () => {
    expect(normalizeGearKey('B01ABCDEFG', 'Nike', 'ペガサス')).toBe('B01ABCDEFG');
  });

  it('ASINが無ければ brand+name を正規化して返す', () => {
    expect(normalizeGearKey(null, 'Nike', 'ペガサス')).toBe('nike|ペガサス');
  });

  it('brand+name の正規化は大文字小文字を無視する', () => {
    expect(normalizeGearKey(null, 'NIKE', 'Pegasus')).toBe(normalizeGearKey(null, 'nike', 'pegasus'));
  });

  it('brand+name の正規化は前後・連続する空白を無視する', () => {
    expect(normalizeGearKey(null, '  Nike  ', 'Air  Zoom')).toBe(normalizeGearKey(null, 'Nike', 'Air Zoom'));
  });

  it('ASINが空文字の場合はbrand+nameにフォールバックする', () => {
    expect(normalizeGearKey('', 'Nike', 'ペガサス')).toBe('nike|ペガサス');
  });
});

// ─── deriveResultBucket ─────────────────────────────────────────────────────

describe('deriveResultBucket', () => {
  const categories = [
    { id: 1, distance_type: 'full', distance_km: 42.195 },
    { id: 2, distance_type: '10k', distance_km: 10 },
  ];

  it('resultがnullならnullを返す', () => {
    expect(deriveResultBucket(null, categories)).toBeNull();
  });

  it('status が finished 以外ならnullを返す', () => {
    expect(deriveResultBucket({ status: 'dnf', finish_time_sec: null, category_id: null }, categories)).toBeNull();
  });

  it('finish_time_sec が無ければnullを返す', () => {
    expect(deriveResultBucket({ status: 'finished', finish_time_sec: null, category_id: null }, categories)).toBeNull();
  });

  it('category_id が指定されていればそのカテゴリのdistance_typeで判定する', () => {
    // 10km相当のタイムだが、フルの category_id を指定 → フル換算のバケットになる
    const bucket = deriveResultBucket({ status: 'finished', finish_time_sec: 10799, category_id: 1 }, categories);
    expect(bucket).toBe('sub3');
  });

  it('category_id が未指定なら フル優先で代表カテゴリを選ぶ', () => {
    const bucket = deriveResultBucket({ status: 'finished', finish_time_sec: 10799, category_id: null }, categories);
    expect(bucket).toBe('sub3');
  });

  it('フルが無ければ最長距離のカテゴリを代表として選ぶ', () => {
    const noFull = [
      { id: 2, distance_type: '10k', distance_km: 10 },
      { id: 3, distance_type: 'half', distance_km: 21.0975 },
    ];
    const bucket = deriveResultBucket({ status: 'finished', finish_time_sec: 5000, category_id: null }, noFull);
    expect(bucket).toBe('sub130');
  });

  it('categoriesが空ならnullを返す', () => {
    expect(deriveResultBucket({ status: 'finished', finish_time_sec: 10800, category_id: null }, [])).toBeNull();
  });
});

// ─── buildGearStats ─────────────────────────────────────────────────────────

function row(overrides: Partial<GearStatsRow> = {}): GearStatsRow {
  return {
    userRaceId: 'ur-1',
    bucket: 'sub4',
    gearId: 'gear-1',
    category: 'shoes',
    brand: 'Nike',
    name: 'ペガサス',
    asin: null,
    used: true,
    ...overrides,
  };
}

describe('buildGearStats', () => {
  it('空配列を渡すと空配列を返す', () => {
    expect(buildGearStats([])).toEqual([]);
  });

  it('走力帯の公開ユーザー数が3人未満なら、そのバケットは結果に含まれない', () => {
    const rows = [
      row({ userRaceId: 'ur-1' }),
      row({ userRaceId: 'ur-2' }),
    ];
    expect(buildGearStats(rows)).toEqual([]);
  });

  it('走力帯の公開ユーザー数が3人以上なら、そのバケットが結果に含まれる', () => {
    const rows = [
      row({ userRaceId: 'ur-1' }),
      row({ userRaceId: 'ur-2' }),
      row({ userRaceId: 'ur-3' }),
    ];
    const stats = buildGearStats(rows);
    expect(stats).toHaveLength(1);
    expect(stats[0].bucket).toBe('sub4');
    expect(stats[0].userCount).toBe(3);
  });

  it('resultがない（bucket=null）ユーザーは unclassified バケットに分類される', () => {
    const rows = [
      row({ userRaceId: 'ur-1', bucket: null }),
      row({ userRaceId: 'ur-2', bucket: null }),
      row({ userRaceId: 'ur-3', bucket: null }),
    ];
    const stats = buildGearStats(rows);
    expect(stats).toHaveLength(1);
    expect(stats[0].bucket).toBe('unclassified');
  });

  it('同じユーザーが複数の装備を持っていても userCount は1人としてカウントされる', () => {
    const rows = [
      row({ userRaceId: 'ur-1', gearId: 'gear-1' }),
      row({ userRaceId: 'ur-1', gearId: 'gear-2' }),
      row({ userRaceId: 'ur-2' }),
      row({ userRaceId: 'ur-3' }),
    ];
    const stats = buildGearStats(rows);
    expect(stats[0].userCount).toBe(3);
  });

  it('同じ製品（ASIN一致）は同一製品として集計される', () => {
    const rows = [
      row({ userRaceId: 'ur-1', asin: 'B01ABCDEFG', brand: 'Nike', name: 'ペガサス40' }),
      row({ userRaceId: 'ur-2', asin: 'B01ABCDEFG', brand: 'Nike', name: 'ペガサス 40（型番違い表記）' }),
      row({ userRaceId: 'ur-3', asin: 'B01ABCDEFG', brand: 'Nike', name: 'Pegasus 40' }),
    ];
    const stats = buildGearStats(rows);
    const shoesProducts = stats[0].categories.find((c) => c.category === 'shoes')!.products;
    expect(shoesProducts).toHaveLength(1);
    expect(shoesProducts[0].usedCount).toBe(3);
  });

  it('used=true の件数を usedCount、全件数を packedCount として区別する', () => {
    const rows = [
      row({ userRaceId: 'ur-1', used: true }),
      row({ userRaceId: 'ur-2', used: false }),
      row({ userRaceId: 'ur-3', used: null }),
    ];
    const stats = buildGearStats(rows);
    const product = stats[0].categories[0].products[0];
    expect(product.usedCount).toBe(1);
    expect(product.packedCount).toBe(3);
  });

  it('カテゴリごとに製品をグルーピングする', () => {
    const rows = [
      row({ userRaceId: 'ur-1', category: 'shoes', gearId: 'g1', brand: 'Nike', name: 'ペガサス' }),
      row({ userRaceId: 'ur-2', category: 'shoes', gearId: 'g1', brand: 'Nike', name: 'ペガサス' }),
      row({ userRaceId: 'ur-3', category: 'shoes', gearId: 'g1', brand: 'Nike', name: 'ペガサス' }),
      row({ userRaceId: 'ur-1', category: 'nutrition', gearId: 'g2', brand: 'in', name: 'ゼリー' }),
      row({ userRaceId: 'ur-2', category: 'nutrition', gearId: 'g2', brand: 'in', name: 'ゼリー' }),
      row({ userRaceId: 'ur-3', category: 'nutrition', gearId: 'g2', brand: 'in', name: 'ゼリー' }),
    ];
    const stats = buildGearStats(rows);
    const categoryNames = stats[0].categories.map((c) => c.category).sort();
    expect(categoryNames).toEqual(['nutrition', 'shoes']);
  });

  it('製品はカテゴリ内で使用者数（usedCount）降順にソートされる', () => {
    const rows: GearStatsRow[] = [];
    // 製品A: used=trueが1人
    rows.push(row({ userRaceId: 'ur-1', gearId: 'gA', brand: 'A', name: 'ProductA', used: true }));
    // 製品B: used=trueが3人
    rows.push(row({ userRaceId: 'ur-2', gearId: 'gB', brand: 'B', name: 'ProductB', used: true }));
    rows.push(row({ userRaceId: 'ur-4', gearId: 'gB', brand: 'B', name: 'ProductB', used: true }));
    rows.push(row({ userRaceId: 'ur-5', gearId: 'gB', brand: 'B', name: 'ProductB', used: true }));
    // バケット全体の公開ユーザー数を3人以上にするため
    rows.push(row({ userRaceId: 'ur-3', gearId: 'gA', brand: 'A', name: 'ProductA', used: false }));
    const stats = buildGearStats(rows);
    const products = stats[0].categories[0].products;
    expect(products[0].name).toBe('ProductB');
    expect(products[1].name).toBe('ProductA');
  });

  it('カテゴリ内の製品はTOP5までに切り詰められる', () => {
    const rows: GearStatsRow[] = [];
    for (let i = 0; i < 6; i++) {
      const userRaceId = `ur-${i}`;
      rows.push(row({ userRaceId, gearId: `g${i}`, brand: `Brand${i}`, name: `Product${i}`, used: true }));
    }
    // 3人未満バケット除外を回避するため、同じ製品セットをもう2人分追加
    rows.push(row({ userRaceId: 'ur-x', gearId: 'g0', brand: 'Brand0', name: 'Product0', used: true }));
    rows.push(row({ userRaceId: 'ur-y', gearId: 'g0', brand: 'Brand0', name: 'Product0', used: true }));
    const stats = buildGearStats(rows);
    expect(stats[0].categories[0].products.length).toBeLessThanOrEqual(5);
  });

  it('走力帯ごとに独立して集計される', () => {
    const rows = [
      row({ userRaceId: 'ur-1', bucket: 'sub4' }),
      row({ userRaceId: 'ur-2', bucket: 'sub4' }),
      row({ userRaceId: 'ur-3', bucket: 'sub4' }),
      row({ userRaceId: 'ur-4', bucket: 'sub3' }),
      row({ userRaceId: 'ur-5', bucket: 'sub3' }),
      row({ userRaceId: 'ur-6', bucket: 'sub3' }),
    ];
    const stats = buildGearStats(rows);
    const buckets = stats.map((s) => s.bucket).sort();
    expect(buckets).toEqual(['sub3', 'sub4']);
  });
});
