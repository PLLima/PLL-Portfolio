import { ArrowDown, MapPin, Linkedin, Github, Mail, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import profilePhoto from '@/assets/profile-photo.jpg';

const resumeUrls: Record<string, string> = {
  en: '/Resume_EN.pdf',
  pt: '/Resume_PT-BR.pdf',
  fr: '/Resume_FR.pdf',
};

export function HeroSection() {
  const { t, i18n } = useTranslation();
  const currentResumeUrl = resumeUrls[i18n.language] || resumeUrls.en;

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 badge-primary mb-6"
            >
              <MapPin size={14} />
              <span>{t('hero.location')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              {profile.name.split(' ')[0]}{' '}
              <span className="text-gradient">{profile.name.split(' ').slice(1).join(' ')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-display text-xl sm:text-2xl text-muted-foreground mb-4"
            >
              {t('hero.title')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              {t('hero.tagline')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-300"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              >
                <Mail size={18} />
                {t('hero.getInTouch')}
              </a>
              <a
                href={currentResumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-muted transition-colors"
              >
                <Download size={18} />
                {t('hero.downloadCV')}
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-3"
            >
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
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full border-2 border-primary/20 animate-pulse" />
              <div className="absolute -inset-8 rounded-full border border-primary/10" />
              
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src={profilePhoto}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 35%' }}
                />
              </div>

              {/* International badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border shadow-lg">
                <span className="text-lg">🇧🇷</span>
                <span className="text-sm font-medium text-muted-foreground">→</span>
                <span className="text-lg">🇫🇷</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - hidden on mobile/tablet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs font-medium">{t('hero.scrollToExplore')}</span>
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
