import { getAdminRaces } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import { DeleteRaceButton } from './DeleteRaceButton';

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allRaces = await getAdminRaces();

  // 年ごとにグループ化
  const byYear = new Map<string, typeof allRaces>();
  for (const race of allRaces) {
    const year = race.date.slice(0, 4);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(race);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b.localeCompare(a));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">管理画面</h1>
        <Link
          href="/admin/races/new"
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/80 transition-colors"
        >
          ＋ 新規大会を追加
        </Link>
      </div>

      {years.length === 0 ? (
        <p className="text-gray-500">大会データがありません。</p>
      ) : (
        <div className="space-y-8">
          {years.map((year) => (
            <section key={year}>
              <h2 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">
                {year}年
              </h2>
              <div className="space-y-2">
                {byYear.get(year)!.map((race) => (
                  <div
                    key={race.id}
                    className="flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="text-sm text-gray-500 w-24 shrink-0">{race.date}</span>
                      <span className="text-sm font-medium text-gray-900 truncate">{race.name_ja}</span>
                      <span className="text-xs text-gray-400 font-mono shrink-0">{race.id}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <Link
                        href={`/races/${race.id}`}
                        className="text-xs px-3 py-1.5 border border-gray-200 rounded text-gray-600 hover:text-primary hover:border-primary transition-colors"
                      >
                        詳細
                      </Link>
                      <DeleteRaceButton raceId={race.id} raceName={race.name_ja} locale={locale} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
