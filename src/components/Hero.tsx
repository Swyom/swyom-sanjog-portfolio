import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { HERO_DATA, STATS_DATA } from '../data/portfolioData';
import { ArrowRight, Github, Linkedin, Twitter, Dribbble, Mail, Smile, Code, Star, Eye, Instagram } from 'lucide-react';
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/gsap';
import { getAssetUrl } from '../utils/assets';
import { CountUp } from './CountUp';
import { Magnetic } from './Magnetic';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume?: () => void;
  /** True once the preloader has finished; the entrance animation waits for it. */
  isReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenResume, isReady = true }) => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  // Typing effect for subtitle
  useEffect(() => {
    const currentFullText = HERO_DATA.subtitles[subtitleIndex];
    const isComplete = !isDeleting && displayText === currentFullText;
    const delay = isComplete ? 2000 : isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
      } else if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
      } else if (displayText.length <= 1) {
        setDisplayText('');
        setIsDeleting(false);
        setSubtitleIndex((prev) => (prev + 1) % HERO_DATA.subtitles.length);
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, subtitleIndex]);

  // GSAP entrance timeline – held until the preloader fades out
  useLayoutEffect(() => {
    if (!heroRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const hidden = { autoAlpha: 0 };
      if (!isReady) {
        gsap.set('.hero-animate', { ...hidden, y: 30 });
        gsap.set(portalRef.current, { ...hidden, scale: 0.85 });
        gsap.set('.hero-stat', { ...hidden, y: 20 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .fromTo(
          '.hero-animate',
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1, clearProps: 'transform,opacity,visibility' }
        )
        .fromTo(
          portalRef.current,
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'elastic.out(1, 0.6)' },
          0.15
        )
        .fromTo(
          '.hero-stat',
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, clearProps: 'transform,opacity,visibility' },
          0.45
        );

      // Ambient glows drift slower than the page for a soft parallax depth
      gsap.to('.hero-glow', {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  // Avatar follows the cursor slightly on desktop
  useEffect(() => {
    const hero = heroRef.current;
    const portal = portalRef.current;
    if (!hero || !portal || !hasFinePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(portal, 'x', { duration: 0.8, ease: 'power3.out' });
    const yTo = gsap.quickTo(portal, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      xTo(((e.clientX - rect.left) / rect.width - 0.5) * 18);
      yTo(((e.clientY - rect.top) / rect.height - 0.5) * 18);
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    hero.addEventListener('pointermove', handleMove);
    hero.addEventListener('pointerleave', handleLeave);
    return () => {
      hero.removeEventListener('pointermove', handleMove);
      hero.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github': return <Github className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'twitter': return <Twitter className="w-4 h-4" />;
      case 'instagram': return <Instagram className="w-4 h-4" />;
      case 'dribbble': return <Dribbble className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const getStatIcon = (icon: string) => {
    switch (icon) {
      case 'Smile': return <Smile className="w-5 h-5 text-[#ff5e18]" />;
      case 'Code': return <Code className="w-5 h-5 text-[#ff5e18]" />;
      default: return <Star className="w-5 h-5 text-[#ff5e18]" />;
    }
  };

  return (
    <section id="home" ref={heroRef} className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-grid-pattern font-outfit">
      {/* Background ambient lighting */}
      <div className="hero-glow will-change-transform absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff5e18]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="hero-glow will-change-transform absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#ff8c00]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Bio & Text (Span 6) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tag */}
            <div className="hero-animate inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18]">
              <span className="text-gray-400">&lt;</span>
              hello, I'm
              <span className="text-gray-400">/&gt;</span>
            </div>

            {/* Name Header */}
            <h1 className="hero-animate font-techno text-[42px] xs:text-[40px] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold tracking-wider text-white leading-tight">
              <span className="whitespace-nowrap">P.SWYOM</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e18] via-[#ff7a2d] to-[#ff9800] text-orange-glow whitespace-nowrap">
                SANJOG
              </span>
            </h1>

            {/* Subtitle with dynamic cursor */}
            <div className="hero-animate flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-200 min-h-[36px] sm:min-h-[40px]">
              {/* Full role text for search engines & screen readers; the typing animation is decorative */}
              <span className="sr-only">{HERO_DATA.subtitles.join(' ')}</span>
              <span aria-hidden="true">{displayText || '\u00A0'}</span>
              <span aria-hidden="true" className="inline-block w-0.5 h-6 sm:h-7 bg-[#ff5e18] animate-pulse shrink-0" />
            </div>

            {/* Bio paragraph */}
            <p className="hero-animate text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
              {HERO_DATA.bio}
            </p>

            {/* Action Buttons */}
            <div className="hero-animate flex flex-wrap items-center gap-4 pt-1">
              <Magnetic>
                <button
                  onClick={() => onNavigate('work')}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-bold text-sm text-white bg-[#ff5e18] hover:bg-[#ff702a] transition-all duration-300 box-orange-glow hover:scale-105 cursor-pointer"
                >
                  VIEW MY WORK
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-bold text-sm text-gray-200 bg-[#12121a] border border-[#2a2a3a] hover:border-[#ff5e18] hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  RESUME
                  <Eye className="w-4 h-4 text-gray-400 group-hover:text-[#ff5e18] transition-colors" />
                </button>
              </Magnetic>
            </div>

            {/* Social Links Row */}
            <div className="hero-animate flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-3">
                {HERO_DATA.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-[#12121a] border border-[#222230] hover:border-[#ff5e18] text-gray-400 hover:text-[#ff5e18] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:box-orange-glow-sm"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {getSocialIcon(social.name)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Avatar + Sleek Stats Row Below (Span 6) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Avatar in Glowing Neon Portal Ring */}
            <div ref={portalRef} className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Outer rotating HUD dash ring */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-[#ff5e18]/40 animate-spin-slow pointer-events-none" />

              {/* Reverse inner dotted ring */}
              <div className="absolute -inset-8 rounded-full border border-dotted border-[#ff8c00]/25 animate-spin-reverse pointer-events-none" />

              {/* Glowing Portal Backdrop Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff5e18] via-[#ff8c00] to-transparent opacity-80 blur-lg animate-pulse-glow" />

              {/* Avatar Container Circle */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#ff5e18] box-orange-glow bg-[#0f0f18] p-1.5 z-10">
                <img
                  src={HERO_DATA.avatarUrl}
                  width={800}
                  height={800}
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src !== HERO_DATA.avatarFallbackUrl) img.src = HERO_DATA.avatarFallbackUrl;
                  }}
                  alt="P. Swyom Sanjog, mobile app and Python full-stack developer"
                  className="w-full h-full object-cover rounded-full filter contrast-105 brightness-95 hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Code Snippet Card (Hidden on Mobile, Visible on Tablet & Desktop) */}
              <div className="animate-float hidden sm:block absolute sm:-bottom-4 sm:-right-12 md:-right-20 lg:-right-36 xl:-right-44 z-20 bg-[#12121a]/95 border border-[#2a2a3a] hover:border-[#ff5e18] p-3.5 rounded-xl shadow-2xl backdrop-blur-md font-mono text-left sm:w-64 transition-all duration-300 hover:scale-105">
                {/* Top Bar */}
                <div className="flex items-center gap-1.5 pb-1.5 mb-1.5 border-b border-[#222232] text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-[9px] sm:text-[10px] text-gray-500 ml-auto">developer.ts</span>
                </div>

                {/* Code Block */}
                <pre className="text-gray-300 leading-relaxed font-mono whitespace-pre text-[9px] sm:text-xs">
                  <span className="text-[#ff5e18]">class</span> Developer {'{\n'}
                  {'  '}passion = <span className="text-emerald-400">'design'</span>;{'\n'}
                  {'  '}skill = <span className="text-emerald-400">'code'</span>;{'\n'}
                  {'  '}mission = <span className="text-emerald-400">'impact'</span>;{'\n'}
                  {'}'}
                </pre>

                {/* Footer Tag */}
                <div className="pt-1 text-[#ff5e18] font-bold text-right text-[10px] sm:text-xs">&lt;/&gt;</div>
              </div>
            </div>

            {/* Sleek Minimalist Stats Row Below Avatar */}
            <div className="mt-12 sm:mt-16 w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 pt-6 border-t border-[#1f1f2e]">
              {STATS_DATA.map((stat, idx) => (
                <React.Fragment key={stat.id}>
                  <div className="hero-stat flex items-center gap-3 group w-full max-w-[260px] sm:w-auto justify-start sm:justify-center p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-[#12121a]/80 sm:bg-transparent border border-[#222232]/60 sm:border-none">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#12121a] sm:bg-[#12121a] border border-[#2a2a3a] group-hover:border-[#ff5e18] flex items-center justify-center text-[#ff5e18] transition-all duration-300 group-hover:box-orange-glow-sm shrink-0">
                      {getStatIcon(stat.icon)}
                    </div>
                    <div className="text-left">
                      <div className="text-lg sm:text-2xl font-extrabold text-white tracking-tight flex items-baseline gap-0.5">
                        <CountUp value={stat.value} start={isReady} duration={1.8} />
                        <span className="text-[#ff5e18]">{stat.suffix}</span>
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-gray-400 font-semibold tracking-wide whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>

                  {idx < STATS_DATA.length - 1 && (
                    <div className="hidden sm:block w-px h-8 bg-[#222234]" />
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};