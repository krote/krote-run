import type { Race, Locale } from '@/lib/types';

interface LastEditionSectionProps {
  race: Race;
  locale: Locale;
}

export default function LastEditionSection({ race, locale }: LastEditionSectionProps) {
  const result = race.result;
  if (!result) return null;

  const isJa = locale === 'ja';

  return (
    <section id="last-edition">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {result.participants_count !== null && (
          <div
            className="rounded-[4px] p-5 text-center"
            style={{ background: 'white', border: '1px solid var(--color-border)' }}
          >
            <p className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
              {result.participants_count.toLocaleString()}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
              {isJa ? '参加者数' : 'Participants'}
            </p>
          </div>
        )}
        {result.finishers_count !== null && (
          <div
            className="rounded-[4px] p-5 text-center"
            style={{ background: 'white', border: '1px solid var(--color-border)' }}
          >
            <p className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
              {result.finishers_count.toLocaleString()}
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
              {isJa ? '完走者数' : 'Finishers'}
            </p>
          </div>
        )}
        {result.finisher_rate_pct !== null && (
          <div
            className="rounded-[4px] p-5 text-center"
            style={{ background: 'white', border: '1px solid var(--color-border)' }}
          >
            <p className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
              {result.finisher_rate_pct.toFixed(1)}%
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
              {isJa ? '完走率' : 'Finish Rate'}
            </p>
          </div>
        )}
        {result.temperature_c !== null && (
          <div
            className="rounded-[4px] p-5 text-center"
            style={{ background: 'white', border: '1px solid var(--color-border)' }}
          >
            <p className="text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>
              {result.temperature_c}°C
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-mid)' }}>
              {isJa ? '当日気温' : 'Temperature'}
            </p>
          </div>
        )}
      </div>

      {result.weather_condition_ja && (
        <div
          className="rounded-[4px] p-5"
          style={{ background: 'white', border: '1px solid var(--color-border)' }}
        >
          <div className="flex flex-wrap gap-5 text-sm">
            <div>
              <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>
                {isJa ? '天気' : 'Weather'}
              </p>
              <p className="font-medium">
                {isJa ? result.weather_condition_ja : result.weather_condition_en}
              </p>
            </div>
            {result.max_temp_c !== null && (
              <div>
                <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>
                  {isJa ? '最高気温' : 'Max'}
                </p>
                <p className="font-medium" style={{ color: '#c0392b' }}>{result.max_temp_c}°C</p>
              </div>
            )}
            {result.min_temp_c !== null && (
              <div>
                <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>
                  {isJa ? '最低気温' : 'Min'}
                </p>
                <p className="font-medium" style={{ color: '#2980b9' }}>{result.min_temp_c}°C</p>
              </div>
            )}
            {result.wind_speed_ms !== null && (
              <div>
                <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>
                  {isJa ? '風速' : 'Wind'}
                </p>
                <p className="font-medium">{result.wind_speed_ms} m/s</p>
              </div>
            )}
            {result.humidity_pct !== null && (
              <div>
                <p className="text-xs mb-0.5" style={{ color: 'var(--color-mid)' }}>
                  {isJa ? '湿度' : 'Humidity'}
                </p>
                <p className="font-medium">{result.humidity_pct}%</p>
              </div>
            )}
          </div>
          {result.notes_ja && (
            <p
              className="text-sm mt-3 pt-3 leading-relaxed"
              style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-ink2)' }}
            >
              {isJa ? result.notes_ja : result.notes_en}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
