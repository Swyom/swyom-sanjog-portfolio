import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080c] border-t border-[#1f1f2e] py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#12121a] border border-[#2a2a3a] box-orange-glow-sm">
            <span className="font-extrabold text-sm tracking-tighter text-white font-mono">
              P<span className="text-[#ff5e18]">S</span>
            </span>
          </div>
          <span className="text-xs font-mono text-gray-400">
            © {currentYear} P. Swyom Sanjog. All rights reserved.
          </span>
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-xl bg-[#12121a] border border-[#262638] hover:border-[#ff5e18] text-gray-300 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:box-orange-glow-sm shrink-0"
          aria-label="Scroll to top"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 text-[#ff5e18]" />
        </button>

      </div>
    </footer>
  );
};
