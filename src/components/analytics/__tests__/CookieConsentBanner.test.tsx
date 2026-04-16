// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// next-intl モック
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const map: Record<string, string> = {
      'message': 'このサイトはGoogle Analytics 4を使用しています。',
      'accept': '同意する',
      'decline': '拒否する',
      'learnMore': 'Cookie設定について',
    };
    return map[key] ?? key;
  },
}));

// @/i18n/navigation モック
vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import CookieConsentBanner from '../CookieConsentBanner';

const mockGtag = vi.fn();

beforeEach(() => {
  localStorage.clear();
  window.gtag = mockGtag;
  mockGtag.mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CookieConsentBanner', () => {
  it('localStorage に cookie-consent がない場合はバナーを表示する', () => {
    render(<CookieConsentBanner />);
    expect(screen.getByText('同意する')).toBeTruthy();
    expect(screen.getByText('拒否する')).toBeTruthy();
  });

  it('localStorage に cookie-consent = accepted がある場合はバナーを表示しない', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    render(<CookieConsentBanner />);
    expect(screen.queryByText('同意する')).toBeNull();
  });

  it('localStorage に cookie-consent = declined がある場合はバナーを表示しない', () => {
    localStorage.setItem('cookie-consent', 'declined');
    render(<CookieConsentBanner />);
    expect(screen.queryByText('同意する')).toBeNull();
  });

  it('「同意する」クリック → localStorage に accepted を保存する', () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByText('同意する'));
    expect(localStorage.getItem('cookie-consent')).toBe('accepted');
  });

  it('「同意する」クリック → gtag consent update を granted で呼び出す', () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByText('同意する'));
    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  });

  it('「同意する」クリック後はバナーが非表示になる', () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByText('同意する'));
    expect(screen.queryByText('同意する')).toBeNull();
  });

  it('「拒否する」クリック → localStorage に declined を保存する', () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByText('拒否する'));
    expect(localStorage.getItem('cookie-consent')).toBe('declined');
  });

  it('「拒否する」クリック → gtag consent update を呼び出さない', () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByText('拒否する'));
    expect(mockGtag).not.toHaveBeenCalled();
  });

  it('「拒否する」クリック後はバナーが非表示になる', () => {
    render(<CookieConsentBanner />);
    fireEvent.click(screen.getByText('拒否する'));
    expect(screen.queryByText('拒否する')).toBeNull();
  });

  it('Cookie設定についてのリンクが /cookie-policy を指す', () => {
    render(<CookieConsentBanner />);
    const link = screen.getByText('Cookie設定について');
    expect(link.getAttribute('href')).toBe('/cookie-policy');
  });
});
