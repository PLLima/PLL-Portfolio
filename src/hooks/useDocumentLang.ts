import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const langMap: Record<string, string> = {
  en: 'en',
  pt: 'pt-BR',
  fr: 'fr',
};

export function useDocumentLang() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const htmlLang = langMap[i18n.language] || 'en';
    document.documentElement.lang = htmlLang;
  }, [i18n.language]);
}
