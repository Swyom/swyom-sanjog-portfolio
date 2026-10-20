import React, { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../lib/gsap';

interface CountUpProps {
  value: number;
  /** Animation waits until this is true (e.g. after the preloader). */
  start: boolean;
  duration?: number;
  className?: string;
}

const format = (n: number) => Math.round(n).toLocaleString();

/** Counts from 0 up to `value` once `start` becomes true. */
export const CountUp: React.FC<CountUpProps> = ({ value, start, duration = 1.6, className }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!start || prefersReducedMotion()) {
      el.textContent = format(value);
      return;
    }

    const counter = { n: 0 };
    el.textContent = '0';
    const tween = gsap.to(counter, {
      n: value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = format(counter.n);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, start, duration]);

  // Text is written imperatively so React never reconciles against the animated node.
  return <span ref={ref} className={className} />;
};
