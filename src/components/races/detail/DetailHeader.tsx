import type { Race, Locale } from '@/lib/types';
import { getMainCategory, getRaceCity, formatDate } from '@/lib/utils';

interface DetailHeaderProps {
  race: Race;
  locale: Locale;
  raceName: string;
  isEntryOpen?: boolean;
  isNotYetOpen?: boolean;
  isPast?: boolean;
  t?: (key: string) => string;
}

function ordinalSuffix(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return 'TH';
  switch (v % 10) {
    case 1: return 'ST';
    case 2: return 'ND';
    case 3: return 'RD';
    default: return 'TH';
  }
}

export default function DetailHeader({ race, locale, raceName, isEntryOpen, isNotYetOpen, isPast, t }: DetailHeaderProps) {
  const taglineJa = race.tagline_ja;
  const taglineEn = race.tagline_en;
  const motifBg = race.motif_color ?? 'var(--color-ink)';
  const mainCat = getMainCategory(race.categories);
  const startTime = mainCat?.start_time;
  const city = getRaceCity(race, locale);
  const dateStr = formatDate(race.date, locale);

  return (
    <div style={{ background: 'var(--color-cream)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-6">

        {/* 版数 */}
        {race.edition != null && (
          <p
            className="text-[0.67rem] tracking-[0.18em] uppercase font-mono mb-5"
            style={{ color: 'var(--color-mid)' }}
          >
            第{race.edition}回&nbsp;&nbsp;/&nbsp;&nbsp;{race.edition}{ordinalSuffix(race.edition)}&nbsp;Edition
          </p>
        )}

        {/* タイトルブロック + モチーフバッジ横並び */}
        <div className="flex items-start gap-4 mb-6">
          {/* 左: 大会名・サブタイトル・タグライン */}
          <div className="flex-1 min-w-0">
            <h1
              className="font-serif font-bold leading-tight mb-1"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                fontWeight: 700,
                color: 'var(--color-ink)',
                fontFamily: 'var(--font-noto-serif-jp)',
              }}
            >
              {raceName}
            </h1>

            {race.name_en && (
              <p
                className="text-xs tracking-[0.22em] uppercase mb-4"
                style={{ color: 'var(--color-mid)', fontFamily: 'var(--font-dm-sans)' }}
              >
                {race.name_en}
              </p>
            )}

            {(taglineJa || taglineEn) && (
              <div data-testid="tagline">
                {taglineJa && (
                  <p className="font-bold text-lg leading-snug" style={{ color: 'var(--color-ink)' }}>
                    {taglineJa}
                  </p>
                )}
                {taglineEn && (
                  <p className="text-sm italic mt-0.5" style={{ color: 'var(--color-mid)' }}>
                    — {taglineEn}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 右: モチーフバッジ（縦長旗） */}
          {race.motif && (
            <div
              className="flex flex-col items-center justify-between shrink-0"
              style={{
                background: motifBg,
                width: '5rem',
                minHeight: '8rem',
                paddingTop: '1rem',
                paddingBottom: '0.85rem',
              }}
            >
              <p
                className="font-serif text-white text-center"
                style={{
                  fontSize: '2.1rem',
                  letterSpacing: '0.15em',
                  fontFamily: 'var(--font-noto-serif-jp)',
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                }}
              >
                {race.motif}
              </p>
              <p
                className="text-[0.42rem] tracking-[0.22em] uppercase text-white/50 text-center"
              >
                {race.motif_romaji ?? ''}
              </p>
            </div>
          )}
        </div>

        {/* メタ行: 開催日 / スタート / 会場 / 公式サイト */}
        <div
          className="flex flex-wrap items-end gap-x-8 gap-y-3 pt-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div>
            <p
              className="text-[0.58rem] tracking-[0.2em] uppercase font-semibold mb-0.5"
              style={{ color: 'var(--color-mid)' }}
            >
              {locale === 'ja' ? '開催日' : 'Date'}
            </p>
            <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
              {dateStr}
            </p>
          </div>

          {startTime && (
            <div>
              <p
                className="text-[0.58rem] tracking-[0.2em] uppercase font-semibold mb-0.5"
                style={{ color: 'var(--color-mid)' }}
              >
                {locale === 'ja' ? 'スタート' : 'Start'}
              </p>
              <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
                {startTime}
              </p>
            </div>
          )}

          <div>
            <p
              className="text-[0.58rem] tracking-[0.2em] uppercase font-semibold mb-0.5"
              style={{ color: 'var(--color-mid)' }}
            >
              {locale === 'ja' ? '会場' : 'Venue'}
            </p>
            <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>
              {city}
            </p>
          </div>

          {race.official_url && (
            <a
              href={race.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto text-xs font-semibold px-4 py-1.5 rounded-[3px] transition-colors no-underline shrink-0"
              style={{
                background: 'var(--color-ink)',
                color: 'white',
              }}
            >
              {locale === 'ja' ? '公式サイト ↗' : 'Official Site ↗'}
            </a>
          )}

          {/* エントリー状態バッジ */}
          {!isPast && isEntryOpen && t && (
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-[3px] tracking-[0.06em] uppercase shrink-0"
              style={{ background: 'var(--color-primary)', color: 'white' }}
            >
              {t('entryOpen')}
            </span>
          )}
          {!isPast && isNotYetOpen && t && (
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-[3px] shrink-0"
              style={{ background: 'var(--color-cream)', color: 'var(--color-mid)', border: '1px solid var(--color-border)' }}
            >
              {t('notYetOpen')}
            </span>
          )}
          {!isPast && race.entry_closed && t && (
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-[3px] shrink-0"
              style={{ background: 'var(--color-cream)', color: 'var(--color-mid)', border: '1px solid var(--color-border)' }}
            >
              {t('entryClosed')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
