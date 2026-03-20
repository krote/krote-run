import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('home.footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0e0c] pt-11 pb-7 px-9">
      <div className="max-w-[1120px] mx-auto">
        <div className="flex justify-between gap-12 flex-wrap">

          {/* Brand */}
          <div className="max-w-[210px]">
            <div className="font-serif text-[1.1rem] text-white mb-3">
              Krote<span className="text-[var(--color-primary)]">Run</span> Japan
            </div>
            <p className="text-[0.78rem] text-[#444] leading-7">{t('tagline')}</p>
          </div>

          {/* Links */}
          <div className="flex gap-14 flex-wrap">
            <div>
              <h4 className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[#333] mb-4">
                {t('findRace')}
              </h4>
              <ul className="space-y-[9px]">
                <li><Link href="/races" className="text-[0.8rem] text-[#555] hover:text-white no-underline transition-colors">{tNav('races')}</Link></li>
                <li><Link href="/calendar" className="text-[0.8rem] text-[#555] hover:text-white no-underline transition-colors">{tNav('calendar')}</Link></li>
                <li><Link href="/races" className="text-[0.8rem] text-[#555] hover:text-white no-underline transition-colors">{t('byRegion')}</Link></li>
                <li><Link href="/races" className="text-[0.8rem] text-[#555] hover:text-white no-underline transition-colors">{t('byDistance')}</Link></li>
                <li><Link href="/races" className="text-[0.8rem] text-[#555] hover:text-white no-underline transition-colors">{t('bySeason')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[0.68rem] font-semibold tracking-[0.14em] uppercase text-[#333] mb-4">
                {t('info')}
              </h4>
              <ul className="space-y-[9px]">
                <li><Link href="/settings" className="text-[0.8rem] text-[#555] hover:text-white no-underline transition-colors">{tNav('settings')}</Link></li>
                <li><span className="text-[0.8rem] text-[#555]">{t('howToEnter')}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-7 pt-[18px] border-t border-[#1a1a1a] flex justify-between text-[0.72rem] text-[#333] flex-wrap gap-2">
          <span>© {year} KroteRun. All rights reserved.</span>
          <span>{t('madeFor')}</span>
        </div>
      </div>
    </footer>
  );
}
