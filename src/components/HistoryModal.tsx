import React from 'react';
import { X, Trash2, History, Sparkles, ExternalLink } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onClearHistory: () => void;
  onDeleteEntry: (id: string) => void;
  onSelectQuestion: (question: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  onDeleteEntry,
  onSelectQuestion,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="history-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        id="history-modal-content"
        className="w-full max-w-2xl max-h-[85vh] flex flex-col bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Useless History</h3>
              <p className="text-xs text-zinc-400">
                A permanent record of time you will never get back ({history.length} items)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-thin scrollbar-thumb-zinc-800">
          {history.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              <History className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No useless history recorded yet.</p>
              <p className="text-xs text-zinc-600 mt-1">
                Ask a few questions to build your archive of futility.
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {item.mode.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {item.timestamp}
                      </span>
                      <span className="text-[10px] font-bold text-amber-300">
                        Score: {item.score}% ({item.scoreLabel})
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                      Q: {item.question}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectQuestion(item.question);
                        onClose();
                      }}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 text-xs transition-colors"
                      title="Re-ask question"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteEntry(item.id)}
                      className="p-1.5 rounded-lg bg-zinc-800 hover:bg-red-900/60 text-zinc-400 hover:text-red-300 text-xs transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-zinc-300 bg-zinc-900/90 rounded-xl p-2.5 border border-zinc-800/50 leading-relaxed italic">
                  "{item.response}"
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        {history.length > 0 && (
          <div className="px-6 py-3.5 border-t border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              Stored locally in your browser
            </span>
            <button
              id="btn-clear-all-history"
              type="button"
              onClick={onClearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Entire History
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
