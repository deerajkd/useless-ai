import React from 'react';
import { UselessSessionStats } from '../types';
import { Clock, Brain, TrendingDown, HelpCircle, CheckCircle, Flame } from 'lucide-react';

interface StatsPanelProps {
  stats: UselessSessionStats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const formatTimeWasted = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <div
      id="useless-stats-panel"
      className="p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl backdrop-blur-sm shadow-sm space-y-4"
    >
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-mono text-sm font-bold">📊</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
            Useless Statistics
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 animate-pulse">
          LIVE TELEMETRY
        </span>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2.5">
        {/* Questions Asked */}
        <div className="p-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/40">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>Questions Asked</span>
          </div>
          <div className="text-xl font-mono font-bold text-white">
            {stats.questionsAsked}
          </div>
        </div>

        {/* Useful Answers (Always 0!) */}
        <div className="p-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/40 relative group">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Useful Answers</span>
          </div>
          <div className="text-xl font-mono font-bold text-emerald-400 flex items-center gap-1">
            0
            <span className="text-[10px] font-sans font-normal text-zinc-500 hidden sm:inline">
              (as expected)
            </span>
          </div>
        </div>

        {/* Useless Answers */}
        <div className="p-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/40">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Useless Answers</span>
          </div>
          <div className="text-xl font-mono font-bold text-amber-400">
            {stats.uselessAnswers}
          </div>
        </div>

        {/* Time Wasted */}
        <div className="p-2.5 rounded-xl bg-zinc-800/50 border border-zinc-700/40">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Time Wasted</span>
          </div>
          <div className="text-xl font-mono font-bold text-purple-300">
            {formatTimeWasted(stats.timeWastedSeconds)}
          </div>
        </div>
      </div>

      {/* Brain Cells Lost Progress */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400 flex items-center gap-1.5 font-medium">
            <Brain className="w-3.5 h-3.5 text-rose-400" />
            Brain Cells Lost:
          </span>
          <span className="font-mono font-bold text-rose-400">
            {stats.brainCellsLostPercent}%
          </span>
        </div>
        <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-600 transition-all duration-700"
            style={{ width: `${Math.min(100, stats.brainCellsLostPercent)}%` }}
          />
        </div>
      </div>

      {/* Productivity Score */}
      <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-red-400" />
          <span className="text-xs font-medium text-red-200">Net Productivity:</span>
        </div>
        <span className="font-mono font-bold text-sm text-red-400">
          {stats.productivityPercent}%
        </span>
      </div>
    </div>
  );
};
