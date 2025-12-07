import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className="icon-button" 
        aria-label={`${t('accessibility.changeLanguage')} - ${t('accessibility.currentLanguage')}: ${currentLang.name}`}
      >
        <motion.div
          key={currentLang.code}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Globe size={18} aria-hidden="true" />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        <AnimatePresence mode="wait">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <DropdownMenuItem
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center gap-2 cursor-pointer ${
                  currentLang.code === lang.code ? 'bg-accent' : ''
                }`}
                aria-current={currentLang.code === lang.code ? 'true' : undefined}
              >
                <motion.span 
                  aria-hidden="true"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {lang.flag}
                </motion.span>
                <span>{lang.name}</span>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
