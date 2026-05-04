'use client';

import { useTranslations } from 'next-intl';
import type { Race, Locale } from '@/lib/types';
import RaceCard from '@/components/races/RaceCard';
import { Link } from '@/i18n/navigation';
import { formatDate, getRaceName } from '@/lib/utils';

interface Props {
  upcoming: Race[];
  openEntry: Race[];
  soonOpening: Race[];
  locale: Locale;
}

// ─── 受付中セクション ──────────────────────────────
function OpenSection({ races, locale }: { races: Race[]; locale: Locale }) {
  const t = useTranslations('home.sections');
  const today = new Date().toISOString().split('T')[0];

  if (races.length === 0) return null;

  return (
    <section
      style={{
        background: 'var(--color-cream)',
        padding: '56px 40px',
        borderTop: '1px solid var(--color-border-soft)',
      }}
    >
      <div className="max-w-[1120px] mx-auto">
        <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
          <div>
            <p
              className="flex items-center gap-2 mb-2"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
              }}
            >
              <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--color-primary)' }} />
              Now Open · 受付中
            </p>
            <h2 className="font-serif font-semibold" style={{ fontSize: '1.875rem', color: 'var(--color-ink)', margin: 0 }}>
              いま、走れる
              <em style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontWeight: 500 }}>大会。</em>
            </h2>
          </div>
          <Link
            href="/races"
            className="no-underline font-serif"
            style={{ fontSize: '0.82rem', color: 'var(--color-primary)', textDecoration: 'underline', textUnderlineOffset: 4 }}
          >
            {t('viewAll')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {races.slice(0, 3).map((race) => {
            const periods = race.entry_periods ?? [];
            const activePeriod = periods.find((p) => p.start_date <= today && p.end_date >= today);
            const deadline = activePeriod?.end_date
              ?? race.entry_end_date
              ?? null;

            return (
              <Link key={race.id} href={`/races/${race.id}`} className="no-underline" style={{ color: 'inherit' }}>
                <article
                  className="flex flex-col gap-2.5 cursor-pointer rounded-[2px]"
                  style={{ background: '#fff', border: '1px solid var(--color-border-soft)', padding: 22 }}
                >
                  <div
                    className="flex items-baseline gap-2 pb-2.5"
                    style={{ borderBottom: '1px solid var(--color-border-soft)' }}
                  >
                    <span
                      className="font-sans font-semibold"
                      style={{
                        background: 'var(--color-primary)',
                        color: '#fff',
                        padding: '3px 8px',
                        fontSize: '0.62rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      受付中
                    </span>
                    {deadline && (
                      <span className="font-serif" style={{ fontSize: '0.82rem', color: 'var(--color-mid)' }}>
                        締切：<strong style={{ color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>
                          {formatDate(deadline, locale)}
                        </strong>
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-serif font-bold"
                    style={{ fontSize: '1.375rem', margin: 0, color: 'var(--color-ink)', lineHeight: 1.2 }}
                  >
                    {getRaceName(race, locale)}
                  </h3>
                  <p className="font-serif font-semibold" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontVariantNumeric: 'tabular-nums' }}>
                    {formatDate(race.date, locale)}
                  </p>
                  <div
                    className="flex justify-between mt-1.5 pt-2.5"
                    style={{ borderTop: '1px dashed var(--color-border-soft)' }}
                  >
                    <span className="font-serif font-semibold" style={{ fontSize: '0.875rem', color: 'var(--color-ink)' }}>
                      {race.categories.length > 0
                        ? `${Math.max(...race.categories.map((c) => c.distance_km))}km`
                        : '—'}
                    </span>
                    <span className="font-serif" style={{ fontSize: '0.82rem', color: 'var(--color-mid)' }}>
                      {race.entry_fee != null ? `¥${race.entry_fee.toLocaleString()}` : '—'}
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── まもなく受付セクション ────────────────────────
function SoonSection({ races, locale }: { races: Race[]; locale: Locale }) {
  const t = useTranslations('home.sections');
  const today = new Date().toISOString().split('T')[0];

  if (races.length === 0) return null;

  return (
    <section
      style={{
        background: 'var(--color-paper-warm)',
        padding: '56px 40px',
        borderTop: '1px solid var(--color-border-soft)',
      }}
    >
      <div className="max-w-[1120px] mx-auto">
        <div className="mb-6">
          <p
            className="flex items-center gap-2 mb-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
            }}
          >
            <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--color-primary)' }} />
            Opens Soon · まもなく受付開始
          </p>
          <h2 className="font-serif font-semibold" style={{ fontSize: '1.875rem', margin: 0, color: 'var(--color-ink)' }}>
            次の<em style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontWeight: 500 }}>合図</em>を待つ大会。
          </h2>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--color-border-soft)' }}>
          {races.slice(0, 5).map((race, i) => {
            const periods = race.entry_periods ?? [];
            const nextPeriod = periods.find((p) => p.start_date > today);
            const openDate = nextPeriod?.start_date ?? race.entry_start_date;

            return (
              <Link key={race.id} href={`/races/${race.id}`} className="no-underline" style={{ color: 'inherit' }}>
                <div
                  className="grid items-center gap-4 cursor-pointer"
                  style={{
                    gridTemplateColumns: '120px 1fr 160px',
                    padding: '18px 22px',
                    borderBottom: i < races.length - 1 ? '1px solid var(--color-border-soft)' : 'none',
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        style={{
                          width: 8, height: 8, borderRadius: 4,
                          background: 'var(--color-primary)',
                          display: 'inline-block', flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.6rem',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: 'var(--color-light)',
                        }}
                      >
                        OPENS
                      </span>
                    </div>
                    <div
                      className="font-serif font-bold"
                      style={{
                        fontSize: '1.1rem',
                        color: 'var(--color-primary)',
                        marginLeft: 14,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {openDate ? formatDate(openDate, locale) : t('soonOpening')}
                    </div>
                  </div>

                  <div>
                    <h3
                      className="font-serif font-bold"
                      style={{ fontSize: '1.2rem', margin: 0, color: 'var(--color-ink)' }}
                    >
                      {getRaceName(race, locale)}
                    </h3>
                    <p className="font-serif" style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--color-mid)', marginTop: 2 }}>
                      {formatDate(race.date, locale)}
                    </p>
                  </div>

                  <div className="text-right">
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-light)' }}>
                      Race Day
                    </div>
                    <div className="font-serif font-semibold" style={{ fontSize: '0.875rem', color: 'var(--color-ink)', fontVariantNumeric: 'tabular-nums' }}>
                      {formatDate(race.date, locale)}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-right mt-4">
          <Link
            href="/races"
            className="no-underline font-serif"
            style={{ fontSize: '0.82rem', color: 'var(--color-primary)', textDecoration: 'underline', textUnderlineOffset: 4 }}
          >
            {t('viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── 訪日ランナー向けバンド ────────────────────────
function VisitorBand() {
  return (
    <section
      style={{
        background: 'var(--color-paper-warm)',
        padding: '40px 40px',
        borderTop: '1px solid var(--color-border-soft)',
        borderBottom: '1px solid var(--color-border-soft)',
      }}
    >
      <div className="max-w-[1120px] mx-auto flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-6 flex-wrap">
          <div
            className="font-serif font-bold"
            style={{
              fontSize: '2.5rem',
              color: 'var(--color-primary)',
              borderRight: '1px solid var(--color-border)',
              paddingRight: 24,
              lineHeight: 1,
            }}
          >
            訪
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-light)',
                marginBottom: 4,
              }}
            >
              For Overseas Runners
            </p>
            <p className="font-serif font-semibold" style={{ fontSize: '1.05rem', color: 'var(--color-ink)' }}>
              海外から日本の大会を探す方へ — エントリー方法・前日受付・宿の手配まで。
            </p>
          </div>
        </div>
        <Link
          href="/guide"
          className="no-underline font-sans font-semibold"
          style={{
            border: '1px solid var(--color-ink)',
            color: 'var(--color-ink)',
            padding: '12px 20px',
            fontSize: '0.82rem',
            letterSpacing: '0.06em',
            borderRadius: 2,
          }}
        >
          {`Visitor's Guide →`}
        </Link>
      </div>
    </section>
  );
}

// ─── 近日開催セクション ────────────────────────────
function UpcomingSection({ races, locale }: { races: Race[]; locale: Locale }) {
  const t = useTranslations('home.sections');

  if (races.length === 0) return null;

  return (
    <section
      style={{
        background: 'var(--color-cream)',
        padding: '56px 40px',
        borderTop: '1px solid var(--color-border-soft)',
      }}
    >
      <div className="max-w-[1120px] mx-auto">
        <div className="flex items-baseline justify-between mb-6 pb-3 flex-wrap gap-4"
          style={{ borderBottom: '1px solid var(--color-border-soft)' }}
        >
          <div>
            <p
              className="flex items-center gap-2 mb-1"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
              }}
            >
              <span style={{ display: 'inline-block', width: 18, height: 1, background: 'var(--color-primary)' }} />
              Upcoming · 近日開催
            </p>
            <h2 className="font-serif font-semibold" style={{ fontSize: '1.875rem', color: 'var(--color-ink)', margin: 0 }}>
              {t('upcoming')}
            </h2>
          </div>
          <Link
            href="/races"
            className="no-underline font-serif"
            style={{ fontSize: '0.82rem', color: 'var(--color-primary)', textDecoration: 'underline', textUnderlineOffset: 4 }}
          >
            {t('viewAll')}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race) => (
            <RaceCard key={race.id} race={race} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── メイン ───────────────────────────────────────
export default function HomeSections({ upcoming, openEntry, soonOpening, locale }: Props) {
  const hasAny = upcoming.length > 0 || openEntry.length > 0 || soonOpening.length > 0;

  if (!hasAny) {
    return (
      <div className="max-w-[1120px] mx-auto px-10 py-14 text-center" style={{ color: 'var(--color-mid)' }}>
        {locale === 'en' ? 'No races found.' : '大会情報が見つかりません。'}
      </div>
    );
  }

  return (
    <>
      <OpenSection races={openEntry} locale={locale} />
      <SoonSection races={soonOpening} locale={locale} />
      <VisitorBand />
      <UpcomingSection races={upcoming} locale={locale} />
    </>
  );
}
