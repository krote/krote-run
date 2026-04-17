import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: vi.fn(() => ({ env: {} })),
}));

vi.mock('@/lib/db/client', () => ({
  getDatabase: vi.fn(() => ({
    insert: vi.fn(() => ({ values: vi.fn().mockResolvedValue(undefined) })),
  })),
}));

vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: { send: vi.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }) },
  })),
}));

import { submitContact } from '../contact-actions';

function makeFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.append('name', overrides.name ?? '山田 太郎');
  fd.append('email', overrides.email ?? 'test@example.com');
  fd.append('category', overrides.category ?? 'other');
  fd.append('message', overrides.message ?? 'テストのお問い合わせ内容です。');
  if (overrides.user_id !== undefined) fd.append('user_id', overrides.user_id);
  return fd;
}

describe('submitContact バリデーション', () => {
  beforeEach(() => vi.clearAllMocks());

  it('正常な入力で success: true を返す', async () => {
    const result = await submitContact(null, makeFormData());
    expect(result).toEqual({ success: true });
  });

  it('名前が空だとエラーを返す', async () => {
    const result = await submitContact(null, makeFormData({ name: '' }));
    expect(result).toMatchObject({ error: expect.stringContaining('お名前') });
  });

  it('メールアドレスが空だとエラーを返す', async () => {
    const result = await submitContact(null, makeFormData({ email: '' }));
    expect(result).toMatchObject({ error: expect.stringContaining('メールアドレス') });
  });

  it('メールアドレスの形式が不正だとエラーを返す', async () => {
    const result = await submitContact(null, makeFormData({ email: 'not-an-email' }));
    expect(result).toMatchObject({ error: expect.stringContaining('メールアドレス') });
  });

  it('カテゴリが空だとエラーを返す', async () => {
    const result = await submitContact(null, makeFormData({ category: '' }));
    expect(result).toMatchObject({ error: expect.stringContaining('種別') });
  });

  it('カテゴリが不正な値だとエラーを返す', async () => {
    const result = await submitContact(null, makeFormData({ category: 'invalid_category' }));
    expect(result).toMatchObject({ error: expect.stringContaining('種別') });
  });

  it('メッセージが10文字未満だとエラーを返す', async () => {
    const result = await submitContact(null, makeFormData({ message: '短すぎる' }));
    expect(result).toMatchObject({ error: expect.stringContaining('10文字') });
  });

  it('メッセージが5000文字超だとエラーを返す', async () => {
    const result = await submitContact(null, makeFormData({ message: 'a'.repeat(5001) }));
    expect(result).toMatchObject({ error: expect.stringContaining('5000文字') });
  });

  it('有効なカテゴリ値がすべて受け付けられる', async () => {
    const categories = ['race_error', 'race_suggestion', 'site_bug', 'other'];
    for (const category of categories) {
      const result = await submitContact(null, makeFormData({ category }));
      expect(result).toEqual({ success: true });
    }
  });
});
