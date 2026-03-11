import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <span className="text-2xl">🏃</span>
              <span>KroteRun</span>
            </div>
            <p className="text-sm leading-relaxed">
              全国のマラソン大会情報をまとめてチェックできるポータルサイトです。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">ナビゲーション</h3>
            <ul className="space-y-2">
              {(['home', 'races', 'calendar', 'settings'] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={key === 'home' ? '/' : `/${key}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Information</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span>Built with Next.js {/* version */}</span>
              </li>
              <li>
                <span>Data updated regularly</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-sm text-center">
          © {year} KroteRun. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
