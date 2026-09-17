import { GraduationCap, Globe, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import { LanguageCode } from '@/types/database';
import { formatEducationYear } from '@/utils/date';

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

  // Group active degrees by type to find the ATS Anchor
  const activeDegreesByType = new Map<string, any[]>();
  degrees.forEach(edu => {
    if (edu.metadata.ongoing && edu.metadata.type) {
      const arr = activeDegreesByType.get(edu.metadata.type) || [];
      arr.push(edu);
      activeDegreesByType.set(edu.metadata.type, arr);
    }
  });

  const anchorIds = new Set<string>();
  const anchorDisplayDates = new Map<string, string>(); // edu._id -> date string to display

  activeDegreesByType.forEach((typeDegrees) => {
    const now = Date.now();
    
    // For each degree, find its EAM (Earliest Approaching Milestone)
    const getEAMInfo = (edu: any) => {
      let milestones = [];
      if (edu.timeline.courseworkEndDate) milestones.push(edu.timeline.courseworkEndDate);
      if (edu.timeline.endDate) milestones.push(edu.timeline.endDate);
      
      let approaching = milestones.filter((d: string) => new Date(d).getTime() > now);
      if (approaching.length > 0) {
        // Sort to get the earliest approaching
        approaching.sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime());
        return { dateStr: approaching[0], ms: new Date(approaching[0]).getTime() };
      }
      // If all are in the past, return the latest one (most recent)
      if (milestones.length > 0) {
        milestones.sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());
        return { dateStr: milestones[0], ms: new Date(milestones[0]).getTime() };
      }
      return { dateStr: null, ms: Infinity };
    };

    const eamInfos = typeDegrees.map(edu => ({
      edu,
      info: getEAMInfo(edu)
    }));

    // Find the minimum EAM ms across all entries in this type
    const globalEamMs = Math.min(...eamInfos.map(e => e.info.ms));

    // Any entry that shares this minimum EAM becomes an anchor and displays that milestone
    eamInfos.forEach(e => {
      if (e.info.ms === globalEamMs && e.info.ms !== Infinity) {
        anchorIds.add(e.edu._id);
        if (e.info.dateStr) {
          anchorDisplayDates.set(e.edu._id, e.info.dateStr);
        }
      }
    });
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
          <article className="card-elevated p-6 sm:p-8 border-l-4 border-l-primary transition-all duration-300 hover:shadow-lg hover:border-l-primary/80">
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
            <AnimatedItem key={edu._id} delay={0.1 + index * 0.1}>
              <li>
                <article className="card-elevated p-6 group h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors" aria-hidden="true">
                      <GraduationCap size={20} className="text-secondary-foreground group-hover:text-primary-foreground" />
                    </div>
                    <span 
                      className="text-2xl" 
                      role="img" 
                      aria-label={edu.country[currentLang]}
                    >
                      {countryFlags[edu.country[currentLang]] || '🌍'}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-2">
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
                      const isOmitted = isOngoing && edu.metadata.type && !anchorIds.has(edu._id);
                      if (isOmitted) {
                        return edu.metadata.type === 'degree' 
                          ? t('education.concurrentDegree') 
                          : t('education.concurrentCourse');
                      }
                      
                      const statusTexts = {
                        completed: t('education.completed'),
                        expected: t('education.expected'),
                      };
                      
                      const dateToDisplay = isOngoing && anchorDisplayDates.has(edu._id) 
                          ? (anchorDisplayDates.get(edu._id) || null)
                          : (edu.timeline.endDate || null);
                      
                      return formatEducationYear(dateToDisplay, isOngoing, currentLang, statusTexts);
                    })()}
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
