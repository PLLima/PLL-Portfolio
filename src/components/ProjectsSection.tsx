import { Github, Folder } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { AnimatedSection, AnimatedItem } from '@/components/AnimatedSection';
import { profile } from '@/data/profile';

export function ProjectsSection() {
  const { t } = useTranslation();

  const projects = t('projects.list', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    techStack: string[];
  }>;

  return (
    <section 
      id="projects" 
      className="py-20 lg:py-32 bg-secondary/30"
      aria-labelledby="projects-heading"
      tabIndex={-1}
    >
      <div className="section-container">
        <AnimatedSection className="text-center mb-16">
          <h2 id="projects-heading" className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('projects.title')} <span className="text-gradient">{t('projects.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </AnimatedSection>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {projects.map((project, index) => (
            <AnimatedItem key={project.name} delay={0.1 + index * 0.1}>
              <li>
                <article className="group glass-card p-6 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary" aria-hidden="true">
                      <Folder size={24} />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            </AnimatedItem>
          ))}
        </ul>

        <AnimatedSection delay={0.4} className="text-center mt-12">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`${t('projects.viewMore')} - ${t('accessibility.externalLink')}`}
          >
            <Github size={18} aria-hidden="true" />
            {t('projects.viewMore')}
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
