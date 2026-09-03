import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import pt from './locales/pt';
import fr from './locales/fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      fr: { translation: fr },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt', 'fr'],
    load: 'languageOnly',
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

// Enforce 2-letter language codes globally to match MongoDB keys
const normalizeLanguage = (lng: string | undefined) => {
  if (lng && lng.includes('-')) {
    const baseLng = lng.split('-')[0];
    if (['en', 'pt', 'fr'].includes(baseLng)) {
      i18n.changeLanguage(baseLng);
    }
  }
};

// Run on init to catch localStorage cached values
normalizeLanguage(i18n.language);

// Run on any future language changes
i18n.on('languageChanged', normalizeLanguage);

export default i18n;
