import { GraduationCap, Globe, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { LanguageCode, Education } from '@/types/database';
import { formatEducationYear } from '@/utils/date';
import { formatTextWithEmphasis } from '@/utils/formatText';
import { useColumns } from '@/hooks/useColumns';

const countryFlags: Record<string, string> = {
  'France': '🇫🇷',
  'Brazil': '🇧🇷',
  'França': '🇫🇷',
  'Brasil': '🇧🇷',
  'Brésil': '🇧🇷',
};

export function EducationSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const { data: profile } = usePortfolioData();

  if (!profile) return null;

  const degrees = profile.education
    .filter(edu => edu.metadata.showOnWebsite)
    .sort((a, b) => {
      const aEnd = a.timeline.endDate ? new Date(a.timeline.endDate).getTime() : Infinity;
      const bEnd = b.timeline.endDate ? new Date(b.timeline.endDate).getTime() : Infinity;
      if (bEnd !== aEnd) return bEnd - aEnd;
      return new Date(b.timeline.startDate).getTime() - new Date(a.timeline.startDate).getTime();
    });

  const cols = useColumns();
  const columns = Array.from({ length: cols }, () => [] as typeof degrees);
  degrees.forEach((degree, index) => {
    columns[index % cols].push(degree);
  });


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
          <article className="group card-elevated p-6 sm:p-8 border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg hover:border-l-primary/80">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors" aria-hidden="true">
                <Globe size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto" role="presentation">
          {columns.map((col, colIndex) => (
            <ul key={colIndex} className="flex flex-col gap-6" role="list">
              {col.map((edu, index) => {
                const originalIndex = index * cols + colIndex;
                return (
                  <AnimatedItem key={edu._id} delay={0.1 + originalIndex * 0.1}>
                    <li className="w-full">
                      <article className="card-elevated p-6 group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors" aria-hidden="true">
                      <GraduationCap size={20} />
                    </div>
                    <span 
                      className="text-2xl" 
                      role="img" 
                      aria-label={edu.country[currentLang]}
                    >
                      {countryFlags[edu.country[currentLang]] || '🌍'}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                    {edu.degree[currentLang]}
                  </h3>
                  {edu.institutionUrl ? (
                    <a
                      href={edu.institutionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                      {edu.institution[currentLang]}
                      <ExternalLink size={12} aria-hidden="true" />
                      <span className="sr-only">({t('accessibility.externalLink')})</span>
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {edu.institution[currentLang]}
                    </p>
                  )}
                  <time className="text-xs text-primary font-medium mt-3 block">
                    {(() => {
                      const isOngoing = edu.metadata.ongoing || false;
                      
                      const statusTexts = {
                        completed: t('education.completed'),
                        expected: t('education.expected'),
                      };
                      
                      let dateToDisplay = edu.timeline.endDate || null;
                      if (isOngoing) {
                        const milestones: string[] = [];
                        if (edu.timeline.courseworkEndDate) milestones.push(edu.timeline.courseworkEndDate);
                        if (edu.timeline.endDate) milestones.push(edu.timeline.endDate);
                        
                        if (milestones.length > 0) {
                          const now = Date.now();
                          const approaching = milestones.filter(d => new Date(d).getTime() > now);
                          if (approaching.length > 0) {
                            approaching.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
                            dateToDisplay = approaching[0];
                          } else {
                            milestones.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
                            dateToDisplay = milestones[0];
                          }
                        }
                      }
                      
                      return formatEducationYear(dateToDisplay, isOngoing, currentLang, statusTexts);
                    })()}
                  </time>
                  
                  {/* Brief Description */}
                  {edu.briefDescription?.[currentLang] && (
                    <div className="mt-4 text-sm text-muted-foreground transition-colors whitespace-pre-line leading-relaxed">
                      {formatTextWithEmphasis(edu.briefDescription[currentLang])}
                    </div>
                  )}
                </article>
              </li>
            </AnimatedItem>
            );
          })}
        </ul>
      ))}
      </div>
      </div>
    </section>
  );
}
