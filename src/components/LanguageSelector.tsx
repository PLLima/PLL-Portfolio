import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const currentLang = languages.find((l) => i18n.language.startsWith(l.code)) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="icon-button" 
        aria-label={`${t('accessibility.changeLanguage')} - ${t('accessibility.currentLanguage')}: ${currentLang.name}`}
      >
        <Globe size={18} aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLang.code === lang.code ? 'bg-accent' : ''
            }`}
            aria-current={currentLang.code === lang.code ? 'true' : undefined}
          >
            <span aria-hidden="true">{lang.flag}</span>
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
