import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldRender, setShouldRender] = useState<boolean>(true);

  useEffect(() => {
    // Smooth progress counter simulation
    const duration = 1400; // 1.4s stylish load animation
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(100, Math.round((currentStep / steps) * 100));
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsLoading(false);
          setTimeout(() => setShouldRender(false), 700); // match transition duration
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#08080c] flex flex-col items-center justify-center select-none transition-all duration-700 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none scale-105'
      }`}
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute w-[450px] h-[450px] bg-[#ff5e18]/15 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 p-6 text-center">
        
        {/* Stylish Glowing Orb Loader */}
        <div className="relative flex items-center justify-center p-6">
          <div className="loader-orb" />
        </div>

        {/* Branding & Status text */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-widest font-heading text-orange-glow">
            P. SWYOM SANJOG
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#ff5e18] font-bold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff5e18] animate-ping" />
            <span>INITIALIZING PORTFOLIO</span>
            <span className="text-gray-400">[{progress}%]</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-56 sm:w-72 h-1.5 bg-[#181824] rounded-full overflow-hidden border border-[#28283a] shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#ff5e18] via-[#ff8800] to-[#ffcc00] transition-all duration-75 ease-out shadow-[0_0_12px_#ff5e18]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
