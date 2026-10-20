import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import { Certificate } from '../types';
import { Award, ExternalLink, X, Eye, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap, ScrollTrigger, hasFinePointer, prefersReducedMotion } from '../lib/gsap';
import { useReveal } from '../hooks/useReveal';
import { useModal } from '../hooks/useModal';
import { Portal } from './Portal';

const TOTAL = CERTIFICATES_DATA.length;
const AUTOPLAY_SECONDS = 4.5;
const VISIBLE_SIDE_CARDS = 2;
const SWIPE_THRESHOLD = 45;
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80';

/** Shortest signed distance from the active slide, so the carousel loops seamlessly. */
const getOffset = (index: number, active: number) => {
  let offset = index - active;
  if (offset > TOTAL / 2) offset -= TOTAL;
  if (offset < -TOTAL / 2) offset += TOTAL;
  return offset;
};

/** Coverflow pose for a card `offset` slots away from the centre. */
const getPose = (offset: number, spacing: number) => {
  const distance = Math.abs(offset);
  const hidden = distance > VISIBLE_SIDE_CARDS;
  return {
    x: offset * spacing,
    z: -distance * 170,
    rotateY: Math.max(-2, Math.min(2, offset)) * -22,
    scale: 1 - Math.min(distance, 3) * 0.1,
    autoAlpha: hidden ? 0 : 1,
    zIndex: 100 - distance,
    shade: Math.min(distance * 0.32, 0.7),
  };
};

const pad = (n: number) => String(n).padStart(2, '0');

