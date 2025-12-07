import { Briefcase, MapPin } from 'lucide-react';
import { profile } from '@/data/profile';

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="absolute inset-0 opacity-50" style={{ background: 'var(--gradient-section)' }} />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A track record of diverse roles building towards tech leadership
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {profile.experience.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-2" />

                {/* Content */}
                <div className={`flex-1 ml-8 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="card-elevated p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-primary" />
                        <span className="text-sm font-medium text-primary">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={12} />
                        {exp.location}
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-muted-foreground font-medium mb-4">
                      {exp.company}
                    </p>

                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
