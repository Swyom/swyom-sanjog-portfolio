import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../lib/gsap';
import { Magnetic } from './Magnetic';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  /** Plays the header entrance once the preloader is gone. */
  isReady?: boolean;
}

const NAV_ITEMS = [
  { label: 'HOME', id: 'home' },
  { label: 'ABOUT', id: 'about' },
  { label: 'SERVICES', id: 'services' },
  { label: 'TECH STACK', id: 'skills' },
  { label: 'PROJECTS', id: 'work' },
  { label: 'CERTIFICATES', id: 'certificates' },
  { label: 'BLOG', id: 'blog' },
  { label: 'CONTACT', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, isReady = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const drawerRef = useRef<HTMLDivElement>(null);
  const indicatorPlacedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header entrance after the preloader
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      if (!isReady) {
        gsap.set(barRef.current, { autoAlpha: 0, y: -24 });
        return;
      }
      gsap.fromTo(
        barRef.current,
        { autoAlpha: 0, y: -24 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'all' }
      );
    });
    return () => ctx.revert();
  }, [isReady]);

  // Sliding active-section pill on desktop
  const moveIndicator = useCallback(
    (animate: boolean) => {
      const indicator = indicatorRef.current;
      const target = itemRefs.current[activeSection];
      if (!indicator) return;

      if (!target || target.offsetWidth === 0) {
        gsap.set(indicator, { autoAlpha: 0 });
        return;
      }

      const vars = {
        x: target.offsetLeft,
        y: target.offsetTop,
        width: target.offsetWidth,
        height: target.offsetHeight,
        autoAlpha: 1,
      };

      if (!animate || !indicatorPlacedRef.current || prefersReducedMotion()) {
        gsap.set(indicator, vars);
      } else {
        gsap.to(indicator, { ...vars, duration: 0.45, ease: 'power3.out', overwrite: true });
      }
      indicatorPlacedRef.current = true;
    },
    [activeSection]
  );

  useLayoutEffect(() => {
    moveIndicator(true);
  }, [moveIndicator]);

  // Re-measure when fonts load or the layout resizes
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reposition = () => moveIndicator(false);
    const observer = new ResizeObserver(reposition);
    observer.observe(nav);
    document.fonts?.ready.then(reposition).catch(() => undefined);
    return () => observer.disconnect();
  }, [moveIndicator]);

  // Mobile drawer open / close animation
  useLayoutEffect(() => {
    const drawer = drawerRef.current;
    if (!drawer) return;
    const items = drawer.querySelectorAll('[data-drawer-item]');
    const reduced = prefersReducedMotion();

    if (mobileMenuOpen) {
      gsap.killTweensOf([drawer, items]);
      gsap.set(drawer, { display: 'block' });
      if (reduced) {
        gsap.set(drawer, { height: 'auto', autoAlpha: 1 });
        gsap.set(items, { autoAlpha: 1, x: 0 });
        return;
      }
      gsap.fromTo(drawer, { height: 0, autoAlpha: 0 }, { height: 'auto', autoAlpha: 1, duration: 0.4, ease: 'power3.out' });
      gsap.fromTo(
        items,
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.035, delay: 0.08, ease: 'power2.out' }
      );
    } else {
      gsap.killTweensOf([drawer, items]);
      if (reduced || drawer.style.display !== 'block') {
        gsap.set(drawer, { display: 'none', height: 0, autoAlpha: 0 });
        return;
      }
      gsap.to(drawer, {
        height: 0,
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(drawer, { display: 'none' });
        },
      });
    }
  }, [mobileMenuOpen]);

  // Close the mobile menu on Escape, outside clicks, or when resizing up to desktop
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const handleBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    desktopQuery.addEventListener('change', handleBreakpoint);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      desktopQuery.removeEventListener('change', handleBreakpoint);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#08080c]/90 backdrop-blur-md border-b border-[#1f1f2e] py-3.5 shadow-2xl shadow-black/50'
          : 'bg-transparent py-6'
        }`}
    >
      <div ref={barRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
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
        <nav
          ref={navRef}
          aria-label="Primary"
          className="relative hidden md:flex items-center space-x-1 lg:space-x-2 bg-[#12121a]/90 border border-[#222232] rounded-full px-3 py-1.5 backdrop-blur-lg"
        >
          {/* Sliding active pill */}
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute top-0 left-0 rounded-full bg-[#ff5e18] box-orange-glow-sm pointer-events-none"
            style={{ opacity: 0, visibility: 'hidden', margin: 0 }}
          />
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                onClick={() => handleLinkClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`relative z-10 whitespace-nowrap text-xs font-mono font-bold tracking-wider transition-colors duration-200 cursor-pointer py-1.5 px-2.5 lg:px-3 rounded-full ${isActive
                    ? 'text-white'
                    : 'text-gray-300 hover:text-[#ff5e18] hover:bg-[#ff5e18]/15'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button (from lg up; tablets reach Contact via the nav) */}
        <div className="hidden lg:flex items-center gap-3">
          <Magnetic>
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
          </Magnetic>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="p-2 rounded-lg bg-[#12121a] border border-[#2a2a3a] text-gray-300 hover:text-white hover:border-[#ff5e18] transition-all"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#ff5e18]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu"
        ref={drawerRef}
        className="md:hidden overflow-hidden"
        style={{ display: 'none' }}
        aria-hidden={!mobileMenuOpen}
        inert={!mobileMenuOpen}
      >
        <div className="bg-[#0a0a0f]/95 border-b border-[#222232] backdrop-blur-xl px-4 pt-4 pb-6 mt-2 space-y-2.5 shadow-2xl max-h-[calc(100dvh-5rem)] overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                data-drawer-item
                onClick={() => handleLinkClick(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={`w-full text-left py-2.5 px-4 rounded-xl text-xs font-mono font-bold tracking-wider flex items-center justify-between transition-colors ${isActive
                    ? 'bg-[#ff5e18] text-white font-bold box-orange-glow-sm'
                    : 'text-gray-300 hover:bg-[#ff5e18]/15 hover:text-[#ff5e18]'
                  }`}
              >
                <span>{item.label}</span>
                {isActive && <Sparkles className="w-4 h-4 text-white" />}
              </button>
            );
          })}
          <div data-drawer-item className="pt-2 border-t border-[#1f1f2e]">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-mono font-bold tracking-wider text-white bg-[#ff5e18] hover:bg-[#ff702a] shadow-lg shadow-[#ff5e18]/25 transition-all cursor-pointer"
            >
              LET'S TALK
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
