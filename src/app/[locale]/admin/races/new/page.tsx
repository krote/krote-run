import type { Metadata } from 'next';
import { getAllSeries, getAllPrefectures } from '@/lib/data';
import { Link } from '@/i18n/navigation';
import { RaceForm } from './RaceForm';

export const metadata: Metadata = { title: '新規大会を追加 | 管理画面' };

export default async function NewRacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [series, prefectures] = await Promise.all([getAllSeries(), getAllPrefectures()]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-primary">
          ← 管理画面
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">新規大会を追加</h1>
      </div>

      <RaceForm series={series} prefectures={prefectures} locale={locale} />
    </div>
  );
}
