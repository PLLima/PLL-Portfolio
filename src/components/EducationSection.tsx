import { GraduationCap, Globe, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import { ReactNode } from 'react';

const countryFlags: Record<string, string> = {
  'France': '🇫🇷',
  'Brazil': '🇧🇷',
  'França': '🇫🇷',
  'Brasil': '🇧🇷',
  'Brésil': '🇧🇷',
};

export function EducationSection() {
  const { t } = useTranslation();

  const degrees = t('education.degrees', { returnObjects: true }) as Array<{
    degree: string;
    institution: string;
    institutionUrl?: string;
    period: string;
    country: string;
  }>;

  return (
    <section 
      id="education" 
      className="section-padding bg-card"
      aria-labelledby="education-heading"
      tabIndex={-1}
    >
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 id="education-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('education.title')} <span className="text-gradient">{t('education.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </AnimatedSection>

        {/* International highlight */}
        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto mb-12">
          <article className="card-elevated p-6 sm:p-8 border-l-4 border-l-primary">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <Globe size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {t('education.doubleDegree')}
                </h3>
                <p className="text-muted-foreground">
                  {t('education.doubleDegreeDesc', { returnObjects: false })
                    .split(/(\{centralesupelec\}|\{ufrgs\})/)
                    .map((part, index) => {
                      if (part === '{centralesupelec}') {
                        return (
                          <a
                            key={index}
                            href="https://www.centralesupelec.fr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            CentraleSupélec
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        );
                      }
                      if (part === '{ufrgs}') {
                        return (
                          <a
                            key={index}
                            href="https://www.ufrgs.br/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            UFRGS
                            <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        );
                      }
                      return <span key={index}>{part}</span>;
                    })}
                </p>
              </div>
            </div>
          </article>
        </AnimatedSection>

        {/* Education Grid */}
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" role="list">
          {degrees.map((edu, index) => (
            <AnimatedItem key={index} delay={0.1 + index * 0.1}>
              <li>
                <article className="card-elevated p-6 group h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors" aria-hidden="true">
                      <GraduationCap size={20} className="text-secondary-foreground group-hover:text-primary-foreground" />
                    </div>
                    <span 
                      className="text-2xl" 
                      role="img" 
                      aria-label={edu.country}
                    >
                      {countryFlags[edu.country] || '🌍'}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-2">
                    {edu.degree}
                  </h3>
                  {edu.institutionUrl ? (
                    <a
                      href={edu.institutionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {edu.institution}
                      <ExternalLink size={12} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {edu.institution}
                    </p>
                  )}
                  <time className="text-xs text-primary font-medium mt-3 block">
                    {edu.period}
                  </time>
                </article>
              </li>
            </AnimatedItem>
          ))}
        </ul>
      </div>
    </section>
  );
}
