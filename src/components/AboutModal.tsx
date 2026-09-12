import React from 'react';
import { X, Bot, ShieldCheck, Sparkles, AlertOctagon } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="about-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        id="about-modal-content"
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              🤖
            </div>
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              ABOUT USELESS AI
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-sm text-zinc-300">
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
            <p className="font-medium text-white leading-relaxed">
              "Useless AI is an experimental AI project designed to demonstrate that artificial
              intelligence can be completely unnecessary.
            </p>
            <p className="text-amber-400 font-semibold italic">
              It answers questions. It just doesn't help."
            </p>
          </div>

          <div className="space-y-2.5 divide-y divide-zinc-800/60 text-xs">
            <div className="flex justify-between pt-2">
              <span className="text-zinc-500">Core Purpose:</span>
              <span className="font-bold text-zinc-200">Absolutely none.</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-zinc-500">Underlying Tech:</span>
              <span className="font-bold text-zinc-200">AI + JavaScript + questionable decisions</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-zinc-500">Net Productivity:</span>
              <span className="font-bold text-red-400 font-mono">0%</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-zinc-500">Satisfaction Rating:</span>
              <span className="font-bold text-amber-300 font-mono">100% Unnecessary</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300/90 leading-relaxed">
            💡 <strong>Disclaimer:</strong> Any practical insights or genuine productivity gained while
            using this application are purely accidental and sincerely regretted by the engineering team.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-800 bg-zinc-950/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold transition-colors"
          >
            Understood (Regretfully)
          </button>
        </div>
      </div>
    </div>
  );
};
