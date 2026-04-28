'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CoursePoint } from '@/lib/types';

// NOTE: Import as dynamic with ssr:false via ElevationChartLoader

interface ElevationChartProps {
  data: CoursePoint[];
  className?: string;
}

interface TooltipPayload {
  value: number;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: number;
}) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-md text-sm">
        <p className="text-gray-600">{`${label?.toFixed(1)}km`}</p>
        <p className="font-semibold text-primary">{`${payload[0].value}m`}</p>
      </div>
    );
  }
  return null;
}

export default function ElevationChart({ data, className = '' }: ElevationChartProps) {
  if (data.length === 0) return null;

  const minElev = Math.min(...data.map((d) => d.ele));
  const maxElev = Math.max(...data.map((d) => d.ele));
  const padding = Math.max(20, (maxElev - minElev) * 0.1);

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="dist_km"
            tickFormatter={(v: number) => `${v.toFixed(0)}km`}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
          />
          <YAxis
            domain={[minElev - padding, maxElev + padding]}
            tickFormatter={(v: number) => `${Math.round(v)}m`}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            tickLine={false}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="ele"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#elevationGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#2563eb' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
