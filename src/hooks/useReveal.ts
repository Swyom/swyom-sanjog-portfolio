import { DependencyList, RefObject, useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap';

interface RevealOptions {
  /** Starting offset / state the elements animate in from. */
  from?: gsap.TweenVars;
  duration?: number;
  stagger?: number;
  ease?: string;
  /** ScrollTrigger start position. */
  start?: string;
}

/**
 * Scroll-triggered staggered reveal for every element matching `selector`
 * inside `scope`. Elements already on screen animate straight away; the rest
 * animate in batches as they scroll into view. Inline styles are cleared when
 * each tween finishes so Tailwind hover transforms keep working untouched.
 */
export const useReveal = (
  scope: RefObject<HTMLElement | null>,
  selector: string,
  { from = { y: 48 }, duration = 1.1, stagger = 0.09, ease = 'expo.out', start = 'top 90%' }: RevealOptions = {},
  deps: DependencyList = []
) => {
  useLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(selector);
      if (!targets.length) return;

      // `transition: none` stops Tailwind's `transition-all` from fighting GSAP each frame.
      gsap.set(targets, { autoAlpha: 0, transition: 'none', ...from });

      ScrollTrigger.batch(targets, {
        start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration,
            stagger,
            ease,
            overwrite: true,
            force3D: true,
            clearProps: 'transform,opacity,visibility,transition',
          }),
      });
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
