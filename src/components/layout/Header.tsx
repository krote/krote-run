'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', labelKey: 'home' },
  { href: '/races', labelKey: 'races' },
  { href: '/calendar', labelKey: 'calendar' },
  { href: '/settings', labelKey: 'settings' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="text-2xl">🏃</span>
            <span>KroteRun</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'bg-primary-50 text-primary'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          {/* Locale switcher (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {locale === 'ja' ? 'JA' : 'EN'}
            </span>
            <Link
              href={pathname}
              locale={locale === 'ja' ? 'en' : 'ja'}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-md hover:border-primary hover:text-primary transition-colors"
            >
              {locale === 'ja' ? 'EN' : 'JA'}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className={`block px-4 py-2.5 text-sm font-medium rounded-lg mb-1 ${
                  pathname === href
                    ? 'bg-primary-50 text-primary'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {t(labelKey)}
              </Link>
            ))}
            <div className="px-4 pt-2 pb-1 border-t border-gray-100 mt-2">
              <Link
                href={pathname}
                locale={locale === 'ja' ? 'en' : 'ja'}
                className="text-sm text-gray-500 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {locale === 'ja' ? 'Switch to English' : '日本語に切り替え'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
