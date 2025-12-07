import { Briefcase, MapPin, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';

export function ExperienceSection() {
  const { t } = useTranslation();

  const jobs = t('experience.jobs', { returnObjects: true }) as Array<{
    title: string;
    company: string;
    companyUrl?: string;
    period: string;
    location: string;
    description: string[];
  }>;

  return (
    <section 
      id="experience" 
      className="section-padding relative"
      aria-labelledby="experience-heading"
      tabIndex={-1}
    >
      <div className="absolute inset-0 opacity-50" style={{ background: 'var(--gradient-section)' }} aria-hidden="true" />
      
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 id="experience-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('experience.title')} <span className="text-gradient">{t('experience.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative" role="list" aria-label="Work experience timeline">
            {/* Timeline line - decorative */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" aria-hidden="true" />

            {jobs.map((exp, index) => (
              <AnimatedItem key={index} delay={0.1 + index * 0.1}>
                <article
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 last:mb-0 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                  role="listitem"
                >
                  {/* Timeline dot - decorative */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-2" aria-hidden="true" />

                  {/* Content */}
                  <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="card-elevated p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Briefcase size={16} className="text-primary" aria-hidden="true" />
                          <time className="text-sm font-medium text-primary">{exp.period}</time>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={12} aria-hidden="true" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                        {exp.title}
                      </h3>
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground font-medium mb-4 hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          {exp.company}
                          <ExternalLink size={14} aria-hidden="true" />
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      ) : (
                        <p className="text-muted-foreground font-medium mb-4">
                          {exp.company}
                        </p>
                      )}

                      <ul className="space-y-2" role="list">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-1.5" aria-hidden="true">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" aria-hidden="true" />
                </article>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
