import React from 'react';
import { X, ExternalLink, Download, FileText } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resumeFilePath = './assets/Swyom Resume.pdf';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#12121a] border border-[#ff5e18]/50 rounded-2xl p-5 sm:p-7 shadow-2xl overflow-hidden box-orange-glow text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#222232]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#181826] border border-[#ff5e18]/40 flex items-center justify-center text-[#ff5e18]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                P. Swyom Sanjog
              </h2>
              <p className="text-xs font-mono text-gray-400">
                Software Developer • React Native & FastAPI
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-[#181826] border border-[#2a2a3c] hover:border-[#ff5e18] text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Embedded PDF View Container */}
        <div className="relative w-full h-[65vh] sm:h-[72vh] rounded-xl overflow-hidden border border-[#262638] bg-[#08080c] mb-4">
          <object
            data={resumeFilePath}
            type="application/pdf"
            className="w-full h-full"
          >
            <iframe
              src={resumeFilePath}
              className="w-full h-full border-0"
              title="P Swyom Sanjog Resume"
            />
          </object>
        </div>

        {/* Modal Footer Action Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#222232]">
          <span className="text-xs font-mono text-gray-400">
            File: <strong className="text-gray-200">Swyom Resume.pdf</strong>
          </span>

          <div className="flex items-center gap-3">
            <a
              href={resumeFilePath}
              download="Swyom_Sanjog_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#181826] hover:bg-[#222234] border border-[#2a2a3c] text-xs font-mono font-bold text-gray-200 hover:text-white transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#ff5e18]" />
              <span>DOWNLOAD PDF</span>
            </a>

            <a
              href={resumeFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff5e18] hover:bg-[#ff702a] text-xs font-mono font-bold text-white box-orange-glow transition-all cursor-pointer"
            >
              <span>OPEN FULL TAB</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
