import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

/** Thin brand-coloured reading-progress bar pinned to the top of the viewport. */
export const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-[#ff5e18] via-[#ff8c00] to-[#ff9800] shadow-[0_0_10px_#ff5e18]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
