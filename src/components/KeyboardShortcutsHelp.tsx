import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const shortcuts = [
  { keys: ['Alt', '1'], action: 'about' },
  { keys: ['Alt', '2'], action: 'skills' },
  { keys: ['Alt', '3'], action: 'experience' },
  { keys: ['Alt', '4'], action: 'education' },
  { keys: ['Alt', '5'], action: 'projects' },
  { keys: ['Alt', '6'], action: 'contact' },
  { keys: ['Home'], action: 'top' },
  { keys: ['End'], action: 'bottom' },
  { keys: ['?'], action: 'help' },
];

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

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

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      about: t('nav.about'),
      skills: t('nav.skills'),
      experience: t('nav.experience'),
      education: t('nav.education'),
      projects: t('nav.projects'),
      contact: t('nav.contact'),
      top: t('accessibility.backToTop'),
      bottom: t('nav.contact'),
      help: t('keyboard.toggleHelp'),
    };
    return labels[action] || action;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="keyboard-shortcuts-title"
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Keyboard size={20} className="text-primary" />
                  </div>
                  <h2 id="keyboard-shortcuts-title" className="font-display text-xl font-semibold text-foreground">
                    {t('keyboard.title')}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="icon-button w-8 h-8"
                  aria-label={t('keyboard.close')}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground">
                      {getActionLabel(shortcut.action)}
                    </span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-mono font-medium bg-secondary text-secondary-foreground rounded border border-border shadow-sm">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="mx-1 text-muted-foreground">+</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-muted-foreground text-center">
                {t('keyboard.pressEsc')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
