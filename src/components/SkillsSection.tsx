import { Wrench, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';

export function SkillsSection() {
  const { t } = useTranslation();

  const hardSkills = t('skills.hardSkills', { returnObjects: true }) as string[];
  const softSkills = t('skills.softSkills', { returnObjects: true }) as string[];
  const achievements = t('skills.achievementsList', { returnObjects: true }) as string[];

  return (
    <section id="skills" className="section-padding bg-card">
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('skills.title')} <span className="text-gradient">{t('skills.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Hard Skills */}
          <AnimatedItem delay={0.1}>
            <div className="card-elevated p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wrench size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {t('skills.technical')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {hardSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedItem>

          {/* Soft Skills */}
          <AnimatedItem delay={0.2}>
            <div className="card-elevated p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {t('skills.soft')}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedItem>
        </div>

        {/* Achievements */}
        <AnimatedSection delay={0.3} className="mt-12 max-w-4xl mx-auto">
          <div className="card-elevated p-6 sm:p-8 border-l-4 border-l-primary">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              {t('skills.achievements')}
            </h3>
            <ul className="space-y-3">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
