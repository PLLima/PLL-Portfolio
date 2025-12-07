import { GraduationCap, Globe } from 'lucide-react';
import { profile } from '@/data/profile';

export function EducationSection() {
  return (
    <section id="education" className="section-padding bg-card">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Education & <span className="text-gradient">International Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A global educational journey spanning multiple countries and disciplines
          </p>
        </div>

        {/* International highlight */}
        <div className="card-elevated p-6 sm:p-8 mb-12 max-w-3xl mx-auto border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Globe size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                Double Degree Program
              </h3>
              <p className="text-muted-foreground">
                Currently pursuing a prestigious Double Degree between <strong>CentraleSupélec</strong> (France) 
                and <strong>UFRGS</strong> (Brazil), combining the best of European and South American 
                engineering education with a global perspective on technology and innovation.
              </p>
            </div>
          </div>
        </div>

        {/* Education Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {profile.education.map((edu, index) => (
            <div
              key={index}
              className="card-elevated p-6 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary transition-colors">
                  <GraduationCap size={20} className="text-secondary-foreground group-hover:text-primary-foreground" />
                </div>
                <span className="text-2xl" title={edu.country}>{edu.flag}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
