import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import DynamicIcon from './DynamicIcon';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { LanguageCode } from '@/types/database';

export function AboutSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const { data: profile } = usePortfolioData();

  if (!profile) return null;

  const languages = [...profile.languages].sort(
    (a, b) => a.metadata.displayOrder - b.metadata.displayOrder
  );

  const focusAreas = [...profile.focusAreas]
    .filter(area => area.metadata.isActive)
    .sort((a, b) => a.metadata.displayOrder - b.metadata.displayOrder);

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
                {profile.i18n_strings.about[currentLang]}
              </p>
              
              {/* Languages */}
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                  {t('about.languages')}
                </h3>
                <ul className="flex flex-wrap gap-3" role="list">
                  {languages.map((lang) => (
                    <li
                      key={lang._id}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground"
                    >
                      <span className="font-medium">{lang.language[currentLang]}</span>
                      <span className="text-xs text-muted-foreground">({lang.level[currentLang]})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </AnimatedSection>

          {/* Focus Areas */}
          <div className="grid sm:grid-cols-2 gap-4" role="list" aria-label="Focus areas">
            {focusAreas.map((area, index) => (
              <AnimatedItem key={area._id} delay={0.1 + index * 0.1}>
                <article className="card-elevated p-6 group h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20" role="listitem">
                  <div 
                    className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    aria-hidden="true"
                  >
                    <DynamicIcon name={area.icon} size={24} className="text-accent-foreground group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {area.title[currentLang]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {area.description[currentLang]}
                  </p>
                </article>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
