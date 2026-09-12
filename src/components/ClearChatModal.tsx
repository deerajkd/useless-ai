import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface ClearChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmClear: () => void;
}

export const ClearChatModal: React.FC<ClearChatModalProps> = ({
  isOpen,
  onClose,
  onConfirmClear,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="clear-chat-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        id="clear-chat-modal-content"
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-2xl bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400">
            <Trash2 className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Are you sure?</h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            All of your useless conversations will disappear.
          </p>
          <p className="text-xs text-amber-400 font-semibold italic">
            They were useless anyway.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            id="btn-confirm-delete-nothing"
            type="button"
            onClick={() => {
              onConfirmClear();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all"
          >
            Yes, Delete Nothing
          </button>
        </div>
      </div>
    </div>
  );
};
