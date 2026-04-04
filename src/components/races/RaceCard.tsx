import type { Race, Locale } from '@/lib/types';
import { formatDate, getRaceName, getRaceCity } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
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

const CARD_GRADIENTS = [
  'linear-gradient(145deg, #1e3a2a 0%, #2a5a3f 100%)',
  'linear-gradient(145deg, #1a1f3c 0%, #242d58 100%)',
  'linear-gradient(145deg, #2a1818 0%, #4a2424 100%)',
  'linear-gradient(145deg, #18282a 0%, #1e3e42 100%)',
  'linear-gradient(145deg, #2a2010 0%, #463820 100%)',
  'linear-gradient(145deg, #1c1a2e 0%, #2c2850 100%)',
];

function getCardGradient(id: string): string {
  const n = [...id].reduce((a, c) => a + c.charCodeAt(0), 0) % CARD_GRADIENTS.length;
  return CARD_GRADIENTS[n];
}

export default function RaceCard({ race, locale, from }: RaceCardProps) {
  const t = useTranslations('races.detail');
  const today = new Date().toISOString().split('T')[0];
  const isPast = race.date < today;
  // entry_periods 優先、なければ旧フィールドにフォールバック
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
  const isEntryClosed =
    !isEntryOpen &&
    !isPast &&
    !futurePeriod &&
    latestEndDate !== null &&
    today > latestEndDate;

  // 距離: 長い順にカンマ区切り
  const distances = [...race.categories]
    .sort((a, b) => b.distance_km - a.distance_km)
    .map((c) => `${c.distance_km}km`);
  const distanceLabel = distances.join('、');

  // 開催地: 都道府県 + 市区町村
  const pref = PREF_MAP.get(race.prefecture);
  const prefLabel = locale === 'ja' ? pref?.ja ?? '' : pref?.en ?? '';
  const cityLabel = getRaceCity(race, locale);
  const locationLabel = prefLabel ? `${prefLabel} ${cityLabel}` : cityLabel;

  // エントリー期間表示: 最初の期間を表示（複数あれば「他N件」）
  const entryPeriod = (() => {
    const fmt = (d: string) => formatDate(d, locale);
    if (periods.length > 0) {
      const first = periods[0];
      const base = `${fmt(first.start_date)} 〜 ${fmt(first.end_date)}`;
      return periods.length > 1
        ? `${base} ${locale === 'ja' ? `他${periods.length - 1}件` : `+${periods.length - 1} more`}`
        : base;
    }
    // フォールバック
    if (!race.entry_start_date && !race.entry_end_date) return isPast ? null : t('unpublished');
    if (race.entry_start_date && race.entry_end_date)
      return `${fmt(race.entry_start_date)} 〜 ${fmt(race.entry_end_date)}`;
    if (race.entry_end_date)
      return locale === 'ja' ? `〜 ${fmt(race.entry_end_date)}` : `Until ${fmt(race.entry_end_date)}`;
    return null;
  })();

  return (
    <Link
      href={from ? `/races/${race.id}?from=${from}` : `/races/${race.id}`}
      className="group block no-underline"
      style={{ color: 'inherit' }}
    >
      <article
        className="bg-white rounded-[3px] overflow-hidden flex flex-col cursor-pointer"
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid var(--color-border)' }}
      >
        {/* Image area */}
        <div className="relative h-[150px] overflow-hidden flex-shrink-0">
          <div
            className="absolute inset-0"
            style={{ background: getCardGradient(race.id) }}
          />
          {/* 実際の画像があれば表示（なければグラデーションにフォールバック） */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/images/races/${race.id}.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = '1'; }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }}
          />

          {/* Status badge */}
          <div className="absolute top-2.5 left-3 flex gap-1.5">
            {!isPast && isClosingSoon && (
              <span
                className="text-[0.58rem] font-bold tracking-[0.06em] px-2 py-[3px] rounded-[2px]"
                style={{ background: '#d97706', color: 'white' }}
              >
                {locale === 'ja' ? 'もうすぐ締切' : 'Closing Soon'}
              </span>
            )}
            {!isPast && isEntryOpen && !isClosingSoon && (
              <span
                className="text-[0.58rem] font-bold tracking-[0.06em] px-2 py-[3px] rounded-[2px]"
                style={{ background: 'var(--color-primary)', color: 'white' }}
              >
                {locale === 'ja' ? 'エントリー受付中' : 'Entry Open'}
              </span>
            )}
            {!isPast && isEntryClosed && (
              <span
                className="text-[0.58rem] font-bold tracking-[0.06em] px-2 py-[3px] rounded-[2px]"
                style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.75)' }}
              >
                {locale === 'ja' ? '受付終了' : 'Entry Closed'}
              </span>
            )}
            {isPast && (
              <span
                className="text-[0.58rem] font-bold tracking-[0.06em] px-2 py-[3px] rounded-[2px]"
                style={{ background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.75)' }}
              >
                {locale === 'ja' ? '開催済み' : 'Past'}
              </span>
            )}
          </div>

          {/* Location — bottom */}
          <div className="absolute bottom-2.5 left-3">
            <span className="text-[0.63rem] font-medium text-white/80">
              📍 {locationLabel}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pt-4 pb-4 flex flex-col gap-2.5">
          {/* Date */}
          <p
            className="text-[0.67rem] font-semibold tracking-[0.08em]"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-number)' }}
          >
            {formatDate(race.date, locale)}
          </p>

          {/* Title */}
          <h3
            className="font-serif text-[1rem] font-bold leading-[1.3]"
            style={{ color: 'var(--color-ink)' }}
          >
            {getRaceName(race, locale)}
          </h3>

          {/* Info rows */}
          <div className="flex flex-col gap-1.5 pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
            {/* Entry period */}
            {entryPeriod && (
              <div className="flex items-baseline gap-2">
                <span
                  className="text-[0.6rem] tracking-[0.08em] uppercase w-14 flex-shrink-0"
                  style={{ color: 'var(--color-light)' }}
                >
                  {locale === 'ja' ? 'エントリー' : 'Entry'}
                </span>
                <span
                  className="text-[0.72rem] tabular-nums"
                  style={{
                    color: (entryPeriod === '未発表' || entryPeriod === 'TBA')
                      ? 'var(--color-light)'
                      : 'var(--color-mid)',
                    fontFamily: 'var(--font-number)',
                  }}
                >
                  {entryPeriod}
                </span>
              </div>
            )}

            {/* Distance */}
            <div className="flex items-baseline gap-2">
              <span
                className="text-[0.6rem] tracking-[0.08em] uppercase w-14 flex-shrink-0"
                style={{ color: 'var(--color-light)' }}
              >
                {locale === 'ja' ? '距離' : 'Dist.'}
              </span>
              <span
                className="text-[0.8rem] font-semibold tabular-nums"
                style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-number)' }}
              >
                {distanceLabel}
              </span>
            </div>
          </div>

          {/* Tags */}
          {race.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {race.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[0.58rem] font-medium px-1.5 py-0.5 rounded-[2px]"
                  style={{ background: 'var(--color-cream)', color: 'var(--color-mid)', border: '1px solid var(--color-border)' }}
                >
                  {locale === 'ja' ? tag : (TAG_EN[tag] ?? tag)}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
