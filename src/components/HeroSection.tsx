import { ArrowDown, MapPin, Linkedin, Github, Mail } from 'lucide-react';
import { profile } from '@/data/profile';
import profilePhoto from '@/assets/profile-photo.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'var(--gradient-hero)' }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="section-container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 badge-primary mb-6 animate-fade-up">
              <MapPin size={14} />
              <span>Based in France • From Brazil</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-up animation-delay-100">
              {profile.name.split(' ')[0]}{' '}
              <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="font-display text-xl sm:text-2xl text-muted-foreground mb-4 animate-fade-up animation-delay-200">
              {profile.title}
            </p>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up animation-delay-300">
              {profile.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-up animation-delay-400">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              >
                <Mail size={18} />
                Get in Touch
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-muted transition-colors"
              >
                View Experience
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3 animate-fade-up animation-delay-400">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-button"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="icon-button"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-scale-in">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-primary/10" />
              
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src={profilePhoto}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* International badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-lg">
                <span className="text-lg">🇧🇷</span>
                <span className="text-sm font-medium text-muted-foreground">→</span>
                <span className="text-lg">🇫🇷</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs font-medium">Scroll to explore</span>
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
