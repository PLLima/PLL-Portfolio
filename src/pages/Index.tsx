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
import { useDocumentLang } from '@/hooks/useDocumentLang';

const Index = () => {
  // Update document lang attribute when language changes
  useDocumentLang();

  return (
    <>
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
      </div>
    </>
  );
};

export default Index;
