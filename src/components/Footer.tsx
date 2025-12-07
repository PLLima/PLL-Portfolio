import { useTranslation } from 'react-i18next';
import { profile } from '@/data/profile';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="py-8 border-t border-border bg-card" role="contentinfo">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} {profile.name}. {t('footer.rights')}
          </p>
          <p className="text-sm text-muted-foreground text-center sm:text-right">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
