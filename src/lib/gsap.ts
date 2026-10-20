import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

gsap.config({ nullTargetWarn: false, force3D: true });

// Mobile address-bar show/hide resizes the viewport constantly; don't recalculate
// every trigger for it (a common source of scroll jank on phones).
ScrollTrigger.config({ ignoreMobileResize: true });

/** True when the visitor asked the OS to minimise motion. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True for mouse / trackpad devices (hover-driven effects are skipped on touch). */
export const hasFinePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export { gsap, ScrollTrigger, ScrollSmoother };
