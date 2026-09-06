import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { assets } from '@/config/assets';

const sectionKeys: Record<string, string> = {
  '1': 'about',
  '2': 'skills',
  '3': 'experience',
  '4': 'education',
  '5': 'projects',
  '6': 'contact',
};

const resumeUrls: Record<string, string> = {
  en: assets.resumes.en,
  pt: assets.resumes.pt,
  fr: assets.resumes.fr,
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
        
        // Fetch the PDF as a blob to avoid cross-origin iframe print restrictions
        fetch(currentResumeUrl)
          .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.blob();
          })
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = blobUrl;
            document.body.appendChild(iframe);
            
            iframe.onload = () => {
              setTimeout(() => {
                const originalTitle = document.title;
                document.title = i18n.language === 'en' ? 'Resume_EN' : i18n.language === 'pt' ? 'Curriculo_PT-BR' : 'CV_FR';
                
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();
                
                // Delay restoring the title because print() might be non-blocking for iframes
                setTimeout(() => {
                  document.title = originalTitle;
                }, 2000);
                
                // Cleanup iframe and blob URL after printing dialog closes
                setTimeout(() => {
                  if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                  }
                  URL.revokeObjectURL(blobUrl);
                }, 60000); // Remove after 1 minute to ensure print dialog has time
              }, 500); // Small delay to ensure PDF is loaded by the browser plugin
            };
          })
          .catch(err => {
            console.error('Failed to load PDF for printing:', err);
            window.open(currentResumeUrl, '_blank');
          });
        
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

  // Handle native browser print dialog file names
  useEffect(() => {
    let originalTitle = document.title;
    
    const handleBeforePrint = () => {
      originalTitle = document.title;
      document.title = i18n.language === 'en' ? 'Resume_EN' : i18n.language === 'pt' ? 'Curriculo_PT-BR' : 'CV_FR';
    };
    
    const handleAfterPrint = () => {
      document.title = originalTitle;
    };
    
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [i18n.language]);
}
