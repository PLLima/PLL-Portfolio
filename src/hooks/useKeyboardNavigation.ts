import { useEffect, useCallback } from 'react';

const sectionKeys: Record<string, string> = {
  '1': 'about',
  '2': 'skills',
  '3': 'experience',
  '4': 'education',
  '5': 'projects',
  '6': 'contact',
};

export function useKeyboardNavigation() {
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
  }, [navigateToSection]);
}
