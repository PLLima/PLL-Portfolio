import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { t } = useTranslation();
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.education'), href: '#education' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['about', 'skills', 'experience', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }

      // Reset if at top
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Set focus for accessibility
      element.focus({ preventScroll: true });
    }
    setIsMobileMenuOpen(false);
  };

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      )}
      role="banner"
    >
      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
        style={{ scaleX }}
        aria-hidden="true"
      />
      <nav className="section-container" aria-label={t('accessibility.mainNavigation')}>
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-display text-xl md:text-2xl font-semibold text-foreground hover:text-primary transition-colors rounded-md"
            aria-label="Pedro Lubaszewski Lima - Home"
          >
            PLL<span className="text-primary" aria-hidden="true">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8" role="navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'link-underline text-sm font-medium transition-colors rounded-sm whitespace-nowrap',
                  activeSection === item.href.replace('#', '')
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-current={activeSection === item.href.replace('#', '') ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
            <LanguageSelector />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="icon-button"
              aria-label={t('accessibility.toggleMenu')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="lg:hidden py-4 border-t border-border animate-fade-in"
            aria-label={t('accessibility.mainNavigation')}
          >
            <ul className="flex flex-col gap-2" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                      activeSection === item.href.replace('#', '')
                        ? 'text-primary bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    )}
                    aria-current={activeSection === item.href.replace('#', '') ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </nav>
    </header>
  );
}
