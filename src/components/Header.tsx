import React from 'react';
import { Bot, Volume2, VolumeX, Info, History, Trophy, Trash2 } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAbout: () => void;
  onOpenHistory: () => void;
  onOpenQuiz: () => void;
  onOpenClearChat: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenAbout,
  onOpenHistory,
  onOpenQuiz,
  onOpenClearChat,
  historyCount,
}) => {
  return (
    <header
      id="app-header"
      className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 sm:px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  USELESS AI
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                    v0.0 (Unproductive)
                  </span>
                </h1>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                The AI that solves problems nobody has.
              </p>
            </div>
          </div>

          {/* Mobile status indicator */}
          <div className="md:hidden flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>
        </div>

        {/* Actions & Status */}
        <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3 flex-wrap">
          {/* Desktop status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>Useless Mode:</span>
            <span className="text-emerald-400 font-semibold">ACTIVE</span>
          </div>

          {/* Mini-game Quiz Button */}
          <button
            id="btn-useless-quiz"
            onClick={onOpenQuiz}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/20 to-purple-600/20 hover:from-violet-600/30 hover:to-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-medium transition-all hover:scale-105 active:scale-95"
            title="Take the 'How Useless Are You?' Quiz"
          >
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">How Useless Are You?</span>
            <span className="sm:hidden">Quiz</span>
          </button>

          {/* History Button */}
          <button
            id="btn-open-history"
            onClick={onOpenHistory}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-medium transition-colors"
            title="View Useless History"
          >
            <History className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-[10px] text-zinc-400">
                {historyCount}
              </span>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-sound-toggle"
            onClick={onToggleSound}
            type="button"
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              soundEnabled
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
            title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline text-[11px]">Audio ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden lg:inline text-[11px]">Muted</span>
              </>
            )}
          </button>

          {/* Clear Chat */}
          <button
            id="btn-clear-chat"
            onClick={onOpenClearChat}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-red-950/40 border border-zinc-800 hover:border-red-800/40 text-zinc-400 hover:text-red-300 text-xs font-medium transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Clear</span>
          </button>

          {/* About Button */}
          <button
            id="btn-open-about"
            onClick={onOpenAbout}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 text-xs font-medium transition-colors"
          >
            <Info className="w-3.5 h-3.5 text-zinc-400" />
            About
          </button>
        </div>
      </div>
    </header>
  );
};
