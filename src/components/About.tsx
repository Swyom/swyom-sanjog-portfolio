import React, { useEffect, useRef } from 'react';
import { ABOUT_DATA } from '../data/portfolioData';
import { Monitor, Code2, Zap, UserCheck, Terminal } from 'lucide-react';
import gsap from 'gsap';

interface AboutProps {
  onOpenModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenModal }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.gsap-about-card', {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className="w-6 h-6 text-[#ff5e18]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#ff5e18]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#ff5e18]" />;
      default:
        return <UserCheck className="w-6 h-6 text-[#ff5e18]" />;
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-[#08080c] relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#ff5e18]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Tag */}
        <div className="text-left mb-8 gsap-about-card">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18] mb-3">
            <span className="text-gray-400">&lt;</span>
            {ABOUT_DATA.tag}
            <span className="text-gray-400">/&gt;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            Solving Real Problems. <span className="text-[#ff5e18] text-orange-glow">Continuous Learning.</span>
          </h2>
        </div>

        {/* 3-Column Layout: Visual Cyber Node | Text & CTA | 2x2 Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Portrait & Status Online Box */}
          <div className="gsap-about-card lg:col-span-3 bg-[#12121a] border border-[#222232] rounded-2xl p-4 sm:p-5 relative flex flex-col justify-between overflow-hidden group hover:border-[#ff5e18]/50 transition-all duration-300 h-full min-h-[340px] hover:box-orange-glow-sm">
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#ff5e18]/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10 flex items-center justify-between pb-2.5 border-b border-[#1f1f2e]">
              <span className="text-xs font-mono text-gray-400 font-bold">DEV.POSE // SWYOM</span>
              <Terminal className="w-4 h-4 text-[#ff5e18]" />
            </div>

            {/* Image Container - Perfectly Fits imagepose.png */}
            <div className="relative z-10 my-3 w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-[#262638] bg-[#0c0c14] group-hover:border-[#ff5e18]/40 transition-colors">
              <img
                src="./assets/imagepose.png"
                alt="P. Swyom Sanjog Pose"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/swyomIMG.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent opacity-50" />
            </div>

            {/* Status Online Bar */}
            <div className="relative z-10 text-xs font-mono text-gray-300 flex items-center justify-between pt-2.5 border-t border-[#1f1f2e]">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-bold text-gray-200">STATUS: ONLINE</span>
              </div>
              <span className="text-[#ff5e18] text-[10px] font-bold">&lt;ACTIVE/&gt;</span>
            </div>
          </div>

          {/* Center Column: Text & Read More */}
          <div className="gsap-about-card lg:col-span-4 flex flex-col justify-between bg-[#12121a] border border-[#222232] hover:border-[#ff5e18]/30 rounded-2xl p-6 sm:p-8 transition-all h-full hover:box-orange-glow-sm">
            <div className="text-left my-auto space-y-4">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {ABOUT_DATA.mainBio}
              </p>
            </div>
          </div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {ABOUT_DATA.features.map((feature, idx) => (
              <div
                key={idx}
                className="gsap-about-card bg-[#12121a] border border-[#222232] hover:border-[#ff5e18]/60 p-5 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1.5 hover:box-orange-glow-sm group flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#181826] flex items-center justify-center mb-4 group-hover:bg-[#ff5e18]/15 transition-colors">
                    {getFeatureIcon(feature.icon)}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#ff5e18] transition-colors font-heading">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};