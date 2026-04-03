'use client';

import { useRouter } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';

interface BackButtonProps {
  label: string;
  fallbackHref: string;
}

export default function BackButton({ label, fallbackHref }: BackButtonProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    // referrerが同一オリジンであればブラウザ履歴を使って戻る
    if (typeof window !== 'undefined' && document.referrer) {
      try {
        const ref = new URL(document.referrer);
        if (ref.origin === window.location.origin) {
          e.preventDefault();
          router.back();
          return;
        }
      } catch {
        // URLパース失敗時はfallback
      }
    }
    // 直リンク・外部からの遷移はfallbackHrefへ
  };

  return (
    <Link
      href={fallbackHref}
      onClick={handleBack}
      className="hover:text-white transition-colors"
    >
      {label}
    </Link>
  );
}
