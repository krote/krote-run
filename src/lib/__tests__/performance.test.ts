import { describe, it, expect } from 'vitest';
import { derivePerformanceBucket, getPerformanceBucketMessageKey } from '../performance';

// ── derivePerformanceBucket - full ────────────────────────────

describe('derivePerformanceBucket - full', () => {
  it('10799s (2:59:59) → sub3', () => {
    expect(derivePerformanceBucket('full', 10799)).toBe('sub3');
  });

  it('10800s (3:00:00) → sub330（境界: ちょうど3時間はsub3ではなくsub330）', () => {
    expect(derivePerformanceBucket('full', 10800)).toBe('sub330');
  });

  it('12599s (3:29:59) → sub330', () => {
    expect(derivePerformanceBucket('full', 12599)).toBe('sub330');
  });

  it('12600s (3:30:00) → sub4', () => {
    expect(derivePerformanceBucket('full', 12600)).toBe('sub4');
  });

  it('14399s (3:59:59) → sub4', () => {
    expect(derivePerformanceBucket('full', 14399)).toBe('sub4');
  });

  it('14400s (4:00:00) → sub430', () => {
    expect(derivePerformanceBucket('full', 14400)).toBe('sub430');
  });

  it('16199s (4:29:59) → sub430', () => {
    expect(derivePerformanceBucket('full', 16199)).toBe('sub430');
  });

  it('16200s (4:30:00) → sub5', () => {
    expect(derivePerformanceBucket('full', 16200)).toBe('sub5');
  });

  it('17999s (4:59:59) → sub5', () => {
    expect(derivePerformanceBucket('full', 17999)).toBe('sub5');
  });

  it('18000s (5:00:00) → over5', () => {
    expect(derivePerformanceBucket('full', 18000)).toBe('over5');
  });

  it('99999s → over5', () => {
    expect(derivePerformanceBucket('full', 99999)).toBe('over5');
  });
});

// ── derivePerformanceBucket - half ────────────────────────────

describe('derivePerformanceBucket - half', () => {
  it('5399s (1:29:59) → sub130', () => {
    expect(derivePerformanceBucket('half', 5399)).toBe('sub130');
  });

  it('5400s (1:30:00) → sub145', () => {
    expect(derivePerformanceBucket('half', 5400)).toBe('sub145');
  });

  it('6299s (1:44:59) → sub145', () => {
    expect(derivePerformanceBucket('half', 6299)).toBe('sub145');
  });

  it('6300s (1:45:00) → sub2', () => {
    expect(derivePerformanceBucket('half', 6300)).toBe('sub2');
  });

  it('7199s (1:59:59) → sub2', () => {
    expect(derivePerformanceBucket('half', 7199)).toBe('sub2');
  });

  it('7200s (2:00:00) → over2', () => {
    expect(derivePerformanceBucket('half', 7200)).toBe('over2');
  });
});

// ── derivePerformanceBucket - ultra ───────────────────────────

describe('derivePerformanceBucket - ultra', () => {
  it('35999s (9:59:59) → sub10', () => {
    expect(derivePerformanceBucket('ultra', 35999)).toBe('sub10');
  });

  it('36000s (10:00:00) → sub11', () => {
    expect(derivePerformanceBucket('ultra', 36000)).toBe('sub11');
  });

  it('39599s (10:59:59) → sub11', () => {
    expect(derivePerformanceBucket('ultra', 39599)).toBe('sub11');
  });

  it('39600s (11:00:00) → sub12', () => {
    expect(derivePerformanceBucket('ultra', 39600)).toBe('sub12');
  });

  it('43199s (11:59:59) → sub12', () => {
    expect(derivePerformanceBucket('ultra', 43199)).toBe('sub12');
  });

  it('43200s (12:00:00) → sub13', () => {
    expect(derivePerformanceBucket('ultra', 43200)).toBe('sub13');
  });

  it('46799s (12:59:59) → sub13', () => {
    expect(derivePerformanceBucket('ultra', 46799)).toBe('sub13');
  });

  it('46800s (13:00:00) → over13', () => {
    expect(derivePerformanceBucket('ultra', 46800)).toBe('over13');
  });
});

// ── derivePerformanceBucket - その他距離 ──────────────────────

describe('derivePerformanceBucket - 区分なし距離', () => {
  it('10k → all', () => {
    expect(derivePerformanceBucket('10k', 3600)).toBe('all');
  });

  it('5k → all', () => {
    expect(derivePerformanceBucket('5k', 1800)).toBe('all');
  });

  it('other → all', () => {
    expect(derivePerformanceBucket('other', 7200)).toBe('all');
  });
});

// ── derivePerformanceBucket - 異常値 ─────────────────────────

describe('derivePerformanceBucket - 異常値', () => {
  it('0秒 → null', () => {
    expect(derivePerformanceBucket('full', 0)).toBeNull();
  });

  it('負値 → null', () => {
    expect(derivePerformanceBucket('full', -1)).toBeNull();
  });

  it('未知の distance_type → null', () => {
    expect(derivePerformanceBucket('unknown_distance', 3600)).toBeNull();
  });
});

// ── getPerformanceBucketMessageKey ────────────────────────────

describe('getPerformanceBucketMessageKey', () => {
  it('バケット ID から i18n メッセージキーを返す', () => {
    expect(getPerformanceBucketMessageKey('sub3')).toBe('performance.sub3');
    expect(getPerformanceBucketMessageKey('over5')).toBe('performance.over5');
    expect(getPerformanceBucketMessageKey('all')).toBe('performance.all');
  });
});
