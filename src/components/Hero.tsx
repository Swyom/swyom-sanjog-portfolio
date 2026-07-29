import React, { useEffect, useState, useRef } from 'react';
import { HERO_DATA, STATS_DATA } from '../data/portfolioData';
import { ArrowRight, Download, Github, Linkedin, Twitter, Dribbble, Mail, Smile, Code, Star, Eye, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { getAssetUrl } from '../utils/assets';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenResume }) => {
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Unique visitor counter logic (Counts 1 person 1 time starting strictly from 0)
  useEffect(() => {
    const hasVisited = localStorage.getItem('swyom_portfolio_visited');

    if (!hasVisited) {
      // First time unique visitor: increment global count from 0
      fetch('https://api.counterapi.dev/v1/swyom-sanjog-unique-v1/visits/up')
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.count === 'number') {
            setVisitorCount(data.count);
            localStorage.setItem('swyom_portfolio_visited', 'true');
          } else {
            setVisitorCount(1);
          }
        })
        .catch(() => {
          setVisitorCount(1);
          localStorage.setItem('swyom_portfolio_visited', 'true');
        });
    } else {
      // Returning visitor: read count without incrementing
      fetch('https://api.counterapi.dev/v1/swyom-sanjog-unique-v1/visits')
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data.count === 'number') {
            setVisitorCount(data.count);
          } else {
            setVisitorCount(1);
          }
        })
        .catch(() => {
          setVisitorCount(1);
        });
    }
  }, []);

  // Typing effect for subtitle
  useEffect(() => {
    const currentFullText = HERO_DATA.subtitles[subtitleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setSubtitleIndex((prev) => (prev + 1) % HERO_DATA.subtitles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, subtitleIndex]);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all',
      });

      gsap.from(avatarRef.current, {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'elastic.out(1, 0.6)',
        clearProps: 'all',
      });
    }, heroRef);

    return () => ctx.revert();
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
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff5e18]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#ff8c00]/10 blur-[100px] rounded-full pointer-events-none" />

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
              <span>{displayText || '\u00A0'}</span>
              <span className="inline-block w-0.5 h-6 sm:h-7 bg-[#ff5e18] animate-pulse shrink-0" />
            </div>

            {/* Bio paragraph */}
            <p className="hero-animate text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
              {HERO_DATA.bio}
            </p>

            {/* Action Buttons */}
            <div className="hero-animate flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => onNavigate('work')}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-bold text-sm text-white bg-[#ff5e18] hover:bg-[#ff702a] transition-all duration-300 box-orange-glow hover:scale-105 cursor-pointer"
              >
                VIEW MY WORK
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href={getAssetUrl('assets/Swyom Resume.pdf')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg font-bold text-sm text-gray-200 bg-[#12121a] border border-[#2a2a3a] hover:border-[#ff5e18] hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                RESUME
                <Eye className="w-4 h-4 text-gray-400 group-hover:text-[#ff5e18] transition-colors" />
              </a>
            </div>

            {/* Social Links Row & Unique Visitor Counter */}
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

              {/* Unique Profile Visitor Badge */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#12121a] border border-[#262638] hover:border-[#ff5e18]/60 text-xs font-mono font-bold text-gray-300 transition-all shadow-lg hover:box-orange-glow-sm ml-0 sm:ml-2"
                title="Unique Profile Visitors"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#ff5e18]" />
                  <span className="absolute w-3.5 h-3.5 rounded-full bg-[#ff5e18] animate-ping opacity-75" />
                </div>
                <Eye className="w-3.5 h-3.5 text-[#ff5e18]" />
                <span>
                  {visitorCount !== null ? (
                    <>
                      <strong className="text-white font-extrabold">{visitorCount.toLocaleString()}</strong> <span className="text-gray-400 font-normal">Visitors</span>
                    </>
                  ) : (
                    <span className="text-gray-500 animate-pulse">Loading...</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Avatar + Sleek Stats Row Below (Span 6) */}
          <div ref={avatarRef} className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Avatar in Glowing Neon Portal Ring */}
            <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = HERO_DATA.avatarFallbackUrl;
                  }}
                  alt="P. Swyom Sanjog Developer Portrait"
                  className="w-full h-full object-cover rounded-full filter contrast-105 brightness-95 hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Code Snippet Card (Hidden on Mobile, Visible on Tablet & Desktop) */}
              <div className="hidden sm:block absolute sm:-bottom-4 sm:-right-12 md:-right-20 lg:-right-36 xl:-right-44 z-20 bg-[#12121a]/95 border border-[#2a2a3a] hover:border-[#ff5e18] p-3.5 rounded-xl shadow-2xl backdrop-blur-md font-mono text-left sm:w-64 transition-all duration-300 hover:scale-105">
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
                  <div className="flex items-center gap-3 group w-full max-w-[260px] sm:w-auto justify-start sm:justify-center p-2.5 sm:p-0 rounded-xl sm:rounded-none bg-[#12121a]/80 sm:bg-transparent border border-[#222232]/60 sm:border-none">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#12121a] sm:bg-[#12121a] border border-[#2a2a3a] group-hover:border-[#ff5e18] flex items-center justify-center text-[#ff5e18] transition-all duration-300 group-hover:box-orange-glow-sm shrink-0">
                      {getStatIcon(stat.icon)}
                    </div>
                    <div className="text-left">
                      <div className="text-lg sm:text-2xl font-extrabold text-white tracking-tight flex items-baseline gap-0.5">
                        <span>{stat.value}</span>
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