import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-neutral-300 rounded-full hover:bg-neutral-100 transition-colors"
      aria-label={language === 'ro' ? 'Switch to English' : 'Schimbă în Română'}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase">{language === 'ro' ? 'EN' : 'RO'}</span>
    </button>
  );
}
