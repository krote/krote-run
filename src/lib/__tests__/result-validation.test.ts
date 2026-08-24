import { describe, it, expect } from 'vitest';
import { validatePutBody } from '../result-validation';

describe('validatePutBody', () => {
  // ─── 正常系 ───────────────────────────────────────────────────────────────

  it('finished + finish_time_sec で正常', () => {
    const result = validatePutBody({ status: 'finished', finish_time_sec: 14400 });
    expect('data' in result).toBe(true);
    if ('data' in result) {
      expect(result.data.status).toBe('finished');
      expect(result.data.finish_time_sec).toBe(14400);
    }
  });

  it('dnf はタイムなしで正常', () => {
    const result = validatePutBody({ status: 'dnf' });
    expect('data' in result).toBe(true);
    if ('data' in result) {
      expect(result.data.status).toBe('dnf');
      expect(result.data.finish_time_sec).toBeUndefined();
    }
  });

  it('dns はタイムなしで正常', () => {
    const result = validatePutBody({ status: 'dns' });
    expect('data' in result).toBe(true);
  });

  it('category_id を指定できる', () => {
    const result = validatePutBody({ status: 'finished', finish_time_sec: 10800, category_id: 42 });
    expect('data' in result).toBe(true);
    if ('data' in result) expect(result.data.category_id).toBe(42);
  });

  it('note を指定できる', () => {
    const result = validatePutBody({ status: 'dnf', note: '途中棄権' });
    expect('data' in result).toBe(true);
    if ('data' in result) expect(result.data.note).toBe('途中棄権');
  });

  it('finish_time_sec の最小値 1 は正常', () => {
    const result = validatePutBody({ status: 'finished', finish_time_sec: 1 });
    expect('data' in result).toBe(true);
  });

  it('finish_time_sec の最大値 172800 は正常', () => {
    const result = validatePutBody({ status: 'finished', finish_time_sec: 172800 });
    expect('data' in result).toBe(true);
  });

  // ─── 異常系: 構造 ─────────────────────────────────────────────────────────

  it('null は不正', () => {
    const result = validatePutBody(null);
    expect('error' in result).toBe(true);
  });

  it('非オブジェクトは不正', () => {
    const result = validatePutBody('string');
    expect('error' in result).toBe(true);
  });

  // ─── 異常系: status ───────────────────────────────────────────────────────

  it('status がない場合はエラー', () => {
    const result = validatePutBody({ finish_time_sec: 10800 });
    expect('error' in result).toBe(true);
  });

  it('status が不正な値はエラー', () => {
    const result = validatePutBody({ status: 'completed' });
    expect('error' in result).toBe(true);
  });

  // ─── 異常系: finish_time_sec ─────────────────────────────────────────────

  it('finished で finish_time_sec がない場合はエラー', () => {
    const result = validatePutBody({ status: 'finished' });
    expect('error' in result).toBe(true);
  });

  it('finish_time_sec が 0 はエラー', () => {
    const result = validatePutBody({ status: 'finished', finish_time_sec: 0 });
    expect('error' in result).toBe(true);
  });

  it('finish_time_sec が 172801 はエラー', () => {
    const result = validatePutBody({ status: 'finished', finish_time_sec: 172801 });
    expect('error' in result).toBe(true);
  });

  it('finish_time_sec が小数はエラー', () => {
    const result = validatePutBody({ status: 'finished', finish_time_sec: 3600.5 });
    expect('error' in result).toBe(true);
  });

  it('finish_time_sec が文字列はエラー', () => {
    const result = validatePutBody({ status: 'finished', finish_time_sec: '3600' });
    expect('error' in result).toBe(true);
  });

  // ─── 異常系: category_id ─────────────────────────────────────────────────

  it('category_id が文字列はエラー', () => {
    const result = validatePutBody({ status: 'dns', category_id: 'abc' });
    expect('error' in result).toBe(true);
  });

  it('category_id が小数はエラー', () => {
    const result = validatePutBody({ status: 'dns', category_id: 1.5 });
    expect('error' in result).toBe(true);
  });

  // ─── 異常系: note ────────────────────────────────────────────────────────

  it('note が 1000 文字超はエラー', () => {
    const result = validatePutBody({ status: 'dns', note: 'a'.repeat(1001) });
    expect('error' in result).toBe(true);
  });

  it('note が 1000 文字は正常', () => {
    const result = validatePutBody({ status: 'dns', note: 'a'.repeat(1000) });
    expect('data' in result).toBe(true);
  });
});
