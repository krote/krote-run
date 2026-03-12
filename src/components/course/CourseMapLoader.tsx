'use client';

import dynamic from 'next/dynamic';
import type { CourseProfile } from '@/lib/types';

const CourseMapDynamic = dynamic(() => import('./CourseMap'), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center text-gray-400">
      地図を読み込み中...
    </div>
  ),
});

export default function CourseMapLoader({ courseProfile }: { courseProfile: CourseProfile }) {
  return <CourseMapDynamic courseProfile={courseProfile} />;
}
