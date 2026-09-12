import React, { useEffect } from 'react';
import { SpecialEventAlert } from '../types';
import { AlertTriangle, Bot, Trophy, Siren, X } from 'lucide-react';

interface SpecialEventToastProps {
  event: SpecialEventAlert | null;
  onDismiss: () => void;
}

export const SpecialEventToast: React.FC<SpecialEventToastProps> = ({ event, onDismiss }) => {
  useEffect(() => {
    if (!event) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [event, onDismiss]);

  if (!event) return null;

  const getStyle = () => {
    switch (event.type) {
      case 'emergency':
        return 'bg-red-950/90 border-red-600 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-bounce';
      case 'warning':
        return 'bg-amber-950/90 border-amber-600 text-amber-100 shadow-[0_0_20px_rgba(245,158,11,0.25)]';
      case 'congrats':
        return 'bg-purple-950/90 border-purple-600 text-purple-100 shadow-[0_0_20px_rgba(168,85,247,0.25)]';
      case 'notice':
      default:
        return 'bg-zinc-900/90 border-zinc-700 text-zinc-100 shadow-xl';
    }
  };

  const getIcon = () => {
    switch (event.type) {
      case 'emergency':
        return <Siren className="w-5 h-5 text-red-400 animate-spin" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'congrats':
        return <Trophy className="w-5 h-5 text-purple-400" />;
      case 'notice':
      default:
        return <Bot className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 max-w-sm w-full animate-fade-in">
      <div
        className={`p-4 rounded-2xl border backdrop-blur-md flex items-start gap-3 transition-all ${getStyle()}`}
      >
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
        <div className="flex-1 space-y-0.5">
          <div className="font-bold text-xs tracking-wider uppercase">{event.title}</div>
          <div className="text-xs leading-relaxed opacity-90">{event.message}</div>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
