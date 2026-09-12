import React, { useState } from 'react';
import { Bot, User, Copy, Check, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatMessageItemProps {
  message: ChatMessage;
  onRetry?: () => void;
  onQuickAction?: (action: 'make_more_useless' | 'overthink' | 'make_worse') => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onRetry,
  onQuickAction,
}) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (message.isError) {
    return (
      <div className="flex items-start gap-3 my-4 max-w-2xl animate-fade-in">
        <div className="w-9 h-9 rounded-xl bg-red-900/40 border border-red-700/60 flex items-center justify-center text-red-300 flex-shrink-0 text-base">
          ⚠️
        </div>
        <div className="flex-1 bg-red-950/40 border border-red-800/60 rounded-2xl p-4 text-red-200">
          <div className="flex items-center gap-2 font-bold text-sm mb-1 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span>CRITICAL BRAIN DEACTIVATION</span>
          </div>
          <p className="text-sm font-medium mb-3 whitespace-pre-line leading-relaxed">
            {message.text}
          </p>
          {onRetry && (
            <button
              id="btn-retry-error"
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-800/80 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              TRY AGAIN
            </button>
          )}
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end my-3.5">
        <div className="flex items-start gap-2.5 max-w-xl flex-row-reverse">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 flex-shrink-0 text-sm">
            👤
          </div>
          <div className="flex flex-col items-end">
            <div className="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm shadow-md leading-relaxed break-words max-w-prose">
              {message.text}
            </div>
            <span className="text-[10px] text-zinc-500 mt-1 mr-1 font-mono">
              {message.timestamp}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // AI Response
  const score = message.score ?? 88;
  const scoreColor =
    score >= 95
      ? 'from-rose-500 to-red-500'
      : score >= 80
      ? 'from-amber-500 to-orange-500'
      : 'from-blue-500 to-cyan-500';

  return (
    <div className="flex items-start gap-3 my-4 max-w-3xl">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 flex items-center justify-center text-lg flex-shrink-0 shadow-[0_0_12px_rgba(245,158,11,0.1)]">
        🤖
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {/* Main AI Bubble */}
        <div className="p-4 rounded-2xl rounded-tl-sm bg-zinc-900/90 border border-zinc-800 text-zinc-100 shadow-lg relative group">
          {/* Header row: category badge and timestamp */}
          <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-800/60">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400">🤖 Useless AI</span>
              {message.category && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {message.category}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-mono">{message.timestamp}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-zinc-400 hover:text-zinc-200"
                title="Copy response"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Response Text */}
          <div className="text-sm sm:text-base leading-relaxed text-zinc-200 whitespace-pre-line">
            {message.text}
          </div>

          {/* Section 5: Uselessness Score Meter */}
          <div className="mt-3.5 pt-2.5 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[11px] font-bold tracking-wider text-zinc-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                USELESSNESS SCORE
              </span>
              <span className="font-mono font-bold text-xs text-amber-300">
                {score}% — <span className="font-sans font-medium text-zinc-300">{message.scoreLabel || 'Extremely Useless'}</span>
              </span>
            </div>

            {/* Visual Animated Progress Bar */}
            <div className="h-2 w-full bg-zinc-950 rounded-full overflow-hidden p-0.5 border border-zinc-800">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${scoreColor} transition-all duration-1000 ease-out shadow-sm`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Follow-up Pointless Actions */}
        {onQuickAction && (
          <div className="flex items-center gap-1.5 pl-1 flex-wrap">
            <span className="text-[10px] text-zinc-500 font-mono mr-1">Tweak:</span>
            <button
              type="button"
              onClick={() => onQuickAction('make_more_useless')}
              className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-amber-300 transition-colors"
            >
              🎲 Make More Useless
            </button>
            <button
              type="button"
              onClick={() => onQuickAction('overthink')}
              className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-purple-300 transition-colors"
            >
              🤔 Overthink
            </button>
            <button
              type="button"
              onClick={() => onQuickAction('make_worse')}
              className="text-[11px] px-2 py-0.5 rounded-md bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-rose-300 transition-colors"
            >
              💀 Make Worse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
