import { ScrollSmoother, ScrollTrigger, hasFinePointer, prefersReducedMotion } from './gsap';

export const SMOOTH_WRAPPER_ID = 'smooth-wrapper';
export const SMOOTH_CONTENT_ID = 'smooth-content';
export const NAV_OFFSET = 80;

/**
 * Inertia-style smooth scrolling for mouse / trackpad users via GSAP ScrollSmoother.
 * Touch devices keep native momentum scrolling (it already feels right and is cheaper),
 * and reduced-motion users get plain scrolling.
 */
export const initSmoothScroll = (): (() => void) => {
  const wrapper = document.getElementById(SMOOTH_WRAPPER_ID);
  const content = document.getElementById(SMOOTH_CONTENT_ID);
  if (!wrapper || !content || prefersReducedMotion() || !hasFinePointer()) return () => undefined;

  const smoother = ScrollSmoother.create({
    wrapper,
    content,
    smooth: 1.15,
    smoothTouch: false,
    effects: false,
  });

  // Content height changes (DEV.to posts arriving, filter tabs) must update the scroll length.
  let timer = 0;
  const observer = new ResizeObserver(() => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
  });
  observer.observe(content);

  return () => {
    window.clearTimeout(timer);
    observer.disconnect();
    smoother.kill();
  };
};

/** Smoothly scrolls to a section (or the top) leaving room for the fixed header. */
export const scrollToTarget = (target: HTMLElement | 'top') => {
  const smoother = ScrollSmoother.get();

  if (smoother) {
    if (target === 'top') smoother.scrollTo(0, true);
    else smoother.scrollTo(target, true, `top ${NAV_OFFSET}px`);
    return;
  }

  const top = target === 'top' ? 0 : target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};
