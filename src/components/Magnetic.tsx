import React, { useEffect, useRef } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion } from '../lib/gsap';

interface MagneticProps {
  children: React.ReactNode;
  /** How far (0–1) the element follows the cursor. */
  strength?: number;
  className?: string;
}

/**
 * Subtle magnetic pull toward the cursor for call-to-action buttons.
 * Lives on a wrapper so it never collides with the child's own hover transforms.
 */
export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 0.25, className = 'inline-flex' }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointermove', handleMove);
    el.addEventListener('pointerleave', handleLeave);
    return () => {
      el.removeEventListener('pointermove', handleMove);
      el.removeEventListener('pointerleave', handleLeave);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [strength]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
};
