import React, { useState, useEffect, useRef } from 'react';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import { Certificate } from '../types';
import { Award, ExternalLink, X, Eye, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

export const Certificates: React.FC = () => {
  const [selectedCertModal, setSelectedCertModal] = useState<Certificate | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Mouse Drag-to-Scroll States
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  // Close modal on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCertModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  // Drag-to-Scroll Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.8; // Scroll sensitivity multiplier
    if (Math.abs(walk) > 5) setHasDragged(true);
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="certificates" className="py-20 bg-[#08080c] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#ff5e18]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header with Side-Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#12121a] border border-[#262636] font-mono text-xs font-semibold text-[#ff5e18] mb-3">
              <span className="text-gray-400">&lt;</span>
              CERTIFICATES & CREDENTIALS
              <span className="text-gray-400">/&gt;</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
              <span className="text-[#ff5e18] text-orange-glow">Certifications</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Click and drag sideways or use the arrow buttons to explore all verified certifications. Click any card to view in high resolution.
            </p>
          </div>

          {/* Left / Right Scroll Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleScrollLeft}
              className="w-11 h-11 rounded-xl bg-[#12121a] border border-[#262638] hover:border-[#ff5e18] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:box-orange-glow-sm cursor-pointer"
              aria-label="Scroll Certificates Left"
              title="Previous Certificates"
            >
              <ChevronLeft className="w-5 h-5 text-[#ff5e18]" />
            </button>
            <button
              onClick={handleScrollRight}
              className="w-11 h-11 rounded-xl bg-[#12121a] border border-[#262638] hover:border-[#ff5e18] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-300 hover:box-orange-glow-sm cursor-pointer"
              aria-label="Scroll Certificates Right"
              title="Next Certificates"
            >
              <ChevronRight className="w-5 h-5 text-[#ff5e18]" />
            </button>
          </div>
        </div>

        {/* Side-Scrolling Drag-to-Scroll Certificates Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex overflow-x-auto gap-6 sm:gap-8 snap-x snap-mandatory scrollbar-none py-3 px-1 -mx-1 select-none ${isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
        >
          {CERTIFICATES_DATA.map((cert) => (
            <div
              key={cert.id}
              className="group relative bg-[#12121a]/90 backdrop-blur-md border border-[#222232] hover:border-[#ff5e18]/60 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:box-orange-glow-sm flex flex-col justify-between overflow-hidden min-w-[290px] xs:min-w-[330px] sm:min-w-[370px] snap-start shrink-0"
            >
              {/* Top Accent Gradient Bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ff5e18] to-[#ff9800] rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Certificate Image Banner - Clickable */}
                {cert.image && (
                  <div
                    onClick={() => {
                      if (!hasDragged) setSelectedCertModal(cert);
                    }}
                    className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden mb-5 border border-[#262638] bg-[#0c0c14] group-hover:border-[#ff5e18]/50 transition-colors cursor-pointer group/img"
                  >
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 filter brightness-90 contrast-105 pointer-events-none"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/20 to-transparent" />

                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono font-bold text-xs">
                      <Eye className="w-4 h-4 text-[#ff5e18]" />
                      <span>CLICK TO VIEW</span>
                    </div>

                    {/* Issuer badge overlay on image */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#08080c]/90 border border-[#ff5e18]/40 backdrop-blur-md flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff5e18]">
                      <Award className="w-3.5 h-3.5" />
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                )}

                {/* Header Info: Title & Issue Date */}
                <div className="mb-5">
                  <h3
                    onClick={() => {
                      if (!hasDragged) setSelectedCertModal(cert);
                    }}
                    className="text-lg font-extrabold text-white tracking-tight group-hover:text-[#ff5e18] transition-colors font-heading mb-1 cursor-pointer line-clamp-1"
                  >
                    {cert.title}
                  </h3>
                  <div className="text-xs font-mono text-gray-400">
                    <span>Date Received: <strong className="text-gray-200">{cert.issueDate}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom View Certificate Modal Button */}
              <button
                onClick={() => {
                  if (!hasDragged) setSelectedCertModal(cert);
                }}
                className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-[#161622] hover:bg-[#ff5e18] border border-[#262638] hover:border-[#ff5e18] text-xs font-mono font-bold text-gray-200 hover:text-white transition-all duration-300 group/btn cursor-pointer"
              >
                <span>VIEW CERTIFICATE</span>
                <Maximize2 className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Certificate Lightbox Modal */}
      {selectedCertModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedCertModal(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#12121a] border border-[#ff5e18]/50 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden box-orange-glow"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#222232]">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#1a1a28] border border-[#ff5e18]/40 flex items-center justify-center text-[#ff5e18]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                    {selectedCertModal.title}
                  </h3>
                  <p className="text-xs font-mono text-gray-400">
                    {selectedCertModal.issuer} • Issued {selectedCertModal.issueDate}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCertModal(null)}
                className="w-10 h-10 rounded-xl bg-[#1a1a28] border border-[#2a2a3c] hover:border-[#ff5e18] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close Certificate Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High Resolution Image View Container */}
            <div className="relative w-full max-h-[65vh] overflow-auto rounded-xl border border-[#222232] bg-[#08080c] p-2 flex items-center justify-center">
              <img
                src={selectedCertModal.image}
                alt={selectedCertModal.title}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-xl"
              />
            </div>

            {/* Bottom Modal Metadata & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 mt-2 border-t border-[#222232] text-left">
              <div className="text-xs font-mono text-gray-400">
                <span>Received: <strong className="text-white">{selectedCertModal.issueDate}</strong></span>
              </div>

              {/* Open Image in New Tab */}
              <a
                href={selectedCertModal.image}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ff5e18] hover:bg-[#ff702a] text-xs font-mono font-bold text-white transition-all shadow-md cursor-pointer shrink-0"
              >
                <span>OPEN FULL IMAGE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
