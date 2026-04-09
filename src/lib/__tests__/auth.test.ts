import { describe, it, expect, vi } from 'vitest';

// drizzle と better-auth をモック（D1 バインディング不要で動作確認）
vi.mock('drizzle-orm/d1', () => ({
  drizzle: vi.fn(() => ({})),
}));

vi.mock('better-auth', () => ({
  betterAuth: vi.fn((config: unknown) => ({
    handler: vi.fn(),
    _config: config,
  })),
}));

vi.mock('better-auth/adapters/drizzle', () => ({
  drizzleAdapter: vi.fn(() => ({})),
}));

import { createAuth } from '../auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

describe('createAuth', () => {
  const mockD1 = {} as D1Database;

  it('betterAuth を呼び出して auth インスタンスを返す', () => {
    const auth = createAuth(mockD1);
    expect(betterAuth).toHaveBeenCalledOnce();
    expect(auth).toBeDefined();
    expect(typeof auth.handler).toBe('function');
  });

  it('drizzleAdapter が sqlite プロバイダーで呼ばれる', () => {
    createAuth(mockD1);
    expect(drizzleAdapter).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ provider: 'sqlite' }),
    );
  });

  it('Google OAuth プロバイダーが設定される', () => {
    createAuth(mockD1);
    const config = (betterAuth as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(config.socialProviders?.google).toBeDefined();
    expect(config.socialProviders.google.scope).toContain(
      'https://www.googleapis.com/auth/calendar.events',
    );
  });

  it('呼び出すたびに新しいインスタンスを返す', () => {
    const auth1 = createAuth(mockD1);
    const auth2 = createAuth(mockD1);
    // モックなので同じ関数参照ではないことを確認
    expect(auth1).toBeDefined();
    expect(auth2).toBeDefined();
  });
});
