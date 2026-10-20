import React from 'react';
import { createPortal } from 'react-dom';

/**
 * Renders overlays directly under <body> so `position: fixed` is always
 * relative to the viewport, even when an ancestor section is transformed
 * or blurred by an animation.
 */
export const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  createPortal(children, document.body);
