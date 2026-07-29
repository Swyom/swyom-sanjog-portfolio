import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project } from '../types';
import { ArrowUpRight, ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import gsap from 'gsap';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.gsap-project-card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory]);

  const categories = ['All', 'Mobile Apps', 'Web Apps'];

  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="work" ref={sectionRef} className="py-20 bg-[#08080c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 gsap-project-card">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18] mb-3">
              <span className="text-gray-400">&lt;</span>
              FEATURED PROJECTS
              <span className="text-gray-400">/&gt;</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
              Selected <span className="text-[#ff5e18] text-orange-glow">Work</span>
            </h2>
          </div>

          {/* Category Filter Tabs & View All Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#ff5e18] text-white box-orange-glow-sm'
                      : 'bg-[#12121a] text-gray-400 border border-[#222232] hover:text-white hover:border-[#ff5e18]/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <a
              href="https://github.com/Swyom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff5e18] hover:text-white transition-colors shrink-0"
            >
              <span>ALL GITHUB PROJECTS</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="gsap-project-card group relative bg-[#12121a] border border-[#222232] hover:border-[#ff5e18]/60 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-2 hover:box-orange-glow-sm flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Top Bar Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5e18] to-[#ff9800] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Project Thumbnail Image */}
                <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-5 border border-[#262638] bg-[#0c0c14]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/20 to-transparent" />
                  
                  {/* Category Pill Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#08080c]/90 border border-[#ff5e18]/40 backdrop-blur-md text-xs font-mono font-bold text-[#ff5e18]">
                    {project.category}
                  </div>

                  {/* View Overlay Button */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono font-bold text-xs">
                    <Eye className="w-4 h-4 text-[#ff5e18]" />
                    <span>VIEW DETAILS</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-white tracking-tight group-hover:text-[#ff5e18] transition-colors font-heading mb-2 line-clamp-1">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#181826] text-gray-300 border border-[#262638]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-3 border-t border-[#1f1f2e] text-xs font-mono">
                  <span className="text-[#ff5e18] font-bold group-hover:text-white transition-colors flex items-center gap-1">
                    EXPLORE PROJECT
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
