import React, { useState, useRef, useEffect } from 'react';
import { Send, Shuffle, CornerDownLeft } from 'lucide-react';

interface ChatInputAreaProps {
  onSendMessage: (text: string) => void;
  onAskRandom: () => void;
  isLoading: boolean;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  onSendMessage,
  onAskRandom,
  isLoading,
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div
      id="chat-input-area"
      className="p-3 sm:p-4 bg-zinc-950/90 border-t border-zinc-800/80 backdrop-blur-md"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-2">
        <div className="relative flex items-end gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-2 focus-within:border-amber-500/50 focus-within:ring-1 focus-within:ring-amber-500/20 transition-all shadow-inner">
          <textarea
            ref={textareaRef}
            id="chat-input-textarea"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something completely unnecessary..."
            disabled={isLoading}
            className="w-full bg-transparent border-0 resize-none text-zinc-100 placeholder-zinc-500 text-sm focus:outline-none focus:ring-0 px-2 py-1.5 min-h-[38px] max-h-[120px] leading-relaxed"
          />

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Random question button */}
            <button
              id="btn-ask-random"
              type="button"
              onClick={onAskRandom}
              disabled={isLoading}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 hover:text-amber-300 border border-zinc-700 text-xs font-medium transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Ask Something Random"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Random 🎲</span>
            </button>

            {/* Send button */}
            <button
              id="btn-send-message"
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>SEND</span>
              <span>🚀</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[10px]">Enter</kbd> to send</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline"><kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[10px]">Shift+Enter</kbd> for newline</span>
          </div>
          <span className="italic text-zinc-600">Productivity level: 0% guaranteed</span>
        </div>
      </form>
    </div>
  );
};
