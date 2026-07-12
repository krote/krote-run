import { describe, it, expect } from 'vitest';
import { validateCreateBody, validateUpdateBody } from '../gear-validation';

// ─── validateCreateBody ────────────────────────────────────────────────────

describe('validateCreateBody', () => {
  const validBase = {
    category: 'shoes',
    name: 'テストシューズ',
  };

  describe('正常系', () => {
    it('最小必須フィールドのみで成功する', () => {
      const result = validateCreateBody(validBase);
      expect('error' in result).toBe(false);
      if ('data' in result) {
        expect(result.data.category).toBe('shoes');
        expect(result.data.name).toBe('テストシューズ');
        expect(result.data.usage_tag).toBe('both'); // デフォルト
        expect(result.data.brand).toBe('');
        expect(result.data.memo).toBe('');
        expect(result.data.amazon_url).toBeNull();
        expect(result.data.asin).toBeNull();
      }
    });

    it('全フィールド指定で成功する', () => {
      const result = validateCreateBody({
        ...validBase,
        brand: 'Nike',
        usage_tag: 'race',
        memo: 'メモ',
        amazon_url: 'https://www.amazon.co.jp/dp/B0XXXXXXXX',
      });
      expect('data' in result).toBe(true);
      if ('data' in result) {
        expect(result.data.asin).toBe('B0XXXXXXXX');
        expect(result.data.amazon_url).toBe('https://www.amazon.co.jp/dp/B0XXXXXXXX');
      }
    });

    it('name の前後空白はtrimされる', () => {
      const result = validateCreateBody({ ...validBase, name: '  シューズ  ' });
      expect('data' in result).toBe(true);
      if ('data' in result) expect(result.data.name).toBe('シューズ');
    });

    it('brand の前後空白はtrimされる', () => {
      const result = validateCreateBody({ ...validBase, brand: '  Nike  ' });
      expect('data' in result).toBe(true);
      if ('data' in result) expect(result.data.brand).toBe('Nike');
    });

    it('amazon_url が null ならasinもnull', () => {
      const result = validateCreateBody({ ...validBase, amazon_url: null });
      expect('data' in result).toBe(true);
      if ('data' in result) {
        expect(result.data.amazon_url).toBeNull();
        expect(result.data.asin).toBeNull();
      }
    });

    it('amazon_url が空文字ならasinもnull', () => {
      const result = validateCreateBody({ ...validBase, amazon_url: '' });
      expect('data' in result).toBe(true);
      if ('data' in result) {
        expect(result.data.amazon_url).toBeNull();
        expect(result.data.asin).toBeNull();
      }
    });

    it('nameが200文字ちょうどで成功する', () => {
      const result = validateCreateBody({ ...validBase, name: 'a'.repeat(200) });
      expect('data' in result).toBe(true);
    });

    it('brandが200文字ちょうどで成功する', () => {
      const result = validateCreateBody({ ...validBase, brand: 'a'.repeat(200) });
      expect('data' in result).toBe(true);
    });

    it('memoが1000文字ちょうどで成功する', () => {
      const result = validateCreateBody({ ...validBase, memo: 'a'.repeat(1000) });
      expect('data' in result).toBe(true);
    });

    it.each(['shoes', 'tops', 'bottoms', 'socks', 'cap', 'sunglasses',
             'watch', 'pack', 'light', 'poles', 'nutrition', 'other'])(
      'category=%s は有効', (cat) => {
        const result = validateCreateBody({ ...validBase, category: cat });
        expect('data' in result).toBe(true);
      }
    );

    it.each(['race', 'training', 'both'])('usage_tag=%s は有効', (tag) => {
      const result = validateCreateBody({ ...validBase, usage_tag: tag });
      expect('data' in result).toBe(true);
    });
  });

  describe('異常系', () => {
    it('category が未指定なら400', () => {
      const result = validateCreateBody({ name: 'シューズ' });
      expect('error' in result).toBe(true);
    });

    it('category が不正値なら400', () => {
      const result = validateCreateBody({ ...validBase, category: 'invalid' });
      expect('error' in result).toBe(true);
    });

    it('name が未指定なら400', () => {
      const result = validateCreateBody({ category: 'shoes' });
      expect('error' in result).toBe(true);
    });

    it('name が空文字（trim後）なら400', () => {
      const result = validateCreateBody({ ...validBase, name: '   ' });
      expect('error' in result).toBe(true);
    });

    it('name が201文字なら400', () => {
      const result = validateCreateBody({ ...validBase, name: 'a'.repeat(201) });
      expect('error' in result).toBe(true);
    });

    it('brand が201文字なら400', () => {
      const result = validateCreateBody({ ...validBase, brand: 'a'.repeat(201) });
      expect('error' in result).toBe(true);
    });

    it('memo が1001文字なら400', () => {
      const result = validateCreateBody({ ...validBase, memo: 'a'.repeat(1001) });
      expect('error' in result).toBe(true);
    });

    it('usage_tag が不正値なら400', () => {
      const result = validateCreateBody({ ...validBase, usage_tag: 'invalid' });
      expect('error' in result).toBe(true);
    });

    it('amazon_url が非Amazonドメインなら400', () => {
      const result = validateCreateBody({ ...validBase, amazon_url: 'https://example.com/dp/B0XXXXXXXX' });
      expect('error' in result).toBe(true);
    });

    it('amazon_url がASIN抽出できないURLなら400', () => {
      const result = validateCreateBody({ ...validBase, amazon_url: 'https://www.amazon.co.jp/not-a-product/' });
      expect('error' in result).toBe(true);
    });

    it('body が null なら400', () => {
      const result = validateCreateBody(null);
      expect('error' in result).toBe(true);
    });

    it('body が非オブジェクトなら400', () => {
      const result = validateCreateBody('string');
      expect('error' in result).toBe(true);
    });
  });
});

