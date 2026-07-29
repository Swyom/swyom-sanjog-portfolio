import React, { useState, useEffect } from 'react';
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
import { CustomCursor } from './components/CustomCursor';
import { RevealOnScroll } from './components/RevealOnScroll';
import { SecurityGuard } from './components/SecurityGuard';
import { Project, Service } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);

  // Active section observer on scroll using getBoundingClientRect
  useEffect(() => {
    const sections = ['home', 'about', 'services', 'work', 'skills', 'certificates', 'blog', 'contact'];
    
    const handleScroll = () => {
      const targetPoint = window.innerHeight * 0.35; // 35% from top of viewport

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= targetPoint && rect.bottom >= targetPoint) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-[#e2e8f0] selection:bg-[#ff5e18] selection:text-white relative">
      <SecurityGuard />

      {/* Header Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Sections */}
      <main>
        <Hero
          onNavigate={scrollToSection}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <RevealOnScroll>
          <About
            onOpenModal={() => setIsAboutModalOpen(true)}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <Services
            onSelectService={(service) => setSelectedService(service)}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <Skills />
        </RevealOnScroll>

        <RevealOnScroll>
          <Projects
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </RevealOnScroll>

        <RevealOnScroll>
          <Certificates />
        </RevealOnScroll>

        <RevealOnScroll>
          <Blog />
        </RevealOnScroll>

        <RevealOnScroll>
          <Contact />
        </RevealOnScroll>
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

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
        onNavigateToContact={() => scrollToSection('contact')}
      />
    </div>
  );
}
