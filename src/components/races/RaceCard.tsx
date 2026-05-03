import type { Race, Locale } from '@/lib/types';
import { formatDate, getRaceName } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import prefecturesData from '@/data/prefectures.json';

interface RaceCardProps {
  race: Race;
  locale: Locale;
  from?: string;
}

const PREF_MAP = new Map(
  (prefecturesData as { code: string; name: string; nameEn: string }[]).map((p) => [
    p.code,
    { ja: p.name, en: p.nameEn },
  ])
);

const TAG_EN: Record<string, string> = {
  'AIMS公認': 'AIMS Certified',
  'SPARTATHLON基準': 'Spartathlon Qualifier',
  'ご当地エイド': 'Local Aid',
  'ご当地エイド充実': 'Rich Local Aid',
  'ご当地グルメ': 'Local Food',
  'アップダウン多い': 'Hilly',
  'アルプス': 'Alps',
  'ウルトラマラソン': 'Ultra Marathon',
  'エリート大会': 'Elite Race',
  'オリンピック施設': 'Olympic Venue',
  'コスパが良い': 'Good Value',
  'フラット': 'Flat Course',
  'ワールドメジャーズ': 'World Majors',
  '世界遺産': 'World Heritage',
  '中止（2026年大会）': 'Cancelled (2026)',
  '初ウルトラおすすめ': 'First Ultra',
  '初心者おすすめ': 'Beginner Friendly',
  '北海道': 'Hokkaido',
  '城下町': 'Castle Town',
  '夏マラソン': 'Summer Race',
  '大規模': 'Large Scale',
  '女性限定': 'Women Only',
  '富士山': 'Mt. Fuji',
  '日本陸連公認': 'JAAF Certified',
  '景色が良い': 'Scenic',
  '桜': 'Cherry Blossom',
  '橋': 'Bridge Course',
  '歴史': 'Historical',
  '歴史ある大会': 'Long-running Race',
  '沖縄': 'Okinawa',
  '海沿い': 'Coastal',
  '温暖': 'Warm Climate',
  '温泉': 'Hot Spring',
  '湖畔': 'Lakeside',
  '火山': 'Volcanic',
  '第1回大会': '1st Edition',
  '紅葉': 'Autumn Foliage',
  '観光': 'Sightseeing',
  '記録狙い': 'Fast Course',
  '離島': 'Island',
};

function getSeason(dateStr: string): { en: string; ja: string } {
  const month = parseInt(dateStr.split('-')[1], 10);
  if (month >= 3 && month <= 5)  return { en: 'SPRING', ja: '春' };
  if (month >= 6 && month <= 8)  return { en: 'SUMMER', ja: '夏' };
  if (month >= 9 && month <= 11) return { en: 'AUTUMN', ja: '秋' };
  return { en: 'WINTER', ja: '冬' };
}

