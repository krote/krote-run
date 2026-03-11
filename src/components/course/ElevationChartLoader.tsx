'use client';

import dynamic from 'next/dynamic';
import type { ElevationPoint } from '@/lib/types';

const ElevationChartDynamic = dynamic(() => import('./ElevationChart'), {
  ssr: false,
  loading: () => <div className="h-48 bg-gray-100 rounded-lg animate-pulse" />,
});

export default function ElevationChartLoader({ data }: { data: ElevationPoint[] }) {
  return <ElevationChartDynamic data={data} />;
}
