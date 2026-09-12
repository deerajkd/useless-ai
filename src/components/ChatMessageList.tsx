import React, { useEffect, useRef } from 'react';
import { ChatMessage, PointlessActionType } from '../types';
import { ChatMessageItem } from './ChatMessageItem';
import { Sparkles, Bot, ArrowDown } from 'lucide-react';

interface ChatMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  loadingThought: string;
  onSelectPrompt: (prompt: string) => void;
  onRetryError: () => void;
  onQuickAction: (action: PointlessActionType) => void;
}

const STARTER_PROMPTS = [
  'What is 2 + 2?',
  'How do I become rich?',
  "What's the weather?",
  'How do I open a door?',
  'Why do socks disappear in washing machines?',
  'Can you help me solve my life problems?',
];

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  loadingThought,
  onSelectPrompt,
  onRetryError,
  onQuickAction,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, loadingThought]);

  return (
    <div
      id="chat-messages-container"
      className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 space-y-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent min-h-[380px]"
    >
      {/* Empty State / Welcome Screen */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-10 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mb-4 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            🤖
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Welcome to <span className="text-amber-400">USELESS AI</span>
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
            The world's least useful AI. Ask literally anything, and prepare to receive
            intentionally unhelpful, absurd, sarcastic, and ridiculously complicated answers.
          </p>

          <div className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 backdrop-blur-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500/90 font-mono mb-3 block">
              Suggested Pointless Questions:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectPrompt(prompt)}
                  className="p-2.5 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 hover:border-amber-500/40 text-xs text-zinc-200 transition-all text-left flex items-center justify-between group hover:scale-[1.01]"
                >
                  <span className="truncate pr-2 font-medium">{prompt}</span>
                  <span className="text-zinc-500 group-hover:text-amber-400 transition-colors">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Render Message Bubbles */}
      {messages.map((msg) => (
        <ChatMessageItem
          key={msg.id}
          message={msg}
          onRetry={onRetryError}
          onQuickAction={onQuickAction}
        />
      ))}

      {/* Section 12: Loading Animation & revolving thoughts */}
      {isLoading && (
        <div className="flex items-start gap-3 my-4 max-w-xl animate-pulse">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-lg flex-shrink-0">
            🤖
          </div>
          <div className="p-4 rounded-2xl rounded-tl-sm bg-zinc-900/90 border border-zinc-800 text-zinc-300">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-amber-400">Thinking unnecessarily</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" />
              </div>
            </div>
            <p className="text-xs text-zinc-400 italic font-mono flex items-center gap-1.5">
              <span>💭</span>
              <span>"{loadingThought}"</span>
            </p>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};
