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

const Index = () => {
  // Update document lang attribute when language changes
  useDocumentLang();
  
  // Enable keyboard shortcuts for navigation
  useKeyboardNavigation();

  return (
    <KeyboardShortcutsProvider>
      <PageLoader />
      <div className="min-h-screen bg-background">
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
    </KeyboardShortcutsProvider>
  );
};

export default Index;
