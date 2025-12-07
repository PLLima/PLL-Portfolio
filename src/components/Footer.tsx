import { useTranslation } from 'react-i18next';
import { profile } from '@/data/profile';
import { KeyboardShortcutsTrigger } from '@/components/KeyboardShortcutsHelp';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="py-8 border-t border-border bg-card" role="contentinfo">
      <div className="section-container">
        {/* Mobile layout - stacked */}
        <div className="flex flex-col items-center gap-4 sm:hidden">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} {profile.name}. {t('footer.rights')}
          </p>
          <p className="text-sm text-muted-foreground text-center">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Desktop layout - three columns */}
        <div className="hidden sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
          <p className="text-sm text-muted-foreground text-left">
            © {currentYear} {profile.name}. {t('footer.rights')}
          </p>
          <div className="flex justify-center">
            <KeyboardShortcutsTrigger />
          </div>
          <p className="text-sm text-muted-foreground text-right">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
