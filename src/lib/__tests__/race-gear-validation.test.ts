import { describe, it, expect } from 'vitest';
import { validatePutBody, validatePatchBody } from '../race-gear-validation';

describe('validatePutBody', () => {
  const validItem = { gear_id: 'gear-uuid-1', quantity: 1, sort_order: 0 };

  it('正常なbodyを受け付ける', () => {
    const result = validatePutBody({ items: [validItem] });
    expect('data' in result).toBe(true);
    if ('data' in result) {
      expect(result.data.items).toHaveLength(1);
      expect(result.data.items[0].gear_id).toBe('gear-uuid-1');
    }
  });

  it('items が空配列でも受け付ける', () => {
    const result = validatePutBody({ items: [] });
    expect('data' in result).toBe(true);
  });

  it('items がない場合はエラー', () => {
    const result = validatePutBody({});
    expect('error' in result).toBe(true);
  });

  it('items が配列でない場合はエラー', () => {
    const result = validatePutBody({ items: 'foo' });
    expect('error' in result).toBe(true);
  });

  it('gear_id が空文字の場合はエラー', () => {
    const result = validatePutBody({ items: [{ gear_id: '', quantity: 1, sort_order: 0 }] });
    expect('error' in result).toBe(true);
  });

  it('quantity が 0 の場合はエラー（1〜999）', () => {
    const result = validatePutBody({ items: [{ gear_id: 'x', quantity: 0, sort_order: 0 }] });
    expect('error' in result).toBe(true);
  });

  it('quantity が 1000 の場合はエラー', () => {
    const result = validatePutBody({ items: [{ gear_id: 'x', quantity: 1000, sort_order: 0 }] });
    expect('error' in result).toBe(true);
  });

  it('quantity が 999 は正常', () => {
    const result = validatePutBody({ items: [{ gear_id: 'x', quantity: 999, sort_order: 0 }] });
    expect('data' in result).toBe(true);
  });

  it('quantity が小数の場合はエラー', () => {
    const result = validatePutBody({ items: [{ gear_id: 'x', quantity: 1.5, sort_order: 0 }] });
    expect('error' in result).toBe(true);
  });

  it('sort_order が負の場合はエラー', () => {
    const result = validatePutBody({ items: [{ gear_id: 'x', quantity: 1, sort_order: -1 }] });
    expect('error' in result).toBe(true);
  });

  it('同じ gear_id が重複する場合はエラー', () => {
    const result = validatePutBody({
      items: [
        { gear_id: 'same', quantity: 1, sort_order: 0 },
        { gear_id: 'same', quantity: 2, sort_order: 1 },
      ],
    });
    expect('error' in result).toBe(true);
  });

  it('body がオブジェクトでない場合はエラー', () => {
    expect('error' in validatePutBody(null)).toBe(true);
    expect('error' in validatePutBody('string')).toBe(true);
  });
});

describe('validatePatchBody', () => {
  it('used=true の正常なbodyを受け付ける', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: true });
    expect('data' in result).toBe(true);
    if ('data' in result) {
      expect(result.data.gear_id).toBe('g1');
      expect(result.data.used).toBe(true);
    }
  });

  it('used=false の正常なbodyを受け付ける', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: false });
    expect('data' in result).toBe(true);
  });

  it('used=null（未記録リセット）を受け付ける', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: null });
    expect('data' in result).toBe(true);
    if ('data' in result) {
      expect(result.data.used).toBeNull();
    }
  });

  it('used_quantity=0 を受け付ける', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: true, used_quantity: 0 });
    expect('data' in result).toBe(true);
  });

  it('used_quantity=999 を受け付ける', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: true, used_quantity: 999 });
    expect('data' in result).toBe(true);
  });

  it('used_quantity=1000 はエラー', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: true, used_quantity: 1000 });
    expect('error' in result).toBe(true);
  });

  it('used_quantity が負の場合はエラー', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: true, used_quantity: -1 });
    expect('error' in result).toBe(true);
  });

  it('used_quantity が小数の場合はエラー', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: true, used_quantity: 1.5 });
    expect('error' in result).toBe(true);
  });

  it('note が500文字以内なら受け付ける', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: true, note: 'a'.repeat(500) });
    expect('data' in result).toBe(true);
  });

  it('note が501文字以上はエラー', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: true, note: 'a'.repeat(501) });
    expect('error' in result).toBe(true);
  });

  it('gear_id が空文字はエラー', () => {
    const result = validatePatchBody({ gear_id: '', used: true });
    expect('error' in result).toBe(true);
  });

  it('gear_id がない場合はエラー', () => {
    const result = validatePatchBody({ used: true });
    expect('error' in result).toBe(true);
  });

  it('used がない場合はエラー', () => {
    const result = validatePatchBody({ gear_id: 'g1' });
    expect('error' in result).toBe(true);
  });

  it('used が boolean/null 以外はエラー', () => {
    const result = validatePatchBody({ gear_id: 'g1', used: 'yes' });
    expect('error' in result).toBe(true);
  });

  it('body がオブジェクトでない場合はエラー', () => {
    expect('error' in validatePatchBody(null)).toBe(true);
  });
});