// ─── validateUpdateBody ────────────────────────────────────────────────────

describe('validateUpdateBody', () => {
  it('空オブジェクトでも成功する（全フィールド省略可）', () => {
    const result = validateUpdateBody({});
    expect('data' in result).toBe(true);
    if ('data' in result) expect(Object.keys(result.data)).toHaveLength(0);
  });

  it('category のみ更新できる', () => {
    const result = validateUpdateBody({ category: 'watch' });
    expect('data' in result).toBe(true);
    if ('data' in result) expect(result.data.category).toBe('watch');
  });

  it('name を更新できる', () => {
    const result = validateUpdateBody({ name: '新しい名前' });
    expect('data' in result).toBe(true);
    if ('data' in result) expect(result.data.name).toBe('新しい名前');
  });

  it('is_retired を更新できる', () => {
    const result = validateUpdateBody({ is_retired: true });
    expect('data' in result).toBe(true);
    if ('data' in result) expect(result.data.is_retired).toBe(true);
  });

  it('amazon_url をクリアできる（null → asin もnull）', () => {
    const result = validateUpdateBody({ amazon_url: null });
    expect('data' in result).toBe(true);
    if ('data' in result) {
      expect(result.data.amazon_url).toBeNull();
      expect(result.data.asin).toBeNull();
    }
  });

  it('amazon_url を有効なURLで更新するとasinが抽出される', () => {
    const result = validateUpdateBody({ amazon_url: 'https://www.amazon.co.jp/dp/B0YYYYYYYY' });
    expect('data' in result).toBe(true);
    if ('data' in result) {
      expect(result.data.asin).toBe('B0YYYYYYYY');
    }
  });

  it('category が不正値なら400', () => {
    const result = validateUpdateBody({ category: 'invalid' });
    expect('error' in result).toBe(true);
  });

  it('name が空文字（trim後）なら400', () => {
    const result = validateUpdateBody({ name: '  ' });
    expect('error' in result).toBe(true);
  });

  it('name が201文字なら400', () => {
    const result = validateUpdateBody({ name: 'a'.repeat(201) });
    expect('error' in result).toBe(true);
  });

  it('amazon_url が非Amazonドメインなら400', () => {
    const result = validateUpdateBody({ amazon_url: 'https://example.com/dp/B0XXXXXXXX' });
    expect('error' in result).toBe(true);
  });

  it('body が null なら400', () => {
    const result = validateUpdateBody(null);
    expect('error' in result).toBe(true);
  });
});
