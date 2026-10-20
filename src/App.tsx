import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { ServiceModal } from './components/ServiceModal';
import { SecurityGuard } from './components/SecurityGuard';
import { Preloader } from './components/Preloader';
import { ScrollProgress } from './components/ScrollProgress';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollTrigger } from './lib/gsap';
import { SMOOTH_CONTENT_ID, SMOOTH_WRAPPER_ID, scrollToTarget } from './lib/smoothScroll';
import { Project, Service } from './types';

const SECTION_IDS = ['home', 'about', 'services', 'skills', 'work', 'certificates', 'blog', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isPageReady, setIsPageReady] = useState<boolean>(false);

  // Active section tracking. ScrollTriggers follow the smoothed scroll position,
  // so the highlighted nav item stays in sync while the page glides.
  useLayoutEffect(() => {
    const triggers = SECTION_IDS.map((sectionId, index) => {
      const isLast = index === SECTION_IDS.length - 1;
      return ScrollTrigger.create({
        trigger: `#${sectionId}`,
        // The last section can be shorter than the viewport, so activate it earlier
        start: isLast ? 'top 60%' : 'top 35%',
        end: 'bottom 35%',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(sectionId);
        },
      });
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Late-loading images and fonts shift layout; keep scroll-trigger positions accurate.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh).catch(() => undefined);
    return () => window.removeEventListener('load', refresh);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsPageReady(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    scrollToTarget(sectionId === 'home' ? 'top' : element);
  }, []);

  return (
    <div className="min-h-screen bg-[#08080c] text-[#e2e8f0] selection:bg-[#ff5e18] selection:text-white relative">
      {/* Must come first: creates the smoother before any section registers ScrollTriggers */}
      <SmoothScroll />
      <Preloader onComplete={handlePreloaderComplete} />
      <SecurityGuard />
      <ScrollProgress />

      {/* Header Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} isReady={isPageReady} />

      {/* Smooth-scrolled page content (fixed UI stays outside this wrapper) */}
      <div id={SMOOTH_WRAPPER_ID}>
        <div id={SMOOTH_CONTENT_ID}>
          {/* Main Sections */}
          <main>
            <Hero
              onNavigate={scrollToSection}
              onOpenResume={() => setIsResumeOpen(true)}
              isReady={isPageReady}
            />

            <About />

            <Services onSelectService={(service) => setSelectedService(service)} />

            <Skills />

            <Projects onSelectProject={(project) => setSelectedProject(project)} />

            <Certificates />

            <Blog />

            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        // Wait a tick so the modal's scroll lock is released before scrolling.
        onNavigateToContact={() => window.setTimeout(() => scrollToSection('contact'), 60)}
      />
    </div>
  );
}
