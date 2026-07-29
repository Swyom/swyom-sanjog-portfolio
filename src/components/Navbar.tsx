import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'PROJECTS', id: 'work' },
    { label: 'TECH STACK', id: 'skills' },
    { label: 'CERTIFICATES', id: 'certificates' },
    { label: 'BLOG', id: 'blog' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#08080c]/90 backdrop-blur-md border-b border-[#1f1f2e] py-3.5 shadow-2xl shadow-black/50'
          : 'bg-transparent py-6'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo PS */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          aria-label="P. Swyom Sanjog Logo"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#12121a] border border-[#2a2a3a] group-hover:border-[#ff5e18] transition-colors duration-300 overflow-hidden shadow-md">
            <span className="font-extrabold text-xl tracking-tighter text-white font-mono">
              P<span className="text-[#ff5e18]">S</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff5e18]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="sr-only">P. Swyom Sanjog Portfolio</span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#12121a]/90 border border-[#222232] rounded-full px-3 py-1.5 backdrop-blur-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer py-1.5 px-3 rounded-full ${isActive
                    ? 'text-white bg-[#ff5e18] box-orange-glow-sm'
                    : 'text-gray-300 hover:text-[#ff5e18] hover:bg-[#ff5e18]/15'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('contact')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider text-white border border-[#2a2a3c] hover:border-[#ff5e18] bg-[#12121a] hover:bg-[#ff5e18] transition-all duration-300 shadow-lg cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              LET'S TALK
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e18] to-[#ff8c00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#12121a] border border-[#2a2a3a] text-gray-300 hover:text-white hover:border-[#ff5e18] transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#ff5e18]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 border-b border-[#222232] backdrop-blur-xl px-4 pt-4 pb-6 mt-2 space-y-2.5 animate-in slide-in-from-top duration-300 shadow-2xl">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center justify-between transition-all ${isActive
                    ? 'bg-[#ff5e18] text-white font-bold box-orange-glow-sm'
                    : 'text-gray-300 hover:bg-[#ff5e18]/15 hover:text-[#ff5e18]'
                  }`}
              >
                <span>{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 text-white" />}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#1f1f2e]">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold tracking-wider text-white bg-[#ff5e18] hover:bg-[#ff702a] shadow-lg shadow-[#ff5e18]/25 transition-all cursor-pointer"
            >
              LET'S TALK
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
