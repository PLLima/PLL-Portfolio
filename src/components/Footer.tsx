import { useTranslation } from 'react-i18next';
import { profile } from '@/data/profile';
import { KeyboardShortcutsTrigger } from '@/components/KeyboardShortcutsHelp';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="py-8 border-t border-border bg-card" role="contentinfo">
      <div className="section-container">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} {profile.name}. {t('footer.rights')}
          </p>
          <div className="hidden sm:flex items-center justify-center gap-4">
            <KeyboardShortcutsTrigger />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