export const Certificates: React.FC = () => {
  const [selectedCertModal, setSelectedCertModal] = useState<Certificate | null>(null);
  const [active, setActive] = useState(0);
  const [hasEntered, setHasEntered] = useState(() => prefersReducedMotion());
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [spacing, setSpacing] = useState(240);

  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  const firstLayoutRef = useRef(true);
  const dragRef = useRef({ startX: 0, isDown: false, moved: false });

  // Close modal on ESC key press and lock page scroll while it is open
  useModal(selectedCertModal !== null, () => setSelectedCertModal(null));

  useReveal(sectionRef, '[data-reveal]', { stagger: 0.12 });

  const go = useCallback((direction: number) => {
    setActive((current) => (current + direction + TOTAL) % TOTAL);
  }, []);

  // Card spacing adapts to the card and stage width (phones show a peek of the neighbours)
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const cardWidth = cardRefs.current[0]?.offsetWidth ?? 340;
      const narrow = stage.clientWidth < 640;
      setSpacing(Math.round(cardWidth * (narrow ? 0.56 : 0.68)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Fly-in when the carousel scrolls into view; autoplay only runs while it is on screen
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const triggers = [
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 82%',
        once: true,
        onEnter: () => setHasEntered(true),
      }),
      ScrollTrigger.create({
        trigger: stage,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => setIsInView(self.isActive),
      }),
    ];
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // Position every card for the current slide
  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const isFirstReveal = firstLayoutRef.current && hasEntered;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const offset = getOffset(index, active);
      const { shade, zIndex, ...pose } = getPose(offset, spacing);
      const shadeEl = card.querySelector('[data-shade]');

      gsap.set(card, { zIndex, pointerEvents: pose.autoAlpha ? 'auto' : 'none' });

      if (!hasEntered) {
        // Waiting off-stage: stacked in the centre, deep and transparent
        gsap.set(card, { x: 0, z: -600, rotateY: 0, scale: 0.7, autoAlpha: 0 });
        return;
      }

      if (reduced) {
        gsap.set(card, pose);
        gsap.set(shadeEl, { opacity: shade });
        return;
      }

      const delay = isFirstReveal ? 0.1 + Math.abs(offset) * 0.12 : 0;
      const duration = isFirstReveal ? 1.4 : 0.9;
      gsap.to(card, { ...pose, duration, delay, ease: 'expo.out', overwrite: 'auto' });
      gsap.to(shadeEl, { opacity: shade, duration: 0.6, delay, ease: 'power2.out', overwrite: 'auto' });
    });

    if (hasEntered) firstLayoutRef.current = false;
  }, [active, spacing, hasEntered]);

  // Light sweep across the card that just took centre stage
  useEffect(() => {
    if (!hasEntered || prefersReducedMotion()) return;
    const shine = cardRefs.current[active]?.querySelector('[data-shine]');
    if (!shine) return;
    const tween = gsap.fromTo(
      shine,
      { xPercent: -160, autoAlpha: 1 },
      { xPercent: 160, duration: 1.2, delay: 0.25, ease: 'power2.inOut', onComplete: () => gsap.set(shine, { autoAlpha: 0 }) }
    );
    return () => {
      tween.kill();
    };
  }, [active, hasEntered]);

  // Autoplay with a progress bar; restarts on every slide change
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar || !hasEntered || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      { scaleX: 1, duration: AUTOPLAY_SECONDS, ease: 'none', paused: true, onComplete: () => go(1) }
    );
    autoplayRef.current = tween;
    return () => {
      tween.kill();
      autoplayRef.current = null;
    };
  }, [active, hasEntered, go]);

  // Pause while hovered, off screen, or while the lightbox is open
  const shouldPause = isHovering || !isInView || selectedCertModal !== null;
  useEffect(() => {
    autoplayRef.current?.paused(shouldPause);
  }, [shouldPause, active, hasEntered]);

  // Subtle 3D tilt of the centred card toward the cursor (desktop only)
  useEffect(() => {
    const card = cardRefs.current[active];
    const inner = card?.querySelector<HTMLElement>('[data-tilt]');
    if (!card || !inner || !hasFinePointer() || prefersReducedMotion()) return;

    gsap.set(inner, { transformPerspective: 900 });
    const rotX = gsap.quickTo(inner, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const rotY = gsap.quickTo(inner, 'rotationY', { duration: 0.6, ease: 'power3.out' });

    const handleMove = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      rotY(((e.clientX - rect.left) / rect.width - 0.5) * 10);
      rotX(((e.clientY - rect.top) / rect.height - 0.5) * -8);
    };
    const handleLeave = () => {
      rotX(0);
      rotY(0);
    };

    card.addEventListener('pointermove', handleMove);
    card.addEventListener('pointerleave', handleLeave);
    return () => {
      card.removeEventListener('pointermove', handleMove);
      card.removeEventListener('pointerleave', handleLeave);
      gsap.to(inner, { rotationX: 0, rotationY: 0, duration: 0.4, ease: 'power2.out' });
    };
  }, [active]);

  // Drag / swipe navigation with a little rubber-band feedback
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragRef.current = { startX: e.clientX, isDown: true, moved: false };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.isDown) return;
    const dx = e.clientX - drag.startX;
    if (Math.abs(dx) > 6) drag.moved = true;
    if (drag.moved) gsap.set(trackRef.current, { x: dx * 0.25 });
  };

  const endDrag = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag.isDown) return;
    drag.isDown = false;
    const dx = e.clientX - drag.startX;
    gsap.to(trackRef.current, { x: 0, duration: 0.6, ease: 'expo.out' });
    if (drag.moved && Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  // Swallow the click that ends a drag so it doesn't open/select a card
  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      dragRef.current.moved = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      setSelectedCertModal(CERTIFICATES_DATA[active]);
    }
  };

  const handleCardClick = (index: number) => {
    if (index === active) setSelectedCertModal(CERTIFICATES_DATA[index]);
    else setActive(index);
  };

  const activeCert = CERTIFICATES_DATA[active];

  return (
    <section id="certificates" ref={sectionRef} className="py-20 bg-[#08080c] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#ff5e18]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[320px] bg-[#ff5e18]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Carousel Controls */}
        <div data-reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18] mb-3">
              <span className="text-gray-400">&lt;</span>
              CERTIFICATES & CREDENTIALS
              <span className="text-gray-400">/&gt;</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
              <span className="text-[#ff5e18] text-orange-glow">Certifications</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Click and drag sideways or use the arrow buttons to explore all verified certifications. Click any card to view in high resolution.
            </p>
          </div>

          {/* Previous / Next Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-xl bg-[#12121a] border border-[#262638] hover:border-[#ff5e18] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:box-orange-glow-sm hover:-translate-x-0.5 cursor-pointer"
              aria-label="Previous certificate"
              title="Previous Certificate"
            >
              <ChevronLeft className="w-5 h-5 text-[#ff5e18]" />
            </button>
            <button
              onClick={() => go(1)}
              className="w-11 h-11 rounded-xl bg-[#12121a] border border-[#262638] hover:border-[#ff5e18] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:box-orange-glow-sm hover:translate-x-0.5 cursor-pointer"
              aria-label="Next certificate"
              title="Next Certificate"
            >
              <ChevronRight className="w-5 h-5 text-[#ff5e18]" />
            </button>
          </div>
        </div>

        {/* 3D Coverflow Stage */}
        <div
          ref={stageRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Certificates"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={(e) => {
            setIsHovering(false);
            endDrag(e);
          }}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') setIsHovering(true);
          }}
          onClickCapture={handleClickCapture}
          className="relative py-6 select-none cursor-grab active:cursor-grabbing touch-pan-y rounded-2xl focus-visible:outline-offset-4"
        >
          <div ref={trackRef} className="grid place-items-center" style={{ perspective: '1400px' }}>
            {CERTIFICATES_DATA.map((cert, index) => {
              const isActive = index === active;
              const offset = getOffset(index, active);
              const isHidden = Math.abs(offset) > VISIBLE_SIDE_CARDS;
              return (
                <div
                  key={cert.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${TOTAL}: ${cert.title}`}
                  aria-hidden={isHidden}
                  onClick={() => handleCardClick(index)}
                  className="[grid-area:1/1] w-[290px] xs:w-[330px] sm:w-[370px] will-change-transform cursor-pointer"
                  style={{ opacity: 0, visibility: 'hidden' }}
                >
                  <div
                    data-tilt
                    className={`group relative bg-[#12121a] border rounded-2xl p-5 text-left flex flex-col justify-between overflow-hidden transition-[border-color,box-shadow] duration-500 ${
                      isActive
                        ? 'border-[#ff5e18]/70 box-orange-glow'
                        : 'border-[#222232] hover:border-[#ff5e18]/40'
                    }`}
                  >
                    {/* Top Accent Gradient Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5e18] to-[#ff9800] rounded-t-2xl transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`} />

                    <div>
                      {/* Certificate Image Banner */}
                      {cert.image && (
                        <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-5 border border-[#262638] bg-[#0c0c14] group-hover:border-[#ff5e18]/50 transition-colors group/img">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 filter brightness-90 contrast-105 pointer-events-none"
                            onError={(e) => {
                              const img = e.currentTarget;
                              if (img.src !== FALLBACK_IMAGE) img.src = FALLBACK_IMAGE;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/20 to-transparent" />

                          {/* Hover overlay hint (centre card only) */}
                          {isActive && (
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono font-bold text-xs">
                              <Eye className="w-4 h-4 text-[#ff5e18]" />
                              <span>CLICK TO VIEW</span>
                            </div>
                          )}

                          {/* Issuer badge overlay on image */}
                          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#08080c]/90 border border-[#ff5e18]/40 flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff5e18]">
                            <Award className="w-3.5 h-3.5" />
                            <span>{cert.issuer}</span>
                          </div>
                        </div>
                      )}

                      {/* Header Info: Title & Issue Date */}
                      <div className="mb-5">
                        <h3 className={`text-lg font-extrabold tracking-tight transition-colors font-heading mb-1 line-clamp-1 ${isActive ? 'text-white group-hover:text-[#ff5e18]' : 'text-gray-300'}`}>
                          {cert.title}
                        </h3>
                        <div className="text-xs font-mono text-gray-400">
                          <span>Date Received: <strong className="text-gray-200">{cert.issueDate}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom View Certificate Modal Button */}
                    <button
                      tabIndex={isActive ? 0 : -1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(index);
                      }}
                      className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#161622] hover:bg-[#ff5e18] border border-[#262638] hover:border-[#ff5e18] text-xs font-mono font-bold text-gray-200 hover:text-white transition-all duration-300 group/btn cursor-pointer"
                    >
                      <span>VIEW CERTIFICATE</span>
                      <Maximize2 className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
                    </button>

                    {/* Depth shade for side cards */}
                    <div data-shade className="absolute inset-0 bg-[#08080c] pointer-events-none rounded-2xl" style={{ opacity: 0 }} />

                    {/* Light sweep played when the card becomes active */}
                    <div
                      data-shine
                      aria-hidden="true"
                      className="absolute inset-y-0 -inset-x-1/2 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-18deg]"
                      style={{ opacity: 0, visibility: 'hidden' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Footer: counter, dots and autoplay progress */}
        <div data-reveal className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-baseline gap-3 font-mono text-left min-w-0">
            <span className="text-2xl font-extrabold text-white tabular-nums">
              {pad(active + 1)}
              <span className="text-gray-500 text-sm font-bold"> / {pad(TOTAL)}</span>
            </span>
            <span className="text-xs font-bold text-[#ff5e18] truncate max-w-[220px] sm:max-w-[320px]" aria-live="polite">
              {activeCert.issuer}
            </span>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3">
            <div className="flex items-center gap-2">
              {CERTIFICATES_DATA.map((cert, index) => (
                <button
                  key={cert.id}
                  onClick={() => setActive(index)}
                  aria-label={`Show certificate ${index + 1}: ${cert.title}`}
                  aria-current={index === active ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    index === active
                      ? 'w-7 bg-[#ff5e18] box-orange-glow-sm'
                      : 'w-2 bg-[#2a2a3c] hover:bg-[#ff5e18]/50'
                  }`}
                />
              ))}
            </div>
            <div className="w-40 h-[3px] rounded-full bg-[#1a1a28] overflow-hidden" aria-hidden="true">
              <div ref={progressRef} className="h-full origin-left bg-gradient-to-r from-[#ff5e18] to-[#ff9800]" style={{ transform: 'scaleX(0)' }} />
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Certificate Lightbox Modal */}
      {selectedCertModal && (
        <Portal>
          <div
            className="modal-backdrop fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedCertModal(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={selectedCertModal.title}
              className="modal-panel relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#12121a] border border-[#ff5e18]/50 rounded-2xl p-4 sm:p-6 shadow-2xl box-orange-glow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#222232]">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#1a1a28] border border-[#ff5e18]/40 flex items-center justify-center text-[#ff5e18]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                      {selectedCertModal.title}
                    </h3>
                    <p className="text-xs font-mono text-gray-400">
                      {selectedCertModal.issuer} • Issued {selectedCertModal.issueDate}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCertModal(null)}
                  className="w-10 h-10 rounded-xl bg-[#1a1a28] border border-[#2a2a3c] hover:border-[#ff5e18] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Close Certificate Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High Resolution Image View Container */}
              <div className="relative w-full max-h-[65vh] overflow-auto rounded-xl border border-[#222232] bg-[#08080c] p-2 flex items-center justify-center">
                <img
                  src={selectedCertModal.image}
                  alt={selectedCertModal.title}
                  className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-xl"
                />
              </div>

              {/* Bottom Modal Metadata & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 mt-2 border-t border-[#222232] text-left">
                <div className="text-xs font-mono text-gray-400">
                  <span>Received: <strong className="text-white">{selectedCertModal.issueDate}</strong></span>
                </div>

                {/* Open Image in New Tab */}
                <a
                  href={selectedCertModal.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff5e18] hover:bg-[#ff702a] text-xs font-mono font-bold text-white transition-all shadow-md cursor-pointer shrink-0"
                >
                  <span>OPEN FULL IMAGE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        </Portal>
      )}

    </section>
  );
};
