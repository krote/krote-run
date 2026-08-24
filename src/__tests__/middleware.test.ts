import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl/middleware', () => ({
  default: vi.fn(() => vi.fn()),
}));

const { runtime } = await import('../middleware');

describe('middleware runtime設定', () => {
  it("runtimeは'experimental-edge'でなければならない（'edge'だとcf:buildが失敗する）", () => {
    expect(runtime).toBe('experimental-edge');
  });
});