export default function RaceCard({ race, locale, from }: RaceCardProps) {
  const t = useTranslations('races.detail');
  const today = new Date().toISOString().split('T')[0];
  const isPast = race.date < today;

  const periods = race.entry_periods ?? [];
  const activePeriod = periods.find((p) => p.start_date <= today && p.end_date >= today)
    ?? (race.entry_start_date && race.entry_end_date && today >= race.entry_start_date && today <= race.entry_end_date
        ? { start_date: race.entry_start_date, end_date: race.entry_end_date } : null);
  const futurePeriod = periods.find((p) => p.start_date > today)
    ?? (race.entry_start_date && today < race.entry_start_date
        ? { start_date: race.entry_start_date, end_date: race.entry_end_date ?? '' } : null);
  const latestEndDate = periods.length > 0
    ? periods.reduce((max, p) => p.end_date > max ? p.end_date : max, '')
    : race.entry_end_date ?? null;

  const isEntryOpen = !!activePeriod;
  const isClosingSoon =
    isEntryOpen &&
    activePeriod !== null &&
    'end_date' in activePeriod &&
    new Date(activePeriod.end_date).getTime() - new Date(today).getTime() <= 14 * 24 * 60 * 60 * 1000;
  const isEntrySoon = !isEntryOpen && !isPast && !!futurePeriod;
  const isEntryClosed = !isEntryOpen && !isPast && !futurePeriod && latestEndDate !== null && today > latestEndDate;

  const entryPeriod = (() => {
    const fmt = (d: string) => formatDate(d, locale);
    if (periods.length > 0) {
      const first = periods[0];
      const base = `${fmt(first.start_date)} 〜 ${fmt(first.end_date)}`;
      return periods.length > 1
        ? `${base} ${locale === 'ja' ? `他${periods.length - 1}件` : `+${periods.length - 1} more`}`
        : base;
    }
    if (!race.entry_start_date && !race.entry_end_date) return isPast ? null : t('unpublished');
    if (race.entry_start_date && race.entry_end_date)
      return `${fmt(race.entry_start_date)} 〜 ${fmt(race.entry_end_date)}`;
    if (race.entry_end_date)
      return locale === 'ja' ? `〜 ${fmt(race.entry_end_date)}` : `Until ${fmt(race.entry_end_date)}`;
    return null;
  })();

  const distances = [...race.categories]
    .sort((a, b) => b.distance_km - a.distance_km)
    .map((c) => `${c.distance_km}km`);
  const distanceLabel = distances.join('、');

  const pref = PREF_MAP.get(race.prefecture);
  const prefLabel = locale === 'ja' ? pref?.ja ?? '' : pref?.en ?? '';

  const season = getSeason(race.date);

  // Status badge styles
  let badgeBg = 'transparent';
  let badgeColor = 'rgba(255,255,255,0.65)';
  let badgeBorder = '1px solid rgba(255,255,255,0.3)';
  let badgeText = '';

  if (isPast) {
    badgeText = locale === 'ja' ? '開催済み' : 'Past';
    badgeBg = 'rgba(22,36,58,0.4)';
    badgeColor = 'rgba(255,255,255,0.65)';
    badgeBorder = 'none';
  } else if (isEntryClosed) {
    badgeText = locale === 'ja' ? '受付終了' : 'Entry Closed';
    badgeBg = 'rgba(22,36,58,0.4)';
    badgeColor = 'rgba(255,255,255,0.65)';
    badgeBorder = 'none';
  } else if (isClosingSoon) {
    badgeText = locale === 'ja' ? 'もうすぐ締切' : 'Closing Soon';
    badgeBg = '#d97706';
    badgeColor = '#fff';
    badgeBorder = 'none';
  } else if (isEntryOpen) {
    badgeText = locale === 'ja' ? 'エントリー受付中' : 'Entry Open';
    badgeBg = 'var(--color-primary)';
    badgeColor = '#fff';
    badgeBorder = 'none';
  } else if (isEntrySoon) {
    badgeText = locale === 'ja' ? 'まもなく受付' : 'Opens Soon';
    badgeBg = 'var(--color-paper-warm)';
    badgeColor = 'var(--color-primary)';
    badgeBorder = '1px solid var(--color-primary)';
  }

  return (
    <Link
      href={from ? `/races/${race.id}?from=${from}` : `/races/${race.id}`}
      className="group block no-underline"
      style={{ color: 'inherit' }}
    >
      <article
        className="flex flex-col overflow-hidden transition-all duration-200 group-hover:-translate-y-0.5"
        style={{
          background: '#fff',
          border: '1px solid var(--color-border-soft)',
          borderRadius: 2,
          boxShadow: '0 1px 4px rgba(22,36,58,0.04)',
        }}
      >
        {/* Image / Hero area */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: 160 }}>
          {/* Diagonal stripe fallback */}
          <div
            className="absolute inset-0"
            style={{
              background: 'var(--color-primary)',
              backgroundImage: 'repeating-linear-gradient(-45deg, transparent 0, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)',
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/races/${race.id}.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
            onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = '1'; }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />

          {/* Bottom gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(22,36,58,0.55) 0%, transparent 55%)' }}
          />

          {/* Season tab — top left */}
          <div
            className="absolute top-0 left-3 flex items-center gap-1.5 px-2 py-[3px]"
            style={{
              background: 'var(--color-paper-warm)',
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
              }}
            >
              {season.ja}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-mid)',
              }}
            >
              {season.en}
            </span>
          </div>

          {/* Status badge — bottom right */}
          {badgeText && (
            <div
              className="absolute bottom-2.5 right-3"
              style={{
                background: badgeBg,
                color: badgeColor,
                border: badgeBorder,
                padding: '3px 8px',
                fontSize: '0.58rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                borderRadius: 2,
              }}
            >
              {badgeText}
            </div>
          )}

          {/* Location — bottom left */}
          <div
            className="absolute bottom-2.5 left-3"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {prefLabel}
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pt-3.5 pb-4 flex flex-col gap-2 flex-1">
          {/* Date eyebrow */}
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              margin: 0,
            }}
          >
            {formatDate(race.date, locale)}
          </p>

          {/* Title */}
          <h3
            className="font-serif font-bold"
            style={{ fontSize: '1.375rem', color: 'var(--color-ink)', lineHeight: 1.2, margin: 0 }}
          >
            {getRaceName(race, locale)}
          </h3>

          {/* English italic name (ja locale only) */}
          {locale === 'ja' && race.name_en && race.name_en !== race.name_ja && (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.72rem',
                fontStyle: 'italic',
                color: 'var(--color-mid)',
                margin: '-4px 0 0',
              }}
            >
              {race.name_en}
            </p>
          )}

          {/* Entry period row */}
          {entryPeriod && (
            <div className="flex items-baseline gap-2 pt-1.5" style={{ borderTop: '1px solid var(--color-border-soft)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.52rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-light)',
                  flexShrink: 0,
                  width: 52,
                }}
              >
                {locale === 'ja' ? 'Entry' : 'Entry'}
              </span>
              <span
                className="font-serif tabular-nums"
                style={{
                  fontSize: '0.72rem',
                  color: (entryPeriod === '未発表' || entryPeriod === 'TBA')
                    ? 'var(--color-light)'
                    : 'var(--color-mid)',
                }}
              >
                {entryPeriod}
              </span>
            </div>
          )}

          {/* Tags */}
          {race.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto pt-1">
              {race.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: 'var(--color-paper-warm)',
                    border: '1px solid var(--color-border-soft)',
                    color: 'var(--color-primary)',
                    fontSize: '0.58rem',
                    padding: '2px 7px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {locale === 'ja' ? tag : (TAG_EN[tag] ?? tag)}
                </span>
              ))}
            </div>
          )}

          {/* Footer: Distance + Entry */}
          <div
            className="grid grid-cols-2 gap-3 pt-2.5 mt-auto"
            style={{ borderTop: '1px dashed var(--color-border-soft)' }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.52rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-light)',
                  marginBottom: 3,
                }}
              >
                {locale === 'ja' ? 'Distance' : 'Distance'}
              </div>
              <div
                className="font-serif font-semibold"
                style={{ fontSize: '0.875rem', color: 'var(--color-ink)', fontVariantNumeric: 'tabular-nums' }}
              >
                {distanceLabel || '—'}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.52rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-light)',
                  marginBottom: 3,
                }}
              >
                {locale === 'ja' ? 'Entry Fee' : 'Entry Fee'}
              </div>
              <div
                className="font-serif"
                style={{ fontSize: '0.875rem', color: 'var(--color-mid)', fontVariantNumeric: 'tabular-nums' }}
              >
                {race.entry_fee != null ? `¥${race.entry_fee.toLocaleString()}` : '—'}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
