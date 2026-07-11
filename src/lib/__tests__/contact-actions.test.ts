import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: vi.fn(() => ({ env: {} })),
}));

const mockDbSelect = vi.fn();
vi.mock('@/lib/db/client', () => ({
  getDatabase: vi.fn(() => ({
    insert: vi.fn(() => ({ values: vi.fn().mockResolvedValue(undefined) })),
    select: mockDbSelect,
  })),
}));

vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: { send: vi.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }) },
  })),
}));

vi.mock('next/headers', () => ({
  headers: vi.fn(() => ({
    get: (key: string) => {
      if (key === 'cf-connecting-ip') return '1.2.3.4';
      if (key === 'user-agent') return 'TestAgent/1.0';
      return null;
    },
  })),
}));

import { submitContact } from '../contact-actions';

/** レート制限に引っかからない通常ケース用モック（直近送信0件） */
function mockNoRateLimit() {
  mockDbSelect.mockReturnValue({
    from: vi.fn().mockReturnValue({
      where: vi.fn().mockReturnValue({
        all: vi.fn().mockResolvedValue([]),
      }),
    }),
  });
}

/** レート制限超過ケース用モック（直近送信多数） */
function mockRateLimitExceeded() {
  mockDbSelect.mockReturnValue({
    from: vi.fn().mockReturnValue({
      where: vi.fn().mockReturnValue({
        all: vi.fn().mockResolvedValue([{}, {}, {}, {}]), // 4件
      }),
    }),
  });
}

function makeFormData(overrides: Record<string, string> = {}): FormData {
  const fd = new FormData();
  fd.append('name', overrides.name ?? '山田 太郎');
  fd.append('email', overrides.email ?? 'test@example.com');
  fd.append('category', overrides.category ?? 'other');
  fd.append('message', overrides.message ?? 'テストのお問い合わせ内容です。');
  // デフォルトで5秒前にフォームを開いたことにする
  fd.append('form_loaded_at', overrides.form_loaded_at ?? String(Date.now() - 5000));
  if (overrides.user_id !== undefined) fd.append('user_id', overrides.user_id);
  return fd;
}

describe('submitContact バリデーション', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNoRateLimit();
  });

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

// ── スパム対策 ───────────────────────────────────────────────

describe('submitContact スパム対策', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNoRateLimit();
  });

  it('honeypot(_website)が入力されているとエラーを返す', async () => {
    const fd = makeFormData();
    fd.append('_website', 'http://spam.example.com');
    const result = await submitContact(null, fd);
    expect(result).toMatchObject({ error: expect.any(String) });
  });

  it('送信が速すぎる（3秒未満）場合はエラーを返す', async () => {
    const fd = makeFormData({ form_loaded_at: String(Date.now() - 1000) }); // 1秒
    const result = await submitContact(null, fd);
    expect(result).toMatchObject({ error: expect.any(String) });
  });

  it('form_loaded_at が3秒以上なら通過する', async () => {
    const fd = makeFormData({ form_loaded_at: String(Date.now() - 4000) }); // 4秒
    const result = await submitContact(null, fd);
    expect(result).toEqual({ success: true });
  });

  it('form_loaded_at が未設定でも通過する（フォールバック）', async () => {
    const fd = new FormData();
    fd.append('name', '山田 太郎');
    fd.append('email', 'test@example.com');
    fd.append('category', 'other');
    fd.append('message', 'テストのお問い合わせ内容です。');
    const result = await submitContact(null, fd);
    expect(result).toEqual({ success: true });
  });

  it('同一IPからの送信が3件超でレート制限エラーを返す', async () => {
    mockRateLimitExceeded();
    const result = await submitContact(null, makeFormData());
    expect(result).toMatchObject({ error: expect.any(String) });
  });
});
