import React, { useState } from 'react';
import { X, ExternalLink, Download, FileText, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';
import { useModal } from '../hooks/useModal';
import { Portal } from './Portal';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useModal(isOpen, onClose);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!isOpen) return null;

  const resumePdfPath = getAssetUrl('assets/Swyom Resume.pdf');
  const resumePreviewPath = getAssetUrl('assets/swyom-resume-preview.webp');

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.5, Math.round((z + 0.15) * 100) / 100));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.7, Math.round((z - 0.15) * 100) / 100));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <Portal>
      <div
        className="modal-backdrop fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="P. Swyom Sanjog Resume"
          className="modal-panel relative w-full max-w-4xl max-h-[95vh] flex flex-col bg-[#12121a] border border-[#ff5e18]/50 rounded-2xl p-4 sm:p-5 shadow-2xl overflow-hidden box-orange-glow text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#222232] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#181826] border border-[#ff5e18]/40 flex items-center justify-center text-[#ff5e18]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading">
                  P. Swyom Sanjog
                </h2>
                <p className="text-xs font-mono text-gray-400">
                  Mobile App Developer • React Native Developer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="hidden sm:flex items-center gap-1 bg-[#181826] border border-[#2a2a3c] rounded-lg p-1 text-gray-300">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-1.5 hover:text-white hover:bg-[#252538] rounded transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1.5 text-gray-400 min-w-[42px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-1.5 hover:text-white hover:bg-[#252538] rounded transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                {zoomLevel !== 1 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    className="p-1.5 hover:text-[#ff5e18] hover:bg-[#252538] rounded transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#181826] border border-[#2a2a3c] hover:border-[#ff5e18] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Embedded Resume View Container — scrollable and auto-fitted */}
          <div className="relative w-full flex-1 min-h-0 h-[65vh] sm:h-[72vh] rounded-xl overflow-auto border border-[#262638] bg-[#0c0c14] mb-3 p-2 sm:p-4 flex justify-center items-start scrollbar-none">
            <div
              className="transition-transform duration-200 origin-top shadow-2xl rounded-lg overflow-hidden bg-white max-w-full"
              style={{
                width: `${zoomLevel * 100}%`,
                maxWidth: `${Math.max(680, zoomLevel * 780)}px`,
              }}
            >
              <img
                src={resumePreviewPath}
                alt="P. Swyom Sanjog Resume"
                className="w-full h-auto block select-none pointer-events-auto"
                loading="eager"
              />
            </div>
          </div>

          {/* Modal Footer Action Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2.5 border-t border-[#222232] shrink-0">
            <span className="text-xs font-mono text-gray-400">
              File: <strong className="text-gray-200">Swyom Resume.pdf</strong>
            </span>

            <div className="flex items-center gap-3">
              <a
                href={resumePdfPath}
                download="Swyom_Sanjog_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-[#181826] hover:bg-[#222234] border border-[#2a2a3c] text-xs font-mono font-bold text-gray-200 hover:text-white transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#ff5e18]" />
                <span>DOWNLOAD PDF</span>
              </a>

              <a
                href={resumePdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl bg-[#ff5e18] hover:bg-[#ff702a] text-xs font-mono font-bold text-white box-orange-glow transition-all cursor-pointer"
              >
                <span>OPEN FULL TAB</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </Portal>
  );
};
