// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockEnv } = vi.hoisted(() => ({ mockEnv: {} as Record<string, string | undefined> }));

vi.mock('@opennextjs/cloudflare', () => ({
  getCloudflareContext: () => ({ env: mockEnv }),
}));

import { CONSENT_INIT_SCRIPT, GA_MEASUREMENT_ID, getCloudflareBeaconToken } from '../analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/**
 * 同意初期化スクリプトは <Script> にそのまま埋め込む文字列なので、評価して挙動を検証する。
 * 本番ではグローバルスコープで実行されるため（function gtag(){} がグローバルになる）、
 * new Function ではなく window.eval で評価する。
 */
function runConsentScript(): unknown[][] {
  delete window.dataLayer;
  delete (window as unknown as { gtag?: unknown }).gtag;
  window.eval(CONSENT_INIT_SCRIPT);
  return (window.dataLayer ?? []).map((a) => Array.from(a as ArrayLike<unknown>));
}

beforeEach(() => {
  localStorage.clear();
  for (const key of Object.keys(mockEnv)) delete mockEnv[key];
});

describe('CONSENT_INIT_SCRIPT', () => {
  it('未同意なら analytics_storage を denied で初期化する', () => {
    const calls = runConsentScript();

    expect(calls[0][0]).toBe('consent');
    expect(calls[0][1]).toBe('default');
    expect(calls[0][2]).toMatchObject({ analytics_storage: 'denied' });
  });

  it('同意済みの再訪問なら、最初の page_view から granted になる', () => {
    localStorage.setItem('cookie-consent', 'accepted');

    const calls = runConsentScript();

    expect(calls[0][2]).toMatchObject({ analytics_storage: 'granted' });
  });

  it('拒否済みなら denied のままにする', () => {
    localStorage.setItem('cookie-consent', 'declined');

    const calls = runConsentScript();

    expect(calls[0][2]).toMatchObject({ analytics_storage: 'denied' });
  });

  it('広告系の同意は常に denied（このサイトでは広告計測をしない）', () => {
    localStorage.setItem('cookie-consent', 'accepted');

    const calls = runConsentScript();

    expect(calls[0][2]).toMatchObject({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('localStorage が使えない環境でも例外を投げない（プライベートブラウジング等）', () => {
    const original = Object.getOwnPropertyDescriptor(window, 'localStorage');
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() { throw new Error('blocked'); },
    });

    expect(() => runConsentScript()).not.toThrow();

    if (original) Object.defineProperty(window, 'localStorage', original);
  });

  it('gtag が config より先に定義される（初期化順の担保）', () => {
    runConsentScript();
    expect(typeof (window as unknown as { gtag?: unknown }).gtag).toBe('function');
  });

  it('SPA遷移を自前で送るため、自動の page_view は送らせない', () => {
    expect(CONSENT_INIT_SCRIPT).not.toContain('send_page_view');
    expect(GA_MEASUREMENT_ID).toMatch(/^G-/);
  });
});

describe('getCloudflareBeaconToken', () => {
  it('Cloudflare バインディングからトークンを読む', () => {
    mockEnv.CF_BEACON_TOKEN = 'token-from-cf';

    expect(getCloudflareBeaconToken()).toBe('token-from-cf');
  });

  it('未設定なら null を返す（ビーコンを出力しない）', () => {
    expect(getCloudflareBeaconToken()).toBeNull();
  });

  it('空文字は未設定として扱う', () => {
    mockEnv.CF_BEACON_TOKEN = '   ';

    expect(getCloudflareBeaconToken()).toBeNull();
  });
});
