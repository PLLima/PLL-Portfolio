import { Mail, MapPin, Linkedin, Github, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import { profile } from '@/data/profile';

export function ContactSection() {
  const { t } = useTranslation();

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
          <div className="card-elevated p-8 sm:p-12">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Contact Info */}
              <address className="space-y-6 not-italic">
                <AnimatedItem delay={0.2}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('contact.email')}</p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-foreground font-medium hover:text-primary transition-colors whitespace-nowrap rounded-sm"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                </AnimatedItem>

                <AnimatedItem delay={0.3}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t('contact.location')}</p>
                      <p className="text-foreground font-medium">{profile.location}</p>
                    </div>
                  </div>
                </AnimatedItem>
              </address>

              {/* Social Links */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-2">{t('contact.findOnline')}</p>
                
                <AnimatedItem delay={0.2}>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-primary group transition-colors"
                    aria-label={`LinkedIn - ${t('accessibility.externalLink')}`}
                  >
                    <Linkedin size={20} className="text-secondary-foreground group-hover:text-primary-foreground" aria-hidden="true" />
                    <span className="font-medium text-secondary-foreground group-hover:text-primary-foreground">
                      LinkedIn
                    </span>
                    <ExternalLink size={14} className="ml-auto text-muted-foreground group-hover:text-primary-foreground" aria-hidden="true" />
                  </a>
                </AnimatedItem>

                <AnimatedItem delay={0.3}>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-secondary hover:bg-primary group transition-colors"
                    aria-label={`GitHub - ${t('accessibility.externalLink')}`}
                  >
                    <Github size={20} className="text-secondary-foreground group-hover:text-primary-foreground" aria-hidden="true" />
                    <span className="font-medium text-secondary-foreground group-hover:text-primary-foreground">
                      GitHub
                    </span>
                    <ExternalLink size={14} className="ml-auto text-muted-foreground group-hover:text-primary-foreground" aria-hidden="true" />
                  </a>
                </AnimatedItem>
              </div>
            </div>

            {/* CTA */}
            <AnimatedItem delay={0.4}>
              <div className="mt-10 pt-8 border-t border-border text-center">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:opacity-90 transition-all"
                  style={{ boxShadow: 'var(--shadow-glow)' }}
                >
                  <Mail size={20} aria-hidden="true" />
                  {t('contact.sendEmail')}
                </a>
              </div>
            </AnimatedItem>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
