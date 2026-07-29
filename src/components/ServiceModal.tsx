import React from 'react';
import { Service } from '../types';
import { X, CheckCircle, Clock, Wrench, ArrowRight } from 'lucide-react';

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
  onNavigateToContact: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onNavigateToContact }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#12121a] border border-[#ff5e18]/50 rounded-2xl shadow-2xl p-6 sm:p-8 text-left text-gray-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#181826] border border-[#2a2a3a] text-gray-400 hover:text-white hover:border-[#ff5e18] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#ff5e18] mb-2">
          <span>SERVICE OVERVIEW</span>
          <span>//</span>
          <span>{service.timeline}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          {service.title}
        </h2>

        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
          {service.fullDesc}
        </p>

        {/* Deliverables Checklist */}
        <div className="mb-6">
          <h3 className="text-xs font-mono font-bold text-gray-400 mb-3 uppercase tracking-wider">
            What You'll Receive (Deliverables)
          </h3>
          <div className="space-y-2">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-[#181826] p-3 rounded-xl border border-[#222232] text-xs font-semibold text-white">
                <CheckCircle className="w-4 h-4 text-[#ff5e18] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#181826] p-4 rounded-xl border border-[#222232]">
            <h4 className="text-xs font-mono font-bold text-gray-400 mb-2 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#ff5e18]" />
              Tools & Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.tools.map((t) => (
                <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1f1f32] text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#181826] p-4 rounded-xl border border-[#222232]">
            <h4 className="text-xs font-mono font-bold text-gray-400 mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#ff5e18]" />
              Estimated Turnaround
            </h4>
            <span className="text-sm font-bold text-white">{service.timeline}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#1f1f2e] flex justify-end">
          <button
            onClick={() => {
              onClose();
              onNavigateToContact();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#ff5e18] hover:bg-[#ff702a] box-orange-glow transition-all cursor-pointer"
          >
            <span>BOOK THIS SERVICE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
