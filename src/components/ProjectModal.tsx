import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, Check, Sparkles, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#12121a] border border-[#ff5e18]/50 rounded-2xl shadow-2xl p-6 sm:p-8 text-left text-gray-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#181826] border border-[#2a2a3a] text-gray-400 hover:text-white hover:border-[#ff5e18] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#ff5e18] mb-2">
          <span>PROJECT CASE STUDY</span>
          <span>//</span>
          <span>{project.category}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          {project.title}
        </h2>

        {/* Hero Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden border border-[#222232] mb-6 bg-[#181826]">
          <img
            src={project.image}
            onError={(e) => {
              if (project.fallbackImage) {
                (e.target as HTMLImageElement).src = project.fallbackImage;
              }
            }}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
          {project.longDescription}
        </p>

        {/* Key Metrics Grid */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 mb-6 bg-[#181826] p-4 rounded-xl border border-[#262638]">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center">
                <div className="text-lg sm:text-xl font-extrabold text-[#ff5e18]">{m.value}</div>
                <div className="text-[11px] text-gray-400 font-mono">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Features Checklist */}
        {project.features && (
          <div className="mb-6">
            <h3 className="text-sm font-mono font-bold text-gray-300 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#ff5e18]" />
              Key Features & Innovations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
              {project.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-[#181826] p-2.5 rounded-lg border border-[#222232]">
                  <Check className="w-4 h-4 text-[#ff5e18] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="mb-8">
          <h3 className="text-xs font-mono font-bold text-gray-400 mb-2">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-[#181826] text-[#ff5e18] border border-[#ff5e18]/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1f1f2e]">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#ff5e18] hover:bg-[#ff702a] box-orange-glow transition-all"
            >
              <Github className="w-4 h-4" />
              <span>VIEW GITHUB REPOSITORY</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
