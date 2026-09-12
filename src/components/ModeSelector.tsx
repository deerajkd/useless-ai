import React from 'react';
import {
  Shuffle,
  BrainCircuit,
  Smile,
  Eye,
  AlertTriangle,
  Flame,
  BookOpen,
  Clapperboard,
  Cpu,
  ZapOff,
  Sparkles,
} from 'lucide-react';
import { UselessModeId } from '../types';
import { USELESS_MODES } from '../data/uselessData';

interface ModeSelectorProps {
  selectedMode: UselessModeId;
  onSelectMode: (mode: UselessModeId) => void;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  Shuffle: <Shuffle className="w-4 h-4" />,
  BrainCircuit: <BrainCircuit className="w-4 h-4" />,
  Smile: <Smile className="w-4 h-4" />,
  Eye: <Eye className="w-4 h-4" />,
  AlertTriangle: <AlertTriangle className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Clapperboard: <Clapperboard className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  ZapOff: <ZapOff className="w-4 h-4" />,
};

export const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onSelectMode }) => {
  const currentConfig = USELESS_MODES.find((m) => m.id === selectedMode) || USELESS_MODES[0];

  return (
    <div
      id="mode-selector-container"
      className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl backdrop-blur-sm shadow-sm"
    >
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Selected Mode:
          </span>
          <span className="text-xs font-bold text-amber-400 font-mono">
            {currentConfig.name}
          </span>
        </div>
        <span className="text-[11px] text-zinc-400 hidden sm:inline">
          10 Specialized Personalities
        </span>
      </div>

      {/* Horizontal scrollable or wrapped chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {USELESS_MODES.map((mode) => {
          const isSelected = selectedMode === mode.id;
          return (
            <button
              key={mode.id}
              id={`mode-btn-${mode.id}`}
              type="button"
              onClick={() => onSelectMode(mode.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-[0_0_12px_rgba(245,158,11,0.35)] scale-[1.02]'
                  : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 border border-zinc-700/50 hover:border-zinc-600'
              }`}
            >
              <span className={isSelected ? 'text-zinc-950' : 'text-zinc-400'}>
                {ICONS_MAP[mode.iconName]}
              </span>
              <span>{mode.name}</span>
            </button>
          );
        })}
      </div>

      {/* Description & Sample snippet for chosen mode */}
      <div className="mt-2.5 pt-2 border-t border-zinc-800/50 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400 gap-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">Personality:</span>
          <span className="text-zinc-300 italic">{currentConfig.description}</span>
        </div>
        <div className="text-[11px] text-zinc-500 truncate max-w-md">
          <span className="text-zinc-400">Sample:</span> "{currentConfig.sampleResponse}"
        </div>
      </div>
    </div>
  );
};
