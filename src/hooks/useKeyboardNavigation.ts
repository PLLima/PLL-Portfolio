import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const sectionKeys: Record<string, string> = {
  '1': 'about',
  '2': 'skills',
  '3': 'experience',
  '4': 'education',
  '5': 'projects',
  '6': 'contact',
};

const resumeUrls: Record<string, string> = {
  en: '/Resume_EN.pdf',
  pt: '/Curriculo_PT-BR.pdf',
  fr: '/CV_FR.pdf',
};

export function useKeyboardNavigation() {
  const { i18n } = useTranslation();

  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Ctrl+P or Cmd+P to print CV
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        
        const currentResumeUrl = resumeUrls[i18n.language] || resumeUrls.en;
        
        // Create an invisible iframe to print the PDF
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = currentResumeUrl;
        document.body.appendChild(iframe);
        
        iframe.onload = () => {
          setTimeout(() => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            
            // Cleanup iframe after printing dialog closes
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 60000); // Remove after 1 minute to ensure print dialog has time
          }, 500); // Small delay to ensure PDF is loaded by the browser plugin
        };
        
        return;
      }

      // Alt + number for section navigation
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        const section = sectionKeys[e.key];
        if (section) {
          e.preventDefault();
          navigateToSection(section);
        }
      }

      // Home key - go to top
      if (e.key === 'Home' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // End key - go to contact
      if (e.key === 'End' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        navigateToSection('contact');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateToSection, i18n.language]);
}
