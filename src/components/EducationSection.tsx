import { GraduationCap, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';

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
    period: string;
    country: string;
  }>;

  return (
    <section id="education" className="section-padding bg-card">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('education.title')} <span className="text-gradient">{t('education.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('education.subtitle')}
          </p>
        </AnimatedSection>

        {/* International highlight */}
        <AnimatedSection delay={0.1} className="max-w-3xl mx-auto mb-12">
          <div className="card-elevated p-6 sm:p-8 border-l-4 border-l-primary">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Globe size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {t('education.doubleDegree')}
                </h3>
                <p className="text-muted-foreground">
                  {t('education.doubleDegreeDesc')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {degrees.map((edu, index) => (
            <AnimatedItem key={index} delay={0.1 + index * 0.1}>
              <div className="card-elevated p-6 group h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                    <GraduationCap size={20} className="text-secondary-foreground group-hover:text-primary-foreground" />
                  </div>
                  <span className="text-2xl" title={edu.country}>{countryFlags[edu.country] || '🌍'}</span>
                </div>

                <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-2">
                  {edu.degree}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {edu.institution}
                </p>
                <p className="text-xs text-primary font-medium">
                  {edu.period}
                </p>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </div>
    </section>
  );
}
