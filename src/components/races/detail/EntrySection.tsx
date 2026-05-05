import type { Race, Locale } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';

interface EntrySectionProps {
  race: Race;
  locale: Locale;
  today: string;
}

export default function EntrySection({ race, locale, today }: EntrySectionProps) {
  const isPast = race.date < today;

  return (
    <section id="entry">
      {/* 受付終了メッセージ */}
      {race.entry_closed && (
        <p
          data-testid="entry-closed-msg"
          className="text-sm mb-4 px-3 py-2.5 rounded-[3px] leading-relaxed"
          style={{ background: '#fff8f0', border: '1px solid #f0d9c0', color: '#7a4f1a' }}
        >
          {locale === 'ja'
            ? '定員に達したため受付を終了しました。最新情報は公式サイトをご確認ください。'
            : 'Registration has closed as the event has reached capacity. Please check the official site for the latest information.'}
        </p>
      )}

      {/* エントリー期間 */}
      {race.entry_periods.length > 0 ? (
        <div className="mb-4">
          {race.entry_periods.length === 1 ? (
            <div className="flex flex-wrap gap-6">
              <div>
                <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
                  {locale === 'ja' ? '受付期間' : 'Period'}
                </p>
                <p className="font-medium">
                  {formatDate(race.entry_periods[0].start_date, locale)}
                  {' — '}
                  {formatDate(race.entry_periods[0].end_date, locale)}
                </p>
              </div>
              {race.entry_periods[0].entry_fee && (
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
                    {locale === 'ja' ? '参加費' : 'Fee'}
                  </p>
                  <p className="font-medium">{formatCurrency(race.entry_periods[0].entry_fee)}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                    <th className="text-left pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '種別' : 'Type'}
                    </th>
                    <th className="text-left pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '受付期間' : 'Period'}
                    </th>
                    <th className="text-right pb-2.5 font-semibold" style={{ color: 'var(--color-mid)' }}>
                      {locale === 'ja' ? '参加費' : 'Fee'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {race.entry_periods.map((ep) => (
                    <tr key={ep.id} style={{ borderBottom: '1px solid var(--color-border)' }} className="last:border-0">
                      <td className="py-2.5 font-medium">
                        {locale === 'ja' ? ep.label_ja : ep.label_en}
                      </td>
                      <td className="py-2.5">
                        {formatDate(ep.start_date, locale)} — {formatDate(ep.end_date, locale)}
                      </td>
                      <td className="py-2.5 text-right">
                        {ep.entry_fee
                          ? formatCurrency(ep.entry_fee)
                          : (!race.entry_fee_by_category && race.entry_fee)
                            ? formatCurrency(race.entry_fee)
                            : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 mb-4">
          <div>
            <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
              {locale === 'ja' ? '受付期間' : 'Period'}
            </p>
            <p className="font-medium">
              {race.entry_start_date
                ? `${formatDate(race.entry_start_date, locale)} — ${race.entry_end_date ? formatDate(race.entry_end_date, locale) : '—'}`
                : (!isPast
                  ? (locale === 'ja' ? '未発表' : 'TBA')
                  : '—')}
            </p>
          </div>
          {!race.entry_fee_by_category && race.entry_fee && (
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
                {locale === 'ja' ? '参加費' : 'Fee'}
              </p>
              <p className="font-medium">{formatCurrency(race.entry_fee)}</p>
            </div>
          )}
        </div>
      )}

      {/* 定員 */}
      {race.entry_capacity > 0 && (
        <div className="mb-4">
          <p className="text-xs mb-1" style={{ color: 'var(--color-mid)' }}>
            {locale === 'ja' ? '定員' : 'Capacity'}
          </p>
          <p className="font-medium">
            {race.entry_capacity.toLocaleString()}
            {locale === 'ja' ? '人' : ' runners'}
          </p>
        </div>
      )}

      {/* エントリーリンク */}
      {race.entry_links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {race.entry_links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 text-sm font-semibold rounded-[3px] transition-colors no-underline"
              style={{ background: 'var(--color-primary)', color: 'white' }}
            >
              {link.site_name} ↗
            </a>
          ))}
        </div>
      )}

      {/* 公式サイト */}
      {race.official_url && (
        <a
          href={race.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-5 py-2 text-sm font-semibold rounded-[3px] transition-colors no-underline"
          style={{ background: 'var(--color-cream)', color: 'var(--color-ink)', border: '1px solid var(--color-border)' }}
        >
          {locale === 'ja' ? '公式サイト' : 'Official Site'} ↗
        </a>
      )}
    </section>
  );
}
