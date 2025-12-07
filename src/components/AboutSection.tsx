import { Brain, Shield, Code, Cpu, LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Shield,
  Code,
  Cpu,
};

const focusAreaKeys = ['ai', 'cyber', 'software', 'micro'] as const;
const iconKeys = ['Brain', 'Shield', 'Code', 'Cpu'];

export function AboutSection() {
  const { t } = useTranslation();

  const languages = [
    t('languages.portuguese', { returnObjects: true }) as { name: string; level: string },
    t('languages.english', { returnObjects: true }) as { name: string; level: string },
    t('languages.french', { returnObjects: true }) as { name: string; level: string },
  ];

  return (
    <section 
      id="about" 
      className="section-padding relative"
      aria-labelledby="about-heading"
      tabIndex={-1}
    >
      {/* Background accent - decorative */}
      <div className="absolute inset-0 opacity-50" style={{ background: 'var(--gradient-section)' }} aria-hidden="true" />
      
      <div className="section-container relative z-10">
        <AnimatedSection className="text-center mb-12">
          <h2 id="about-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('about.title')} <span className="text-gradient">{t('about.titleHighlight')}</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <AnimatedSection delay={0.1}>
            <article className="card-elevated p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/20">
              <p className="text-foreground leading-relaxed whitespace-pre-line">
                {t('about.bio')}
              </p>
              
              {/* Languages */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  {t('about.languages')}
                </h3>
                <ul className="flex flex-wrap gap-3" role="list">
                  {languages.map((lang) => (
                    <li
                      key={lang.name}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground"
                    >
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-xs text-muted-foreground">({lang.level})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </AnimatedSection>

          {/* Focus Areas */}
          <div className="grid sm:grid-cols-2 gap-4" role="list" aria-label="Focus areas">
            {focusAreaKeys.map((key, index) => {
              const Icon = iconMap[iconKeys[index]];
              const area = t(`focusAreas.${key}`, { returnObjects: true }) as { title: string; description: string };
              return (
                <AnimatedItem key={key} delay={0.1 + index * 0.1}>
                  <article className="card-elevated p-6 group h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20" role="listitem">
                    <div 
                      className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      aria-hidden="true"
                    >
                      <Icon size={24} className="text-accent-foreground group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {area.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {area.description}
                    </p>
                  </article>
                </AnimatedItem>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
