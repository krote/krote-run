'use client';

import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';

interface RaceBreadcrumbProps {
  raceName: string;
  from?: string | null;
  labels: {
    home: string;
    races: string;
    calendar: string;
  };
}

export default function RaceBreadcrumb({ raceName, from, labels }: RaceBreadcrumbProps) {
  const router = useRouter();

  const middle: { label: string; href: string } | null =
    from === 'races'
      ? { label: labels.races, href: '/races' }
      : from === 'calendar'
        ? { label: labels.calendar, href: '/calendar' }
        : null;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  return (
    <nav
      className="flex items-center gap-1.5 text-xs mb-6"
      aria-label="breadcrumb"
      style={{ color: 'var(--color-light)' }}
    >
      <Link href="/" className="hover:text-white transition-colors">
        {labels.home}
      </Link>

      {middle && (
        <>
          <span aria-hidden="true">›</span>
          <Link href={middle.href} onClick={handleBack} className="hover:text-white transition-colors">
            {middle.label}
          </Link>
        </>
      )}

      <span aria-hidden="true">›</span>
      <span className="text-white truncate max-w-[200px] sm:max-w-xs">{raceName}</span>
    </nav>
  );
}
