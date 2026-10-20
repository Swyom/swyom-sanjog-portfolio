import React, { useLayoutEffect } from 'react';
import { initSmoothScroll } from '../lib/smoothScroll';

/**
 * Creates the ScrollSmoother. Render it BEFORE the smooth wrapper (and before any
 * component that creates ScrollTriggers): React runs layout effects in tree order,
 * so the smoother exists before the section animations register their triggers.
 */
export const SmoothScroll: React.FC = () => {
  useLayoutEffect(() => initSmoothScroll(), []);
  return null;
};
