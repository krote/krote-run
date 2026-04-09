'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState } from 'react';
import { useSession, signIn, signOut } from '@/lib/auth-client';
// パスキーは better-auth の将来バージョンで有効化予定

const NAV_LINKS = [
  { href: '/races',    labelKey: 'races'    },
  { href: '/calendar', labelKey: 'calendar' },
  { href: '/settings', labelKey: 'settings' },
] as const;

function AuthButton() {
  const t = useTranslations('nav');
  const tAuth = useTranslations('auth');
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isPending) {
    return <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />;
  }

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 focus:outline-none"
          aria-label="User menu"
        >
          {session.user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name ?? ''}
              className="w-8 h-8 rounded-full border border-[var(--color-border)]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[var(--color-ink)] text-white text-xs font-bold flex items-center justify-center">
              {(session.user.name ?? session.user.email ?? '?')[0].toUpperCase()}
            </div>
          )}
        </button>

        {menuOpen && (
          <>
            {/* backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
            <div
              className="absolute right-0 top-10 z-50 w-44 bg-white rounded-[4px] py-1"
              style={{ border: '1px solid var(--color-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            >
              <p className="px-4 py-2 text-xs truncate" style={{ color: 'var(--color-mid)' }}>
                {session.user.email}
              </p>
              <hr style={{ borderColor: 'var(--color-border)' }} />
              <Link
                href="/mypage"
                className="block px-4 py-2 text-sm no-underline hover:bg-[var(--color-cream)] transition-colors"
                style={{ color: 'var(--color-ink)' }}
                onClick={() => setMenuOpen(false)}
              >
                {t('mypage')}
              </Link>
              <button
                onClick={() => { signOut(); setMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--color-cream)] transition-colors"
                style={{ color: 'var(--color-ink)' }}
              >
                {t('logout')}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="text-[0.8rem] font-semibold px-3 py-1.5 rounded-[3px] transition-colors"
        style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink2)' }}
      >
        {t('login')}
      </button>

      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
          <div
            className="absolute right-0 top-10 z-50 w-56 bg-white rounded-[4px] p-3 space-y-2"
            style={{ border: '1px solid var(--color-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
          >
            <p className="text-[0.72rem] mb-2" style={{ color: 'var(--color-mid)' }}>
              {tAuth('loginOptional')}
            </p>
            <button
              onClick={() => { signIn.social({ provider: 'google' }); setMenuOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-[3px] text-sm font-medium transition-colors hover:bg-[var(--color-cream)]"
              style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {tAuth('loginWithGoogle')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

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

        {/* Right side: language switcher + auth */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex border border-[var(--color-border)] rounded-[3px] overflow-hidden">
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

          {/* Auth */}
          <AuthButton />
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
