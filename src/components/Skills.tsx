import React, { useState, useEffect, useRef } from 'react';
import { TECH_STACK } from '../data/portfolioData';
import { TechSkill } from '../types';
import { Code, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

const BRAND_ICON_URLS: Record<string, string> = {
  html5: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  css3: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  javascript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  tailwindcss: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  reactnative: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  expo: 'https://www.vectorlogo.zone/logos/expoio/expoio-icon.svg',
  nodejs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  express: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  mongodb: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  firebase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  fastapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  django: 'https://www.vectorlogo.zone/logos/djangoproject/djangoproject-icon.svg',
  git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  vscode: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
  figma: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<TechSkill | null>(TECH_STACK[3]); // Default React
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.gsap-skill-card', {
        scale: 0.9,
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.4)',
        clearProps: 'all'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory]);

  const categories = ['All', 'Frontend', 'Mobile', 'Backend', 'Database', 'BaaS', 'Tools', 'Design'];

  const filteredSkills = activeCategory === 'All'
    ? TECH_STACK
    : TECH_STACK.filter(s => s.category.toLowerCase() === activeCategory.toLowerCase());

  const getCustomBrandIcon = (iconName: string, color: string) => {
    const key = iconName.toLowerCase();
    const url = BRAND_ICON_URLS[key];
    const isSpinning = key === 'react' || key === 'reactnative';
    const isDarkLogo = key === 'express' || key === 'nextjs';

    if (url) {
      return (
        <img
          src={url}
          alt={iconName}
          className={`w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-125 ${
            isSpinning ? 'animate-spin-slow' : 'group-hover:rotate-6'
          } ${isDarkLogo ? 'filter invert brightness-200 contrast-125' : ''}`}
        />
      );
    }

    return <Code className="w-6 h-6" style={{ color }} />;
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-[#08080c] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#ff5e18]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-10 gsap-skill-card">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18] mb-3">
            <span className="text-gray-400">&lt;</span>
            TECHNOLOGY STACK
            <span className="text-gray-400">/&gt;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Technologies <span className="text-[#ff5e18] text-orange-glow">I Use</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
            Full spectrum of languages, frameworks, and modern tools I leverage to build scalable mobile and web applications.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none gsap-skill-card">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#ff5e18] text-white box-orange-glow-sm scale-105'
                  : 'bg-[#12121a] text-gray-400 border border-[#222232] hover:text-white hover:border-[#ff5e18]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive 18 Skills Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-5">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill?.name === skill.name;

            return (
              <button
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`gsap-skill-card group relative bg-[#12121a] border rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-[#ff5e18] bg-[#161624] box-orange-glow-sm'
                    : 'border-[#222232] hover:border-[#ff5e18]/60 hover:bg-[#151522]'
                }`}
              >
                {/* Glowing top accent border */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: skill.color }}
                />

                {/* Filled Official Color Brand Icon Wrapper */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 bg-[#181824] border border-[#262638] group-hover:border-white/20 transition-colors">
                  {getCustomBrandIcon(skill.icon, skill.color)}
                </div>

                {/* Name */}
                <span className="text-xs font-bold text-gray-200 truncate w-full text-center tracking-tight font-heading">
                  {skill.name}
                </span>

                {/* Category Tag */}
                <span className="text-[9px] font-mono text-gray-500 mt-1 uppercase tracking-wider">
                  {skill.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
