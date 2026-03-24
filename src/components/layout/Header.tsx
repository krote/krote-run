'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/races',    labelKey: 'races'    },
  { href: '/calendar', labelKey: 'calendar' },
  { href: '/settings', labelKey: 'settings' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--color-border)]">
      <div className="max-w-[1120px] mx-auto px-9 h-[60px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none text-decoration-none no-underline">
          <span className="font-serif text-[1.25rem] font-bold tracking-[0.02em] text-[var(--color-ink)]">
            HASHIRU
            <sup className="font-sans text-[0.52em] tracking-[0.18em] text-[var(--color-primary)] align-super ml-1 font-semibold">
              JAPAN
            </sup>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className={`text-[0.83rem] font-medium tracking-[0.03em] transition-colors no-underline ${
                pathname === href
                  ? 'text-[var(--color-ink)]'
                  : 'text-[var(--color-ink2)] hover:text-[var(--color-ink)]'
              }`}
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        {/* Language switcher */}
        <div className="hidden md:flex border border-[var(--color-border)] rounded-[3px] overflow-hidden">
          <Link
            href={pathname}
            locale="ja"
            className={`text-[0.72rem] font-semibold tracking-[0.08em] px-3 py-1.5 border-r border-[var(--color-border)] transition-all no-underline ${
              locale === 'ja'
                ? 'bg-[var(--color-ink)] text-white'
                : 'bg-white text-[var(--color-ink2)] hover:text-[var(--color-ink)]'
            }`}
          >
            JA
          </Link>
          <Link
            href={pathname}
            locale="en"
            className={`text-[0.72rem] font-semibold tracking-[0.08em] px-3 py-1.5 transition-all no-underline ${
              locale === 'en'
                ? 'bg-[var(--color-ink)] text-white'
                : 'bg-white text-[var(--color-ink2)] hover:text-[var(--color-ink)]'
            }`}
          >
            EN
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded text-[var(--color-ink2)] hover:bg-[var(--color-cream)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white py-3 px-9">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className={`block py-2.5 text-sm font-medium no-underline ${
                pathname === href ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink2)]'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {t(labelKey)}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 mt-2 border-t border-[var(--color-border)]">
            <Link href={pathname} locale="ja" className={`text-sm font-semibold no-underline ${locale === 'ja' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink2)]'}`} onClick={() => setMenuOpen(false)}>JA</Link>
            <Link href={pathname} locale="en" className={`text-sm font-semibold no-underline ${locale === 'en' ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink2)]'}`} onClick={() => setMenuOpen(false)}>EN</Link>
          </div>
        </div>
      )}
    </header>
  );
}
