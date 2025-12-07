import { Wrench, Users, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';

interface Achievement {
  text: string;
  link: string;
  linkText: string;
}

export function SkillsSection() {
  const { t } = useTranslation();

  const hardSkills = t('skills.hardSkills', { returnObjects: true }) as string[];
  const softSkills = t('skills.softSkills', { returnObjects: true }) as string[];
  const achievements = t('skills.achievementsList', { returnObjects: true }) as Achievement[];

  return (
    <section 
      id="skills" 
      className="section-padding bg-card"
      aria-labelledby="skills-heading"
      tabIndex={-1}
    >
      <div className="section-container">
        <AnimatedSection className="text-center mb-12">
          <h2 id="skills-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('skills.title')} <span className="text-gradient">{t('skills.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Hard Skills */}
          <AnimatedItem delay={0.1}>
            <article className="card-elevated p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                  <Wrench size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {t('skills.technical')}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2" role="list">
                {hardSkills.map((skill) => (
                  <li
                    key={skill}
                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          </AnimatedItem>

          {/* Soft Skills */}
          <AnimatedItem delay={0.2}>
            <article className="card-elevated p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" aria-hidden="true">
                  <Users size={20} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {t('skills.soft')}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2" role="list">
                {softSkills.map((skill) => (
                  <li
                    key={skill}
                    className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          </AnimatedItem>
        </div>

        {/* Achievements */}
        <AnimatedSection delay={0.3} className="mt-12 max-w-4xl mx-auto">
          <article className="card-elevated p-6 sm:p-8 border-l-4 border-l-primary">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              {t('skills.achievements')}
            </h3>
            <ul className="space-y-3" role="list">
              {achievements.map((achievement, index) => {
                const parts = achievement.text.split(achievement.linkText);
                return (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-1" aria-hidden="true">•</span>
                    <span className="text-muted-foreground">
                      {parts[0]}
                      <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {achievement.linkText}
                        <ExternalLink size={12} className="inline" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                      {parts[1]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>
        </AnimatedSection>
      </div>
    </section>
  );
}
