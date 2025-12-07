import { Brain, Shield, Code, Cpu, LucideIcon } from 'lucide-react';
import { profile } from '@/data/profile';

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Shield,
  Code,
  Cpu,
};

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-50" style={{ background: 'var(--gradient-section)' }} />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {profile.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* About Text */}
          <div className="card-elevated p-6 sm:p-8">
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {profile.about}
            </p>
            
            {/* Languages */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground"
                  >
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs text-muted-foreground">({lang.level})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="grid sm:grid-cols-2 gap-4">
            {profile.focusAreas.map((area, index) => {
              const Icon = iconMap[area.icon];
              return (
                <div
                  key={area.title}
                  className="card-elevated p-6 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon size={24} className="text-accent-foreground group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
