import React from 'react';
import { Sparkles, BrainCircuit, Skull, RefreshCw, Trash2, Siren } from 'lucide-react';
import { PointlessActionType } from '../types';

interface PointlessButtonsBarProps {
  onTriggerAction: (action: PointlessActionType) => void;
  disabled: boolean;
  hasMessages: boolean;
}

export const PointlessButtonsBar: React.FC<PointlessButtonsBarProps> = ({
  onTriggerAction,
  disabled,
  hasMessages,
}) => {
  return (
    <div
      id="pointless-buttons-bar"
      className="p-3 bg-zinc-900/50 border border-zinc-800/80 rounded-2xl backdrop-blur-sm"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 font-mono flex items-center gap-1.5">
          <span>⚡</span> Pointless Action Controls
        </span>
        <span className="text-[10px] text-zinc-500 italic">
          Guaranteed to achieve nothing
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {/* 1. Make It More Useless */}
        <button
          id="btn-more-useless"
          type="button"
          disabled={disabled || !hasMessages}
          onClick={() => onTriggerAction('make_more_useless')}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/90 hover:bg-amber-500/20 text-zinc-200 hover:text-amber-300 border border-zinc-700/60 hover:border-amber-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          title="Escalates the unhelpfulness of the last answer"
        >
          <span>🎲</span>
          <span className="truncate">More Useless</span>
        </button>

        {/* 2. Overthink This */}
        <button
          id="btn-overthink"
          type="button"
          disabled={disabled || !hasMessages}
          onClick={() => onTriggerAction('overthink')}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/90 hover:bg-purple-500/20 text-zinc-200 hover:text-purple-300 border border-zinc-700/60 hover:border-purple-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          title="Turns the topic into an existential labyrinth"
        >
          <span>🤔</span>
          <span className="truncate">Overthink This</span>
        </button>

        {/* 3. Make It Worse */}
        <button
          id="btn-make-worse"
          type="button"
          disabled={disabled || !hasMessages}
          onClick={() => onTriggerAction('make_worse')}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/90 hover:bg-rose-500/20 text-zinc-200 hover:text-rose-300 border border-zinc-700/60 hover:border-rose-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          title="Offers catastrophically terrible advice"
        >
          <span>💀</span>
          <span className="truncate">Make It Worse</span>
        </button>

        {/* 4. Regenerate Pointlessly */}
        <button
          id="btn-regenerate"
          type="button"
          disabled={disabled || !hasMessages}
          onClick={() => onTriggerAction('regenerate')}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/90 hover:bg-cyan-500/20 text-zinc-200 hover:text-cyan-300 border border-zinc-700/60 hover:border-cyan-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          title="Regenerates a brand new useless reply"
        >
          <span>🔄</span>
          <span className="truncate">Regenerate</span>
        </button>

        {/* 5. Delete Absolutely Nothing */}
        <button
          id="btn-delete-nothing"
          type="button"
          onClick={() => onTriggerAction('delete_nothing')}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-zinc-800/90 hover:bg-emerald-500/20 text-zinc-200 hover:text-emerald-300 border border-zinc-700/60 hover:border-emerald-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          title="Clears zero data, frees 0MB of memory"
        >
          <span>🗑️</span>
          <span className="truncate">Delete Nothing</span>
        </button>

        {/* 6. Emergency Uselessness */}
        <button
          id="btn-emergency-useless"
          type="button"
          onClick={() => onTriggerAction('emergency')}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-800/60 hover:border-red-600 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_10px_rgba(239,68,68,0.15)]"
          title="SOUND THE ANTI-PRODUCTIVITY SIREN"
        >
          <span className="animate-pulse">🚨</span>
          <span className="truncate font-semibold">Emergency</span>
        </button>
      </div>
    </div>
  );
};
