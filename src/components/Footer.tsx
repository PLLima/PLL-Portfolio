import { profile } from '@/data/profile';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-card">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with passion for tech leadership
          </p>
        </div>
      </div>
    </footer>
  );
}
