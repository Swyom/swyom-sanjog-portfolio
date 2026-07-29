import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('button, a, input, textarea, select, [role="button"]');
      setIsPointer(isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer subtle ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#ff5e18]/60 pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPointer ? 1.6 : 1})`,
          backgroundColor: isPointer ? 'rgba(255, 94, 24, 0.15)' : 'transparent',
        }}
      />
      {/* Inner precise dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#ff5e18] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 box-orange-glow-sm"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />
    </>
  );
};
