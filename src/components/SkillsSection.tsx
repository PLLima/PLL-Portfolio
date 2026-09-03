import { Wrench, Users, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { LanguageCode } from '@/types/database';
import { formatAchievementYears } from '@/utils/date';

export function SkillsSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const { data: profile } = usePortfolioData();

  if (!profile) return null;

  const hardSkills = profile.skills
    .filter(skill => skill.category === 'hard_skill')
    .sort((a, b) => a.metadata.displayOrder - b.metadata.displayOrder);

  const softSkills = profile.skills
    .filter(skill => skill.category === 'soft_skill')
    .sort((a, b) => a.metadata.displayOrder - b.metadata.displayOrder);

  const achievements = profile.achievements.filter(ach => ach.metadata.showOnWebsite);

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
            <article className="card-elevated p-6 sm:p-8 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20">
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
                    key={skill._id}
                    className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill.name[currentLang]}
                  </li>
                ))}
              </ul>
            </article>
          </AnimatedItem>

          {/* Soft Skills */}
          <AnimatedItem delay={0.2}>
            <article className="card-elevated p-6 sm:p-8 h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20">
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
                    key={skill._id}
                    className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill.name[currentLang]}
                  </li>
                ))}
              </ul>
            </article>
          </AnimatedItem>
        </div>

        {/* Achievements */}
        <AnimatedSection delay={0.3} className="mt-12 max-w-4xl mx-auto">
          <article className="card-elevated p-6 sm:p-8 border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg hover:border-l-primary/80">
            <h3 className="font-display text-xl font-semibold text-foreground mb-4">
              {t('skills.achievements')}
            </h3>
            <ul className="space-y-3" role="list">
              {achievements.map((achievement) => {
                const title = achievement.title[currentLang];
                const linkText = achievement.metadata.linkText[currentLang];
                const parts = title.split(linkText);
                const dates = formatAchievementYears(achievement.dateIssued);
                
                return (
                  <li key={achievement._id} className="flex items-start gap-3">
                    <span className="text-primary mt-1" aria-hidden="true">•</span>
                    <span className="text-muted-foreground">
                      {parts.length > 1 ? (
                        <>
                          {parts[0]}
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {linkText}
                            <ExternalLink size={12} className="inline" aria-hidden="true" />
                            <span className="sr-only">({t('accessibility.externalLink')})</span>
                          </a>
                          {parts[1]}
                        </>
                      ) : (
                        <>
                          {title} (
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {linkText}
                            <ExternalLink size={12} className="inline" aria-hidden="true" />
                            <span className="sr-only">({t('accessibility.externalLink')})</span>
                          </a>)
                        </>
                      )}
                      {' – '}{dates}
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
