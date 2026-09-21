import { Mail, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { LanguageCode } from '@/types/database';

export function ContactSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const { data: profile } = usePortfolioData();

  if (!profile) return null;

  return (
    <section 
      id="contact" 
      className="section-padding relative overflow-hidden"
      aria-labelledby="contact-heading"
      tabIndex={-1}
    >
      {/* Background decoration - decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 id="contact-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('contact.title')} <span className="text-gradient">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="max-w-2xl mx-auto">
          <div className="group/card card-elevated p-8 sm:p-12 transition-all duration-300 hover:shadow-lg hover:border-primary/20 flex flex-col items-center text-center">
            {/* Primary CTA */}
            <AnimatedItem delay={0.2} className="w-full max-w-md mx-auto mb-10">
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center justify-center gap-3 w-full px-8 py-5 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-all hover:scale-[1.02]"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              >
                <Mail size={22} className="flex-shrink-0" aria-hidden="true" />
                <span>{t('contact.sendEmail')}</span>
              </a>
            </AnimatedItem>

            {/* Divider */}
            <div className="w-full max-w-lg mx-auto border-t border-border group-hover/card:border-primary/30 transition-colors mb-10" aria-hidden="true" />

            {/* Social Links */}
            <div className="w-full max-w-lg mx-auto">
              <p className="text-sm text-muted-foreground mb-6 font-medium">{t('contact.findOnline')}</p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <AnimatedItem delay={0.3}>
                  <a
                    href={`https://${profile.contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-4 rounded-xl bg-secondary hover:bg-primary group transition-all hover:scale-[1.02] shadow-sm"
                    aria-label={`LinkedIn - ${t('accessibility.externalLink')}`}
                  >
                    <Linkedin size={20} className="text-secondary-foreground group-hover:text-primary-foreground transition-colors" aria-hidden="true" />
                    <span className="font-medium text-secondary-foreground group-hover:text-primary-foreground transition-colors">
                      LinkedIn
                    </span>
                    <ExternalLink size={14} className="ml-2 text-muted-foreground group-hover:text-primary-foreground/70 transition-colors" aria-hidden="true" />
                  </a>
                </AnimatedItem>

                <AnimatedItem delay={0.4}>
                  <a
                    href={`https://${profile.contact.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 p-4 rounded-xl bg-secondary hover:bg-primary group transition-all hover:scale-[1.02] shadow-sm"
                    aria-label={`GitHub - ${t('accessibility.externalLink')}`}
                  >
                    <Github size={20} className="text-secondary-foreground group-hover:text-primary-foreground transition-colors" aria-hidden="true" />
                    <span className="font-medium text-secondary-foreground group-hover:text-primary-foreground transition-colors">
                      GitHub
                    </span>
                    <ExternalLink size={14} className="ml-2 text-muted-foreground group-hover:text-primary-foreground/70 transition-colors" aria-hidden="true" />
                  </a>
                </AnimatedItem>
              </div>
            </div>

            {/* Location Metadata */}
            <AnimatedItem delay={0.5} className="mt-10">
              <div className="group/location inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/20 text-foreground font-medium text-sm transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-md cursor-default shadow-sm">
                <MapPin size={16} className="text-primary group-hover/location:text-primary-foreground transition-colors" aria-hidden="true" />
                <span>{profile.location[currentLang]}</span>
              </div>
            </AnimatedItem>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
