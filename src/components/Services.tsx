import React, { useEffect, useRef } from 'react';
import { SERVICES_DATA } from '../data/portfolioData';
import { Service } from '../types';
import { Palette, Globe, Smartphone, Wrench, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface ServicesProps {
  onSelectService: (service: Service) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.gsap-service-card', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getServiceIcon = (service: Service) => {
    const icon = service.iconName || service.icon || service.id;
    switch (icon?.toLowerCase()) {
      case 'palette':
      case 'ui-ux-design':
        return <Palette className="w-8 h-8 text-[#ff5e18]" />;
      case 'globe':
      case 'web-dev':
        return <Globe className="w-8 h-8 text-[#ff5e18]" />;
      case 'smartphone':
      case 'mobile-dev':
        return <Smartphone className="w-8 h-8 text-[#ff5e18]" />;
      case 'wrench':
      case 'redesign-debug':
        return <Wrench className="w-8 h-8 text-[#ff5e18]" />;
      default:
        return <Palette className="w-8 h-8 text-[#ff5e18]" />;
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-[#08080c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-12 gsap-service-card">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18] mb-3">
            <span className="text-gray-400">&lt;</span>
            SERVICES
            <span className="text-gray-400">/&gt;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
            What I Can Do <span className="text-[#ff5e18] text-orange-glow">For You</span>
          </h2>
        </div>

        {/* 4 Cards Row/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="gsap-service-card group relative bg-[#12121a] border border-[#222232] hover:border-[#ff5e18]/60 rounded-2xl p-6 sm:p-7 text-left transition-all duration-300 hover:-translate-y-2 hover:box-orange-glow flex flex-col justify-between cursor-pointer"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5e18] to-[#ff9800] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#181826] border border-[#2a2a3a] group-hover:border-[#ff5e18]/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:box-orange-glow-sm">
                  {getServiceIcon(service)}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff5e18] transition-colors font-heading">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#ff5e18] group-hover:text-white transition-colors">
                <span>READ MORE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
