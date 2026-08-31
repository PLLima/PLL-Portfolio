import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { EducationSection } from '@/components/EducationSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { SkipToContent } from '@/components/SkipToContent';
import { BackToTop } from '@/components/BackToTop';
import { PageLoader } from '@/components/PageLoader';
import { KeyboardShortcutsProvider, KeyboardShortcutsModal } from '@/components/KeyboardShortcutsHelp';
import { useDocumentLang } from '@/hooks/useDocumentLang';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t } = useTranslation();
  // Update document lang attribute when language changes
  useDocumentLang();
  
  // Enable keyboard shortcuts for navigation
  useKeyboardNavigation();

  return (
    <KeyboardShortcutsProvider>
      <PageLoader />
      <div className="min-h-screen bg-background relative">
        {/* Print Warning Message */}
        <div 
          id="print-warning" 
          className="hidden print:flex flex-col items-center justify-center min-h-screen w-full bg-white text-black p-12 text-center fixed inset-0 z-[9999]"
        >
          <h1 className="text-3xl font-display font-bold mb-6">
            {t('print.title', 'Please Download the PDF CV')}
          </h1>
          <p className="text-xl font-body max-w-2xl leading-relaxed">
            {t('print.message', 'To print the perfectly formatted CV, please download it using the "Download CV" button on the website, or press Ctrl+P (Cmd+P on Mac) on your keyboard while viewing the site.')}
          </p>
        </div>

        <div className="print:hidden">
          <SkipToContent />
          <Header />
          <main id="main-content" tabIndex={-1}>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <EducationSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
          <BackToTop />
          <KeyboardShortcutsModal />
        </div>
      </div>
    </KeyboardShortcutsProvider>
  );
};

export default Index;
