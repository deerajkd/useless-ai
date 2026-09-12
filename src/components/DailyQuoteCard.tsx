import React, { useState } from 'react';
import { Quote, Shuffle } from 'lucide-react';
import { USELESS_QUOTES } from '../data/uselessData';

export const DailyQuoteCard: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * USELESS_QUOTES.length)
  );

  const handleShuffle = () => {
    setQuoteIndex((prev) => (prev + 1) % USELESS_QUOTES.length);
  };

  return (
    <div
      id="daily-quote-card"
      className="p-4 bg-gradient-to-br from-amber-500/10 via-zinc-900/60 to-zinc-900/80 border border-amber-500/30 rounded-2xl backdrop-blur-sm shadow-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
          <Quote className="w-3.5 h-3.5" />
          <span>Useless Quote of the Day</span>
        </div>
        <button
          type="button"
          onClick={handleShuffle}
          className="p-1 rounded-lg hover:bg-amber-500/20 text-zinc-400 hover:text-amber-300 transition-all hover:rotate-180 duration-300"
          title="Shuffle Quote"
        >
          <Shuffle className="w-3.5 h-3.5" />
        </button>
      </div>

      <blockquote className="text-xs sm:text-sm text-zinc-200 font-medium leading-relaxed italic border-l-2 border-amber-500/60 pl-3 py-0.5">
        "{USELESS_QUOTES[quoteIndex]}"
      </blockquote>

      <div className="mt-2 text-right">
        <span className="text-[10px] text-zinc-500 font-mono">— Philosophy of Futility</span>
      </div>
    </div>
  );
};
